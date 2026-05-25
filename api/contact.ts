import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_ORIGIN = "https://lucaspedro.dev"
const TO_EMAIL = "lucaspedro517@gmail.com"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ─── Rate limiter ─────────────────────────────────────────────────────────────
// 5 requests per IP per hour (sliding window).
// Falls back to no limiting if Upstash env vars are not set.

let ratelimit: Ratelimit | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "portfolio:contact",
    analytics: false,
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(raw: string) {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"]
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim()
  if (Array.isArray(forwarded)) return forwarded[0].trim()
  return (req.headers["x-real-ip"] as string) ?? "unknown"
}

function buildEmailHtml(
  name: string,
  email: string,
  message: string
): string {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)
    .split("\n")
    .map((line) => (line ? `<span>${line}</span>` : "<br>"))
    .join("<br>")

  return /* html */ `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nova mensagem de contato</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0d1117;padding:28px 36px;">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:13px;color:#58a6ff;letter-spacing:2px;">lucaspedro.dev</p>
              <p style="margin:8px 0 0;font-size:20px;font-weight:700;color:#e6edf3;letter-spacing:-0.3px;">Nova mensagem de contato</p>
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#58a6ff,#79c0ff);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px;">

              <!-- Sender fields -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="50%" style="padding-right:12px;padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 5px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;font-weight:600;">Nome</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#0f172a;">${safeName}</p>
                  </td>
                  <td width="50%" style="padding-left:12px;padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 5px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;font-weight:600;">Email</p>
                    <a href="mailto:${safeEmail}" style="margin:0;font-size:15px;color:#2563eb;text-decoration:none;font-weight:500;">${safeEmail}</a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-top:1px solid #f1f5f9;"></td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background:#f8fafc;border-left:3px solid #58a6ff;border-radius:0 6px 6px 0;padding:20px 24px;">
                <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;font-weight:600;">Mensagem</p>
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.75;">${safeMessage}</p>
              </div>

              <!-- CTA -->
              <div style="text-align:center;margin-top:32px;">
                <a href="mailto:${safeEmail}?subject=Re: Contato via Portfolio" style="display:inline-block;background:#58a6ff;color:#0d1117;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:13px;font-weight:700;letter-spacing:0.3px;">
                  Responder para ${safeName}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:18px 36px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                Mensagem recebida pelo formulário de contato em
                <a href="https://lucaspedro.dev/contact" style="color:#58a6ff;text-decoration:none;">lucaspedro.dev/contact</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Rate limiting
  if (ratelimit) {
    const ip = getClientIp(req)
    const { success, limit, remaining, reset } = await ratelimit.limit(ip)

    res.setHeader("X-RateLimit-Limit", limit)
    res.setHeader("X-RateLimit-Remaining", remaining)
    res.setHeader("X-RateLimit-Reset", reset)

    if (!success) {
      const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000)
      res.setHeader("Retry-After", retryAfterSeconds)
      return res.status(429).json({ error: "rate_limited", retryAfter: retryAfterSeconds })
    }
  }

  // Honeypot
  const { name, email, message, _gotcha } = req.body ?? {}
  if (_gotcha) return res.status(200).json({ ok: true })

  // Validation
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: "Input too long" })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Invalid email" })
  }

  // Send
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return res.status(500).json({ error: "Server misconfigured" })

  const from = process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>"

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to: TO_EMAIL,
    replyTo: email.trim(),
    subject: `[Portfolio] Mensagem de ${name.trim()}`,
    html: buildEmailHtml(name.trim(), email.trim(), message.trim()),
    text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    console.error("Resend error:", error)
    return res.status(500).json({ error: "Failed to send email" })
  }

  return res.status(200).json({ ok: true })
}
