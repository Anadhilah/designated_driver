import { createFileRoute } from "@tanstack/react-router";
import { CarFront, History, Home, Navigation, Wallet } from "lucide-react";
import { MobileShell, type NavItem } from "@/components/app-shell";

const nav: NavItem[] = [
  { to: "/owner", label: "Home", icon: Home, exact: true },
  { to: "/owner/request", label: "Ride", icon: Navigation },
  { to: "/owner/vehicles", label: "Vehicles", icon: CarFront },
  { to: "/owner/wallet", label: "Wallet", icon: Wallet },
  { to: "/owner/trips", label: "Trips", icon: History },
];

export const Route = createFileRoute("/owner")({
  component: () => <MobileShell nav={nav} role="Car owner" />,
});
