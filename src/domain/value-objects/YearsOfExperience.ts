import type { Language } from "./Language"

const CAREER_START = new Date("2021-09-01")

export function getYearsOfExperience(): number {
  const now = new Date()
  const years = now.getFullYear() - CAREER_START.getFullYear()
  const hasCompletedAnniversary =
    now.getMonth() > CAREER_START.getMonth() ||
    (now.getMonth() === CAREER_START.getMonth() &&
      now.getDate() >= CAREER_START.getDate())
  return hasCompletedAnniversary ? years : years - 1
}

const YEARS_LABELS: Record<Language, (n: number) => string> = {
  pt: (n) => `${n}+ anos`,
  en: (n) => `${n}+ years`,
  es: (n) => `${n}+ años`,
  fr: (n) => `${n}+ ans`,
}

export function getYearsLabel(lang: Language): string {
  const years = getYearsOfExperience()
  return YEARS_LABELS[lang](years)
}
