import { type HTMLAttributes } from "react"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "warning" | "muted"
  pulse?: boolean
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-(--border) bg-(--surface) text-(--fg)",
  accent: "border-(--accent)/30 bg-(--accent)/8 text-(--accent)",
  success: "border-(--success)/30 bg-(--success)/8 text-(--success)",
  warning: "border-(--warning)/30 bg-(--warning)/8 text-(--warning)",
  muted: "border-(--border) bg-transparent text-(--muted)",
}

export function Badge({
  variant = "default",
  pulse,
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-medium tracking-wide backdrop-blur-sm ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {pulse && (
        <span className="relative flex size-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span
            className="relative inline-flex size-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </span>
      )}
      {children}
    </span>
  )
}
