import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Lock, MapPin, Navigation, X } from "lucide-react";
import { toast } from "sonner";
import { Panel, SimNotice, Stat, StatusBadge } from "@/components/brand";
import { MapView } from "@/components/map-view";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { canAcceptTrips, formatCedi, type DriverVerification } from "@/lib/fare";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/driver/")({
  head: () => ({
    meta: [
      { title: "Driver dashboard · Chauffeurly" },
      { name: "description", content: "Go online, receive trip requests and manage active trips." },
      { property: "og:title", content: "Driver dashboard · Chauffeurly" },
      { property: "og:description", content: "Chauffeurly driver dashboard." },
    ],
  }),
  component: DriverHome,
});

const profiles: Record<string, DriverVerification> = {
  approved: { application: "approved", documents: "approved", assessment: "passed" },
  pending: { application: "pending", documents: "approved", assessment: "scheduled" },
};

const request = { from: "Labadi Beach Hotel", to: "East Legon, American House", km: 11.2, min: 28, fare: 76.6, owner: "Ama M.", vehicle: "Toyota Land Cruiser Prado · Automatic", pickupEta: 4 };

function DriverHome() {
  const [preview, setPreview] = useState<"approved" | "pending">("approved");
  const v = profiles[preview];
  const allowed = canAcceptTrips(v);
  const [online, setOnline] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [timer, setTimer] = useState(20);
  const [active, setActive] = useState<null | "to_pickup" | "on_trip">(null);

  useEffect(() => {
    if (!online || active || !allowed) { setIncoming(false); return; }
    const t = setTimeout(() => { setIncoming(true); setTimer(20); }, 2500);
    return () => clearTimeout(t);
  }, [online, active, allowed]);

  useEffect(() => {
    if (!incoming) return;
    if (timer <= 0) { setIncoming(false); toast("Request expired"); return; }
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [incoming, timer]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-muted-foreground">Preview as:</span>
        {(["approved", "pending"] as const).map((p) => (
          <button key={p} onClick={() => { setPreview(p); setOnline(false); setActive(null); }} className={cn("rounded-full border px-3 py-1 font-medium", preview === p ? "border-gold bg-accent" : "")}>{p === "approved" ? "Approved driver" : "Applicant in review"}</button>
        ))}
      </div>

      <div className={cn("flex items-center justify-between gap-4 rounded-3xl p-5 shadow-elegant transition-colors", online ? "bg-gradient-brand text-primary-foreground" : "border bg-card")}>
        <div className="min-w-0">
          <p className="text-sm opacity-70">Status</p>
          <p className="font-display text-2xl font-bold">{online ? "You're online" : "You're offline"}</p>
          <p className="text-sm opacity-70">{allowed ? (online ? "Waiting for trip requests nearby…" : "Go online to start receiving requests.") : "Complete verification to start driving."}</p>
        </div>
        <Switch checked={online} disabled={!allowed} onCheckedChange={setOnline} className="scale-150" aria-label="Online availability" />
      </div>

      {!allowed && (
        <Panel title={<span className="flex items-center gap-2"><Lock className="h-4 w-4 text-gold" />Trips locked until you're approved</span>}>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-xl bg-muted p-3 text-sm">Application <StatusBadge status={v.application} /></div>
            <div className="flex items-center justify-between rounded-xl bg-muted p-3 text-sm">Documents <StatusBadge status={v.documents} /></div>
            <div className="flex items-center justify-between rounded-xl bg-muted p-3 text-sm">Driving test <StatusBadge status={v.assessment} /></div>
          </div>
          <Button variant="outline" className="mt-4" asChild><Link to="/driver/apply">View application</Link></Button>
        </Panel>
      )}

      {incoming && (
        <div className="rounded-3xl border-2 border-gold bg-card p-5 shadow-gold animate-rise">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-bold">New trip request</p>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-bold text-gold-foreground">{timer}</span>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{request.from} · {request.pickupEta} min away</p>
            <p className="flex gap-2"><Navigation className="h-4 w-4 shrink-0 text-gold" />{request.to}</p>
            <p className="text-muted-foreground">{request.vehicle} · {request.km} km · ~{request.min} min</p>
          </div>
          <p className="mt-3 font-display text-2xl font-bold">{formatCedi(request.fare)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" onClick={() => setIncoming(false)}><X />Reject</Button>
            <Button variant="gold" size="lg" onClick={() => { setIncoming(false); setActive("to_pickup"); }}><Check />Accept</Button>
          </div>
        </div>
      )}

      {active && (
        <Panel title="Active trip">
          <MapView className="h-64" pickup={active === "to_pickup" ? { x: 40, y: 20 } : { x: 26, y: 62 }} dropoff={active === "to_pickup" ? { x: 26, y: 62 } : { x: 76, y: 24 }} progress={0.35} />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-gold">{active === "to_pickup" ? "Heading to pickup" : "Trip in progress"}</p>
              <p className="font-semibold">{active === "to_pickup" ? request.from : request.to}</p>
              <p className="text-sm text-muted-foreground">Owner: {request.owner} · {request.vehicle}</p>
            </div>
            {active === "to_pickup" ? (
              <Button variant="hero" onClick={() => setActive("on_trip")}>Start trip</Button>
            ) : (
              <Button variant="gold" onClick={() => { setActive(null); toast.success("Trip ended (preview). Earnings will be recorded once payments are connected."); }}>End trip</Button>
            )}
          </div>
        </Panel>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Today" value={formatCedi(158.64)} hint="3 trips" />
        <Stat label="This week" value={formatCedi(1994)} />
        <Stat label="Rating" value="4.96" />
        <Stat label="Acceptance" value="92%" />
      </div>
      <SimNotice>Trip requests here are simulated for preview. Real dispatch and live location arrive with the backend.</SimNotice>
    </div>
  );
}
