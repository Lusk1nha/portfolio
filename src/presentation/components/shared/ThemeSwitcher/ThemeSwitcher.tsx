import { useState, useRef, useEffect } from "react"
import { SunIcon, MoonIcon } from "@phosphor-icons/react"
import { useTheme } from "@/presentation/contexts/ThemeContext"
import { motion, AnimatePresence } from "framer-motion"
import type { Theme } from "@/domain/entities/Theme"

function ThemeSwatch({
  theme,
  active,
  onClick,
}: {
  theme: Theme
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      title={theme.label}
      className={`group relative flex flex-col gap-1.5 rounded-sm border p-2.5 text-left transition-all ${
        active
          ? "border-(--accent) bg-(--accent)/8"
          : "border-(--border) hover:border-(--accent)/50 hover:bg-(--surface-hover)"
      }`}
    >
      {/* Color preview */}
      <div
        className="flex h-7 w-full overflow-hidden rounded-sm border border-black/10"
        style={{ background: theme.bg }}
      >
        <div className="h-full w-1/2" style={{ background: theme.bg }} />
        <div className="h-full w-1/2" style={{ background: theme.accent }} />
      </div>

      {/* Label */}
      <span
        className={`truncate text-[10px] leading-none font-medium ${
          active ? "text-(--accent)" : "text-(--muted) group-hover:text-(--fg)"
        }`}
      >
        {theme.label}
      </span>

      {/* Active indicator */}
      {active && (
        <span
          className="absolute top-1.5 right-1.5 size-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}
    </button>
  )
}

export function ThemeSwitcher() {
  const { theme, themeData, themes, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const darkThemes = themes.filter((t) => t.mode === "dark")
  const lightThemes = themes.filter((t) => t.mode === "light")

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const ModeIcon = themeData.mode === "dark" ? MoonIcon : SunIcon

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 items-center gap-1.5 rounded-sm border border-(--border) bg-(--surface) px-2.5 text-[11px] text-(--muted) transition-all hover:border-(--accent)/50 hover:text-(--fg)"
        aria-label="Switch theme"
      >
        {/* Current accent dot */}
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ background: themeData.accent }}
        />
        <span className="hidden max-w-18 truncate sm:inline">{theme}</span>
        <ModeIcon size={11} className="ml-0.5 shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-10 right-0 z-50 w-72 rounded-sm border border-(--border) bg-(--surface-2) p-3 shadow-2xl"
          >
            {/* Dark group */}
            <div className="mb-3">
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-(--muted) uppercase">
                <MoonIcon size={10} />
                Dark
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {darkThemes.map((t) => (
                  <ThemeSwatch
                    key={t.name}
                    theme={t}
                    active={theme === t.name}
                    onClick={() => {
                      setTheme(t.name)
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Light group */}
            <div className="border-t border-(--border) pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-(--muted) uppercase">
                <SunIcon size={10} />
                Light
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {lightThemes.map((t) => (
                  <ThemeSwatch
                    key={t.name}
                    theme={t}
                    active={theme === t.name}
                    onClick={() => {
                      setTheme(t.name)
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
