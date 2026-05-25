export type ExperienceLevel = 'intern' | 'junior' | 'mid' | 'senior'

export interface Experience {
  readonly id: string
  readonly company: string
  readonly companyUrl?: string
  readonly role: { pt: string; en: string }
  readonly level: ExperienceLevel
  readonly startDate: string
  readonly endDate: string | null
  readonly location: { pt: string; en: string }
  readonly modality: { pt: string; en: string }
  readonly description: { pt: string; en: string }
  readonly highlights: { pt: string[]; en: string[] }
  readonly stack: string[]
}
