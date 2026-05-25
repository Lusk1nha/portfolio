import type { Language } from "./Language"

/**
 * Retrieves the localised string from a bilingual content object.
 * Falls back to English for languages not yet translated in content data (es, fr).
 */
export function localText(
  obj: { pt: string; en: string },
  lang: Language
): string {
  if (lang === "pt") return obj.pt
  return obj.en
}

export function localTextArray(
  obj: { pt: string[]; en: string[] },
  lang: Language
): string[] {
  if (lang === "pt") return obj.pt
  return obj.en
}
