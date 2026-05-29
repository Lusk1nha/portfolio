import { useState, useRef, useEffect, useCallback } from "react"
import { useNavigate, type NavigateFunction } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { getYearsLabel } from "@/domain/value-objects/YearsOfExperience"

// ============================================================================
// 1. TIPOS E UTILITÁRIOS (Domain)
// ============================================================================

export type LineType = "command" | "output" | "accent" | "error" | "blank"

export interface TermLine {
  id: string
  type: LineType
  content: string
}

// Usar crypto.randomUUID() previne bugs de id em re-renders ou StrictMode
const uid = () => crypto.randomUUID()

const INITIAL_LINES: TermLine[] = [
  { id: uid(), type: "accent", content: "lucas-portfolio v1.0.0" },
  {
    id: uid(),
    type: "output",
    content: "type 'help' to see available commands",
  },
  { id: uid(), type: "blank", content: "" },
]

// ============================================================================
// 2. PADRÃO STRATEGY: LÓGICA DE COMANDOS (Open/Closed Principle)
// ============================================================================

// Contexto injetado nos comandos para que eles possam interagir com o sistema
interface CommandContext {
  push: (...lines: Omit<TermLine, "id">[]) => void
  clear: () => void
  navigate: NavigateFunction
  years: string
}

// Helper para evitar repetição de código na navegação (DRY)
const navigateTo = (
  ctx: CommandContext,
  path: string,
  label: string = path
) => {
  ctx.push({ type: "accent", content: `  → navigating to ${label}...` })
  setTimeout(() => ctx.navigate(path), 600)
}

// Dicionário de comandos. Adicionar um novo comando é tão simples quanto adicionar uma nova chave aqui.
const COMMAND_REGISTRY: Record<
  string,
  (ctx: CommandContext, args?: string[]) => void
> = {
  help: ({ push }) => {
    push(
      { type: "blank", content: "" },
      { type: "output", content: "  help         — show this message" },
      { type: "output", content: "  whoami       — about this person" },
      { type: "output", content: "  skills       — technical stack" },
      { type: "output", content: "  contact      — contact information" },
      { type: "output", content: "  projects     — go to /projects" },
      { type: "output", content: "  experience   — go to /experience" },
      { type: "output", content: "  stack        — go to /stack" },
      { type: "output", content: "  cv           — go to /cv" },
      { type: "output", content: "  ls           — list pages" },
      { type: "output", content: "  clear        — clear terminal" },
      { type: "output", content: "  ...and a few secrets" },
      { type: "blank", content: "" }
    )
  },
  whoami: ({ push, years }) => {
    push(
      { type: "blank", content: "" },
      { type: "accent", content: "  Lucas Pedro da Hora" },
      { type: "output", content: "  Full Stack Developer" },
      { type: "output", content: `  ${years} of experience` },
      { type: "output", content: "  São Paulo, SP · Hybrid / Remote" },
      { type: "output", content: "  React · Node.js · Rust · TypeScript" },
      { type: "blank", content: "" }
    )
  },
  skills: ({ push }) => {
    push(
      { type: "blank", content: "" },
      {
        type: "output",
        content: "  frontend    React · Next.js · TypeScript · Tailwind",
      },
      {
        type: "output",
        content: "  backend     Nest.js · Node.js · FastAPI · Rust",
      },
      {
        type: "output",
        content: "  cloud       GCP · Docker · RabbitMQ · PostgreSQL",
      },
      {
        type: "output",
        content: "  ai          GPT-4 · Azure OpenAI · Embeddings",
      },
      {
        type: "output",
        content: "  arch        DDD · Clean Arch · SOLID · Microservices",
      },
      { type: "blank", content: "" }
    )
  },
  contact: ({ push }) => {
    push(
      { type: "blank", content: "" },
      { type: "output", content: "  email      lucaspedro517@gmail.com" },
      { type: "output", content: "  linkedin   /in/olucaspedro" },
      { type: "output", content: "  github     @Lusk1nha" },
      { type: "blank", content: "" }
    )
  },
  ls: ({ push }) => {
    push(
      { type: "blank", content: "" },
      {
        type: "accent",
        content: "  home/  projects/  experience/  stack/  contact/  cv/",
      },
      { type: "blank", content: "" }
    )
  },
  clear: ({ clear }) => clear(),

  // Easter eggs
  sudo: ({ push }) => {
    push(
      { type: "blank", content: "" },
      { type: "error", content: "  sudo: Permission denied." },
      { type: "output", content: "  This incident will be reported." },
      { type: "blank", content: "" }
    )
  },

  matrix: ({ push }) => {
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ"
    const rand = () => chars[Math.floor(Math.random() * chars.length)]
    const row = () => Array.from({ length: 11 }, rand).join(" ")
    push(
      { type: "blank", content: "" },
      { type: "accent", content: `  ${row()}` },
      { type: "accent", content: `  ${row()}` },
      { type: "accent", content: `  ${row()}` },
      { type: "accent", content: `  ${row()}` },
      { type: "blank", content: "" },
      { type: "output", content: "  Wake up, Neo..." },
      { type: "blank", content: "" }
    )
  },

  hack: ({ push }) => {
    push(
      { type: "blank", content: "" },
      { type: "accent", content: "  [CONNECTING] target: mainframe..." },
      { type: "output", content: "  Bypassing firewall... [##########] 100%" },
      { type: "output", content: "  Cracking encryption... done" },
      { type: "accent", content: "  [ACCESS GRANTED]" },
      { type: "output", content: "  Just kidding. Clean code > hacking." },
      { type: "blank", content: "" }
    )
  },

  coffee: ({ push }) => {
    push(
      { type: "blank", content: "" },
      { type: "output", content: "       ( (" },
      { type: "output", content: "        ) )" },
      { type: "output", content: "     .........." },
      { type: "output", content: "     |        |]" },
      { type: "output", content: "     \\        /" },
      { type: "output", content: "      `------'" },
      { type: "blank", content: "" },
      { type: "accent", content: "  Fuel loaded. Ready to code." },
      { type: "blank", content: "" }
    )
  },

  fortune: ({ push }) => {
    const quotes = [
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Fowler",
      "First, solve the problem. Then, write the code. — Johnson",
      "Code is like humor. When you have to explain it, it's bad. — House",
      "Simplicity is the soul of efficiency. — Freeman",
      "Make it work, make it right, make it fast. — Beck",
    ]
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    push(
      { type: "blank", content: "" },
      { type: "output", content: `  "${quote}"` },
      { type: "blank", content: "" }
    )
  },

  secret: ({ push }) => {
    push(
      { type: "blank", content: "" },
      { type: "accent", content: "  [ easter eggs ]" },
      { type: "output", content: "  matrix    — enter the matrix" },
      { type: "output", content: "  hack      — i'm in" },
      { type: "output", content: "  coffee    — fuel up" },
      { type: "output", content: "  fortune   — words of wisdom" },
      { type: "output", content: "  sudo      — try rm -rf /" },
      { type: "blank", content: "" }
    )
  },

  // Navegações
  projects: (ctx) => navigateTo(ctx, "/projects"),
  experience: (ctx) => navigateTo(ctx, "/experience"),
  stack: (ctx) => navigateTo(ctx, "/stack"),
  cv: (ctx) => navigateTo(ctx, "/cv"),
  home: (ctx) => navigateTo(ctx, "/", "home"),
}

