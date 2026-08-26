import { StrictMode } from "react"
import { prerenderToNodeStream } from "react-dom/static"
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom"
import { ThemeProvider } from "@/presentation/contexts/ThemeContext"
import { LanguageProvider } from "@/presentation/contexts/LanguageContext"
import { routes } from "@/presentation/router/routes"
import { lastRenderedSeo } from "@/presentation/hooks/useSeo"

export async function render(url: string) {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`http://localhost${url}`))

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(handler.dataRoutes, context)

  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <StaticRouterProvider router={router} context={context} />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  )

  const chunks: Buffer[] = []
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk))
  const html = Buffer.concat(chunks).toString("utf-8")

  return { html, seo: lastRenderedSeo }
}
