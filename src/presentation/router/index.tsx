import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/presentation/components/layout/AppLayout/AppLayout'

const HomePage = lazy(() => import('@/presentation/pages/HomePage/HomePage').then((m) => ({ default: m.HomePage })))
const ProjectsPage = lazy(() => import('@/presentation/pages/ProjectsPage/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const ExperiencePage = lazy(() => import('@/presentation/pages/ExperiencePage/ExperiencePage').then((m) => ({ default: m.ExperiencePage })))
const StackPage = lazy(() => import('@/presentation/pages/StackPage/StackPage').then((m) => ({ default: m.StackPage })))
const ContactPage = lazy(() => import('@/presentation/pages/ContactPage/ContactPage').then((m) => ({ default: m.ContactPage })))
const CvPage = lazy(() => import('@/presentation/pages/CvPage/CvPage').then((m) => ({ default: m.CvPage })))

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <span className="animate-pulse text-[11px] text-(--muted)">$ loading...</span>
    </div>
  )
}

function page(Component: React.LazyExoticComponent<() => React.ReactElement>) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: page(HomePage) },
      { path: 'projects', element: page(ProjectsPage) },
      { path: 'experience', element: page(ExperiencePage) },
      { path: 'stack', element: page(StackPage) },
      { path: 'contact', element: page(ContactPage) },
      { path: 'cv', element: page(CvPage) },
    ],
  },
])
