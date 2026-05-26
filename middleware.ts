import { next } from "@vercel/edge"

// ─── Bot detection ────────────────────────────────────────────────────────────

const BOT_PATTERN =
  /WhatsApp|LinkedInBot|facebookexternalhit|Facebot|Twitterbot|Discordbot|Slackbot|TelegramBot|Applebot|Googlebot|Bingbot|crawler|spider|bot/i

function isBot(userAgent: string): boolean {
  return BOT_PATTERN.test(userAgent)
}

// ─── Route metadata ───────────────────────────────────────────────────────────

const BASE_URL = "https://lucaspedro.dev"
const OG_IMAGE = `${BASE_URL}/og-image.png`
const SITE_NAME = "Lucas Pedro da Hora"

interface RouteMeta {
  title: string
  description: string
}

const ROUTES: Record<string, RouteMeta> = {
  "/projects": {
    title: "Projetos · Lucas Pedro da Hora",
    description:
      "Projetos open source e trabalhos de Lucas Pedro da Hora — aplicações web com React, Node.js, Rust e TypeScript. Veja repositórios no GitHub com stars, forks e demos ao vivo.",
  },
  "/experience": {
    title: "Experiência · Lucas Pedro da Hora",
    description:
      "Trajetória profissional de Lucas Pedro da Hora — Full Stack Developer com experiência em HUB Brasil e Class Solutions. Atuação em React, Node.js, Rust, DDD e Clean Architecture.",
  },
  "/stack": {
    title: "Stack · Lucas Pedro da Hora",
    description:
      "Stack técnica de Lucas Pedro da Hora — React, Node.js, Nest.js, Rust, FastAPI, PostgreSQL, Docker, GCP e mais. Especialista em arquitetura escalável e integração de IA.",
  },
  "/contact": {
    title: "Contato · Lucas Pedro da Hora",
    description:
      "Entre em contato com Lucas Pedro da Hora — Full Stack Developer disponível para projetos freelance, consultorias e oportunidades remotas. Email, LinkedIn e GitHub.",
  },
  "/cv": {
    title: "Currículo · Lucas Pedro da Hora",
    description:
      "Currículo de Lucas Pedro da Hora — Full Stack Developer. Experiência profissional, formação, stack técnica e projetos. Disponível para download em PDF.",
  },
}

// ─── HTML builder ─────────────────────────────────────────────────────────────

function buildOgHtml(path: string, meta: RouteMeta): string {
  const url = `${BASE_URL}${path}`

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${meta.title}">
  <meta property="og:site_name" content="${SITE_NAME}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url}">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <meta name="twitter:image:alt" content="${meta.title}">
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
  <a href="${BASE_URL}">lucaspedro.dev</a>
</body>
</html>`
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export default function middleware(
  req: Request
): Response | ReturnType<typeof next> {
  const { pathname } = new URL(req.url)
  const userAgent = req.headers.get("user-agent") ?? ""

  const meta = ROUTES[pathname]

  if (meta && isBot(userAgent)) {
    return new Response(buildOgHtml(pathname, meta), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  }

  return next()
}

export const config = {
  matcher: ["/projects", "/experience", "/stack", "/contact", "/cv"],
}
