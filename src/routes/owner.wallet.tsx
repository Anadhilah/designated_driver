import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { PageTitle, Panel, SimNotice } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { formatCedi } from "@/lib/fare";
import { owner, walletTx } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet · Chauffeurly" },
      { name: "description", content: "Fund your Chauffeurly wallet and manage payment methods." },
      { property: "og:title", content: "Wallet · Chauffeurly" },
      { property: "og:description", content: "Wallet and payments." },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState("momo");
  return (
    <div>
      <PageTitle title="Wallet" subtitle="Trips are paid from your wallet balance." />
      <div className="grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="rounded-3xl bg-gradient-brand p-6 text-primary-foreground shadow-elegant">
            <p className="text-sm text-primary-foreground/70">Available balance</p>
            <p className="mt-1 font-display text-4xl font-bold">{formatCedi(owner.wallet)}</p>
            <p className="mt-6 text-xs text-primary-foreground/50">Sample balance</p>
          </div>
          <Panel title="Top up">
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 200, 500].map((a) => (
                <button key={a} onClick={() => setAmount(a)} className={cn("rounded-xl border py-2.5 text-sm font-semibold", amount === a ? "border-gold bg-accent" : "hover:bg-muted")}>{a}</button>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {[{ id: "momo", label: "Mobile Money", icon: Smartphone }, { id: "card", label: "Debit / credit card", icon: CreditCard }].map((m) => (
                <button key={m.id} onClick={() => setMethod(m.id)} className={cn("flex w-full items-center gap-3 rounded-xl border p-3 text-sm font-medium", method === m.id ? "border-gold bg-accent" : "hover:bg-muted")}>
                  <m.icon className="h-4 w-4 text-gold" />{m.label}
                </button>
              ))}
            </div>
            <Button variant="gold" size="lg" className="mt-4 w-full" onClick={() => toast.warning("Payments aren't connected yet — no money was taken and your balance is unchanged.")}>Add {formatCedi(amount)}</Button>
            <div className="mt-3"><SimNotice>Payment processing is not connected. Top-ups won't charge you or change your balance.</SimNotice></div>
          </Panel>
        </div>
        <Panel title="Transactions">
          <div className="divide-y">
            {walletTx.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0"><p className="truncate font-medium">{t.label}</p><p className="text-xs text-muted-foreground">{t.date}</p></div>
                <span className={cn("shrink-0 font-semibold", t.amount > 0 ? "text-success" : "")}>{t.amount > 0 ? "+" : "−"}{formatCedi(Math.abs(t.amount))}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
