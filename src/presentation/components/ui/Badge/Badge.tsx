import { type HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'muted'
  pulse?: boolean
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'border-[var(--border)] bg-[var(--surface)] text-[var(--fg)]',
  accent: 'border-[var(--accent)]/30 bg-[var(--accent)]/8 text-[var(--accent)]',
  success: 'border-[var(--success)]/30 bg-[var(--success)]/8 text-[var(--success)]',
  warning: 'border-[var(--warning)]/30 bg-[var(--warning)]/8 text-[var(--warning)]',
  muted: 'border-[var(--border)] bg-transparent text-[var(--muted)]',
}

export function Badge({ variant = 'default', pulse, children, className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-medium tracking-wide backdrop-blur-sm ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {pulse && (
        <span className="relative flex size-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <span
            className="relative inline-flex size-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </span>
      )}
      {children}
    </span>
  )
}
