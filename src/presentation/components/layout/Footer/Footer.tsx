import { HeartIcon } from "@phosphor-icons/react"
import { useLanguage } from "@/presentation/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-(--border) py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
        <p className="text-[11px] text-(--muted)">
          <span style={{ color: "var(--accent)" }}>◈ </span>
          lucas.pedro.da.hora &copy; {new Date().getFullYear()}
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-(--muted)">
          {t.footer.built_with}
          <HeartIcon
            size={11}
            style={{ color: "var(--accent)" }}
            weight="fill"
          />
          React {t.footer.and} TypeScript
        </p>
      </div>
    </footer>
  )
}
