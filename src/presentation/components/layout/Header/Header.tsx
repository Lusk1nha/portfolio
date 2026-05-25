import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeSwitcher } from '../../shared/ThemeSwitcher/ThemeSwitcher'
import { LanguageToggle } from '../../shared/LanguageToggle/LanguageToggle'
import { useLanguage } from '@/presentation/contexts/LanguageContext'

const NAV_ROUTES = [
  { key: 'home', path: '/' },
  { key: 'projects', path: '/projects' },
  { key: 'experience', path: '/experience' },
  { key: 'stack', path: '/stack' },
  { key: 'contact', path: '/contact' },
] as const

export function Header() {
  const { t } = useLanguage()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    projects: t.nav.projects,
    experience: t.nav.experience,
    stack: t.nav.stack,
    contact: t.nav.contact,
  }

  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--bg)/90 backdrop-blur-md">
      {/* Accent top strip */}
      <div className="h-0.5 w-full" style={{ background: 'var(--accent)' }} />

      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-1.5 text-[13px] font-bold">
          <span style={{ color: 'var(--accent)' }}>◈</span>
          <span className="text-(--fg)">lucas</span>
          <span className="text-(--muted)">/</span>
          <span style={{ color: 'var(--accent)' }}>portfolio</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ROUTES.map(({ key, path }) => {
            const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
            return (
              <NavLink
                key={key}
                to={path}
                className={`rounded-sm px-3 py-1.5 text-[11px] transition-colors ${
                  isActive
                    ? 'bg-(--accent)/10 text-(--accent)'
                    : 'text-(--muted) hover:bg-(--surface) hover:text-(--fg)'
                }`}
              >
                {navLabels[key]}
              </NavLink>
            )
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageToggle />

          {/* Mobile menu toggle */}
          <button
            className="flex size-8 items-center justify-center rounded-sm border border-(--border) bg-(--surface) text-(--muted) md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <XIcon size={14} /> : <ListIcon size={14} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-(--border) md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_ROUTES.map(({ key, path }) => (
                <NavLink
                  key={key}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-sm px-3 py-2 text-[12px] ${
                      isActive
                        ? 'bg-(--accent)/10 text-(--accent)'
                        : 'text-(--muted) hover:bg-(--surface) hover:text-(--fg)'
                    }`
                  }
                >
                  {navLabels[key]}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
