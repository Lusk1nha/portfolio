import { motion } from "framer-motion"
import {
  SealCheckIcon,
  RocketIcon,
  UsersThreeIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react"
import { SectionTitle } from "@/presentation/components/ui/SectionTitle/SectionTitle"
import { useLanguage } from "@/presentation/contexts/LanguageContext"

const PILLAR_ICONS = [SealCheckIcon, RocketIcon, UsersThreeIcon]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export function About() {
  const { t } = useLanguage()
  const pillars = [
    t.about.pillars.quality,
    t.about.pillars.performance,
    t.about.pillars.leadership,
  ]

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t.about.title} subtitle={t.about.subtitle} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {pillars.map(({ title, description }, i) => {
            const Icon = PILLAR_ICONS[i]
            return (
              <motion.div
                key={title}
                variants={cardVariants}
                className="overflow-hidden rounded-sm border border-(--border) bg-(--surface)"
              >
                <div className="h-0.5" style={{ background: "var(--accent)" }} />
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon
                      size={16}
                      className="shrink-0"
                      style={{ color: "var(--accent)" }}
                    />
                    <h3 className="text-[13px] font-semibold text-(--fg)">
                      {title}
                    </h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-(--muted)">
                    {description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 flex items-center gap-2 rounded-sm border border-(--border) bg-(--surface) px-4 py-3 text-[11px] text-(--muted)"
        >
          <GraduationCapIcon
            size={13}
            className="shrink-0"
            style={{ color: "var(--accent)" }}
          />
          {t.about.formation}
        </motion.div>
      </div>
    </section>
  )
}
