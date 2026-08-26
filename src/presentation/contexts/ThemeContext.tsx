import { createContext, useContext, useEffect, useState } from "react"
import type { ThemeName } from "@/domain/value-objects/ThemeName"
import { DEFAULT_THEME, THEME_NAMES } from "@/domain/value-objects/ThemeName"
import { THEMES } from "@/infrastructure/data/themes.data"
import type { Theme } from "@/domain/entities/Theme"

const STORAGE_KEY = "portfolio:theme"
const AUTO_CYCLE_INTERVAL_MS = 8000

interface ThemeContextValue {
  theme: ThemeName
  themeData: Theme
  themes: Theme[]
  setTheme: (name: ThemeName) => void
  autoCycle: boolean
  toggleAutoCycle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveStoredTheme(): ThemeName {
  if (typeof window === "undefined") return DEFAULT_THEME

  const fromUrl = new URLSearchParams(window.location.search).get("theme")
  if (fromUrl && THEME_NAMES.includes(fromUrl as ThemeName)) {
    return fromUrl as ThemeName
  }
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && THEME_NAMES.includes(stored as ThemeName)) {
    return stored as ThemeName
  }
  return DEFAULT_THEME
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(resolveStoredTheme)
  const [autoCycle, setAutoCycle] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem(STORAGE_KEY, theme)

    const url = new URL(window.location.href)
    url.searchParams.set("theme", theme)
    window.history.replaceState(null, "", url)
  }, [theme])

  useEffect(() => {
    if (!autoCycle) return
    const id = setInterval(() => {
      setThemeState((current) => {
        const options = THEME_NAMES.filter((n) => n !== current)
        return options[Math.floor(Math.random() * options.length)]
      })
    }, AUTO_CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [autoCycle])

  function setTheme(name: ThemeName) {
    setThemeState(name)
  }

  function toggleAutoCycle() {
    setAutoCycle((v) => !v)
  }

  const value: ThemeContextValue = {
    theme,
    themeData: THEMES[theme],
    themes: THEME_NAMES.map((n) => THEMES[n]),
    setTheme,
    autoCycle,
    toggleAutoCycle,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
