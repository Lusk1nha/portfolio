import type { IExperienceRepository } from '@/domain/repositories/IExperienceRepository'
import type { Experience } from '@/domain/entities/Experience'

export class GetExperiences {
  constructor(private readonly repository: IExperienceRepository) {}

  execute(): Experience[] {
    return this.repository.getAll()
  }
}
