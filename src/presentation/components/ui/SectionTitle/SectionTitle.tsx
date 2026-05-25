import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${className}`}
    >
      {subtitle && (
        <p className="mb-1 text-[11px] text-(--muted)">{subtitle}</p>
      )}
      <h2 className="text-2xl font-bold text-(--fg)">
        <span style={{ color: 'var(--accent)' }}>#</span> {title}
      </h2>
      <div
        className="mt-3 h-px w-16"
        style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
      />
    </motion.div>
  )
}
