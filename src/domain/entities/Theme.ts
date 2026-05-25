import type { ThemeName, ThemeMode } from "../value-objects/ThemeName"

export interface Theme {
  readonly name: ThemeName
  readonly label: string
  readonly accent: string
  readonly bg: string
  readonly fg: string
  readonly description: string
  readonly mode: ThemeMode
}
