import { useState } from "react"
import { motion } from "framer-motion"
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { SectionTitle } from "@/presentation/components/ui/SectionTitle/SectionTitle"
import { Button } from "@/presentation/components/ui/Button/Button"
import { Card } from "@/presentation/components/ui/Card/Card"
import { useLanguage } from "@/presentation/contexts/LanguageContext"

const CONTACT_LINKS = [
  {
    key: "github",
    icon: GithubLogoIcon,
    href: "https://github.com/Lusk1nha",
    handle: "@Lusk1nha",
    labelKey: "github_label" as const,
  },
  {
    key: "linkedin",
    icon: LinkedinLogoIcon,
    href: "https://www.linkedin.com/in/olucaspedro/",
    handle: "/in/olucaspedro",
    labelKey: "linkedin_label" as const,
  },
  {
    key: "email",
    icon: EnvelopeSimpleIcon,
    href: "mailto:lucaspedro517@gmail.com",
    handle: "lucaspedro517@gmail.com",
    labelKey: "email_label" as const,
  },
]

type FormState = "idle" | "submitting" | "success" | "error" | "ratelimited"

export function ContactSection() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState<FormState>("idle")
  const [fields, setFields] = useState({ name: "", email: "", message: "" })
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("submitting")

    const form = e.currentTarget
    const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement)
      ?.value

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, _gotcha: honeypot }),
      })
      if (res.status === 429) {
        setFormState("ratelimited")
        return
      }
      if (!res.ok) throw new Error()
      setFormState("success")
    } catch {
      setFormState("error")
    }
  }

  const inputClass =
    "w-full rounded-sm border border-(--border) bg-(--surface-2) px-3 py-2 text-[12px] text-(--fg) placeholder:text-(--muted) outline-none transition-colors focus:border-(--accent)/60 focus:ring-1 focus:ring-(--accent)/20"

  const labelClass =
    "block mb-1 text-[10px] font-medium tracking-widest text-(--muted) uppercase"

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Card accentTop className="p-6">
            <p className="mb-6 text-sm leading-relaxed text-(--muted)">
              {t.contact.description}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {CONTACT_LINKS.map(
                ({ key, icon: Icon, href, handle, labelKey }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-sm border border-(--border) bg-(--surface-2) px-3 py-3 transition-all hover:border-(--accent)/50 hover:bg-(--surface-hover)"
                  >
                    <Icon
                      size={16}
                      className="shrink-0 text-(--muted) transition-colors group-hover:text-(--accent)"
                      style={{ color: undefined }}
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] text-(--muted)">
                        {t.contact[labelKey]}
                      </p>
                      <p className="truncate text-[11px] font-medium text-(--fg)">
                        {handle}
                      </p>
                    </div>
                  </a>
                )
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:lucaspedro517@gmail.com">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <EnvelopeSimpleIcon size={14} />
                  {t.contact.cta}
                </Button>
              </a>
              <a href="/cv">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t.contact.cta_cv}
                </Button>
              </a>
            </div>
          </Card>

          {/* Contact form */}
          <Card className="p-6">
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-6 text-center"
              >
                <CheckCircleIcon
                  size={36}
                  className="text-(--accent)"
                  weight="duotone"
                />
                <p className="text-sm font-semibold text-(--fg)">
                  {t.contact.form.success_title}
                </p>
                <p className="text-[12px] text-(--muted)">
                  {t.contact.form.success_message}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot — hidden from real users, bots fill it */}
                <input
                  name="_gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      {t.contact.form.name_label}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={t.contact.form.name_placeholder}
                      value={fields.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      {t.contact.form.email_label}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={t.contact.form.email_placeholder}
                      value={fields.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-message" className={labelClass}>
                    {t.contact.form.message_label}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.contact.form.message_placeholder}
                    value={fields.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {(formState === "error" || formState === "ratelimited") && (
                  <div className="mt-3 flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-500/8 px-3 py-2">
                    <WarningCircleIcon
                      size={14}
                      className="shrink-0 text-red-400"
                    />
                    <p className="text-[11px] text-red-400">
                      {formState === "ratelimited"
                        ? t.contact.form.rate_limited_message
                        : t.contact.form.error_message}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-3">
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={
                      formState === "submitting" || formState === "ratelimited"
                    }
                    className="w-full sm:w-auto"
                  >
                    {formState === "submitting"
                      ? t.contact.form.submitting
                      : t.contact.form.submit}
                  </Button>
                  {formState === "error" && (
                    <button
                      type="button"
                      onClick={() => setFormState("idle")}
                      className="text-[11px] text-(--muted) underline underline-offset-2 hover:text-(--fg)"
                    >
                      {t.contact.form.retry}
                    </button>
                  )}
                </div>
              </form>
            )}
          </Card>

          <div className="rounded-sm border border-(--border) bg-(--surface) p-5">
            <p className="mb-3 text-[11px] font-semibold tracking-widest text-(--muted) uppercase">
              {t.contact.open_to}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.contact.opportunities.map((op) => (
                <span
                  key={op}
                  className="rounded-sm border border-(--accent)/30 bg-(--accent)/8 px-2.5 py-1 text-[11px] text-(--accent)"
                >
                  {op}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
