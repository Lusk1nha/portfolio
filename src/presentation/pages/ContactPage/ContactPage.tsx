import { ContactSection } from "@/presentation/sections/ContactSection/ContactSection"
import { useSeo } from "@/presentation/hooks/useSeo"

export function ContactPage() {
  useSeo({
    title: "Contact",
    description:
      "Entre em contato com Lucas Pedro da Hora — Full Stack Developer disponível para projetos freelance, consultorias e oportunidades remotas. Email, LinkedIn e GitHub.",
    path: "/contact",
  })

  return <ContactSection />
}
