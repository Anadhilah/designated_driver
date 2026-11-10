import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CarFront, LifeBuoy, MapPin, ShieldCheck, Star } from "lucide-react";
import { Panel, StatusBadge } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { formatCedi } from "@/lib/fare";
import { owner, trips, vehicles } from "@/lib/sample-data";

export const Route = createFileRoute("/owner/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Chauffeurly" },
      { name: "description", content: "Your Chauffeurly car owner dashboard." },
      { property: "og:title", content: "Dashboard · Chauffeurly" },
      { property: "og:description", content: "Request drivers, manage vehicles and track trips." },
    ],
  }),
  component: OwnerHome,
});

function OwnerHome() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-brand p-6 text-primary-foreground shadow-elegant sm:p-8">
        <p className="text-sm text-primary-foreground/70">Good evening,</p>
        <h1 className="text-3xl font-bold">{owner.name.split(" ")[0]}</h1>
        <Link to="/owner/request" className="mt-6 flex items-center gap-3 rounded-2xl bg-card p-4 text-foreground shadow-card transition hover:-translate-y-0.5">
          <MapPin className="h-5 w-5 shrink-0 text-gold" />
          <span className="min-w-0 flex-1 truncate font-medium">Where are you heading?</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-gold-foreground"><ArrowRight className="h-4 w-4" /></span>
        </Link>
        <div className="mt-5 flex flex-wrap gap-6 text-sm">
          <div><p className="text-primary-foreground/60">Wallet</p><p className="font-display text-xl font-bold">{formatCedi(owner.wallet)}</p></div>
          <div><p className="text-primary-foreground/60">Trips</p><p className="font-display text-xl font-bold">34</p></div>
          <div><p className="text-primary-foreground/60">Avg. rating given</p><p className="font-display text-xl font-bold">4.9</p></div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="My vehicles" action={<Link to="/owner/vehicles" className="text-sm font-semibold text-primary">Manage</Link>}>
          <div className="space-y-3">
            {vehicles.map((v) => (
              <div key={v.id} className="flex items-center gap-3 rounded-xl bg-muted p-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-gold"><CarFront className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{v.year} {v.make} {v.model}</p>
                  <p className="text-xs text-muted-foreground">{v.plate}</p>
                </div>
                <StatusBadge status={v.status} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent trips" action={<Link to="/owner/trips" className="text-sm font-semibold text-primary">View all</Link>}>
          <div className="divide-y">
            {trips.slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{t.from} → {t.to}</p>
                  <p className="text-xs text-muted-foreground">{t.date} · {t.driver}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-semibold">{formatCedi(t.fare)}</p>
                  <p className="flex items-center justify-end gap-0.5 text-xs text-gold">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-card">
          <ShieldCheck className="h-8 w-8 shrink-0 text-success" />
          <div className="min-w-0"><p className="font-semibold">Insurance on file</p><p className="text-sm text-muted-foreground">Prado covered until Mar 2027. Accord awaiting review.</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-card">
          <LifeBuoy className="h-8 w-8 shrink-0 text-gold" />
          <div className="min-w-0 flex-1"><p className="font-semibold">Need help?</p><p className="text-sm text-muted-foreground">Report an issue or contact support.</p></div>
          <Button variant="outline" size="sm" asChild><Link to="/owner/support">Support</Link></Button>
        </div>
      </div>
    </div>
  );
}
