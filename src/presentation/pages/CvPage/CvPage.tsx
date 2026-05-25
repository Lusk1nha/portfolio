import { useMemo, useRef } from "react"
import { motion } from "framer-motion"
import {
  PrinterIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  WrenchIcon,
  TranslateIcon,
  UserIcon,
} from "@phosphor-icons/react"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import { getYearsLabel } from "@/domain/value-objects/YearsOfExperience"
import { EXPERIENCES } from "@/infrastructure/data/experiences.data"
import { STACK_ITEMS } from "@/infrastructure/data/stack.data"
import type { StackGroup } from "@/domain/entities/StackItem"

// ============================================================================
// 1. CONSTANTES E UTILITÁRIOS
// ============================================================================

const STACK_GROUP_ORDER: StackGroup[] = [
  "frontend",
  "backend",
  "cloud",
  "ai",
  "architecture",
  "tools",
]

function formatPeriod(
  startDate: string,
  endDate: string | null,
  presentLabel: string
): string {
  const fmt = (d: string) => {
    const [year, month] = d.split("-")
    return `${month}/${year}`
  }
  return `${fmt(startDate)} — ${endDate ? fmt(endDate) : presentLabel}`
}

function useGroupedStack() {
  return useMemo(() => {
    return STACK_GROUP_ORDER.reduce<Record<string, string[]>>((acc, group) => {
      const items = STACK_ITEMS.filter((s) => s.group === group).map(
        (s) => s.name
      )
      if (items.length) acc[group] = items
      return acc
    }, {})
  }, [])
}

// ============================================================================
// 2. SUB-COMPONENTES
// ============================================================================

function CvSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8 print:mb-6 print:break-inside-avoid-page">
      <div className="mb-4 flex items-center gap-2 border-b border-(--border) pb-2 print:mb-3">
        <Icon size={14} style={{ color: "var(--accent)" }} />
        <h2 className="text-[11px] font-semibold tracking-widest text-(--muted) uppercase">
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

