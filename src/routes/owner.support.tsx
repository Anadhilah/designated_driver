import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { PageTitle, Panel, SimNotice } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trips } from "@/lib/sample-data";

export const Route = createFileRoute("/owner/support")({
  head: () => ({
    meta: [
      { title: "Support · Chauffeurly" },
      { name: "description", content: "Report a trip issue or get help from Chauffeurly support." },
      { property: "og:title", content: "Support · Chauffeurly" },
      { property: "og:description", content: "Help and support." },
    ],
  }),
  component: SupportPage,
});

const schema = z.object({ trip: z.string().min(1), topic: z.string().min(1), message: z.string().trim().min(10, "Tell us a little more").max(1000) });
const faqs = [
  ["Who is liable if there's an accident?", "Your vehicle's insurance applies. Drivers are vetted and assessed; incidents are investigated by our team."],
  ["Can I choose a specific driver?", "You can pick from nearby verified drivers when requesting a trip."],
  ["How is the fare calculated?", "A base fare plus a rate per kilometre and per minute, shown before you confirm."],
];

function SupportPage() {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) return toast.error(r.error.issues[0].message);
    toast.warning("Support requests aren't delivered yet — please don't rely on this form for urgent issues.");
  }
  return (
    <div>
      <PageTitle title="Help & support" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Report an issue">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5"><Label>Trip</Label>
              <select name="trip" className="h-11 w-full rounded-md border bg-card px-3 text-sm">{trips.map((t) => <option key={t.id} value={t.id}>{t.id} · {t.from} → {t.to}</option>)}</select>
            </div>
            <div className="space-y-1.5"><Label>Topic</Label>
              <select name="topic" className="h-11 w-full rounded-md border bg-card px-3 text-sm">{["Fare dispute", "Driver behaviour", "Vehicle damage", "Lost item", "Other"].map((o) => <option key={o}>{o}</option>)}</select>
            </div>
            <div className="space-y-1.5"><Label>Details</Label><Textarea name="message" rows={5} maxLength={1000} /></div>
            <Button type="submit" variant="hero" className="w-full">Submit</Button>
            <SimNotice>Support isn't connected yet — submissions are not sent to anyone.</SimNotice>
          </form>
        </Panel>
        <Panel title="Frequently asked">
          <div className="space-y-4">
            {faqs.map(([q, a]) => (<div key={q}><p className="font-semibold">{q}</p><p className="mt-1 text-sm text-muted-foreground">{a}</p></div>))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
