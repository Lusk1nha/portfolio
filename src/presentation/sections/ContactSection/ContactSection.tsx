import { motion } from 'framer-motion'
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'
import { SectionTitle } from '@/presentation/components/ui/SectionTitle/SectionTitle'
import { Button } from '@/presentation/components/ui/Button/Button'
import { Card } from '@/presentation/components/ui/Card/Card'
import { useLanguage } from '@/presentation/contexts/LanguageContext'

const CONTACT_LINKS = [
  {
    key: 'github',
    icon: GithubLogoIcon,
    href: 'https://github.com/Lusk1nha',
    handle: '@Lusk1nha',
    labelKey: 'github_label' as const,
  },
  {
    key: 'linkedin',
    icon: LinkedinLogoIcon,
    href: 'https://www.linkedin.com/in/olucaspedro/',
    handle: '/in/olucaspedro',
    labelKey: 'linkedin_label' as const,
  },
  {
    key: 'email',
    icon: EnvelopeSimpleIcon,
    href: 'mailto:lucaspedro517@gmail.com',
    handle: 'lucaspedro517@gmail.com',
    labelKey: 'email_label' as const,
  },
]

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Card accentTop className="p-6">
            <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
              {t.contact.description}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {CONTACT_LINKS.map(({ key, icon: Icon, href, handle, labelKey }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-3 transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface-hover)]"
                >
                  <Icon
                    size={16}
                    className="flex-shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: undefined }}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] text-[var(--muted)]">{t.contact[labelKey]}</p>
                    <p className="truncate text-[11px] font-medium text-[var(--fg)]">{handle}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6">
              <a href="mailto:lucaspedro517@gmail.com">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  <EnvelopeSimpleIcon size={14} />
                  {t.contact.cta}
                </Button>
              </a>
            </div>
          </Card>

          <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
              {t.contact.open_to}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.contact.opportunities.map((op) => (
                <span
                  key={op}
                  className="rounded-sm border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-2.5 py-1 text-[11px] text-[var(--accent)]"
                >
                  {op}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
