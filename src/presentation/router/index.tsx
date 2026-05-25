import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "@/presentation/components/layout/AppLayout/AppLayout"
import { HomePage } from "@/presentation/pages/HomePage/HomePage"
import { ProjectsPage } from "@/presentation/pages/ProjectsPage/ProjectsPage"
import { ExperiencePage } from "@/presentation/pages/ExperiencePage/ExperiencePage"
import { StackPage } from "@/presentation/pages/StackPage/StackPage"
import { ContactPage } from "@/presentation/pages/ContactPage/ContactPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "stack", element: <StackPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
])
