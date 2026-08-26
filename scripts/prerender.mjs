import fs from "node:fs"
import path from "node:path"
import { render } from "../dist-server/entry-server.js"

const ROUTES = ["/", "/projects", "/experience", "/stack", "/clients", "/contact", "/cv"]

const template = fs.readFileSync("dist/index.html", "utf-8")

function applySeo(html, seo) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${seo.description}$2`
    )
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${seo.canonical}$2`)
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${seo.canonical}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${seo.title}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${seo.description}$2`
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${seo.title}$2`
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${seo.description}$2`
    )
}

for (const url of ROUTES) {
  const { html: appHtml, seo } = await render(url)
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  html = applySeo(html, seo)

  const outDir = url === "/" ? "dist" : path.join("dist", url)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, "index.html"), html)
  console.log(`prerendered ${url}`)
}

fs.rmSync("dist-server", { recursive: true, force: true })
