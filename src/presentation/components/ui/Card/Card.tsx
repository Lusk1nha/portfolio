import { type HTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  accentTop?: boolean
  hover?: boolean
}

export function Card({ accentTop = false, hover = false, children, className = '', ...props }: CardProps) {
  const base = 'relative rounded-sm border border-(--border) bg-(--surface) overflow-hidden'

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`${base} ${className}`}
        {...props}
      >
        {accentTop && (
          <div className="h-0.5 w-full" style={{ background: 'var(--accent)' }} />
        )}
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${base} ${className}`} {...props}>
      {accentTop && (
        <div className="h-0.5 w-full" style={{ background: 'var(--accent)' }} />
      )}
      {children}
    </div>
  )
}
