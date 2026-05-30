import { Outlet } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"

export function AppLayout() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
