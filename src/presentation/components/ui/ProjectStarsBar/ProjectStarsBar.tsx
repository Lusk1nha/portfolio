import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface ProjectStarsBarProps {
  data: { name: string; stars: number; forks: number }[]
}

function StarsTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { name: string; stars: number; forks: number } }[]
}) {
  if (!active || !payload?.length) return null
  const { name, stars, forks } = payload[0].payload
  return (
    <div className="rounded-sm border border-(--border) bg-(--surface) px-2.5 py-1.5 font-mono text-[11px] shadow-lg">
      <div className="text-(--fg)">{name}</div>
      <div className="text-(--muted)">
        ★ {stars} · ⑂ {forks}
      </div>
    </div>
  )
}

export function ProjectStarsBar({ data }: ProjectStarsBarProps) {
  const height = Math.max(data.length * 32, 100)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" barCategoryGap={10}>
        <XAxis
          type="number"
          allowDecimals={false}
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
          dataKey="name"
          width={130}
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
          content={<StarsTooltip />}
        />
        <Bar dataKey="stars" fill="var(--accent)" radius={2} />
      </BarChart>
    </ResponsiveContainer>
  )
}
