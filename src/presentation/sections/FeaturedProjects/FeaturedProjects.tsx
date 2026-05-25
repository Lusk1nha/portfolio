import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowRightIcon,
  GithubLogoIcon,
  StarIcon,
  GitForkIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react"
import { SectionTitle } from "@/presentation/components/ui/SectionTitle/SectionTitle"
import { Card } from "@/presentation/components/ui/Card/Card"
import { Tag } from "@/presentation/components/ui/Tag/Tag"
import { Badge } from "@/presentation/components/ui/Badge/Badge"
import { Button } from "@/presentation/components/ui/Button/Button"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import { localText } from "@/domain/value-objects/LocalText"
import { LOCAL_PROJECTS } from "@/infrastructure/data/projects.data"
import { StaticProjectRepository } from "@/infrastructure/repositories/StaticProjectRepository"
import { GetFeaturedProjects } from "@/application/use-cases/GetFeaturedProjects"
import type { Project } from "@/domain/entities/Project"

const repository = new StaticProjectRepository()
const getFeaturedProjects = new GetFeaturedProjects(repository)

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function FeaturedProjects() {
  const { t, language } = useLanguage()
  const [projects, setProjects] = useState<Project[]>(
    LOCAL_PROJECTS.filter((p) => p.featured).slice(0, 6)
  )

  useEffect(() => {
    getFeaturedProjects.execute().then((p) => {
      setProjects(p.slice(0, 6))
    })
  }, [])

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <SectionTitle
            title={t.projects.featured_title}
            subtitle={t.projects.subtitle}
            className="mb-0"
          />
          <Link
            to="/projects"
            className="mb-10 hidden items-center gap-1 text-[11px] text-(--muted) transition-colors hover:text-(--accent) sm:flex"
          >
            {t.projects.view_all}
            <ArrowRightIcon size={11} />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card hover className="flex h-full flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-[13px] leading-snug font-semibold text-(--fg)">
                    {project.name}
                  </h3>
                  <div className="flex shrink-0 items-center gap-1">
                    <Badge variant="muted" className="text-[10px]">
                      {t.projects.status[project.status]}
                    </Badge>
                  </div>
                </div>

                <p className="mb-4 flex-1 text-[11px] leading-relaxed text-(--muted)">
                  {localText(project.description, language)}
                </p>

                {project.stack.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-(--border) pt-3">
                  {project.stars !== undefined ||
                  project.forks !== undefined ? (
                    <div className="flex items-center gap-3 text-[10px] text-(--muted)">
                      {project.stars !== undefined && (
                        <span className="flex items-center gap-1">
                          <StarIcon size={10} />
                          {project.stars}
                        </span>
                      )}
                      {project.forks !== undefined && (
                        <span className="flex items-center gap-1">
                          <GitForkIcon size={10} />
                          {project.forks}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] text-(--muted)">
                      {t.projects.source[project.source]}
                    </span>
                  )}

                  <div className="flex gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-6 items-center justify-center rounded-sm border border-(--border) text-(--muted) transition-all hover:border-(--accent)/50 hover:text-(--accent)"
                        aria-label={t.projects.view_github}
                      >
                        <GithubLogoIcon size={11} />
                      </a>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-6 items-center justify-center rounded-sm border border-(--border) text-(--muted) transition-all hover:border-(--accent)/50 hover:text-(--accent)"
                        aria-label={t.projects.view_demo}
                      >
                        <ArrowSquareOutIcon size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Link to="/projects">
            <Button variant="ghost" size="sm">
              {t.projects.view_all}
              <ArrowRightIcon size={12} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
