import { Car, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Pin = { id: string; x: number; y: number; label?: string; active?: boolean };

/**
 * Stylised city map. Placeholder for a real map provider (e.g. Mapbox / Google Maps)
 * once live location tracking is connected.
 */
export function MapView({
  drivers = [],
  pickup,
  dropoff,
  progress,
  className,
  onSelectDriver,
}: {
  drivers?: Pin[];
  pickup?: { x: number; y: number };
  dropoff?: { x: number; y: number };
  progress?: number;
  className?: string;
  onSelectDriver?: (id: string) => void;
}) {
  const car =
    pickup && dropoff && progress !== undefined
      ? { x: pickup.x + (dropoff.x - pickup.x) * progress, y: pickup.y + (dropoff.y - pickup.y) * progress }
      : null;
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-map", className)}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <rect x="8" y="10" width="20" height="16" rx="2" className="fill-success/10" />
        <rect x="70" y="60" width="22" height="18" rx="2" className="fill-success/10" />
        <path d="M0 62 Q 30 55 52 70 T 100 66" className="fill-none stroke-chart-3/25" strokeWidth="5" />
        {[18, 40, 64, 86].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x + 4} y2="100" className="stroke-map-road" strokeWidth="2.2" />
        ))}
        {[22, 48, 80].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y - 3} className="stroke-map-road" strokeWidth="2.2" />
        ))}
        <line x1="0" y1="8" x2="100" y2="94" className="stroke-gold/40" strokeWidth="3" />
        {pickup && dropoff && (
          <path
            d={`M${pickup.x} ${pickup.y} L${dropoff.x} ${dropoff.y}`}
            className="route-dash fill-none stroke-primary"
            strokeWidth="0.9"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: 4 }}
          />
        )}
      </svg>

      {drivers.map((d) => (
        <button
          key={d.id}
          type="button"
          onClick={() => onSelectDriver?.(d.id)}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
          aria-label={d.label ? `Driver ${d.label}` : "Driver"}
        >
          <span className={cn("grid h-9 w-9 place-items-center rounded-full border-2 border-card shadow-elegant", d.active ? "bg-gold text-gold-foreground" : "bg-primary text-primary-foreground")}>
            <Car className="h-4 w-4" />
          </span>
        </button>
      ))}

      {pickup && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pickup.x}%`, top: `${pickup.y}%` }}>
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping-slow" />
          <span className="relative block h-4 w-4 rounded-full border-4 border-card bg-primary shadow-elegant" />
        </div>
      )}
      {dropoff && (
        <div className="absolute -translate-x-1/2 -translate-y-full text-gold" style={{ left: `${dropoff.x}%`, top: `${dropoff.y}%` }}>
          <MapPin className="h-8 w-8 fill-gold stroke-gold-foreground" />
        </div>
      )}
      {car && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear" style={{ left: `${car.x}%`, top: `${car.y}%` }}>
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-card bg-gold text-gold-foreground shadow-gold">
            <Car className="h-5 w-5" />
          </span>
        </div>
      )}
      <span className="absolute bottom-2 right-3 rounded-md bg-card/80 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur">Map preview · live maps coming soon</span>
    </div>
  );
}
