import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import {
  GithubLogoIcon,
  StarIcon,
  GitForkIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react"
import { SectionTitle } from "@/presentation/components/ui/SectionTitle/SectionTitle"
import { Card } from "@/presentation/components/ui/Card/Card"
import { Tag } from "@/presentation/components/ui/Tag/Tag"
import { Badge } from "@/presentation/components/ui/Badge/Badge"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import { useSeo } from "@/presentation/hooks/useSeo"
import { localText } from "@/domain/value-objects/LocalText"
import { LOCAL_PROJECTS } from "@/infrastructure/data/projects.data"
import { StaticProjectRepository } from "@/infrastructure/repositories/StaticProjectRepository"
import { GetAllProjects } from "@/application/use-cases/GetAllProjects"
import type { Project } from "@/domain/entities/Project"

const repository = new StaticProjectRepository()
const getAllProjects = new GetAllProjects(repository)

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function ProjectsPage() {
  useSeo({
    title: "Projects",
    description:
      "Projetos open source e trabalhos de Lucas Pedro da Hora — aplicações web com React, Node.js, Rust e TypeScript. Veja repositórios no GitHub com stars, forks e demos ao vivo.",
    path: "/projects",
  })

  const { t, language } = useLanguage()
  const [projects, setProjects] = useState<Project[]>(LOCAL_PROJECTS)

  useEffect(() => {
    getAllProjects.execute().then(setProjects)
  }, [])

  return (
    <div className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card hover className="flex h-full flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-[13px] leading-snug font-semibold text-(--fg)">
                    {project.name}
                  </h3>
                  <Badge variant="muted" className="shrink-0 text-[10px]">
                    {t.projects.status[project.status]}
                  </Badge>
                </div>

                <p className="mb-4 flex-1 text-[11px] leading-relaxed text-(--muted)">
                  {localText(project.description, language)}
                </p>

                {project.stack.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.stack.slice(0, 5).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-(--border) pt-3">
                  {project.stars !== undefined ? (
                    <div className="flex items-center gap-3 text-[10px] text-(--muted)">
                      <span className="flex items-center gap-1">
                        <StarIcon size={10} />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitForkIcon size={10} />
                        {project.forks}
                      </span>
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
      </div>
    </div>
  )
}
