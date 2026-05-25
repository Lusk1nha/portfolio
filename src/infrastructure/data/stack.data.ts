import type { StackItem } from "@/domain/entities/StackItem"

export const STACK_ITEMS: StackItem[] = [
  // Frontend
  { id: "react", name: "React", group: "frontend", featured: true },
  { id: "nextjs", name: "Next.js", group: "frontend", featured: true },
  { id: "typescript", name: "TypeScript", group: "frontend", featured: true },
  { id: "tailwind", name: "Tailwind CSS", group: "frontend", featured: true },
  { id: "shadcn", name: "Shadcn/UI", group: "frontend", featured: false },
  { id: "vite", name: "Vite", group: "frontend", featured: false },
  { id: "framer", name: "Framer Motion", group: "frontend", featured: false },

  // Backend
  { id: "nestjs", name: "Nest.js", group: "backend", featured: true },
  { id: "fastify", name: "Fastify", group: "backend", featured: false },
  { id: "nodejs", name: "Node.js", group: "backend", featured: true },
  { id: "rust", name: "Rust", group: "backend", featured: true },
  { id: "axum", name: "Axum", group: "backend", featured: false },
  { id: "python", name: "Python", group: "backend", featured: true },
  { id: "fastapi", name: "FastAPI", group: "backend", featured: true },
  { id: "postgresql", name: "PostgreSQL", group: "backend", featured: true },
  { id: "mongodb", name: "MongoDB", group: "backend", featured: false },

  // Cloud & Infra
  { id: "gcp", name: "Google Cloud (GCP)", group: "cloud", featured: true },
  { id: "aws", name: "AWS", group: "cloud", featured: false },
  { id: "docker", name: "Docker", group: "cloud", featured: true },
  { id: "rabbitmq", name: "RabbitMQ", group: "cloud", featured: true },
  { id: "azure", name: "Microsoft Azure", group: "cloud", featured: false },

  // AI
  { id: "gpt4", name: "GPT-4 / OpenAI", group: "ai", featured: true },
  { id: "embeddings", name: "Embeddings", group: "ai", featured: true },
  { id: "atlas-search", name: "Atlas Search", group: "ai", featured: false },
  { id: "azure-openai", name: "Azure OpenAI", group: "ai", featured: true },
  {
    id: "cognitive-search",
    name: "Azure Cognitive Search",
    group: "ai",
    featured: false,
  },

  // Arquitetura
  { id: "ddd", name: "DDD", group: "architecture", featured: true },
  {
    id: "microservices",
    name: "Microsserviços",
    group: "architecture",
    featured: true,
  },
  {
    id: "clean-arch",
    name: "Clean Architecture",
    group: "architecture",
    featured: true,
  },
  { id: "solid", name: "SOLID", group: "architecture", featured: true },

  // Tools
  { id: "tauri", name: "Tauri", group: "tools", featured: true },
  { id: "spfx", name: "SharePoint (SPFx)", group: "tools", featured: false },
  {
    id: "power-platform",
    name: "Power Platform",
    group: "tools",
    featured: false,
  },
  { id: "turborepo", name: "Turborepo", group: "tools", featured: false },
  { id: "pnpm", name: "pnpm", group: "tools", featured: false },
]
