import type { Project } from '../entities/Project'

export interface IProjectRepository {
  getAll(): Promise<Project[]>
  getFeatured(): Promise<Project[]>
  getBySlug(slug: string): Promise<Project | null>
}
