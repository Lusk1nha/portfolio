import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getYearsLabel } from '@/domain/value-objects/YearsOfExperience'

type LineType = 'command' | 'output' | 'accent' | 'error' | 'blank'

interface TermLine {
  id: number
  type: LineType
  content: string
}

let _id = 0
const uid = () => ++_id

const INITIAL_LINES: TermLine[] = [
  { id: uid(), type: 'accent', content: 'lucas-portfolio v1.0.0' },
  { id: uid(), type: 'output', content: "type 'help' to see available commands" },
  { id: uid(), type: 'blank', content: '' },
]

const HELP_LINES = [
  '  help         — show this message',
  '  whoami       — about this person',
  '  skills       — technical stack',
  '  contact      — contact information',
  '  projects     — go to /projects',
  '  experience   — go to /experience',
  '  stack        — go to /stack',
  '  cv           — go to /cv',
  '  ls           — list pages',
  '  clear        — clear terminal',
]

const ALL_COMMANDS = [
  'help', 'whoami', 'skills', 'contact',
  'projects', 'experience', 'stack', 'cv',
  'ls', 'clear', 'home',
]

export function InteractiveTerminal() {
  const navigate = useNavigate()
  const years = getYearsLabel('en')
  const [lines, setLines] = useState<TermLine[]>(INITIAL_LINES)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [tabState, setTabState] = useState<{ matches: string[]; idx: number } | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const push = useCallback((...newLines: Omit<TermLine, 'id'>[]) => {
    setLines((prev) => [...prev, ...newLines.map((l) => ({ ...l, id: uid() }))])
  }, [])

  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      if (!cmd) return

      push({ type: 'command', content: `$ ${raw}` })
      setCmdHistory((h) => [raw, ...h])
      setHistoryIdx(-1)

      switch (cmd) {
        case 'help':
        case '?':
          push({ type: 'blank', content: '' })
          HELP_LINES.forEach((l) => push({ type: 'output', content: l }))
          push({ type: 'blank', content: '' })
          break

        case 'whoami':
          push(
            { type: 'blank', content: '' },
            { type: 'accent', content: '  Lucas Pedro da Hora' },
            { type: 'output', content: '  Full Stack Developer' },
            { type: 'output', content: `  ${years} of experience` },
            { type: 'output', content: '  São Paulo, SP · Hybrid / Remote' },
            { type: 'output', content: '  React · Node.js · Rust · TypeScript' },
            { type: 'blank', content: '' },
          )
          break

        case 'skills':
          push(
            { type: 'blank', content: '' },
            { type: 'output', content: '  frontend    React · Next.js · TypeScript · Tailwind' },
            { type: 'output', content: '  backend     Nest.js · Node.js · FastAPI · Rust' },
            { type: 'output', content: '  cloud       GCP · Docker · RabbitMQ · PostgreSQL' },
            { type: 'output', content: '  ai          GPT-4 · Azure OpenAI · Embeddings' },
            { type: 'output', content: '  arch        DDD · Clean Arch · SOLID · Microservices' },
            { type: 'blank', content: '' },
          )
          break

        case 'contact':
          push(
            { type: 'blank', content: '' },
            { type: 'output', content: '  email      lucaspedro517@gmail.com' },
            { type: 'output', content: '  linkedin   /in/olucaspedro' },
            { type: 'output', content: '  github     @Lusk1nha' },
            { type: 'blank', content: '' },
          )
          break

        case 'ls':
        case 'ls -la':
          push(
            { type: 'blank', content: '' },
            { type: 'accent', content: '  home/  projects/  experience/  stack/  contact/  cv/' },
            { type: 'blank', content: '' },
          )
          break

        case 'projects':
        case 'cd projects':
        case 'cd /projects':
          push({ type: 'accent', content: '  → navigating to /projects...' })
          setTimeout(() => navigate('/projects'), 600)
          break

        case 'experience':
        case 'exp':
        case 'cd experience':
          push({ type: 'accent', content: '  → navigating to /experience...' })
          setTimeout(() => navigate('/experience'), 600)
          break

        case 'stack':
        case 'cd stack':
          push({ type: 'accent', content: '  → navigating to /stack...' })
          setTimeout(() => navigate('/stack'), 600)
          break

        case 'cv':
        case 'resume':
        case 'cd cv':
          push({ type: 'accent', content: '  → navigating to /cv...' })
          setTimeout(() => navigate('/cv'), 600)
          break

        case 'home':
        case 'cd home':
        case 'cd /':
          push({ type: 'accent', content: '  → navigating to home...' })
          setTimeout(() => navigate('/'), 600)
          break

        case 'clear':
        case 'cls':
          setLines(INITIAL_LINES)
          return

        default:
          push(
            { type: 'error', content: `  bash: ${cmd}: command not found` },
            { type: 'output', content: "  type 'help' for available commands" },
            { type: 'blank', content: '' },
          )
      }
    },
    [navigate, push, years],
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      if (tabState) {
        const nextIdx = (tabState.idx + 1) % tabState.matches.length
        setTabState({ ...tabState, idx: nextIdx })
        setInput(tabState.matches[nextIdx])
        return
      }
      const matches = ALL_COMMANDS.filter((c) => c.startsWith(input.toLowerCase()))
      if (matches.length === 0) return
      setInput(matches[0])
      if (matches.length > 1) {
        push(
          { type: 'command', content: `$ ${input}` },
          { type: 'accent', content: '  ' + matches.join('   ') },
          { type: 'blank', content: '' },
        )
        setTabState({ matches, idx: 0 })
      }
      return
    }

    setTabState(null)

    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  const lineClass: Record<LineType, string> = {
    command: 'text-(--fg)',
    output: 'text-(--muted)',
    error: '',
    accent: '',
    blank: '',
  }

  return (
    <div
      className="flex cursor-text flex-col overflow-hidden rounded-sm border border-(--border) bg-(--surface) font-mono text-[12px]"
      style={{ height: '380px' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Chrome */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-(--border) bg-(--surface-2) px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] text-(--muted)">lucas@portfolio:~</span>
      </div>

      {/* Output */}
      <div ref={outputRef} className="flex-1 space-y-0.5 overflow-y-auto p-3">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              className={`leading-5 ${lineClass[line.type]}`}
            >
              {line.type === 'accent' && (
                <span style={{ color: 'var(--accent)' }}>{line.content}</span>
              )}
              {line.type === 'error' && (
                <span style={{ color: 'var(--destructive)' }}>{line.content}</span>
              )}
              {(line.type === 'command' || line.type === 'output' || line.type === 'blank') &&
                line.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="flex shrink-0 items-center gap-2 border-t border-(--border) px-3 py-2">
        <span style={{ color: 'var(--accent)' }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setTabState(null) }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-(--fg) outline-none placeholder:text-(--muted)/40"
          style={{ caretColor: 'var(--accent)' }}
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
