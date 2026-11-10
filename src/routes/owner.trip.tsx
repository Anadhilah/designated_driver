import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, MessageSquare, Phone, ShieldAlert, Star } from "lucide-react";
import { toast } from "sonner";
import { Panel, SimNotice } from "@/components/brand";
import { MapView } from "@/components/map-view";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner/trip")({
  head: () => ({
    meta: [
      { title: "Live trip · Chauffeurly" },
      { name: "description", content: "Track your driver and trip in real time." },
      { property: "og:title", content: "Live trip · Chauffeurly" },
      { property: "og:description", content: "Live trip tracking." },
    ],
  }),
  component: TripPage,
});

const stages = ["Driver assigned", "Driver en route", "Driver arrived", "Trip in progress", "Trip completed"];

function TripPage() {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (stage >= 4) return;
    const t = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(1, p + 0.1);
        if (next >= 1) {
          setStage((s) => s + 1);
          return 0;
        }
        return next;
      });
    }, 700);
    return () => clearInterval(t);
  }, [stage]);

  const onTrip = stage >= 3;
  const done = stage >= 4;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <MapView
        className="h-[320px] lg:h-[600px]"
        pickup={onTrip ? { x: 26, y: 62 } : { x: 40, y: 20 }}
        dropoff={onTrip ? { x: 76, y: 24 } : { x: 26, y: 62 }}
        progress={done ? 1 : stage === 2 ? 1 : progress}
      />
      <div className="space-y-4">
        <Panel>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{done ? "Arrived" : stages[stage]}</p>
          <h2 className="mt-1 text-xl font-bold">{done ? "You've arrived at Osu Oxford Street" : onTrip ? "On the way to Osu Oxford Street" : `Kwame arrives in ${Math.max(1, Math.round((1 - progress) * 4))} min`}</h2>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted p-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">KA</span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Kwame Asante</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-gold text-gold" />4.96 · Verified chauffeur</p>
            </div>
            <Button size="icon" variant="outline" onClick={() => toast.info("Calling isn't connected yet.")} aria-label="Call driver"><Phone /></Button>
            <Button size="icon" variant="outline" onClick={() => toast.info("Chat isn't connected yet.")} aria-label="Message driver"><MessageSquare /></Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Driving your <span className="font-medium text-foreground">2021 Toyota Land Cruiser Prado · GR 4521-21</span></p>
        </Panel>

        <Panel title="Trip status">
          <ol className="space-y-3">
            {stages.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className={cn("grid h-6 w-6 place-items-center rounded-full text-xs font-bold", i < stage || done ? "bg-success text-success-foreground" : i === stage ? "bg-gold text-gold-foreground" : "bg-muted text-muted-foreground")}>
                  {i < stage || done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={cn(i > stage && !done && "text-muted-foreground")}>{s}</span>
              </li>
            ))}
          </ol>
        </Panel>

        {done ? (
          <Panel title="Rate your driver">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}><Star className={cn("h-8 w-8", n <= rating ? "fill-gold text-gold" : "text-border")} /></button>
              ))}
            </div>
            <Textarea className="mt-3" placeholder="Share feedback (optional)" maxLength={500} />
            <div className="mt-3 flex gap-2">
              <Button variant="hero" className="flex-1" disabled={!rating} onClick={() => toast.info("Ratings will be saved once accounts are connected.")}>Submit rating</Button>
              <Button variant="outline" asChild><Link to="/owner/trips">Receipt</Link></Button>
            </div>
          </Panel>
        ) : (
          <Button variant="outline" className="w-full text-destructive" onClick={() => toast.info("Emergency assistance isn't connected yet. In an emergency call 112.")}><ShieldAlert />Safety & emergency</Button>
        )}
        <SimNotice>This trip is a simulation for preview — driver location and progress are not live.</SimNotice>
      </div>
    </div>
  );
}
