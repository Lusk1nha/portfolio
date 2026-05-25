import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"

const ALLOWED_ORIGIN = "https://lucaspedro.dev"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { name, email, message, _gotcha } = req.body ?? {}

  if (_gotcha) return res.status(200).json({ ok: true })

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return res.status(500).json({ error: "Server misconfigured" })

  const from = process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>"

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to: "lucaspedro517@gmail.com",
    replyTo: email,
    subject: `[Portfolio] Mensagem de ${name}`,
    html: `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `,
  })

  if (error) {
    console.error("Resend error:", error)
    return res.status(500).json({ error: "Failed to send email" })
  }

  return res.status(200).json({ ok: true })
}
