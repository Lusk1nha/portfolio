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

export interface ResolvedSeo {
  title: string
  description: string
  canonical: string
}

// Captured during render so build-time SSG can read the last page's SEO
// values after prerenderToNodeStream resolves (effects never run in SSR).
export let lastRenderedSeo: ResolvedSeo = {
  title: `${BASE_TITLE} — Full Stack Developer`,
  description: BASE_DESCRIPTION,
  canonical: BASE_URL,
}

export function useSeo({ title, description, path = "" }: SeoOptions = {}) {
  const resolved: ResolvedSeo = {
    title: title
      ? `${title} · ${BASE_TITLE}`
      : `${BASE_TITLE} — Full Stack Developer`,
    description: description ?? BASE_DESCRIPTION,
    canonical: `${BASE_URL}${path}`,
  }

  lastRenderedSeo = resolved

  useEffect(() => {
    document.title = resolved.title
    setMeta("name", "description", resolved.description)
    setMeta("property", "og:title", resolved.title)
    setMeta("property", "og:description", resolved.description)
    setMeta("name", "twitter:title", resolved.title)
    setMeta("name", "twitter:description", resolved.description)
    setMeta("property", "og:url", resolved.canonical)
    setLink("canonical", resolved.canonical)

    return () => {
      document.title = `${BASE_TITLE} — Full Stack Developer`
    }
  }, [resolved.title, resolved.description, resolved.canonical])
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
