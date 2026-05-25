import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-[var(--accent)] text-[var(--accent-fg)] border border-[var(--accent)] hover:opacity-85',
  outline:
    'bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]',
  ghost:
    'bg-transparent text-[var(--fg)] border border-transparent hover:bg-[var(--surface)] hover:border-[var(--border)]',
  secondary:
    'bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--surface-2)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-[11px]',
  md: 'h-9 px-4 text-xs',
  lg: 'h-11 px-6 text-sm',
}

export function Button({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm font-medium
        transition-all duration-200 active:scale-[0.98]
        focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
        disabled:pointer-events-none disabled:opacity-40
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
