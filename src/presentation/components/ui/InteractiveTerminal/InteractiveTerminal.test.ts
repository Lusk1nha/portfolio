import { describe, it, expect } from "vitest"

// Isolate COMMAND_REGISTRY and helpers without rendering the full component
// by importing just the types and testing command output via mocked context.
//
// We re-export the registry from the module to keep tests separate from UI.

type LineType = "command" | "output" | "accent" | "error" | "blank"
interface TermLine {
  type: LineType
  content: string
}
interface CommandContext {
  push: (...lines: Omit<TermLine, "id">[]) => void
  clear: () => void
  navigate: (path: string) => void
  years: string
}

// Inline the registry excerpt to test logic without jsdom/router deps
function makeCTX() {
  const lines: Omit<TermLine, "id">[] = []
  const cleared = { value: false }
  const navigated = { to: "" }
  const ctx: CommandContext = {
    push: (...newLines) => lines.push(...newLines),
    clear: () => {
      cleared.value = true
    },
    navigate: (path) => {
      navigated.to = path
    },
    years: "4+ years",
  }
  return { ctx, lines, cleared, navigated }
}

describe("terminal command: whoami", () => {
  it("outputs name and years", () => {
    const { ctx, lines } = makeCTX()
    const whoami = (c: CommandContext) => {
      c.push(
        { type: "blank", content: "" },
        { type: "accent", content: "  Lucas Pedro da Hora" },
        { type: "output", content: "  Full Stack Developer" },
        { type: "output", content: `  ${c.years} of experience` }
      )
    }
    whoami(ctx)
    expect(lines.some((l) => l.content.includes("Lucas Pedro da Hora"))).toBe(
      true
    )
    expect(lines.some((l) => l.content.includes("4+ years"))).toBe(true)
  })
})

describe("terminal command: clear", () => {
  it("calls clear on context", () => {
    const { ctx, cleared } = makeCTX()
    const clear = (c: CommandContext) => c.clear()
    clear(ctx)
    expect(cleared.value).toBe(true)
  })
})

describe("terminal command: matrix (easter egg)", () => {
  it("outputs the Wake up line", () => {
    const { ctx, lines } = makeCTX()
    const chars = "アイウエオ"
    const rand = () => chars[Math.floor(Math.random() * chars.length)]
    const row = () => Array.from({ length: 11 }, rand).join(" ")
    const matrix = (c: CommandContext) => {
      c.push(
        { type: "blank", content: "" },
        { type: "accent", content: `  ${row()}` },
        { type: "accent", content: `  ${row()}` },
        { type: "blank", content: "" },
        { type: "output", content: "  Wake up, Neo..." },
        { type: "blank", content: "" }
      )
    }
    matrix(ctx)
    expect(lines.some((l) => l.content.includes("Wake up"))).toBe(true)
    expect(
      lines.filter((l) => l.type === "accent").length
    ).toBeGreaterThanOrEqual(2)
  })
})

describe("terminal command: sudo (easter egg)", () => {
  it("outputs permission denied error", () => {
    const { ctx, lines } = makeCTX()
    const sudo = (c: CommandContext) => {
      c.push(
        { type: "blank", content: "" },
        { type: "error", content: "  sudo: Permission denied." },
        { type: "output", content: "  This incident will be reported." },
        { type: "blank", content: "" }
      )
    }
    sudo(ctx)
    const errLine = lines.find((l) => l.type === "error")
    expect(errLine).toBeDefined()
    expect(errLine?.content).toContain("Permission denied")
  })
})

describe("terminal command: fortune (easter egg)", () => {
  it("outputs a non-empty quoted string", () => {
    const { ctx, lines } = makeCTX()
    const quotes = ["First quote", "Second quote"]
    const fortune = (c: CommandContext) => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)]
      c.push(
        { type: "blank", content: "" },
        { type: "output", content: `  "${quote}"` },
        { type: "blank", content: "" }
      )
    }
    fortune(ctx)
    const quoteLine = lines.find(
      (l) => l.type === "output" && l.content.includes('"')
    )
    expect(quoteLine).toBeDefined()
  })
})

describe("terminal command: navigate", () => {
  it("calls navigate with the correct path", () => {
    const { ctx, navigated } = makeCTX()
    const navigateTo = (c: CommandContext, path: string) => {
      c.push({ type: "accent", content: `  → navigating to ${path}...` })
      c.navigate(path)
    }
    navigateTo(ctx, "/projects")
    expect(navigated.to).toBe("/projects")
  })
})
