import type { IStackRepository } from '@/domain/repositories/IStackRepository'
import type { StackItem, StackGroup } from '@/domain/entities/StackItem'
import { STACK_ITEMS } from '../data/stack.data'

export class StaticStackRepository implements IStackRepository {
  getAll(): StackItem[] {
    return STACK_ITEMS
  }

  getByGroup(group: StackGroup): StackItem[] {
    return STACK_ITEMS.filter((item) => item.group === group)
  }

  getFeatured(): StackItem[] {
    return STACK_ITEMS.filter((item) => item.featured)
  }
}
