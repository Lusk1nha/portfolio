import { motion } from "framer-motion"

const BAR_LENGTH = 20

interface SkillBarProps {
  name: string
  level: number
}

export function SkillBar({ name, level }: SkillBarProps) {
  const filled = Math.round((level / 100) * BAR_LENGTH)
  const bar = "█".repeat(filled) + "░".repeat(BAR_LENGTH - filled)

  return (
    <div className="flex items-center gap-3 text-[11px] leading-none">
      <span className="w-28 shrink-0 truncate text-(--muted)">{name}</span>
      <div className="relative flex-1 overflow-hidden whitespace-nowrap text-(--border)">
        <span aria-hidden>{bar}</span>
        <motion.span
          className="absolute inset-0 overflow-hidden whitespace-nowrap text-(--accent)"
          initial={{ width: 0 }}
          whileInView={{ width: `${(filled / BAR_LENGTH) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden
        >
          {bar}
        </motion.span>
      </div>
      <span className="w-9 shrink-0 text-right text-(--fg)">{level}%</span>
    </div>
  )
}
