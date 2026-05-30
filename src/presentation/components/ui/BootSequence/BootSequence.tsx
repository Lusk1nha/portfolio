import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import type { Language } from "@/domain/value-objects/Language"

const STORAGE_KEY = "portfolio:boot-done"

type LineType = "header" | "ok" | "info" | "blank" | "progress"

interface BootLine {
  text: string
  type: LineType
  delay: number
}

const LINES_PT: BootLine[] = [
  {
    text: "LUCAS/OS v1.0.0  ·  Edição Terminal BIOS",
    type: "header",
    delay: 0,
  },
  { text: "", type: "blank", delay: 180 },
  { text: "Verificando hardware...", type: "info", delay: 360 },
  {
    text: "[  OK  ]  CPU: Motor Full Stack  ·  4+ anos de uptime",
    type: "ok",
    delay: 530,
  },
  {
    text: "[  OK  ]  RAM: Cache de Arquitetura Limpa  ·  16GB",
    type: "ok",
    delay: 670,
  },
  {
    text: "[  OK  ]  GPU: Acelerador Framer Motion  ·  60fps",
    type: "ok",
    delay: 810,
  },
  { text: "", type: "blank", delay: 950 },
  { text: "Carregando módulos do kernel...", type: "info", delay: 1100 },
  { text: "[  OK  ]  react@19.2.6", type: "ok", delay: 1250 },
  { text: "[  OK  ]  typescript@6.0.2", type: "ok", delay: 1370 },
  { text: "[  OK  ]  tailwindcss@4.3.0", type: "ok", delay: 1480 },
  { text: "[  OK  ]  framer-motion@12", type: "ok", delay: 1590 },
  { text: "", type: "blank", delay: 1710 },
  { text: "Iniciando serviços...", type: "info", delay: 1870 },
  { text: "[  OK  ]  portfolio.service", type: "ok", delay: 2020 },
  { text: "[  OK  ]  theme.service  →  midnight", type: "ok", delay: 2140 },
  {
    text: "[  OK  ]  i18n.service  →  pt / en / es / fr",
    type: "ok",
    delay: 2260,
  },
  { text: "", type: "blank", delay: 2380 },
  { text: "████████████████████  100%", type: "progress", delay: 2530 },
  { text: "", type: "blank", delay: 2680 },
  {
    text: "Bem-vindo, visitante. Tenha uma boa sessão.",
    type: "header",
    delay: 2850,
  },
]

const LINES_EN: BootLine[] = [
  {
    text: "LUCAS/OS v1.0.0  ·  BIOS Terminal Edition",
    type: "header",
    delay: 0,
  },
  { text: "", type: "blank", delay: 180 },
  { text: "Checking hardware...", type: "info", delay: 360 },
  {
    text: "[  OK  ]  CPU: Full Stack Engine  ·  4+ years uptime",
    type: "ok",
    delay: 530,
  },
  {
    text: "[  OK  ]  RAM: Clean Architecture Cache  ·  16GB",
    type: "ok",
    delay: 670,
  },
  {
    text: "[  OK  ]  GPU: Framer Motion Accelerator  ·  60fps",
    type: "ok",
    delay: 810,
  },
  { text: "", type: "blank", delay: 950 },
  { text: "Loading kernel modules...", type: "info", delay: 1100 },
  { text: "[  OK  ]  react@19.2.6", type: "ok", delay: 1250 },
  { text: "[  OK  ]  typescript@6.0.2", type: "ok", delay: 1370 },
  { text: "[  OK  ]  tailwindcss@4.3.0", type: "ok", delay: 1480 },
  { text: "[  OK  ]  framer-motion@12", type: "ok", delay: 1590 },
  { text: "", type: "blank", delay: 1710 },
  { text: "Starting services...", type: "info", delay: 1870 },
  { text: "[  OK  ]  portfolio.service", type: "ok", delay: 2020 },
  { text: "[  OK  ]  theme.service  →  midnight", type: "ok", delay: 2140 },
  {
    text: "[  OK  ]  i18n.service  →  pt / en / es / fr",
    type: "ok",
    delay: 2260,
  },
  { text: "", type: "blank", delay: 2380 },
  { text: "████████████████████  100%", type: "progress", delay: 2530 },
  { text: "", type: "blank", delay: 2680 },
  {
    text: "Welcome, visitor. Have a good session.",
    type: "header",
    delay: 2850,
  },
]

const LINES_ES: BootLine[] = [
  {
    text: "LUCAS/OS v1.0.0  ·  Edición Terminal BIOS",
    type: "header",
    delay: 0,
  },
  { text: "", type: "blank", delay: 180 },
  { text: "Verificando hardware...", type: "info", delay: 360 },
  {
    text: "[  OK  ]  CPU: Motor Full Stack  ·  4+ años de uptime",
    type: "ok",
    delay: 530,
  },
  {
    text: "[  OK  ]  RAM: Caché de Arquitectura Limpia  ·  16GB",
    type: "ok",
    delay: 670,
  },
  {
    text: "[  OK  ]  GPU: Acelerador Framer Motion  ·  60fps",
    type: "ok",
    delay: 810,
  },
  { text: "", type: "blank", delay: 950 },
  { text: "Cargando módulos del kernel...", type: "info", delay: 1100 },
  { text: "[  OK  ]  react@19.2.6", type: "ok", delay: 1250 },
  { text: "[  OK  ]  typescript@6.0.2", type: "ok", delay: 1370 },
  { text: "[  OK  ]  tailwindcss@4.3.0", type: "ok", delay: 1480 },
  { text: "[  OK  ]  framer-motion@12", type: "ok", delay: 1590 },
  { text: "", type: "blank", delay: 1710 },
  { text: "Iniciando servicios...", type: "info", delay: 1870 },
  { text: "[  OK  ]  portfolio.service", type: "ok", delay: 2020 },
  { text: "[  OK  ]  theme.service  →  midnight", type: "ok", delay: 2140 },
  {
    text: "[  OK  ]  i18n.service  →  pt / en / es / fr",
    type: "ok",
    delay: 2260,
  },
  { text: "", type: "blank", delay: 2380 },
  { text: "████████████████████  100%", type: "progress", delay: 2530 },
  { text: "", type: "blank", delay: 2680 },
  {
    text: "Bienvenido, visitante. Que tengas una buena sesión.",
    type: "header",
    delay: 2850,
  },
]

