import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/chauffeurly-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center", className)} aria-label="Chauffeurly home">
      <img src={logo.url} alt="Chauffeurly — Your Car. Our Driver." className="h-full w-auto" />
    </Link>
  );
}

export function LogoBadge({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold font-display text-lg font-extrabold text-gold-foreground">C</span>
      <span className="font-display text-lg font-bold tracking-tight">Chauffeurly</span>
    </Link>
  );
}

const tones = {
  success: "bg-success/12 text-success ring-success/25",
  warning: "bg-warning/15 text-accent-foreground ring-warning/30",
  danger: "bg-destructive/10 text-destructive ring-destructive/25",
  info: "bg-secondary text-secondary-foreground ring-border",
  gold: "bg-gold/20 text-accent-foreground ring-gold/40",
};

const statusTone: Record<string, keyof typeof tones> = {
  verified: "success", approved: "success", passed: "success", completed: "success", cleared: "success", paid: "success", active: "success", resolved: "success", online: "success",
  pending: "warning", in_review: "warning", scheduled: "warning", investigating: "warning", open: "warning", driver_en_route: "info", in_progress: "gold",
  rejected: "danger", failed: "danger", cancelled: "danger", suspended: "danger", expired: "danger", flagged: "danger", high: "danger",
  medium: "warning", not_booked: "info", not_submitted: "info", offline: "info",
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const tone = tones[statusTone[status] ?? "info"];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset", tone)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? status.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
    </span>
  );
}

/** Marks a feature as a preview that doesn't perform a real operation yet. */
export function SimNotice({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-dashed border-gold/60 bg-accent/60 px-3.5 py-2.5 text-xs text-accent-foreground">
      <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border bg-card p-5 shadow-card", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="min-w-0 truncate text-base font-semibold">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, icon }: { label: string; value: ReactNode; hint?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        {icon && <span className="text-gold">{icon}</span>}
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
