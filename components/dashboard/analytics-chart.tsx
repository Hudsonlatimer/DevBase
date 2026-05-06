"use client";

import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from "recharts";

// ── Revenue bar chart ─────────────────────────────────────────────────────────
type RevenueProps = { data: { name: string; total: number }[] };

export function AnalyticsChart({ data }: RevenueProps) {
  const hasData = data.length > 0 && data.some((d) => d.total > 0);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Revenue</h2>
          <p className="text-lg font-black mt-0.5">
            {hasData
              ? `$${data.reduce((s, d) => s + d.total, 0).toLocaleString()}`
              : "—"}
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-zinc-800 px-2 py-1 rounded-full">Monthly</span>
      </div>

      {hasData ? (
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="30%">
              <XAxis
                dataKey="name"
                stroke="#3f3f46"
                fontSize={10}
                fontWeight={700}
                tickLine={false}
                axisLine={false}
                dy={8}
              />
              <YAxis
                stroke="#3f3f46"
                fontSize={10}
                fontWeight={700}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                width={36}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderRadius: "12px",
                  border: "1px solid #27272a",
                  padding: "10px 14px",
                }}
                itemStyle={{ color: "#ffffff", fontWeight: 700, fontSize: 13 }}
                labelStyle={{ color: "#71717a", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}
                formatter={(value: unknown) => {
                  const normalized = Array.isArray(value) ? value[0] : value;
                  return [`$${(Number(normalized) || 0).toLocaleString()}`, "Revenue"];
                }}
              />
              <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={i === data.length - 1 ? "#ffffff" : "#3f3f46"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[180px] flex flex-col items-center justify-center gap-3">
          {/* Decorative empty bars */}
          <div className="flex items-end gap-2 opacity-20">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="w-6 rounded-t-md bg-zinc-500" style={{ height: h }} />
            ))}
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">
            No revenue yet — add an invoice to start tracking
          </p>
        </div>
      )}
    </div>
  );
}

// ── Project pipeline donut ────────────────────────────────────────────────────
type PipelineProps = {
  counts: {
    planning: number;
    development: number;
    testing: number;
    completed: number;
    on_hold: number;
  };
};

const PIPELINE_COLORS: Record<string, string> = {
  planning:    "#f59e0b",
  development: "#3b82f6",
  testing:     "#8b5cf6",
  completed:   "#10b981",
  on_hold:     "#52525b",
};

const PIPELINE_LABELS: Record<string, string> = {
  planning:    "Planning",
  development: "Dev",
  testing:     "Testing",
  completed:   "Done",
  on_hold:     "On Hold",
};

export function PipelineChart({ counts }: PipelineProps) {
  const data = Object.entries(counts)
    .map(([key, value]) => ({ name: PIPELINE_LABELS[key], key, value }))
    .filter((d) => d.value > 0);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Pipeline</h2>
          <p className="text-lg font-black mt-0.5">{total} Projects</p>
        </div>
      </div>

      {total === 0 ? (
        <div className="h-[160px] flex flex-col items-center justify-center gap-3">
          <div className="w-24 h-24 rounded-full border-4 border-zinc-800 border-dashed opacity-30" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">
            Create a project to see your pipeline
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="h-[140px] w-[140px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.key} fill={PIPELINE_COLORS[entry.key]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderRadius: "10px",
                    border: "1px solid #27272a",
                    padding: "8px 12px",
                  }}
                  itemStyle={{ color: "#fff", fontWeight: 700 }}
                  labelStyle={{ display: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {data.map((entry) => (
              <div key={entry.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: PIPELINE_COLORS[entry.key] }} />
                  <span className="text-xs font-bold text-zinc-400">{entry.name}</span>
                </div>
                <span className="text-xs font-black text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
