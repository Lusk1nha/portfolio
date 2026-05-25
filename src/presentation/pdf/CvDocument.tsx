import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer"
import { EXPERIENCES } from "@/infrastructure/data/experiences.data"
import { STACK_ITEMS } from "@/infrastructure/data/stack.data"
import { localText, localTextArray } from "@/domain/value-objects/LocalText"
import {
  getYearsOfExperience,
  getYearsLabel,
} from "@/domain/value-objects/YearsOfExperience"
import type { Language } from "@/domain/value-objects/Language"
import type { Translations } from "@/i18n/pt"
import type { StackGroup } from "@/domain/entities/StackItem"

// ─── Constants ────────────────────────────────────────────────────────────────

const C = {
  accent: "#58a6ff",
  accentDark: "#1d4ed8",
  fg: "#0f172a",
  muted: "#64748b",
  muted2: "#94a3b8",
  border: "#e2e8f0",
  badgeBg: "#eff6ff",
  white: "#ffffff",
} as const

const STACK_GROUP_ORDER: StackGroup[] = [
  "frontend",
  "backend",
  "cloud",
  "ai",
  "architecture",
  "tools",
]

function fmt(date: string) {
  const [year, month] = date.split("-")
  return `${month}/${year}`
}

function formatPeriod(
  startDate: string,
  endDate: string | null,
  presentLabel: string
) {
  return `${fmt(startDate)} — ${endDate ? fmt(endDate) : presentLabel}`
}

function groupStack() {
  return STACK_GROUP_ORDER.reduce<Record<string, string[]>>((acc, group) => {
    const items = STACK_ITEMS.filter((s) => s.group === group).map((s) => s.name)
    if (items.length) acc[group] = items
    return acc
  }, {})
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.fg,
    backgroundColor: C.white,
    paddingHorizontal: 42,
    paddingVertical: 38,
  },

  // Header
  header: {
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  accentBar: {
    width: 36,
    height: 3,
    backgroundColor: C.accent,
    marginBottom: 8,
    borderRadius: 2,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    color: C.fg,
    letterSpacing: 0.2,
    marginBottom: 3,
  },
  role: {
    fontSize: 12,
    color: C.accent,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
  },
  contactDot: {
    fontSize: 7,
    color: C.muted2,
    marginRight: 14,
  },
  contactText: {
    fontSize: 8,
    color: C.muted,
    textDecoration: "none",
  },

  // Section
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 0.75,
    borderBottomColor: C.border,
  },
  sectionBar: {
    width: 3,
    height: 9,
    backgroundColor: C.accent,
    borderRadius: 1,
    marginRight: 6,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: C.muted,
    letterSpacing: 1.2,
  },

  // Summary
  summaryText: {
    fontSize: 9,
    color: C.muted,
    lineHeight: 1.6,
  },

  // Experience
  expItem: {
    marginBottom: 13,
  },
  expTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: C.fg,
  },
  expPeriod: {
    fontSize: 7.5,
    color: C.muted2,
    paddingTop: 1,
  },
  expCompany: {
    fontSize: 8.5,
    color: C.accent,
    marginBottom: 5,
  },
  expDescription: {
    fontSize: 8.5,
    color: C.muted,
    lineHeight: 1.55,
    marginBottom: 5,
  },
  highlight: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletSymbol: {
    fontSize: 8,
    color: C.accent,
    width: 10,
    marginTop: 0.5,
  },
  highlightText: {
    fontSize: 8,
    color: C.muted,
    lineHeight: 1.45,
    flex: 1,
  },
  stackRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  stackBadge: {
    backgroundColor: C.badgeBg,
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 3,
    marginBottom: 3,
  },
  stackBadgeText: {
    fontSize: 7,
    color: C.accentDark,
  },

  // Education
  eduTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: C.fg,
    marginBottom: 2,
  },
  eduInstitution: {
    fontSize: 8.5,
    color: C.muted,
  },
  eduPeriod: {
    fontSize: 7.5,
    color: C.muted2,
    paddingTop: 2,
  },

  // Skills
  skillRow: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "flex-start",
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: C.muted,
    width: 78,
    paddingTop: 1,
  },
  skillTechs: {
    fontSize: 8.5,
    color: C.fg,
    flex: 1,
    lineHeight: 1.5,
  },

  // Languages
  langRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  langName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: C.fg,
    marginRight: 4,
  },
  langLevel: {
    fontSize: 9,
    color: C.muted,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 22,
    left: 42,
    right: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: C.border,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: C.muted2,
  },
  footerAccent: {
    fontSize: 7,
    color: C.accent,
  },
})

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <View style={s.sectionBar} />
        <Text style={s.sectionTitle}>{title.toUpperCase()}</Text>
      </View>
      {children}
    </View>
  )
}

// ─── Main Document ────────────────────────────────────────────────────────────

interface CvDocumentProps {
  language: Language
  t: Translations
}

