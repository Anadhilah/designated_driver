import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CarFront, FileUp, Plus, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { PageTitle, Panel, SimNotice, StatusBadge } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vehicles as seed } from "@/lib/sample-data";

export const Route = createFileRoute("/owner/vehicles")({
  head: () => ({
    meta: [
      { title: "Vehicles & insurance · Chauffeurly" },
      { name: "description", content: "Register vehicles and submit insurance documents for verification." },
      { property: "og:title", content: "Vehicles & insurance · Chauffeurly" },
      { property: "og:description", content: "Manage your registered vehicles." },
    ],
  }),
  component: VehiclesPage,
});

const schema = z.object({
  make: z.string().trim().min(1).max(40),
  model: z.string().trim().min(1).max(40),
  year: z.coerce.number().int().min(1990).max(2027),
  plate: z.string().trim().min(3).max(15),
  color: z.string().trim().min(1).max(30),
});

function VehiclesPage() {
  const [list, setList] = useState<typeof seed>(seed);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) return toast.error("Please complete all vehicle fields correctly.");
    if (!fileName) return toast.error("Attach your insurance certificate.");
    setList((l) => [...l, { id: crypto.randomUUID(), ...r.data, transmission: "Automatic", status: "pending" as never, insurance: "pending" as never, insuranceExpiry: "—" }]);
    setOpen(false);
    setFileName("");
    toast.success("Vehicle added — awaiting verification by our team.");
  }

  return (
    <div>
      <PageTitle title="Vehicles & insurance" subtitle="Vehicles must have verified insurance before a driver can be booked." action={<Button variant="gold" onClick={() => setOpen((o) => !o)}><Plus />Add vehicle</Button>} />

      {open && (
        <Panel title="Register a vehicle" className="mb-6 animate-rise">
          <form onSubmit={add} className="grid gap-4 sm:grid-cols-2">
            {[["make", "Make"], ["model", "Model"], ["year", "Year"], ["plate", "Number plate"], ["color", "Colour"]].map(([n, l]) => (
              <div key={n} className="space-y-1.5"><Label htmlFor={n}>{l}</Label><Input id={n} name={n} className="h-11" type={n === "year" ? "number" : "text"} /></div>
            ))}
            <div className="space-y-1.5">
              <Label>Insurance certificate</Label>
              <label className="flex h-11 cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 text-sm text-muted-foreground hover:bg-muted">
                <FileUp className="h-4 w-4" /><span className="truncate">{fileName || "Upload PDF or image"}</span>
                <input type="file" accept=".pdf,image/*" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
              </label>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SimNotice>Files stay on this device for now; uploads will be stored once the backend is connected.</SimNotice>
              <Button type="submit" variant="hero">Submit for verification</Button>
            </div>
          </form>
        </Panel>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {list.map((v) => (
          <div key={v.id} className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-gold"><CarFront className="h-7 w-7" /></span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-semibold">{v.year} {v.make} {v.model}</h3>
                <p className="text-sm text-muted-foreground">{v.plate} · {v.color}</p>
              </div>
              <StatusBadge status={v.status} />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-muted p-3 text-sm">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" />Insurance · expires {v.insuranceExpiry}</span>
              <StatusBadge status={v.insurance} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
