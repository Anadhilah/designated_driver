import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CarFront, Clock, Loader2, Route as RouteIcon, Star } from "lucide-react";
import { Panel, SimNotice } from "@/components/brand";
import { MapView } from "@/components/map-view";
import { Button } from "@/components/ui/button";
import { estimateFare, formatCedi } from "@/lib/fare";
import { nearbyDrivers, places, vehicles } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner/request")({
  head: () => ({
    meta: [
      { title: "Request a driver · Chauffeurly" },
      { name: "description", content: "Set your pickup and destination, see the fare and choose a nearby driver." },
      { property: "og:title", content: "Request a driver · Chauffeurly" },
      { property: "og:description", content: "Book a verified driver for your own car." },
    ],
  }),
  component: RequestPage,
});

const selectCls = "h-12 w-full rounded-xl border bg-card px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring";

function RequestPage() {
  const navigate = useNavigate();
  const verified = vehicles.filter((v) => v.status === "verified");
  const [pickup, setPickup] = useState(places[0].name);
  const [dest, setDest] = useState(places[1].name);
  const [vehicle, setVehicle] = useState(verified[0]?.id ?? "");
  const [phase, setPhase] = useState<"idle" | "searching" | "found">("idle");
  const [driver, setDriver] = useState<string | null>(null);

  const km = useMemo(() => {
    const a = places.find((p) => p.name === pickup)!.km;
    const b = places.find((p) => p.name === dest)!.km;
    return Math.max(1.5, Math.abs(a - b) + 2.4);
  }, [pickup, dest]);
  const minutes = Math.round(km * 2.6);
  const fare = estimateFare(km, minutes);

  function search() {
    setPhase("searching");
    setDriver(null);
    setTimeout(() => {
      setPhase("found");
      setDriver(nearbyDrivers[0].id);
    }, 1600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
      <MapView
        className="h-[320px] lg:h-[620px]"
        pickup={{ x: 26, y: 62 }}
        dropoff={{ x: 76, y: 24 }}
        drivers={phase === "idle" ? [] : nearbyDrivers.map((d) => ({ id: d.id, x: d.x, y: d.y, label: d.name, active: d.id === driver }))}
        onSelectDriver={(id) => phase === "found" && setDriver(id)}
      />
      <div className="space-y-4">
        <Panel title="Request a driver">
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup
              <select className={cn(selectCls, "mt-1")} value={pickup} onChange={(e) => { setPickup(e.target.value); setPhase("idle"); }}>
                {places.map((p) => <option key={p.name}>{p.name}</option>)}
              </select>
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Destination
              <select className={cn(selectCls, "mt-1")} value={dest} onChange={(e) => { setDest(e.target.value); setPhase("idle"); }}>
                {places.filter((p) => p.name !== pickup).map((p) => <option key={p.name}>{p.name}</option>)}
              </select>
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vehicle
              <select className={cn(selectCls, "mt-1")} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                {verified.map((v) => <option key={v.id} value={v.id}>{v.year} {v.make} {v.model} · {v.plate}</option>)}
              </select>
            </label>
            <p className="text-xs text-muted-foreground">Only vehicles with verified insurance can be booked.</p>
          </div>
        </Panel>

        <Panel title="Fare estimate">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-xl bg-muted p-3"><RouteIcon className="h-4 w-4 text-gold" />{km.toFixed(1)} km</div>
            <div className="flex items-center gap-2 rounded-xl bg-muted p-3"><Clock className="h-4 w-4 text-gold" />~{minutes} min</div>
          </div>
          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Base fare</dt><dd>{formatCedi(fare.base)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Distance</dt><dd>{formatCedi(fare.distance)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Time</dt><dd>{formatCedi(fare.time)}</dd></div>
            <div className="flex justify-between border-t pt-2 text-base font-bold"><dt>Estimated total</dt><dd>{formatCedi(fare.total)}</dd></div>
          </dl>
        </Panel>

        {phase === "idle" && <Button variant="gold" size="lg" className="w-full" onClick={search}>Find nearby drivers</Button>}
        {phase === "searching" && (
          <div className="flex items-center justify-center gap-2 rounded-2xl border bg-card p-5 text-sm font-medium shadow-card"><Loader2 className="h-4 w-4 animate-spin text-gold" />Searching for verified drivers nearby…</div>
        )}
        {phase === "found" && (
          <Panel title="Nearby drivers">
            <div className="space-y-2">
              {nearbyDrivers.map((d) => (
                <button key={d.id} onClick={() => setDriver(d.id)} className={cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left transition", driver === d.id ? "border-gold bg-accent" : "hover:bg-muted")}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">{d.name.split(" ").map((n) => n[0]).join("")}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{d.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-gold text-gold" />{d.rating} · {d.trips} trips · {d.years} yrs</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold">{d.eta} min</span>
                </button>
              ))}
            </div>
            <Button variant="hero" size="lg" className="mt-4 w-full" onClick={() => navigate({ to: "/owner/trip" })}><CarFront />Request {nearbyDrivers.find((d) => d.id === driver)?.name.split(" ")[0]}</Button>
          </Panel>
        )}
        <SimNotice>Driver matching uses sample drivers. No real driver is dispatched and nothing is charged.</SimNotice>
      </div>
    </div>
  );
}
