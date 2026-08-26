import { motion } from "framer-motion"
import { SectionTitle } from "@/presentation/components/ui/SectionTitle/SectionTitle"
import { Tag } from "@/presentation/components/ui/Tag/Tag"
import { SkillBar } from "@/presentation/components/ui/SkillBar/SkillBar"
import { SkillRadar } from "@/presentation/components/ui/SkillRadar/SkillRadar"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import { StaticStackRepository } from "@/infrastructure/repositories/StaticStackRepository"
import { GetStackGroups } from "@/application/use-cases/GetStackGroups"
import type { StackGroup } from "@/domain/entities/StackItem"

const repository = new StaticStackRepository()
const getStackGroups = new GetStackGroups(repository)

export function StackGrid({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  const groups = getStackGroups.execute()
  const displayed = compact
    ? groups.filter((g) =>
        ["frontend", "backend", "architecture"].includes(g.group)
      )
    : groups
  const topSkills = groups
    .flatMap((g) => g.items)
    .filter((item): item is typeof item & { level: number } =>
      item.level !== undefined
    )
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
  const radarData = groups
    .map((g) => {
      const levels = g.items
        .map((item) => item.level)
        .filter((level): level is number => level !== undefined)
      if (levels.length === 0) return null
      const avg = levels.reduce((sum, l) => sum + l, 0) / levels.length
      return { label: t.stack.groups[g.group], level: Math.round(avg) }
    })
    .filter((entry) => entry !== null)
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t.stack.title} subtitle={t.stack.subtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map(({ group, items }, i) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="overflow-hidden rounded-sm border border-(--border) bg-(--surface)"
            >
              <div className="h-0.5" style={{ background: "var(--accent)" }} />
              <div className="p-4">
                <h3 className="mb-3 text-[11px] font-semibold tracking-widest text-(--muted) uppercase">
                  {t.stack.groups[group as StackGroup]}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <Tag
                      key={item.id}
                      variant={item.featured ? "accent" : "default"}
                    >
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!compact && topSkills.length > 0 && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-sm border border-(--border) bg-(--surface) font-mono"
            >
              <div className="flex items-center gap-2 border-b border-(--border) px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-(--muted)">
                  {t.stack.proficiency}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 p-4">
                {topSkills.map((item) => (
                  <SkillBar
                    key={item.id}
                    name={item.name}
                    level={item.level}
                  />
                ))}
              </div>
            </motion.div>

            {radarData.length >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="overflow-hidden rounded-sm border border-(--border) bg-(--surface) font-mono"
              >
                <div className="flex items-center gap-2 border-b border-(--border) px-4 py-2.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-[11px] text-(--muted)">
                    {t.stack.radar}
                  </span>
                </div>
                <div className="p-2">
                  <SkillRadar data={radarData} />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