// Aliases para comandos existentes
const ALIASES: Record<string, string> = {
  "?": "help",
  "ls -la": "ls",
  cls: "clear",
  exp: "experience",
  resume: "cv",
  "cd projects": "projects",
  "cd /projects": "projects",
  "cd experience": "experience",
  "cd stack": "stack",
  "cd cv": "cv",
  "cd home": "home",
  "cd /": "home",
  "sudo rm -rf /": "sudo",
  "sudo rm -rf /*": "sudo",
  "sudo su": "sudo",
  "sudo apt-get": "sudo",
}

const ALL_COMMANDS = Object.keys(COMMAND_REGISTRY)

// ============================================================================
// 3. HOOK CUSTOMIZADO (Single Responsibility Principle)
// ============================================================================

function useTerminal() {
  const navigate = useNavigate()
  const years = getYearsLabel("en")

  const [lines, setLines] = useState<TermLine[]>(INITIAL_LINES)
  const [input, setInput] = useState("")
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [tabState, setTabState] = useState<{
    matches: string[]
    idx: number
  } | null>(null)

  const push = useCallback((...newLines: Omit<TermLine, "id">[]) => {
    setLines((prev) => [...prev, ...newLines.map((l) => ({ ...l, id: uid() }))])
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      if (!cmd) return

      push({ type: "command", content: `$ ${raw}` })
      setCmdHistory((h) => [raw, ...h])
      setHistoryIdx(-1)

      // Resolve aliases (ex: "?" vira "help")
      const resolvedCmd = ALIASES[cmd] || cmd
      const action = COMMAND_REGISTRY[resolvedCmd]

      if (action) {
        const context: CommandContext = { push, clear, navigate, years }
        action(context)
      } else {
        push(
          { type: "error", content: `  bash: ${cmd}: command not found` },
          { type: "output", content: "  type 'help' for available commands" },
          { type: "blank", content: "" }
        )
      }
    },
    [push, clear, navigate, years]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      if (tabState) {
        const nextIdx = (tabState.idx + 1) % tabState.matches.length
        setTabState({ ...tabState, idx: nextIdx })
        setInput(tabState.matches[nextIdx])
        return
      }

      const matches = ALL_COMMANDS.filter((c) =>
        c.startsWith(input.toLowerCase())
      )
      if (matches.length === 0) return

      setInput(matches[0])
      if (matches.length > 1) {
        push(
          { type: "command", content: `$ ${input}` },
          { type: "accent", content: "  " + matches.join("   ") },
          { type: "blank", content: "" }
        )
        setTabState({ matches, idx: 0 })
      }
      return
    }

    setTabState(null)

    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? "" : cmdHistory[next])
    }
  }

  return {
    lines,
    input,
    setInput,
    tabState,
    setTabState,
    handleKeyDown,
  }
}

// ============================================================================
// 4. COMPONENTE VISUAL (Focado apenas em renderizar UI)
// ============================================================================

const LINE_STYLES: Record<LineType, string> = {
  command: "text-(--fg)",
  output: "text-(--muted)",
  error: "text-(--destructive)",
  accent: "text-(--accent)",
  blank: "",
}

export function InteractiveTerminal() {
  const { lines, input, setInput, setTabState, handleKeyDown } = useTerminal()

  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div
      className="flex h-95 cursor-text flex-col overflow-hidden rounded-sm border border-(--border) bg-(--surface) font-mono text-[12px]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header / Chrome */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-(--border) bg-(--surface-2) px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] text-(--muted)">
          lucas@portfolio:~
        </span>
      </div>

      {/* Output */}
      <div ref={outputRef} data-testid="terminal-output" className="flex-1 space-y-0.5 overflow-y-auto p-3">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              className={`leading-5 ${LINE_STYLES[line.type]}`}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="flex shrink-0 items-center gap-2 border-t border-(--border) px-3 py-2">
        <span className="text-(--accent)">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setTabState(null)
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-(--fg) caret-(--accent) outline-none placeholder:text-(--muted)/40"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
