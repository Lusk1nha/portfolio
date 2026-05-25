import { useState, useRef, useEffect } from 'react'
import { PaintBrushIcon } from '@phosphor-icons/react'
import { useTheme } from '@/presentation/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 items-center gap-1.5 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-2.5 text-[11px] text-[var(--muted)] transition-all hover:border-[var(--accent)]/50 hover:text-[var(--fg)]"
        aria-label="Switch theme"
      >
        <PaintBrushIcon size={13} />
        <span className="hidden sm:inline">{theme}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 z-50 min-w-[200px] rounded-sm border border-[var(--border)] bg-[var(--surface-2)] p-1 shadow-xl"
          >
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => { setTheme(t.name); setOpen(false) }}
                className={`flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-[11px] transition-colors hover:bg-[var(--surface-hover)] ${
                  theme === t.name ? 'text-[var(--accent)]' : 'text-[var(--fg)]'
                }`}
              >
                <span
                  className="size-3 rounded-full border border-white/10 flex-shrink-0"
                  style={{ background: t.accent }}
                />
                <span>{t.label}</span>
                <span className="ml-auto text-[10px] text-[var(--muted)]">{t.description}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
