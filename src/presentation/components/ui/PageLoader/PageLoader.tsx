import { motion } from "framer-motion"

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Terminal window mini */}
        <div className="rounded-sm border border-(--border) bg-(--surface) px-5 py-4 font-mono text-[12px]">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-500/60" />
            <span className="size-2 rounded-full bg-yellow-500/60" />
            <span className="size-2 rounded-full bg-green-500/60" />
          </div>

          <div className="flex items-center gap-2 text-(--muted)">
            <span style={{ color: "var(--accent)" }}>$</span>
            <span>loading</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="inline-block h-3.5 w-1.5 rounded-sm"
              style={{ background: "var(--accent)" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
