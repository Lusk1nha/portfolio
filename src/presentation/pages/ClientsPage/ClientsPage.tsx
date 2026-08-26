import { motion, type Variants } from "framer-motion"
import { SectionTitle } from "@/presentation/components/ui/SectionTitle/SectionTitle"
import { Card } from "@/presentation/components/ui/Card/Card"
import { useLanguage } from "@/presentation/contexts/LanguageContext"
import { useSeo } from "@/presentation/hooks/useSeo"
import { localText } from "@/domain/value-objects/LocalText"
import { CLIENTS } from "@/infrastructure/data/clients.data"

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function ClientsPage() {
  useSeo({
    title: "Clients",
    description:
      "Clientes e empresas com quem Lucas Pedro da Hora já trabalhou: Vedacit, NSK, Maxion Wheels, Ajinomoto, Siemens Healthineers, Hub Brasil, Nubank e C6 Bank.",
    path: "/clients",
  })

  const { t, language } = useLanguage()

  return (
    <div className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t.clients.title} subtitle={t.clients.subtitle} />

        <p className="mb-8 max-w-2xl text-[11px] leading-relaxed text-(--muted)">
          {t.clients.note}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CLIENTS.map((client) => (
            <motion.div key={client.id} variants={itemVariants}>
              <Card hover accentTop className="flex h-full flex-col p-5">
                <h3 className="mb-2 text-[13px] leading-snug font-semibold text-(--fg)">
                  {client.name}
                </h3>
                <p className="text-[11px] leading-relaxed text-(--muted)">
                  {localText(client.project, language)}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
