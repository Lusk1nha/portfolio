import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "@/presentation/contexts/ThemeContext"
import { LanguageProvider } from "@/presentation/contexts/LanguageContext"
import { router } from "@/presentation/router"

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  )
}
