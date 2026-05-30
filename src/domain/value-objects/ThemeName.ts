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
  | "cs16"
  | "doom"
  | "catppuccin-mocha"
  | "solarized-dark"
  | "ayu-dark"
  | "obsidian"
  | "outrun"
  | "coffee"
  | "sakura"
  | "citrus"
  | "bubblegum"
  | "dune"
  | "glacier"
  | "meadow"
  | "sunset"
  | "amethyst"
  | "blossom"

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
  "cs16",
  "doom",
  "catppuccin-mocha",
  "solarized-dark",
  "ayu-dark",
  "obsidian",
  "outrun",
  "coffee",
  "sakura",
  "citrus",
  "bubblegum",
  "dune",
  "glacier",
  "meadow",
  "sunset",
  "amethyst",
  "blossom",
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
  "cs16",
  "doom",
  "catppuccin-mocha",
  "solarized-dark",
  "ayu-dark",
  "obsidian",
  "outrun",
]

export const LIGHT_THEMES: ThemeName[] = [
  "coffee",
  "sakura",
  "citrus",
  "bubblegum",
  "dune",
  "glacier",
  "meadow",
  "sunset",
  "amethyst",
  "blossom",
]

export const DEFAULT_THEME: ThemeName = "midnight"
