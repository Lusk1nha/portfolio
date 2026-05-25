import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/presentation/components/ui/Button/Button"

export function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <div className="rounded-sm border border-(--border) bg-(--surface) p-6 font-mono">
          {/* Chrome */}
          <div className="mb-5 flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/70" />
            <span className="size-2.5 rounded-full bg-yellow-500/70" />
            <span className="size-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-[10px] text-(--muted)">bash — 404</span>
          </div>

          {/* Terminal output */}
          <div className="space-y-1.5 text-[12px]">
            <p className="text-(--muted)">
              <span style={{ color: "var(--accent)" }}>$</span> cd {pathname}
            </p>
            <p style={{ color: "var(--destructive)" }}>
              bash: cd: {pathname}: No such file or directory
            </p>
            <p className="text-(--muted)">
              <span style={{ color: "var(--accent)" }}>$</span> ls ~/pages
            </p>
            <p style={{ color: "var(--accent)" }}>
              home/&nbsp;&nbsp;projects/&nbsp;&nbsp;experience/&nbsp;&nbsp;stack/&nbsp;&nbsp;contact/&nbsp;&nbsp;cv/
            </p>
            <p className="flex items-center gap-1.5 text-(--muted)">
              <span style={{ color: "var(--accent)" }}>$</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block h-3.5 w-1.5 rounded-sm"
                style={{ background: "var(--accent)" }}
              />
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/">
              <Button variant="default" size="md">
                ← back to home
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="md">
                ls ~/projects
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
