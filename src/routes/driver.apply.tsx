import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, FileUp } from "lucide-react";
import { toast } from "sonner";
import { PageTitle, Panel, SimNotice, StatusBadge } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/driver/apply")({
  head: () => ({
    meta: [
      { title: "Driver application · Chauffeurly" },
      { name: "description", content: "Apply to drive with Chauffeurly: identity, licence, address and assessment." },
      { property: "og:title", content: "Drive with Chauffeurly" },
      { property: "og:description", content: "Apply to become a verified Chauffeurly driver." },
    ],
  }),
  component: ApplyPage,
});

const steps = ["Personal info", "Identity", "Driving licence", "Address", "Review"];

function Upload({ label }: { label: string }) {
  const [name, setName] = useState("");
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 text-sm hover:bg-muted">
      <FileUp className="h-5 w-5 shrink-0 text-gold" />
      <span className="min-w-0 flex-1"><span className="block font-medium">{label}</span><span className="block truncate text-muted-foreground">{name || "PDF, JPG or PNG"}</span></span>
      {name && <Check className="h-4 w-4 text-success" />}
      <input type="file" accept=".pdf,image/*" className="sr-only" onChange={(e) => setName(e.target.files?.[0]?.name ?? "")} />
    </label>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return <div className="space-y-1.5"><Label htmlFor={id}>{label}</Label><Input id={id} type={type} className="h-11" maxLength={120} /></div>;
}

function ApplyPage() {
  const [step, setStep] = useState(0);
  return (
    <div>
      <PageTitle title="Driver application" subtitle="You can't accept trips until every check below is approved." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Panel>
          <div className="mb-6 flex gap-1.5">
            {steps.map((s, i) => (
              <button key={s} onClick={() => setStep(i)} className="flex-1 text-left">
                <span className={cn("block h-1.5 rounded-full", i <= step ? "bg-gold" : "bg-muted")} />
                <span className={cn("mt-1.5 hidden text-xs sm:block", i === step ? "font-semibold" : "text-muted-foreground")}>{s}</span>
              </button>
            ))}
          </div>
          <h2 className="mb-4 text-xl font-bold">{steps[step]}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {step === 0 && (<><Field id="fn" label="Full name" /><Field id="ph" label="Phone" type="tel" /><Field id="em" label="Email" type="email" /><Field id="dob" label="Date of birth" type="date" /><Field id="exp" label="Years of driving experience" type="number" /></>)}
            {step === 1 && (<><Field id="gc" label="Ghana Card number" /><div className="sm:col-span-2 grid gap-3"><Upload label="Ghana Card — front" /><Upload label="Ghana Card — back" /><Upload label="Selfie holding your ID" /></div></>)}
            {step === 2 && (<><Field id="ln" label="Licence number" /><Field id="lc" label="Licence class" /><Field id="le" label="Expiry date" type="date" /><div className="sm:col-span-2"><Upload label="Driving licence photo" /></div></>)}
            {step === 3 && (<><div className="sm:col-span-2"><Field id="ad" label="Residential address" /></div><Field id="gps" label="GhanaPost GPS address" /><Field id="city" label="City" /><div className="sm:col-span-2"><Upload label="Proof of address (utility bill)" /></div></>)}
            {step === 4 && (<p className="sm:col-span-2 text-sm text-muted-foreground">Once submitted, our team runs a background check and invites you to a practical driving assessment. You'll be notified at every stage.</p>)}
          </div>
          <div className="mt-6 flex justify-between gap-3">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
            {step < 4 ? <Button variant="hero" onClick={() => setStep((s) => s + 1)}>Continue</Button> : <Button variant="gold" onClick={() => toast.warning("Applications can't be submitted yet — nothing was sent for review.")}>Submit application</Button>}
          </div>
          <div className="mt-4"><SimNotice>Documents aren't uploaded or reviewed yet. This form previews the application flow.</SimNotice></div>
        </Panel>
        <Panel title="Verification status">
          <ul className="space-y-3 text-sm">
            {[["Personal information", "approved"], ["Identity verification", "approved"], ["Driving licence", "pending"], ["Residential address", "pending"], ["Background check", "in_review"], ["Driving assessment", "scheduled"]].map(([l, s]) => (
              <li key={l} className="flex items-center justify-between gap-2"><span>{l}</span><StatusBadge status={s} /></li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl bg-accent p-3 text-sm text-accent-foreground">Assessment: Tue 10 Nov, 10:00 · Chauffeurly Test Centre, Airport City <span className="block text-xs opacity-70">(sample)</span></div>
        </Panel>
      </div>
    </div>
  );
}
