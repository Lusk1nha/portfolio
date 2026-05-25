import { useEffect } from "react"

interface SeoOptions {
  title?: string
  description?: string
  path?: string
}

const BASE_TITLE = "Lucas Pedro da Hora"
const BASE_DESCRIPTION =
  "Full Stack Developer especialista em React, Node.js e Rust. 4+ anos construindo sistemas web de alta performance com foco em arquitetura escalável, DDD e integração de IA."
const BASE_URL = "https://lucaspedro.dev"

export function useSeo({ title, description, path = "" }: SeoOptions = {}) {
  useEffect(() => {
    // Title
    document.title = title
      ? `${title} · ${BASE_TITLE}`
      : `${BASE_TITLE} — Full Stack Developer`

    // Description
    const desc = description ?? BASE_DESCRIPTION
    setMeta("name", "description", desc)
    setMeta("property", "og:title", document.title)
    setMeta("property", "og:description", desc)
    setMeta("name", "twitter:title", document.title)
    setMeta("name", "twitter:description", desc)

    // Canonical
    const canonical = `${BASE_URL}${path}`
    setMeta("property", "og:url", canonical)
    setLink("canonical", canonical)

    return () => {
      document.title = `${BASE_TITLE} — Full Stack Developer`
    }
  }, [title, description, path])
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", value)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}
