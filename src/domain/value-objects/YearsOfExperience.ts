const CAREER_START = new Date('2021-09-01')

export function getYearsOfExperience(): number {
  const now = new Date()
  const years = now.getFullYear() - CAREER_START.getFullYear()
  const hasCompletedAnniversary =
    now.getMonth() > CAREER_START.getMonth() ||
    (now.getMonth() === CAREER_START.getMonth() && now.getDate() >= CAREER_START.getDate())
  return hasCompletedAnniversary ? years : years - 1
}

export function getYearsLabel(lang: 'pt' | 'en'): string {
  const years = getYearsOfExperience()
  return lang === 'pt' ? `${years}+ anos` : `${years}+ years`
}
