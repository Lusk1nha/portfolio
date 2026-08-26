import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface SkillRadarProps {
  data: { label: string; level: number }[]
}

function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { label: string; level: number } }[]
}) {
  if (!active || !payload?.length) return null
  const { label, level } = payload[0].payload
  return (
    <div className="rounded-sm border border-(--border) bg-(--surface) px-2.5 py-1.5 font-mono text-[11px] shadow-lg">
      <span className="text-(--muted)">{label}</span>{" "}
      <span className="text-(--accent)">{level}%</span>
    </div>
  )
}

export function SkillRadar({ data }: SkillRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="label"
          tick={{
            fill: "var(--muted)",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
        />
        <Tooltip content={<RadarTooltip />} />
        <Radar
          dataKey="level"
          stroke="var(--accent)"
          fill="var(--accent)"
          fillOpacity={0.2}
          strokeWidth={1.5}
          dot={{ r: 3, fill: "var(--accent)", strokeWidth: 0 }}
          isAnimationActive
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
