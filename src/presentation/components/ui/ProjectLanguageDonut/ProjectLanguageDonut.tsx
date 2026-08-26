import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const PALETTE = [
  "var(--accent)",
  "var(--success)",
  "var(--warning)",
  "var(--muted)",
  "var(--destructive)",
]

interface ProjectLanguageDonutProps {
  data: { language: string; count: number }[]
}

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { language: string; count: number } }[]
}) {
  if (!active || !payload?.length) return null
  const { language, count } = payload[0].payload
  return (
    <div className="rounded-sm border border-(--border) bg-(--surface) px-2.5 py-1.5 font-mono text-[11px] shadow-lg">
      <span className="text-(--fg)">{language}</span>{" "}
      <span className="text-(--muted)">× {count}</span>
    </div>
  )
}

export function ProjectLanguageDonut({ data }: ProjectLanguageDonutProps) {
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width="50%" height={180}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="language"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={2}
            stroke="var(--surface)"
            strokeWidth={2}
            isAnimationActive
          >
            {data.map((entry, i) => (
              <Cell key={entry.language} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex flex-col gap-1.5 font-mono text-[11px]">
        {data.map((entry, i) => (
          <li key={entry.language} className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-[1px]"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            <span className="text-(--fg)">{entry.language}</span>
            <span className="text-(--muted)">× {entry.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
