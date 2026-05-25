import { StackGrid } from "@/presentation/sections/StackGrid/StackGrid"
import { useSeo } from "@/presentation/hooks/useSeo"

export function StackPage() {
  useSeo({
    title: "Stack",
    description:
      "Stack técnica de Lucas Pedro da Hora: React, Next.js, TypeScript, Node.js, NestJS, Rust, FastAPI, PostgreSQL, Docker, GCP, RabbitMQ e integração com IA (GPT-4, Azure OpenAI).",
    path: "/stack",
  })

  return <StackGrid />
}