function ExperienceItem({ exp, language, presentLabel }: any) {
  return (
    <div className="group print:break-inside-avoid">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-0.5">
        <div>
          <h3 className="text-sm font-semibold text-(--fg)">
            {exp.role[language]}
          </h3>
          <p
            className="text-[12px] font-medium"
            style={{ color: "var(--accent)" }}
          >
            {exp.company}
            <span className="ml-2 font-normal text-(--muted)">
              · {exp.location[language]} · {exp.modality[language]}
            </span>
          </p>
        </div>
        <span className="shrink-0 text-[11px] text-(--muted)">
          {formatPeriod(exp.startDate, exp.endDate, presentLabel)}
        </span>
      </div>

      <p className="mt-2 text-[12px] leading-relaxed text-(--muted)">
        {exp.description[language]}
      </p>

      <ul className="mt-2 space-y-1">
        {exp.highlights[language].map((highlight: string, index: number) => (
          <li key={index} className="flex gap-2 text-[11px] text-(--muted)">
            <span
              className="mt-0.5 shrink-0"
              style={{ color: "var(--accent)" }}
            >
              ▸
            </span>
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {exp.stack.map((tech: string) => (
          <span
            key={tech}
            className="rounded-sm border border-(--accent)/20 bg-(--accent)/5 px-1.5 py-0.5 text-[10px] print:border-(--muted) print:bg-transparent"
            style={{ color: "var(--accent)" }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// 3. COMPONENTE PRINCIPAL
// ============================================================================

export function CvPage() {
  const { t, language } = useLanguage()
  const yearsLabel = getYearsLabel(language)
  const printRef = useRef<HTMLDivElement>(null)
  const groupedStack = useGroupedStack()

  const groupLabels: Record<StackGroup, string> = {
    frontend: t.stack.groups.frontend,
    backend: t.stack.groups.backend,
    cloud: t.stack.groups.cloud,
    ai: t.stack.groups.ai,
    architecture: t.stack.groups.architecture,
    tools: t.stack.groups.tools,
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6">
      {/* Botão de impressão */}
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between print:hidden">
        <p className="text-[11px] text-(--muted)">{t.cv.subtitle}</p>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-sm border border-(--border) bg-(--surface) px-3 py-1.5 text-[11px] text-(--muted) transition-all hover:border-(--accent)/50 hover:text-(--fg)"
        >
          <PrinterIcon size={13} />
          {t.cv.print}
        </button>
      </div>

      {/* Corpo do CV */}
      <motion.div
        ref={printRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl rounded-sm border border-(--border) bg-(--surface) p-8 shadow-lg print:border-none print:p-0 print:shadow-none"
      >
        {/* Cabeçalho */}
        <div className="mb-8 border-b border-(--border) pb-6 print:mb-6">
          <div
            className="mb-4 h-0.5 w-12"
            style={{ background: "var(--accent)" }}
          />
          <h1 className="text-2xl font-bold text-(--fg)">
            Lucas Pedro da Hora
          </h1>
          <p
            className="mt-1 text-base font-medium"
            style={{ color: "var(--accent)" }}
          >
            Full Stack Developer
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-(--muted)">
            <a
              href="mailto:lucaspedro517@gmail.com"
              className="flex items-center gap-1.5 hover:text-(--fg)"
            >
              <EnvelopeSimpleIcon size={12} /> lucaspedro517@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/olucaspedro"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-(--fg)"
            >
              <LinkedinLogoIcon size={12} /> /in/olucaspedro
            </a>
            <a
              href="https://github.com/Lusk1nha"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-(--fg)"
            >
              <GithubLogoIcon size={12} /> @Lusk1nha
            </a>
            <span className="flex items-center gap-1.5">
              <MapPinIcon size={12} /> São Paulo, SP
            </span>
          </div>
        </div>

        {/* Resumo */}
        <CvSection icon={UserIcon} title={t.cv.summary.title}>
          <p className="text-sm leading-relaxed text-(--muted)">
            {t.cv.summary.text.replace("{years}", yearsLabel)}
          </p>
        </CvSection>

        {/* Experiências */}
        <CvSection icon={BriefcaseIcon} title={t.cv.experience.title}>
          <div className="space-y-6 print:space-y-4">
            {EXPERIENCES.map((exp) => (
              <ExperienceItem
                key={exp.id}
                exp={exp}
                language={language}
                presentLabel={t.experience.present}
              />
            ))}
          </div>
        </CvSection>

        {/* Educação */}
        <CvSection icon={GraduationCapIcon} title={t.cv.education.title}>
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-0.5 print:break-inside-avoid">
            <div>
              <h3 className="text-sm font-semibold text-(--fg)">
                {t.cv.education.degree}
              </h3>
              <p className="text-[12px] text-(--muted)">
                {t.cv.education.institution}
              </p>
            </div>
            <span className="shrink-0 text-[11px] text-(--muted)">
              {t.cv.education.period}
            </span>
          </div>
        </CvSection>

        {/* Skills */}
        <CvSection icon={WrenchIcon} title={t.cv.skills.title}>
          <div className="space-y-3">
            {STACK_GROUP_ORDER.filter((g) => groupedStack[g]).map((group) => (
              <div key={group} className="flex gap-3 print:break-inside-avoid">
                <span className="w-28 shrink-0 text-[11px] font-medium text-(--muted)">
                  {groupLabels[group]}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {groupedStack[group].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-(--border) bg-(--surface-2) px-1.5 py-0.5 text-[10px] text-(--fg) print:bg-transparent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CvSection>

        {/* Idiomas */}
        <CvSection icon={TranslateIcon} title={t.cv.languages.title}>
          <div className="space-y-1.5 print:break-inside-avoid">
            <p className="text-[12px] text-(--muted)">
              <span className="font-medium text-(--fg)">
                {t.cv.languages.portuguese.split(" — ")[0]}
              </span>{" "}
              — {t.cv.languages.portuguese.split(" — ")[1]}
            </p>
            <p className="text-[12px] text-(--muted)">
              <span className="font-medium text-(--fg)">
                {t.cv.languages.english.split(" — ")[0]}
              </span>{" "}
              — {t.cv.languages.english.split(" — ")[1]}
            </p>
          </div>
        </CvSection>
      </motion.div>

      {/* Estilos de Impressão (Exatamente como os seus originais + garantias de cor) */}
      <style>{`
        @media print {
          body { 
            background: white !important; 
            color: #111 !important; 
          }
          
          /* Esconde tudo o que tem a classe print:hidden E os componentes do layout global */
          header, footer, .print\\:hidden { 
            display: none !important; 
          }
          
          /* Força a impressora a imprimir a cor dos ícones e blocos de destaque */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          @page { 
            margin: 1.5cm; 
            size: A4; 
          }
        }
      `}</style>
    </div>
  )
}
