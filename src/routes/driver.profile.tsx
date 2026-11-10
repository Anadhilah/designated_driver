import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageTitle, Panel, StatusBadge } from "@/components/brand";

export const Route = createFileRoute("/driver/profile")({
  head: () => ({
    meta: [
      { title: "Profile & ratings · Chauffeurly Driver" },
      { name: "description", content: "Your driver profile, documents and ratings." },
      { property: "og:title", content: "Profile · Chauffeurly Driver" },
      { property: "og:description", content: "Driver profile and ratings." },
    ],
  }),
  component: ProfilePage,
});

const reviews = [
  { by: "Ama M.", stars: 5, text: "Smooth, professional and on time. Treated my car with care." },
  { by: "Daniel T.", stars: 5, text: "Very courteous. Will request again." },
  { by: "Akua S.", stars: 4, text: "Good drive, slight delay at pickup." },
];

function ProfilePage() {
  return (
    <div>
      <PageTitle title="Profile" />
      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <Panel>
          <div className="flex flex-col items-center text-center">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-brand font-display text-3xl font-bold text-gold">KA</span>
            <h2 className="mt-3 text-xl font-bold">Kwame Asante</h2>
            <p className="text-sm text-muted-foreground">Driver since 2024 · Accra</p>
            <p className="mt-3 flex items-center gap-1 font-display text-3xl font-bold"><Star className="h-6 w-6 fill-gold text-gold" />4.96</p>
            <p className="text-xs text-muted-foreground">1,284 trips</p>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {["Identity", "Driving licence", "Address", "Background check", "Driving assessment"].map((d) => (
              <li key={d} className="flex justify-between"><span>{d}</span><StatusBadge status="approved" /></li>
            ))}
          </ul>
        </Panel>
        <Panel title="Recent reviews">
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.by} className="rounded-xl bg-muted p-4">
                <div className="flex items-center justify-between"><p className="font-semibold">{r.by}</p><span className="flex">{Array.from({ length: r.stars }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}</span></div>
                <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
