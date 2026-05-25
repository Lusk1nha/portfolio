import { Octokit } from "@octokit/rest"
import type { Project } from "@/domain/entities/Project"

const octokit = new Octokit()

const GITHUB_USERNAME = "Lusk1nha"

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
}

export async function fetchGithubRepo(
  repoName: string
): Promise<GithubRepo | null> {
  try {
    const { data } = await octokit.repos.get({
      owner: GITHUB_USERNAME,
      repo: repoName,
    })
    return data as GithubRepo
  } catch {
    return null
  }
}

export function mapGithubRepoToProject(repo: GithubRepo): Project {
  return {
    id: `github-${repo.id}`,
    slug: repo.name,
    name: repo.name,
    description: {
      pt: repo.description ?? "Sem descrição",
      en: repo.description ?? "No description",
    },
    githubUrl: repo.html_url,
    source: "github",
    featured: true,
    stack: repo.language ? [repo.language] : [],
    language: repo.language ?? undefined,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    status: "active",
  }
}
