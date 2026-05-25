import { useLanguage } from '@/presentation/contexts/LanguageContext'

export function LanguageToggle() {
  const { toggleLanguage, t } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex h-8 items-center rounded-sm border border-[var(--border)] bg-[var(--surface)] px-2.5 text-[11px] font-medium text-[var(--muted)] transition-all hover:border-[var(--accent)]/50 hover:text-[var(--fg)]"
    >
      {t.language.toggle}
    </button>
  )
}
