import { useState, useRef, useEffect } from "react"
import { CaretDownIcon } from "@phosphor-icons/react"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import type { Language } from "@/domain/value-objects/Language"

const LANG_OPTIONS: { code: Language; label: string; native: string }[] = [
  { code: "pt", label: "Português", native: "PT" },
  { code: "en", label: "English",   native: "EN" },
  { code: "es", label: "Español",   native: "ES" },
  { code: "fr", label: "Français",  native: "FR" },
]

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const current = LANG_OPTIONS.find((l) => l.code === language)!

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-8 items-center gap-1 rounded-sm border border-(--border) bg-(--surface) px-2.5 text-[11px] font-medium text-(--muted) transition-all hover:border-(--accent)/50 hover:text-(--fg)"
      >
        {current.native}
        <CaretDownIcon
          size={10}
          className="transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-30 overflow-hidden rounded-sm border border-(--border) bg-(--surface) shadow-lg"
        >
          {LANG_OPTIONS.map((lang) => {
            const active = lang.code === language
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLanguage(lang.code)
                  setOpen(false)
                }}
                className="flex w-full items-center justify-between gap-4 px-3 py-2 text-left text-[11px] transition-colors hover:bg-(--surface-2)"
                style={{
                  color: active ? "var(--accent)" : "var(--muted)",
                }}
              >
                <span className="font-medium">{lang.native}</span>
                <span className="opacity-70">{lang.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
