import { type HTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: 'default' | 'accent'
}

export function Tag({ variant = 'default', children, className = '', ...props }: TagProps) {
  const base = 'inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium cursor-default'
  const variants = {
    default: 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]/50',
    accent: 'border-[var(--accent)]/40 bg-[var(--accent)]/8 text-[var(--accent)]',
  }

  return (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  )
}
