import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { LogoBadge } from "@/components/brand";
import { cn } from "@/lib/utils";

export type NavItem = { to: string; label: string; icon: LucideIcon; exact?: boolean };

/** Mobile-first shell for car owners and drivers: top bar on desktop, bottom tab bar on phones. */
export function MobileShell({ nav, role }: { nav: NavItem[]; role: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (n: NavItem) => (n.exact ? path === n.to : path.startsWith(n.to));
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <header className="sticky top-0 z-30 border-b bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <LogoBadge />
            <span className="hidden rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground sm:inline">{role}</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive(n) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/auth" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-secondary" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 animate-rise">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md" style={{ gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))` }}>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium", isActive(n) ? "text-primary" : "text-muted-foreground")}>
              <span className={cn("grid h-8 w-12 place-items-center rounded-full transition-colors", isActive(n) && "bg-gold/25")}>
                <n.icon className="h-5 w-5" />
              </span>
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

/** Desktop-oriented admin shell with a dark sidebar. */
export function AdminShell({ nav }: { nav: NavItem[] }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (n: NavItem) => (n.exact ? path === n.to : path.startsWith(n.to));
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar p-4 text-sidebar-foreground lg:flex">
        <LogoBadge className="px-2 py-2 text-sidebar-accent-foreground" />
        <p className="mt-1 px-2 text-xs uppercase tracking-widest text-sidebar-foreground/50">Admin console</p>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", isActive(n) ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/auth" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-sidebar-accent">
          <LogOut className="h-4 w-4" /> Sign out
        </Link>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 flex gap-1 overflow-x-auto border-b bg-card/90 px-3 py-2 backdrop-blur lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={cn("flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium", isActive(n) ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
              <n.icon className="h-3.5 w-3.5" /> {n.label}
            </Link>
          ))}
        </div>
        <main className="mx-auto max-w-7xl p-4 sm:p-8 animate-rise">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function DataTable({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="px-3 py-2.5 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y [&_td]:px-3 [&_td]:py-3">{children}</tbody>
      </table>
    </div>
  );
}
