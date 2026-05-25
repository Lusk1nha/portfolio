import type { IProjectRepository } from '@/domain/repositories/IProjectRepository'
import type { Project } from '@/domain/entities/Project'
import { LOCAL_PROJECTS, FEATURED_GITHUB_SLUGS } from '../data/projects.data'
import { fetchGithubRepo, mapGithubRepoToProject } from '../github/GithubClient'

const GITHUB_TIMEOUT_MS = 4000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ])
}

export class StaticProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    const githubProjects = await this.fetchGithubProjects()
    return [...LOCAL_PROJECTS, ...githubProjects]
  }

  async getFeatured(): Promise<Project[]> {
    const all = await this.getAll()
    return all.filter((p) => p.featured)
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const all = await this.getAll()
    return all.find((p) => p.slug === slug) ?? null
  }

  private async fetchGithubProjects(): Promise<Project[]> {
    try {
      const results = await Promise.allSettled(
        FEATURED_GITHUB_SLUGS.map((slug) =>
          withTimeout(fetchGithubRepo(slug), GITHUB_TIMEOUT_MS)
        )
      )

      return results
        .filter(
          (r): r is PromiseFulfilledResult<NonNullable<Awaited<ReturnType<typeof fetchGithubRepo>>>> =>
            r.status === 'fulfilled' && r.value !== null
        )
        .map((r) => mapGithubRepoToProject(r.value))
    } catch {
      return []
    }
  }
}
