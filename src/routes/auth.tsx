import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Logo, SimNotice } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · Chauffeurly" },
      { name: "description", content: "Sign in or create your Chauffeurly account as a car owner or driver." },
      { property: "og:title", content: "Sign in · Chauffeurly" },
      { property: "og:description", content: "Access your Chauffeurly account." },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(72),
});

const roles = [
  { id: "owner", label: "Car owner", to: "/owner" },
  { id: "driver", label: "Driver", to: "/driver" },
  { id: "admin", label: "Admin", to: "/admin" },
] as const;

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [role, setRole] = useState<(typeof roles)[number]["id"]>("owner");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    toast.info("Preview mode — accounts aren't created yet. Opening the sample workspace.");
    navigate({ to: roles.find((x) => x.id === role)!.to });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-brand p-12 text-primary-foreground lg:flex">
        <div className="w-fit rounded-xl bg-card px-3 py-2"><Logo className="h-12" /></div>
        <div>
          <h2 className="text-4xl font-bold">Arrive safely,<br /><span className="text-gold">in your own car.</span></h2>
          <p className="mt-4 max-w-sm text-primary-foreground/70">Verified chauffeurs, transparent fares and live trip tracking.</p>
        </div>
        <p className="text-sm text-primary-foreground/50">© 2026 Chauffeurly</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden"><Logo className="h-14" /></div>
          <h1 className="text-2xl font-bold">{mode === "in" ? "Welcome back" : "Create your account"}</h1>
          <div className="mt-6 grid grid-cols-3 gap-1 rounded-xl bg-secondary p-1">
            {roles.map((r) => (
              <button key={r.id} type="button" onClick={() => setRole(r.id)} className={cn("rounded-lg py-2 text-sm font-medium transition", role === r.id ? "bg-card shadow-card" : "text-muted-foreground")}>
                {r.label}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            {mode === "up" && (
              <div className="space-y-1.5"><Label htmlFor="name">Full name</Label><Input id="name" name="name" className="h-11" /></div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" className="h-11" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" className="h-11" />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">{mode === "in" ? "Sign in" : "Create account"}</Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "in" ? "New to Chauffeurly?" : "Already have an account?"}{" "}
            <button className="font-semibold text-primary" onClick={() => setMode(mode === "in" ? "up" : "in")}>{mode === "in" ? "Create account" : "Sign in"}</button>
          </p>
          {role === "driver" && mode === "up" && (
            <p className="mt-2 text-center text-sm"><Link to="/driver/apply" className="font-semibold text-primary">Start the driver application →</Link></p>
          )}
          <div className="mt-6"><SimNotice>Sign-in isn't connected yet. Submitting opens a sample workspace so you can explore.</SimNotice></div>
        </div>
      </div>
    </div>
  );
}
