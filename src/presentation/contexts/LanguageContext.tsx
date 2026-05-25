import { createContext, useContext, useState } from "react"
import type { Language } from "@/domain/value-objects/Language"
import { DEFAULT_LANGUAGE } from "@/domain/value-objects/Language"
import { pt } from "@/i18n/pt"
import { en } from "@/i18n/en"
import type { Translations } from "@/i18n/pt"

const STORAGE_KEY = "portfolio:language"

interface LanguageContextValue {
  language: Language
  t: Translations
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const TRANSLATIONS: Record<Language, Translations> = { pt, en }

function resolveStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "pt" || stored === "en") return stored
  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(resolveStoredLanguage)

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  function toggleLanguage() {
    setLanguage(language === "pt" ? "en" : "pt")
  }

  const value: LanguageContextValue = {
    language,
    t: TRANSLATIONS[language],
    toggleLanguage,
    setLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
