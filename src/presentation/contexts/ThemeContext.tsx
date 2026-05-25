import { createContext, useContext, useEffect, useState } from "react"
import type { ThemeName } from "@/domain/value-objects/ThemeName"
import { DEFAULT_THEME, THEME_NAMES } from "@/domain/value-objects/ThemeName"
import { THEMES } from "@/infrastructure/data/themes.data"
import type { Theme } from "@/domain/entities/Theme"

const STORAGE_KEY = "portfolio:theme"

interface ThemeContextValue {
  theme: ThemeName
  themeData: Theme
  themes: Theme[]
  setTheme: (name: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveStoredTheme(): ThemeName {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && THEME_NAMES.includes(stored as ThemeName)) {
    return stored as ThemeName
  }
  return DEFAULT_THEME
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(resolveStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function setTheme(name: ThemeName) {
    setThemeState(name)
  }

  const value: ThemeContextValue = {
    theme,
    themeData: THEMES[theme],
    themes: THEME_NAMES.map((n) => THEMES[n]),
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
