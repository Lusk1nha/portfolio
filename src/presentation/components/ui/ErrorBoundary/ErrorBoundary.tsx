import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  // ─── React render errors (components throwing during render) ───────────────
  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  // ─── Runtime errors: event handlers, async callbacks, unhandled throws ─────
  private handleWindowError = (event: ErrorEvent) => {
    event.preventDefault()
    const error =
      event.error instanceof Error ? event.error : new Error(event.message)
    this.setState({ error })
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault()
    const error =
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason ?? "Unhandled promise rejection"))
    this.setState({ error })
  }

  componentDidMount() {
    window.addEventListener("error", this.handleWindowError)
    window.addEventListener("unhandledrejection", this.handleUnhandledRejection)
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleWindowError)
    window.removeEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    )
  }

  reset = () => {
    this.setState({ error: null })
    window.location.href = "/"
  }

  retry = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <ErrorFallback
          error={error}
          onReset={this.reset}
          onRetry={this.retry}
        />
      )
    }

    return this.props.children
  }
}

function ErrorFallback({
  error,
  onReset,
  onRetry,
}: {
  error: Error
  onReset: () => void
  onRetry: () => void
}) {
  const timestamp = new Date().toISOString()

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg) px-4 py-16 font-mono">
      <div className="w-full max-w-2xl">
        {/* Terminal window */}
        <div className="rounded-sm border border-(--border) bg-(--surface)">
          {/* Chrome */}
          <div className="flex items-center gap-1.5 border-b border-(--border) bg-(--surface-2) px-3 py-2">
            <span className="size-2.5 rounded-full bg-red-500/70" />
            <span className="size-2.5 rounded-full bg-yellow-500/70" />
            <span className="size-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-[10px] text-(--muted)">
              bash — KERNEL PANIC
            </span>
          </div>

          {/* Output */}
          <div className="space-y-1 p-5 text-[12px]">
            <p style={{ color: "var(--destructive)" }}>
              [CRITICAL] Unhandled exception in lucas-portfolio.service
            </p>
            <p style={{ color: "var(--destructive)" }}>
              [CRITICAL] Process terminated with signal SIGSEGV
            </p>
            <p className="text-(--muted)">&nbsp;</p>

            <p className="text-(--muted)">
              <span style={{ color: "var(--accent)" }}>$</span> cat
              /var/log/portfolio/error.log
            </p>
            <p className="text-(--muted)">&nbsp;</p>

            {/* Error block */}
            <div className="rounded-sm border border-(--destructive)/30 bg-(--destructive)/5 p-3">
              <p style={{ color: "var(--destructive)" }}>
                {error.name}: {error.message}
              </p>
              {error.stack && (
                <div className="mt-2 space-y-0.5 text-(--muted) opacity-70">
                  {error.stack
                    .split("\n")
                    .slice(1, 5)
                    .map((line, i) => (
                      <p key={i} className="truncate">
                        {line.trim()}
                      </p>
                    ))}
                </div>
              )}
            </div>

            <p className="text-(--muted)">&nbsp;</p>
            <p className="text-(--muted)">
              <span style={{ color: "var(--accent)" }}>timestamp</span>
              &nbsp;&nbsp;{timestamp}
            </p>
            <p className="text-(--muted)">
              <span style={{ color: "var(--accent)" }}>url</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {window.location.pathname}
            </p>
            <p className="text-(--muted)">&nbsp;</p>

            <p style={{ color: "var(--accent)" }}>
              $ systemctl restart portfolio.service
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 border-t border-(--border) px-5 py-4">
            <button
              onClick={onRetry}
              className="rounded-sm border border-(--accent)/40 bg-(--accent)/10 px-4 py-1.5 text-[12px] text-(--accent) transition-colors hover:bg-(--accent)/20"
            >
              ↺ retry
            </button>
            <button
              onClick={onReset}
              className="rounded-sm border border-(--border) px-4 py-1.5 text-[12px] text-(--muted) transition-colors hover:border-(--accent)/40 hover:text-(--accent)"
            >
              ← back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