const LINES_FR: BootLine[] = [
  {
    text: "LUCAS/OS v1.0.0  ·  Édition Terminal BIOS",
    type: "header",
    delay: 0,
  },
  { text: "", type: "blank", delay: 180 },
  { text: "Vérification du matériel...", type: "info", delay: 360 },
  {
    text: "[  OK  ]  CPU: Moteur Full Stack  ·  4+ ans d'uptime",
    type: "ok",
    delay: 530,
  },
  {
    text: "[  OK  ]  RAM: Cache Architecture Propre  ·  16GB",
    type: "ok",
    delay: 670,
  },
  {
    text: "[  OK  ]  GPU: Accélérateur Framer Motion  ·  60fps",
    type: "ok",
    delay: 810,
  },
  { text: "", type: "blank", delay: 950 },
  { text: "Chargement des modules du noyau...", type: "info", delay: 1100 },
  { text: "[  OK  ]  react@19.2.6", type: "ok", delay: 1250 },
  { text: "[  OK  ]  typescript@6.0.2", type: "ok", delay: 1370 },
  { text: "[  OK  ]  tailwindcss@4.3.0", type: "ok", delay: 1480 },
  { text: "[  OK  ]  framer-motion@12", type: "ok", delay: 1590 },
  { text: "", type: "blank", delay: 1710 },
  { text: "Démarrage des services...", type: "info", delay: 1870 },
  { text: "[  OK  ]  portfolio.service", type: "ok", delay: 2020 },
  { text: "[  OK  ]  theme.service  →  midnight", type: "ok", delay: 2140 },
  {
    text: "[  OK  ]  i18n.service  →  pt / en / es / fr",
    type: "ok",
    delay: 2260,
  },
  { text: "", type: "blank", delay: 2380 },
  { text: "████████████████████  100%", type: "progress", delay: 2530 },
  { text: "", type: "blank", delay: 2680 },
  { text: "Bienvenue, visiteur. Bonne session.", type: "header", delay: 2850 },
]

const BOOT_LINES: Record<Language, BootLine[]> = {
  pt: LINES_PT,
  en: LINES_EN,
  es: LINES_ES,
  fr: LINES_FR,
}

const SKIP_LABEL: Record<Language, string> = {
  pt: "pressione qualquer tecla para pular",
  en: "press any key to skip",
  es: "presiona cualquier tecla para omitir",
  fr: "appuyez sur n'importe quelle touche pour passer",
}

export function shouldShowBoot() {
  return !sessionStorage.getItem(STORAGE_KEY)
}

export function BootSequence({ onDone }: { onDone: () => void }) {
  const { language } = useLanguage()
  const LINES = BOOT_LINES[language]
  const skipLabel = SKIP_LABEL[language]

  const [visibleCount, setVisibleCount] = useState(0)
  const [fading, setFading] = useState(false)
  const dismissed = useRef(false)

  const dismiss = useCallback(() => {
    if (dismissed.current) return
    dismissed.current = true
    setFading(true)
    sessionStorage.setItem(STORAGE_KEY, "1")
    setTimeout(onDone, 500)
  }, [onDone])

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    )
    const last = LINES[LINES.length - 1].delay
    const autoClose = setTimeout(dismiss, last + 800)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(autoClose)
    }
  }, [dismiss, LINES])

  useEffect(() => {
    window.addEventListener("keydown", dismiss)
    return () => window.removeEventListener("keydown", dismiss)
  }, [dismiss])

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-(--bg) px-5 py-8 font-mono text-[11px] sm:px-16 sm:py-14 sm:text-[12px]"
      onClick={dismiss}
    >
      {/* Logo */}
      <div className="mb-4 self-end" style={{ color: "var(--accent)" }}>
        ◈ lucas@portfolio
      </div>

      {/* Lines */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="leading-5 whitespace-nowrap"
          >
            {line.type === "header" && (
              <span style={{ color: "var(--accent)" }}>{line.text}</span>
            )}
            {line.type === "ok" && (
              <span>
                <span style={{ color: "var(--success)" }}>[ OK ]</span>
                <span className="text-(--muted)">
                  {line.text.replace("[  OK  ]", "")}
                </span>
              </span>
            )}
            {line.type === "info" && (
              <span className="text-(--muted)">{line.text}</span>
            )}
            {line.type === "progress" && (
              <span style={{ color: "var(--accent)" }}>{line.text}</span>
            )}
            {line.type === "blank" && <span>&nbsp;</span>}
          </motion.div>
        ))}

        {visibleCount > 0 && visibleCount < LINES.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="inline-block h-3.5 w-1.5 rounded-sm"
            style={{ background: "var(--accent)" }}
          />
        )}
      </div>

      {/* Skip */}
      <p className="mt-4 self-end text-[10px] text-(--muted)">{skipLabel}</p>
    </motion.div>
  )
}
