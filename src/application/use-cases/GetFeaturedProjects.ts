import type { IProjectRepository } from '@/domain/repositories/IProjectRepository'
import type { Project } from '@/domain/entities/Project'

export class GetFeaturedProjects {
  constructor(private readonly repository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.repository.getFeatured()
  }
}
