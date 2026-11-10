import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Gauge, UserRound, Wallet } from "lucide-react";
import { MobileShell, type NavItem } from "@/components/app-shell";

const nav: NavItem[] = [
  { to: "/driver", label: "Drive", icon: Gauge, exact: true },
  { to: "/driver/apply", label: "Application", icon: ClipboardList },
  { to: "/driver/earnings", label: "Earnings", icon: Wallet },
  { to: "/driver/profile", label: "Profile", icon: UserRound },
];

export const Route = createFileRoute("/driver")({
  component: () => <MobileShell nav={nav} role="Driver" />,
});
