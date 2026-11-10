import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { PageTitle, Panel, Stat } from "@/components/brand";
import { formatCedi } from "@/lib/fare";
import { driverEarnings, driverTx } from "@/lib/sample-data";

export const Route = createFileRoute("/driver/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings · Chauffeurly Driver" },
      { name: "description", content: "Daily earnings and trip transaction history." },
      { property: "og:title", content: "Earnings · Chauffeurly Driver" },
      { property: "og:description", content: "Driver earnings." },
    ],
  }),
  component: EarningsPage,
});

function EarningsPage() {
  const total = driverEarnings.reduce((a, b) => a + b.amount, 0);
  return (
    <div className="space-y-6">
      <PageTitle title="Earnings" subtitle="Sample figures · after platform commission" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="This week" value={formatCedi(total)} />
        <Stat label="Today" value={formatCedi(158.64)} />
        <Stat label="Trips this week" value="27" />
        <Stat label="Next payout" value="Mon 9 Nov" />
      </div>
      <Panel title="This week">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={driverEarnings}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatCedi(v)} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="amount" fill="var(--gold)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel title="Today's trips">
        <div className="divide-y">
          {driverTx.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0"><p className="truncate font-medium">{t.route}</p><p className="text-xs text-muted-foreground">{t.id} · {t.time} · fare {formatCedi(t.gross)}</p></div>
              <span className="shrink-0 font-semibold text-success">+{formatCedi(t.net)}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
