import { useState } from "react"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "@/presentation/contexts/ThemeContext"
import { LanguageProvider } from "@/presentation/contexts/LanguageContext"
import { router } from "@/presentation/router"
import {
  BootSequence,
  shouldShowBoot,
} from "@/presentation/components/ui/BootSequence/BootSequence"

import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const [showBoot, setShowBoot] = useState(shouldShowBoot)

  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
          {showBoot && <BootSequence onDone={() => setShowBoot(false)} />}
          <RouterProvider router={router} />
        </LanguageProvider>
      </ThemeProvider>
      <Analytics />
    </>
  )
}
