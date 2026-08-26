import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { Experience, ExperienceLevel } from "@/domain/entities/Experience"

const LEVEL_COLOR: Record<ExperienceLevel, string> = {
  intern: "var(--muted)",
  junior: "var(--warning)",
  mid: "var(--accent)",
  senior: "var(--success)",
}

function monthIndex(date: string): number {
  const [year, month] = date.split("-").map(Number)
  return year * 12 + (month - 1)
}

interface GanttRow {
  id: string
  label: string
  offset: number
  duration: number
  level: ExperienceLevel
  startDate: string
  endDate: string | null
}

interface ExperienceGanttProps {
  experiences: Experience[]
  levelLabels: Record<ExperienceLevel, string>
  presentLabel: string
  language: string
}

function formatMonth(index: number, language: string): string {
  const date = new Date(Math.floor(index / 12), index % 12)
  return date.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
    month: "short",
    year: "numeric",
  })
}

function GanttTooltip({
  active,
  payload,
  language,
  presentLabel,
  levelLabels,
}: {
  active?: boolean
  payload?: { payload: GanttRow }[]
  language: string
  presentLabel: string
  levelLabels: Record<ExperienceLevel, string>
}) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="rounded-sm border border-(--border) bg-(--surface) px-3 py-2 font-mono text-[11px] shadow-lg">
      <div className="text-(--fg)">{row.label}</div>
      <div className="text-(--muted)">
        {formatMonth(monthIndex(row.startDate), language)} —{" "}
        {row.endDate ? formatMonth(monthIndex(row.endDate), language) : presentLabel}
      </div>
      <div style={{ color: LEVEL_COLOR[row.level] }}>
        {levelLabels[row.level]}
      </div>
    </div>
  )
}

export function ExperienceGantt({
  experiences,
  levelLabels,
  presentLabel,
  language,
}: ExperienceGanttProps) {
  const now = monthIndex(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  )
  const sorted = [...experiences].sort(
    (a, b) => monthIndex(a.startDate) - monthIndex(b.startDate)
  )
  const min = monthIndex(sorted[0].startDate)

  const rows: GanttRow[] = sorted.map((exp) => {
    const start = monthIndex(exp.startDate)
    const end = exp.endDate ? monthIndex(exp.endDate) : now
    return {
      id: exp.id,
      label: exp.company,
      offset: start - min,
      duration: Math.max(end - start, 1),
      level: exp.level,
      startDate: exp.startDate,
      endDate: exp.endDate,
    }
  })

  const height = Math.max(rows.length * 40, 120)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={rows} layout="vertical" barCategoryGap={12}>
        <XAxis
          type="number"
          tickFormatter={(value: number) => formatMonth(min + value, language)}
          tick={{
            fill: "var(--muted)",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
          }}
          axisLine={{ stroke: "var(--border)" }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={110}
          tick={{
            fill: "var(--fg)",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
          axisLine={{ stroke: "var(--border)" }}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "var(--surface-hover)" }}
          content={
            <GanttTooltip
              language={language}
              presentLabel={presentLabel}
              levelLabels={levelLabels}
            />
          }
        />
        <Bar dataKey="offset" stackId="a" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="duration" stackId="a" radius={2}>
          {rows.map((row) => (
            <Cell key={row.id} fill={LEVEL_COLOR[row.level]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
