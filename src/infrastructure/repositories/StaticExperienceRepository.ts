import type { IExperienceRepository } from "@/domain/repositories/IExperienceRepository"
import type { Experience } from "@/domain/entities/Experience"
import { EXPERIENCES } from "../data/experiences.data"

export class StaticExperienceRepository implements IExperienceRepository {
  getAll(): Experience[] {
    return EXPERIENCES
  }

  getById(id: string): Experience | null {
    return EXPERIENCES.find((e) => e.id === id) ?? null
  }
}
