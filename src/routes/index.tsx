import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CarFront, ClipboardCheck, MapPinned, ShieldCheck, Star, Wallet } from "lucide-react";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-chauffeur.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chauffeurly — Your Car. Our Driver." },
      { name: "description", content: "Book a verified professional driver to drive your own car — for nights out, airport runs and long trips." },
      { property: "og:title", content: "Chauffeurly — Your Car. Our Driver." },
      { property: "og:description", content: "Verified professional drivers for your own vehicle, on demand." },
    ],
  }),
  component: Landing,
});

const steps = [
  { icon: CarFront, title: "Add your car", text: "Register your vehicle and upload valid insurance once." },
  { icon: MapPinned, title: "Request a driver", text: "Set pickup and destination, see the fare before you book." },
  { icon: ShieldCheck, title: "Ride in your own car", text: "A vetted chauffeur arrives and drives you there safely." },
];

const trust = [
  { icon: BadgeCheck, title: "Background checked", text: "Identity, licence, address and criminal record verified." },
  { icon: ClipboardCheck, title: "Practically assessed", text: "Every driver passes an in-car driving assessment before their first trip." },
  { icon: Wallet, title: "Clear, upfront fares", text: "Distance and time based pricing shown before you confirm." },
  { icon: Star, title: "Rated every trip", text: "Two-way ratings keep standards high on every journey." },
];

function Landing() {
  return (
    <div className="bg-background">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="rounded-xl bg-card px-3 py-1.5 shadow-card">
            <Logo className="h-10" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="glass" asChild className="hidden sm:inline-flex">
              <Link to="/driver/apply">Drive with us</Link>
            </Button>
            <Button variant="gold" asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative isolate min-h-[640px] overflow-hidden bg-navy-deep text-primary-foreground">
        <img src={hero} alt="Chauffeur driving a client's SUV at night" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
        <div className="mx-auto flex max-w-6xl flex-col justify-center px-4 pb-20 pt-36 sm:pt-44">
          <span className="w-fit rounded-full border border-gold/50 bg-gold/15 px-3 py-1 text-xs font-semibold text-gold animate-rise">Designated drivers, on demand</span>
          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.05] sm:text-6xl animate-rise">
            Your car.<br />
            <span className="text-gold">Our driver.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-primary-foreground/80 animate-rise">
            Book a verified professional chauffeur to drive your own vehicle — after a night out, to the airport, or across the country.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-rise">
            <Button variant="gold" size="lg" asChild>
              <Link to="/owner/request">Request a driver <ArrowRight /></Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/driver/apply">Become a driver</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border bg-card p-6 shadow-card">
              <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-secondary">{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-gold"><s.icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-brand py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Trust built into every trip</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <div key={t.title} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
                <t.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-primary-foreground/70">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-20 md:grid-cols-3">
        {[
          { title: "Car owners", text: "Request drivers, track trips live and manage your wallet.", to: "/owner", cta: "Open owner app" },
          { title: "Drivers", text: "Apply, get verified and earn driving clients' cars.", to: "/driver", cta: "Open driver app" },
          { title: "Administrators", text: "Verify drivers and vehicles, oversee trips and payouts.", to: "/admin", cta: "Open admin console" },
        ].map((c) => (
          <Link key={c.title} to={c.to} className="group rounded-2xl border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{c.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">© 2026 Chauffeurly · Your Car. Our Driver.</footer>
    </div>
  );
}
