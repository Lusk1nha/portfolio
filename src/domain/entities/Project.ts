export type ProjectSource = 'local' | 'github'

export interface Project {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly description: { pt: string; en: string }
  readonly url?: string
  readonly githubUrl?: string
  readonly source: ProjectSource
  readonly featured: boolean
  readonly stack: string[]
  readonly language?: string
  readonly stars?: number
  readonly forks?: number
  readonly status: 'active' | 'wip' | 'archived'
}
