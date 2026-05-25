import { motion } from "framer-motion"
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { Badge } from "@/presentation/components/ui/Badge/Badge"
import { Button } from "@/presentation/components/ui/Button/Button"
import { TerminalWindow } from "@/presentation/components/ui/TerminalWindow/TerminalWindow"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import { getYearsLabel } from "@/domain/value-objects/YearsOfExperience"
import avatarSrc from "@/assets/lucas-pedro.jpg"

const SOCIAL_LINKS = [
  {
    icon: GithubLogoIcon,
    href: "https://github.com/Lusk1nha",
    label: "GitHub",
  },
  {
    icon: LinkedinLogoIcon,
    href: "https://www.linkedin.com/in/olucaspedro/",
    label: "LinkedIn",
  },
  {
    icon: EnvelopeIcon,
    href: "mailto:lucaspedro517@gmail.com",
    label: "Email",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Hero() {
  const { t, language } = useLanguage()
  const yearsLabel = getYearsLabel(language)

  const terminalLines = [
    { text: "whoami", type: "command" as const },
    { text: "lucas-pedro-da-hora", type: "output" as const },
    { text: "cat skills.txt", type: "command" as const },
    { text: "React · Node.js · Rust · TypeScript", type: "output" as const },
    {
      text: "DDD · Clean Architecture · Microservices",
      type: "output" as const,
    },
    { text: `experience --years`, type: "command" as const },
    { text: yearsLabel + " de experiência", type: "output" as const },
    { text: "status --check", type: "command" as const },
    { text: t.hero.terminal.line9.replace("> ", ""), type: "output" as const },
  ]

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 60%, var(--bg) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* Avatar */}
            <motion.div variants={itemVariants}>
              <div className="relative inline-block">
                <div
                  className="absolute -inset-0.5 rounded-full opacity-60 blur-sm"
                  style={{ background: "var(--accent)" }}
                />
                <img
                  src={avatarSrc}
                  alt="Lucas Pedro da Hora"
                  className="relative size-20 rounded-full object-cover ring-2 ring-(--accent) ring-offset-2 ring-offset-(--bg)"
                />
                <span
                  className="absolute right-0.5 bottom-0.5 size-3.5 rounded-full border-2 border-(--bg)"
                  style={{ background: "var(--success)" }}
                  title="Online"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Badge variant="accent" pulse>
                {t.hero.badge}
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-sm text-(--muted)">{t.hero.greeting}</p>
              <h1 className="text-3xl leading-tight font-bold text-(--fg) sm:text-4xl">
                {t.hero.name}
              </h1>
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {t.hero.title}
              </p>
              <p className="text-sm text-(--muted)">{t.hero.subtitle}</p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-sm leading-relaxed text-(--muted)"
            >
              {t.hero.description.replace("{years}", yearsLabel)}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-1.5 text-[11px] text-(--muted)"
            >
              <MapPinIcon size={12} />
              {t.hero.location}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2.5"
            >
              <Link to="/projects">
                <Button variant="default" size="md">
                  {t.hero.cta_projects}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md">
                  {t.hero.cta_contact}
                </Button>
              </Link>
              <Link to="/cv">
                <Button variant="ghost" size="md">
                  {t.hero.cta_cv}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-sm border border-(--border) bg-(--surface) text-(--muted) transition-all hover:border-(--accent)/50 hover:text-(--accent)"
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TerminalWindow title="lucas@portfolio:~" lines={terminalLines} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
