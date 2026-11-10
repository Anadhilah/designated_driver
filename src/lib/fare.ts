// Fare estimate based on distance and time. Placeholder rates until the owner confirms pricing.
export const FARE_RATES = {
  base: 15,
  perKm: 3.5,
  perMinute: 0.8,
  minimum: 30,
} as const;

export function estimateFare(distanceKm: number, minutes: number) {
  const raw = FARE_RATES.base + distanceKm * FARE_RATES.perKm + minutes * FARE_RATES.perMinute;
  const total = Math.max(FARE_RATES.minimum, Math.round(raw * 100) / 100);
  return {
    base: FARE_RATES.base,
    distance: Math.round(distanceKm * FARE_RATES.perKm * 100) / 100,
    time: Math.round(minutes * FARE_RATES.perMinute * 100) / 100,
    total,
  };
}

export const formatCedi = (n: number) =>
  `GH₵ ${n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export type DriverVerification = {
  application: "approved" | "pending" | "rejected" | "not_submitted";
  documents: "approved" | "pending" | "rejected" | "not_submitted";
  assessment: "passed" | "scheduled" | "failed" | "not_booked";
  suspended?: boolean;
};

/** Drivers may only accept trips once application, documents and practical assessment are all approved. */
export function canAcceptTrips(v: DriverVerification) {
  return (
    !v.suspended &&
    v.application === "approved" &&
    v.documents === "approved" &&
    v.assessment === "passed"
  );
}
