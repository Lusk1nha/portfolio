import type { ThemeName } from '../value-objects/ThemeName'

export interface Theme {
  readonly name: ThemeName
  readonly label: string
  readonly accent: string
  readonly bg: string
  readonly description: string
}