export function CvDocument({ language, t }: CvDocumentProps) {
  const yearsLabel = getYearsLabel(language)
  const years = getYearsOfExperience()
  const grouped = groupStack()

  const groupLabels: Record<StackGroup, string> = {
    frontend: t.stack.groups.frontend,
    backend: t.stack.groups.backend,
    cloud: t.stack.groups.cloud,
    ai: t.stack.groups.ai,
    architecture: t.stack.groups.architecture,
    tools: t.stack.groups.tools,
  }

  return (
    <Document
      title={`${t.cv.title} — Lucas Pedro da Hora`}
      author="Lucas Pedro da Hora"
      subject="Full Stack Developer"
      keywords="React, Node.js, Rust, TypeScript, Full Stack, Developer"
      creator="lucaspedro.dev"
    >
      <Page size="A4" style={s.page}>
        {/* ── Header ──────────────────────────────────────────── */}
        <View style={s.header}>
          <View style={s.accentBar} />
          <Text style={s.name}>Lucas Pedro da Hora</Text>
          <Text style={s.role}>Full Stack Developer</Text>

          <View style={s.contactRow}>
            <View style={s.contactItem}>
              <Link
                src="mailto:lucaspedro517@gmail.com"
                style={s.contactText}
              >
                lucaspedro517@gmail.com
              </Link>
            </View>
            <Text style={s.contactDot}>·</Text>
            <View style={s.contactItem}>
              <Link
                src="https://linkedin.com/in/olucaspedro"
                style={s.contactText}
              >
                linkedin.com/in/olucaspedro
              </Link>
            </View>
            <Text style={s.contactDot}>·</Text>
            <View style={s.contactItem}>
              <Link
                src="https://github.com/Lusk1nha"
                style={s.contactText}
              >
                github.com/Lusk1nha
              </Link>
            </View>
            <Text style={s.contactDot}>·</Text>
            <Text style={s.contactText}>São Paulo, SP</Text>
          </View>
        </View>

        {/* ── Summary ─────────────────────────────────────────── */}
        <Section title={t.cv.summary.title}>
          <Text style={s.summaryText}>
            {t.cv.summary.text
              .replace("{years}", yearsLabel)
              .replace("{n}", String(years))}
          </Text>
        </Section>

        {/* ── Experience ──────────────────────────────────────── */}
        <Section title={t.cv.experience.title}>
          {EXPERIENCES.map((exp) => (
            <View key={exp.id} style={s.expItem} wrap={false}>
              <View style={s.expTopRow}>
                <Text style={s.expRole}>{localText(exp.role, language)}</Text>
                <Text style={s.expPeriod}>
                  {formatPeriod(
                    exp.startDate,
                    exp.endDate,
                    t.experience.present
                  )}
                </Text>
              </View>

              <Text style={s.expCompany}>
                {exp.company}
                {"  ·  "}
                {localText(exp.location, language)}
                {"  ·  "}
                {localText(exp.modality, language)}
              </Text>

              <Text style={s.expDescription}>
                {localText(exp.description, language)}
              </Text>

              {localTextArray(exp.highlights, language).map(
                (highlight, i) => (
                  <View key={i} style={s.highlight}>
                    <Text style={s.bulletSymbol}>▸</Text>
                    <Text style={s.highlightText}>{highlight}</Text>
                  </View>
                )
              )}

              {exp.stack.length > 0 && (
                <View style={s.stackRow}>
                  {exp.stack.map((tech) => (
                    <View key={tech} style={s.stackBadge}>
                      <Text style={s.stackBadgeText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </Section>

        {/* ── Education ───────────────────────────────────────── */}
        <Section title={t.cv.education.title}>
          <View wrap={false}>
            <View style={s.eduTopRow}>
              <Text style={s.eduDegree}>{t.cv.education.degree}</Text>
              <Text style={s.eduPeriod}>{t.cv.education.period}</Text>
            </View>
            <Text style={s.eduInstitution}>{t.cv.education.institution}</Text>
          </View>
        </Section>

        {/* ── Skills ──────────────────────────────────────────── */}
        <Section title={t.cv.skills.title}>
          {STACK_GROUP_ORDER.filter((g) => grouped[g]).map((group) => (
            <View key={group} style={s.skillRow} wrap={false}>
              <Text style={s.skillLabel}>{groupLabels[group]}</Text>
              <Text style={s.skillTechs}>{grouped[group].join("  ·  ")}</Text>
            </View>
          ))}
        </Section>

        {/* ── Languages ───────────────────────────────────────── */}
        <Section title={t.cv.languages.title}>
          {[t.cv.languages.portuguese, t.cv.languages.english].map((lang) => {
            const [name, level] = lang.split(" — ")
            return (
              <View key={lang} style={s.langRow}>
                <Text style={s.langName}>{name}</Text>
                <Text style={s.langLevel}>— {level}</Text>
              </View>
            )
          })}
        </Section>

        {/* ── Footer ──────────────────────────────────────────── */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Lucas Pedro da Hora · Full Stack Developer</Text>
          <Link src="https://lucaspedro.dev" style={s.footerAccent}>
            lucaspedro.dev
          </Link>
        </View>
      </Page>
    </Document>
  )
}
