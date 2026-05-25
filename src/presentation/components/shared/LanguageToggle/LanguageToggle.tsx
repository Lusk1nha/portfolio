import { useLanguage } from "@/presentation/contexts/LanguageContext"

export function LanguageToggle() {
  const { toggleLanguage, t } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex h-8 items-center rounded-sm border border-(--border) bg-(--surface) px-2.5 text-[11px] font-medium text-(--muted) transition-all hover:border-(--accent)/50 hover:text-(--fg)"
    >
      {t.language.toggle}
    </button>
  )
}
