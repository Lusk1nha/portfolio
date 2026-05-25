import { motion } from "framer-motion"

interface TerminalLine {
  text: string
  type?: "command" | "output" | "comment"
}

interface TerminalWindowProps {
  title?: string
  lines: TerminalLine[]
  className?: string
}

const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.3 },
  }),
}

function LineContent({ line }: { line: TerminalLine }) {
  if (line.type === "command") {
    return (
      <span>
        <span style={{ color: "var(--accent)" }}>$ </span>
        <span style={{ color: "var(--fg)" }}>{line.text}</span>
      </span>
    )
  }
  if (line.type === "comment") {
    return <span style={{ color: "var(--muted)" }}># {line.text}</span>
  }
  return (
    <span>
      <span style={{ color: "var(--success)" }}>▶ </span>
      <span style={{ color: "var(--fg)" }}>{line.text}</span>
    </span>
  )
}

export function TerminalWindow({
  title = "terminal",
  lines,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-sm border border-(--border) bg-(--surface) font-mono text-sm ${className}`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-(--border) px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-(--muted)">{title}</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1 p-4 text-[12px] leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <LineContent line={line} />
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: "var(--accent)" }}
        >
          ▋
        </motion.span>
      </div>
    </div>
  )
}
