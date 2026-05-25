import { ExperienceTimeline } from "@/presentation/sections/ExperienceTimeline/ExperienceTimeline"
import { useSeo } from "@/presentation/hooks/useSeo"

export function ExperiencePage() {
  useSeo({
    title: "Experience",
    description:
      "Trajetória profissional de Lucas Pedro da Hora — Full Stack Developer com 4+ anos de experiência em empresas de tecnologia, construindo sistemas escaláveis com React, Node.js e arquitetura de microsserviços.",
    path: "/experience",
  })

  return <ExperienceTimeline />
}
