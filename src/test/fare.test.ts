import { describe, expect, it } from "vitest";
import { canAcceptTrips, estimateFare } from "@/lib/fare";

describe("fare estimate", () => {
  it("combines base, distance and time", () => {
    expect(estimateFare(10, 20).total).toBe(15 + 35 + 16);
  });
  it("never goes below the minimum fare", () => {
    expect(estimateFare(1, 2).total).toBe(30);
  });
});

describe("driver trip eligibility", () => {
  const ok = { application: "approved", documents: "approved", assessment: "passed" } as const;
  it("allows fully approved drivers", () => expect(canAcceptTrips(ok)).toBe(true));
  it("blocks drivers without a passed assessment", () =>
    expect(canAcceptTrips({ ...ok, assessment: "scheduled" })).toBe(false));
  it("blocks drivers with pending documents", () =>
    expect(canAcceptTrips({ ...ok, documents: "pending" })).toBe(false));
  it("blocks suspended drivers", () => expect(canAcceptTrips({ ...ok, suspended: true })).toBe(false));
});
