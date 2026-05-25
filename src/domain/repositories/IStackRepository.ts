import type { StackItem, StackGroup } from '../entities/StackItem'

export interface IStackRepository {
  getAll(): StackItem[]
  getByGroup(group: StackGroup): StackItem[]
  getFeatured(): StackItem[]
}
