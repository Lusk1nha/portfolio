import { createContext, useContext, useState } from "react"
import type { Language } from "@/domain/value-objects/Language"
import { DEFAULT_LANGUAGE, LANGUAGES } from "@/domain/value-objects/Language"
import { pt } from "@/i18n/pt"
import { en } from "@/i18n/en"
import { es } from "@/i18n/es"
import { fr } from "@/i18n/fr"
import type { Translations } from "@/i18n/pt"

const STORAGE_KEY = "portfolio:language"

interface LanguageContextValue {
  language: Language
  t: Translations
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const TRANSLATIONS: Record<Language, Translations> = { pt, en, es, fr }

function resolveStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null
  if (stored && LANGUAGES.includes(stored)) return stored
  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(resolveStoredLanguage)

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  const value: LanguageContextValue = {
    language,
    t: TRANSLATIONS[language],
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
