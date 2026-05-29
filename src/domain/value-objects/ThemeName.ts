export type ThemeMode = "dark" | "light"

export type ThemeName =
  | "midnight"
  | "terminal"
  | "cyberpunk"
  | "dracula"
  | "tokyo-night"
  | "synthwave"
  | "nord"
  | "night-runner"
  | "forest"
  | "rose-pine"
  | "gruvbox"
  | "monokai"
  | "coffee"
  | "paper"
  | "latte"
  | "sakura"

export const THEME_NAMES: ThemeName[] = [
  "midnight",
  "terminal",
  "cyberpunk",
  "dracula",
  "tokyo-night",
  "synthwave",
  "nord",
  "night-runner",
  "forest",
  "rose-pine",
  "gruvbox",
  "monokai",
  "coffee",
  "paper",
  "latte",
  "sakura",
]

export const DARK_THEMES: ThemeName[] = [
  "midnight",
  "terminal",
  "cyberpunk",
  "dracula",
  "tokyo-night",
  "synthwave",
  "nord",
  "night-runner",
  "forest",
  "rose-pine",
  "gruvbox",
  "monokai",
]

export const LIGHT_THEMES: ThemeName[] = ["coffee", "paper", "latte", "sakura"]

export const DEFAULT_THEME: ThemeName = "midnight"
