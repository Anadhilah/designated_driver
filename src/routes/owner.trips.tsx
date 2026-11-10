import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Receipt, Star } from "lucide-react";
import { PageTitle, Panel, StatusBadge } from "@/components/brand";
import { estimateFare, formatCedi } from "@/lib/fare";
import { trips } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner/trips")({
  head: () => ({
    meta: [
      { title: "Trip history · Chauffeurly" },
      { name: "description", content: "Past trips, receipts and ratings." },
      { property: "og:title", content: "Trip history · Chauffeurly" },
      { property: "og:description", content: "Your trips and receipts." },
    ],
  }),
  component: TripsPage,
});

function TripsPage() {
  const [sel, setSel] = useState(trips[0].id);
  const t = trips.find((x) => x.id === sel)!;
  const f = estimateFare(t.km, t.min);
  return (
    <div>
      <PageTitle title="Trip history" subtitle="Tap a trip to view its receipt." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-3">
          {trips.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)} className={cn("flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left shadow-card transition", sel === x.id && "border-gold ring-2 ring-gold/30")}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><p className="truncate font-semibold">{x.from} → {x.to}</p></div>
                <p className="text-xs text-muted-foreground">{x.date} · {x.driver} · {x.vehicle}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-semibold">{x.fare ? formatCedi(x.fare) : "—"}</p>
                <StatusBadge status={x.status} />
              </div>
            </button>
          ))}
        </div>
        <Panel title={<span className="flex items-center gap-2"><Receipt className="h-4 w-4 text-gold" />Receipt {t.id}</span>}>
          <p className="text-sm text-muted-foreground">{t.date}</p>
          <p className="mt-3 font-semibold">{t.from}</p>
          <p className="text-sm text-muted-foreground">to</p>
          <p className="font-semibold">{t.to}</p>
          {t.status === "completed" ? (
            <>
              <dl className="mt-5 space-y-1.5 border-t pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Base</dt><dd>{formatCedi(f.base)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{t.km} km</dt><dd>{formatCedi(f.distance)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{t.min} min</dt><dd>{formatCedi(f.time)}</dd></div>
                <div className="flex justify-between border-t pt-2 text-base font-bold"><dt>Total</dt><dd>{formatCedi(f.total)}</dd></div>
              </dl>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-muted p-3 text-sm">
                <span>Driver: {t.driver}</span>
                <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={cn("h-3.5 w-3.5", i < t.rating ? "fill-gold text-gold" : "text-border")} />)}</span>
              </div>
            </>
          ) : (
            <p className="mt-5 rounded-xl bg-muted p-3 text-sm">This trip was cancelled before a driver was assigned. No charge.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}
