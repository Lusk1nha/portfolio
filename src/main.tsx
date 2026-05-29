import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/styles/index.css"
import App from "./App"

// Dev console easter egg — visible to anyone who opens DevTools
console.log(
  "%c lucas / portfolio ",
  "background:#3b82f6;color:#fff;font-weight:bold;padding:4px 10px;border-radius:2px;font-family:monospace"
)
console.log(
  "%c Built with React · TypeScript · Framer Motion\n Source: github.com/Lusk1nha/portfolio",
  "color:#64748b;font-size:12px;font-family:monospace"
)
console.log(
  "%c type 'secret' in the terminal to find easter eggs",
  "color:#3b82f6;font-size:11px;font-family:monospace"
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
