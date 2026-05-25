import type { IStackRepository } from "@/domain/repositories/IStackRepository"
import type { StackItem, StackGroup } from "@/domain/entities/StackItem"

export interface StackGroupResult {
  group: StackGroup
  items: StackItem[]
}

const GROUP_ORDER: StackGroup[] = [
  "frontend",
  "backend",
  "cloud",
  "ai",
  "architecture",
  "tools",
]

export class GetStackGroups {
  constructor(private readonly repository: IStackRepository) {}

  execute(): StackGroupResult[] {
    const all = this.repository.getAll()
    return GROUP_ORDER.map((group) => ({
      group,
      items: all.filter((item) => item.group === group),
    }))
  }
}
