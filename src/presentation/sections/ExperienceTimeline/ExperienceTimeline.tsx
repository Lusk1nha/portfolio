import { motion } from "framer-motion"
import { MapPinIcon, CalendarIcon } from "@phosphor-icons/react"
import { SectionTitle } from "@/presentation/components/ui/SectionTitle/SectionTitle"
import { Tag } from "@/presentation/components/ui/Tag/Tag"
import { Badge } from "@/presentation/components/ui/Badge/Badge"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import { StaticExperienceRepository } from "@/infrastructure/repositories/StaticExperienceRepository"
import { GetExperiences } from "@/application/use-cases/GetExperiences"

const repository = new StaticExperienceRepository()
const getExperiences = new GetExperiences(repository)

/* Dot diameter in px — must match the w/h classes below (size-3 = 12px) */
const DOT_SIZE = 12

function formatDate(date: string, lang: string): string {
  const [year, month] = date.split("-")
  const d = new Date(parseInt(year), parseInt(month) - 1)
  return d.toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    month: "short",
    year: "numeric",
  })
}

export function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  const { t, language } = useLanguage()
  const experiences = getExperiences.execute()
  const displayed = compact ? experiences.slice(0, 2) : experiences

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="space-y-6">
          {displayed.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex gap-5"
            >
              {/* ── Left column: line + dot ────────────────────────── */}
              <div
                className="flex flex-col items-center"
                style={{ width: DOT_SIZE }}
              >
                {/* Dot */}
                <div
                  className="z-10 mt-5 size-3 shrink-0 rounded-full border-2 border-(--bg)"
                  style={{ background: "var(--accent)", minHeight: DOT_SIZE }}
                />
                {/* Line below the dot */}
                {i < displayed.length - 1 && (
                  <div
                    className="mt-1 w-px flex-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 20%, transparent))",
                    }}
                  />
                )}
              </div>

              {/* ── Right column: card ────────────────────────────── */}
              <div className="flex-1 pb-2">
                <div className="overflow-hidden rounded-sm border border-(--border) bg-(--surface)">
                  <div
                    className="h-0.5"
                    style={{ background: "var(--accent)" }}
                  />
                  <div className="p-5">
                    {/* Header */}
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[13px] font-semibold text-(--fg)">
                          {exp.role[language]}
                        </h3>
                        <p
                          className="text-[12px] font-medium"
                          style={{ color: "var(--accent)" }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <Badge variant="muted" className="text-[10px]">
                        {t.experience.level[exp.level]}
                      </Badge>
                    </div>

                    {/* Meta */}
                    <div className="mb-4 flex flex-wrap gap-3 text-[11px] text-(--muted)">
                      <span className="flex items-center gap-1">
                        <CalendarIcon size={10} />
                        {formatDate(exp.startDate, language)} —{" "}
                        {exp.endDate
                          ? formatDate(exp.endDate, language)
                          : t.experience.present}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPinIcon size={10} />
                        {exp.location[language]} · {exp.modality[language]}
                      </span>
                    </div>

                    {/* Highlights */}
                    <ul className="mb-4 space-y-1.5">
                      {exp.highlights[language].map((h, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-[11px] text-(--muted)"
                        >
                          <span
                            className="mt-0.5 shrink-0 text-[9px]"
                            style={{ color: "var(--accent)" }}
                          >
                            ▸
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1">
                      {exp.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
