export type StackGroup =
  | "frontend"
  | "backend"
  | "cloud"
  | "ai"
  | "architecture"
  | "tools"

export interface StackItem {
  readonly id: string
  readonly name: string
  readonly group: StackGroup
  readonly icon?: string
  readonly featured: boolean
}
