import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/presentation/contexts/LanguageContext'

const STORAGE_KEY = 'portfolio:boot-done'

type LineType = 'header' | 'ok' | 'info' | 'blank' | 'progress'

interface BootLine {
  text: string
  type: LineType
  delay: number
}

const LINES_PT: BootLine[] = [
  { text: 'LUCAS/OS v1.0.0  ·  Edição Terminal BIOS', type: 'header', delay: 0 },
  { text: '', type: 'blank', delay: 180 },
  { text: 'Verificando hardware...', type: 'info', delay: 360 },
  { text: '[  OK  ]  CPU: Motor Full Stack  ·  4+ anos de uptime', type: 'ok', delay: 530 },
  { text: '[  OK  ]  RAM: Cache de Arquitetura Limpa  ·  16GB', type: 'ok', delay: 670 },
  { text: '[  OK  ]  GPU: Acelerador Framer Motion  ·  60fps', type: 'ok', delay: 810 },
  { text: '', type: 'blank', delay: 950 },
  { text: 'Carregando módulos do kernel...', type: 'info', delay: 1100 },
  { text: '[  OK  ]  react@19.2.6', type: 'ok', delay: 1250 },
  { text: '[  OK  ]  typescript@6.0.2', type: 'ok', delay: 1370 },
  { text: '[  OK  ]  tailwindcss@4.3.0', type: 'ok', delay: 1480 },
  { text: '[  OK  ]  framer-motion@12', type: 'ok', delay: 1590 },
  { text: '', type: 'blank', delay: 1710 },
  { text: 'Iniciando serviços...', type: 'info', delay: 1870 },
  { text: '[  OK  ]  portfolio.service', type: 'ok', delay: 2020 },
  { text: '[  OK  ]  theme.service  →  midnight', type: 'ok', delay: 2140 },
  { text: '[  OK  ]  i18n.service  →  pt-BR / en', type: 'ok', delay: 2260 },
  { text: '', type: 'blank', delay: 2380 },
  { text: '████████████████████  100%', type: 'progress', delay: 2530 },
  { text: '', type: 'blank', delay: 2680 },
  { text: 'Bem-vindo, visitante. Tenha uma boa sessão.', type: 'header', delay: 2850 },
]

const LINES_EN: BootLine[] = [
  { text: 'LUCAS/OS v1.0.0  ·  BIOS Terminal Edition', type: 'header', delay: 0 },
  { text: '', type: 'blank', delay: 180 },
  { text: 'Checking hardware...', type: 'info', delay: 360 },
  { text: '[  OK  ]  CPU: Full Stack Engine  ·  4+ years uptime', type: 'ok', delay: 530 },
  { text: '[  OK  ]  RAM: Clean Architecture Cache  ·  16GB', type: 'ok', delay: 670 },
  { text: '[  OK  ]  GPU: Framer Motion Accelerator  ·  60fps', type: 'ok', delay: 810 },
  { text: '', type: 'blank', delay: 950 },
  { text: 'Loading kernel modules...', type: 'info', delay: 1100 },
  { text: '[  OK  ]  react@19.2.6', type: 'ok', delay: 1250 },
  { text: '[  OK  ]  typescript@6.0.2', type: 'ok', delay: 1370 },
  { text: '[  OK  ]  tailwindcss@4.3.0', type: 'ok', delay: 1480 },
  { text: '[  OK  ]  framer-motion@12', type: 'ok', delay: 1590 },
  { text: '', type: 'blank', delay: 1710 },
  { text: 'Starting services...', type: 'info', delay: 1870 },
  { text: '[  OK  ]  portfolio.service', type: 'ok', delay: 2020 },
  { text: '[  OK  ]  theme.service  →  midnight', type: 'ok', delay: 2140 },
  { text: '[  OK  ]  i18n.service  →  pt-BR / en', type: 'ok', delay: 2260 },
  { text: '', type: 'blank', delay: 2380 },
  { text: '████████████████████  100%', type: 'progress', delay: 2530 },
  { text: '', type: 'blank', delay: 2680 },
  { text: 'Welcome, visitor. Have a good session.', type: 'header', delay: 2850 },
]

export function shouldShowBoot() {
  return !sessionStorage.getItem(STORAGE_KEY)
}

export function BootSequence({ onDone }: { onDone: () => void }) {
  const { language } = useLanguage()
  const LINES = language === 'pt' ? LINES_PT : LINES_EN
  const skipLabel = language === 'pt' ? 'pressione qualquer tecla para pular' : 'press any key to skip'

  const [visibleCount, setVisibleCount] = useState(0)
  const [fading, setFading] = useState(false)
  const dismissed = useRef(false)

  const dismiss = useCallback(() => {
    if (dismissed.current) return
    dismissed.current = true
    setFading(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
    setTimeout(onDone, 500)
  }, [onDone])

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay),
    )
    const last = LINES[LINES.length - 1].delay
    const autoClose = setTimeout(dismiss, last + 800)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(autoClose)
    }
  }, [dismiss, LINES])

  useEffect(() => {
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [dismiss])

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-9999 flex flex-col overflow-hidden bg-(--bg) px-8 py-10 font-mono text-[12px] sm:px-16 sm:py-14"
      onClick={dismiss}
    >
      <div className="absolute right-8 top-8 text-[11px]" style={{ color: 'var(--accent)' }}>
        ◈ lucas@portfolio
      </div>

      <div className="flex flex-col gap-0.5">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="leading-5"
          >
            {line.type === 'header' && (
              <span style={{ color: 'var(--accent)' }}>{line.text}</span>
            )}
            {line.type === 'ok' && (
              <span>
                <span style={{ color: 'var(--success)' }}>[  OK  ]</span>
                <span className="text-(--muted)">{line.text.replace('[  OK  ]', '')}</span>
              </span>
            )}
            {line.type === 'info' && (
              <span className="text-(--muted)">{line.text}</span>
            )}
            {line.type === 'progress' && (
              <span style={{ color: 'var(--accent)' }}>{line.text}</span>
            )}
            {line.type === 'blank' && <span>&nbsp;</span>}
          </motion.div>
        ))}

        {visibleCount > 0 && visibleCount < LINES.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="inline-block h-3.5 w-1.5 rounded-sm"
            style={{ background: 'var(--accent)' }}
          />
        )}
      </div>

      <p className="absolute bottom-8 right-8 text-[10px] text-(--muted)">{skipLabel}</p>
    </motion.div>
  )
}
