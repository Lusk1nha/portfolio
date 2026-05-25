import { motion } from 'framer-motion'
import { SectionTitle } from '@/presentation/components/ui/SectionTitle/SectionTitle'
import { Tag } from '@/presentation/components/ui/Tag/Tag'
import { useLanguage } from '@/presentation/contexts/LanguageContext'
import { StaticStackRepository } from '@/infrastructure/repositories/StaticStackRepository'
import { GetStackGroups } from '@/application/use-cases/GetStackGroups'
import type { StackGroup } from '@/domain/entities/StackItem'

const repository = new StaticStackRepository()
const getStackGroups = new GetStackGroups(repository)

export function StackGrid({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  const groups = getStackGroups.execute()
  const displayed = compact
    ? groups.filter((g) => ['frontend', 'backend', 'architecture'].includes(g.group))
    : groups

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={t.stack.title} subtitle={t.stack.subtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map(({ group, items }, i) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-sm border border-(--border) bg-(--surface) overflow-hidden"
            >
              <div className="h-0.5" style={{ background: 'var(--accent)' }} />
              <div className="p-4">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-(--muted)">
                  {t.stack.groups[group as StackGroup]}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <Tag key={item.id} variant={item.featured ? 'accent' : 'default'}>
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
