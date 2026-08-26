import { lazy, Suspense } from "react"
import { AppLayout } from "@/presentation/components/layout/AppLayout/AppLayout"
import { PageLoader } from "@/presentation/components/ui/PageLoader/PageLoader"
import { ErrorPage } from "@/presentation/pages/ErrorPage/ErrorPage"

const HomePage = lazy(() =>
  import("@/presentation/pages/HomePage/HomePage").then((m) => ({
    default: m.HomePage,
  }))
)
const ProjectsPage = lazy(() =>
  import("@/presentation/pages/ProjectsPage/ProjectsPage").then((m) => ({
    default: m.ProjectsPage,
  }))
)
const ExperiencePage = lazy(() =>
  import("@/presentation/pages/ExperiencePage/ExperiencePage").then((m) => ({
    default: m.ExperiencePage,
  }))
)
const StackPage = lazy(() =>
  import("@/presentation/pages/StackPage/StackPage").then((m) => ({
    default: m.StackPage,
  }))
)
const ClientsPage = lazy(() =>
  import("@/presentation/pages/ClientsPage/ClientsPage").then((m) => ({
    default: m.ClientsPage,
  }))
)
const ContactPage = lazy(() =>
  import("@/presentation/pages/ContactPage/ContactPage").then((m) => ({
    default: m.ContactPage,
  }))
)
const CvPage = lazy(() =>
  import("@/presentation/pages/CvPage/CvPage").then((m) => ({
    default: m.CvPage,
  }))
)
const NotFoundPage = lazy(() =>
  import("@/presentation/pages/NotFoundPage/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  }))
)

function page(Component: React.LazyExoticComponent<() => React.ReactElement>) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: page(HomePage), errorElement: <ErrorPage /> },
      {
        path: "projects",
        element: page(ProjectsPage),
        errorElement: <ErrorPage />,
      },
      {
        path: "experience",
        element: page(ExperiencePage),
        errorElement: <ErrorPage />,
      },
      { path: "stack", element: page(StackPage), errorElement: <ErrorPage /> },
      {
        path: "clients",
        element: page(ClientsPage),
        errorElement: <ErrorPage />,
      },
      {
        path: "contact",
        element: page(ContactPage),
        errorElement: <ErrorPage />,
      },
      { path: "cv", element: page(CvPage), errorElement: <ErrorPage /> },
      { path: "*", element: page(NotFoundPage) },
    ],
  },
]
