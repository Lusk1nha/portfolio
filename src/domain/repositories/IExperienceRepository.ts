import type { Experience } from '../entities/Experience'

export interface IExperienceRepository {
  getAll(): Experience[]
  getById(id: string): Experience | null
}
