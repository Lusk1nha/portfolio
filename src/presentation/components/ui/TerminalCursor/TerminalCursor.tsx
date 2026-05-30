import { useEffect, useRef, useState } from "react"

const INTERACTIVE =
  'a, button, input, textarea, select, label, [role="button"], [role="link"]'

export function TerminalCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only on precise pointer devices (mouse/trackpad), not touch
    if (!window.matchMedia("(pointer: fine)").matches) return

    const onMove = (e: MouseEvent) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
        const el = e.target as HTMLElement | null
        setIsPointer(el?.closest(INTERACTIVE) !== null)
      })
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden
      className={`terminal-cursor${isPointer ? "terminal-cursor--pointer" : ""}`}
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? undefined : 0,
      }}
    />
  )
}
