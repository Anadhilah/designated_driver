// Sample data used until the backend is connected. Everything here is illustrative.
export const owner = { name: "Ama Mensah", email: "ama@example.com", phone: "+233 24 555 0192", wallet: 420.5 };

export const vehicles = [
  { id: "v1", make: "Toyota", model: "Land Cruiser Prado", year: 2021, plate: "GR 4521-21", color: "Pearl White", transmission: "Automatic", status: "verified" as const, insurance: "verified" as const, insuranceExpiry: "2027-03-14" },
  { id: "v2", make: "Honda", model: "Accord", year: 2019, plate: "GE 1182-19", color: "Graphite", transmission: "Automatic", status: "pending" as const, insurance: "pending" as const, insuranceExpiry: "2026-12-01" },
];

export const nearbyDrivers = [
  { id: "d1", name: "Kwame Asante", rating: 4.96, trips: 1284, eta: 4, distance: 1.2, years: 9, x: 32, y: 38 },
  { id: "d2", name: "Esi Boateng", rating: 4.91, trips: 842, eta: 6, distance: 2.0, years: 6, x: 68, y: 30 },
  { id: "d3", name: "Yaw Owusu", rating: 4.88, trips: 610, eta: 8, distance: 2.9, years: 5, x: 58, y: 72 },
];

export const places = [
  { name: "Airport City, Accra", km: 0 },
  { name: "Osu Oxford Street", km: 7.8 },
  { name: "East Legon, American House", km: 4.6 },
  { name: "Kotoka International Airport", km: 1.4 },
  { name: "Accra Mall, Spintex Rd", km: 5.2 },
  { name: "Labadi Beach Hotel", km: 9.1 },
  { name: "Cantonments, Embassy Rd", km: 6.3 },
];

export const trips = [
  { id: "CH-10482", date: "2026-11-03 21:40", from: "Labadi Beach Hotel", to: "East Legon", driver: "Kwame Asante", vehicle: "Land Cruiser Prado", km: 11.2, min: 28, fare: 76.6, status: "completed" as const, rating: 5 },
  { id: "CH-10411", date: "2026-10-29 19:05", from: "Accra Mall", to: "Cantonments", driver: "Esi Boateng", vehicle: "Land Cruiser Prado", km: 8.4, min: 22, fare: 62.0, status: "completed" as const, rating: 5 },
  { id: "CH-10377", date: "2026-10-24 23:15", from: "Osu Oxford Street", to: "Airport City", driver: "Yaw Owusu", vehicle: "Accord", km: 7.8, min: 19, fare: 57.5, status: "completed" as const, rating: 4 },
  { id: "CH-10301", date: "2026-10-18 08:30", from: "East Legon", to: "Kotoka Airport", driver: "—", vehicle: "Land Cruiser Prado", km: 5.1, min: 14, fare: 0, status: "cancelled" as const, rating: 0 },
];

export const walletTx = [
  { id: "t1", date: "2026-11-03", label: "Trip CH-10482", amount: -76.6 },
  { id: "t2", date: "2026-11-01", label: "Wallet top-up · MTN MoMo", amount: 300 },
  { id: "t3", date: "2026-10-29", label: "Trip CH-10411", amount: -62.0 },
  { id: "t4", date: "2026-10-24", label: "Trip CH-10377", amount: -57.5 },
  { id: "t5", date: "2026-10-20", label: "Wallet top-up · Visa •• 4421", amount: 200 },
];

export const driverEarnings = [
  { day: "Mon", amount: 182 }, { day: "Tue", amount: 240 }, { day: "Wed", amount: 156 },
  { day: "Thu", amount: 298 }, { day: "Fri", amount: 412 }, { day: "Sat", amount: 486 }, { day: "Sun", amount: 220 },
];

export const driverTx = [
  { id: "CH-10482", time: "21:40", route: "Labadi → East Legon", gross: 76.6, net: 61.28 },
  { id: "CH-10479", time: "18:10", route: "Airport City → Osu", gross: 57.5, net: 46.0 },
  { id: "CH-10470", time: "14:25", route: "Spintex → Cantonments", gross: 64.2, net: 51.36 },
];

export const driverApplications = [
  { id: "A-2201", name: "Kofi Darko", submitted: "2026-11-04", licence: "pending", id_doc: "approved", address: "pending", background: "in_review", assessment: "not_booked", status: "pending" },
  { id: "A-2198", name: "Abena Ofori", submitted: "2026-11-02", licence: "approved", id_doc: "approved", address: "approved", background: "cleared", assessment: "scheduled", status: "pending" },
  { id: "A-2190", name: "Nana Adjei", submitted: "2026-10-30", licence: "approved", id_doc: "approved", address: "approved", background: "cleared", assessment: "passed", status: "approved" },
  { id: "A-2185", name: "Selorm Agbeko", submitted: "2026-10-28", licence: "rejected", id_doc: "approved", address: "pending", background: "in_review", assessment: "not_booked", status: "pending" },
];

export const activeDrivers = [
  { id: "d1", name: "Kwame Asante", rating: 4.96, trips: 1284, status: "active", earnings: 12840 },
  { id: "d2", name: "Esi Boateng", rating: 4.91, trips: 842, status: "active", earnings: 8420 },
  { id: "d3", name: "Yaw Owusu", rating: 4.88, trips: 610, status: "active", earnings: 6100 },
  { id: "d4", name: "Fiifi Quaye", rating: 4.31, trips: 220, status: "suspended", earnings: 2200 },
];

export const owners = [
  { id: "o1", name: "Ama Mensah", email: "ama@example.com", vehicles: 2, trips: 34, wallet: 420.5, status: "active" },
  { id: "o2", name: "Daniel Tetteh", email: "daniel@example.com", vehicles: 1, trips: 12, wallet: 85.0, status: "active" },
  { id: "o3", name: "Akua Sarpong", email: "akua@example.com", vehicles: 3, trips: 58, wallet: 1210.0, status: "active" },
  { id: "o4", name: "Michael Addo", email: "michael@example.com", vehicles: 1, trips: 2, wallet: 0, status: "flagged" },
];

export const pendingVehicles = [
  { id: "v2", owner: "Ama Mensah", vehicle: "2019 Honda Accord", plate: "GE 1182-19", insurer: "SIC Insurance", expiry: "2026-12-01", status: "pending" },
  { id: "v7", owner: "Daniel Tetteh", vehicle: "2022 Hyundai Tucson", plate: "GT 7781-22", insurer: "Enterprise Insurance", expiry: "2027-06-30", status: "pending" },
  { id: "v9", owner: "Michael Addo", vehicle: "2015 Toyota Corolla", plate: "GW 3310-15", insurer: "Hollard", expiry: "2026-10-01", status: "expired" },
];

export const allTrips = [
  { id: "CH-10490", owner: "Akua Sarpong", driver: "Kwame Asante", route: "Osu → Tema", status: "in_progress", fare: 94.2 },
  { id: "CH-10489", owner: "Daniel Tetteh", driver: "Esi Boateng", route: "Airport → Labone", status: "driver_en_route", fare: 48.0 },
  ...trips.map((t) => ({ id: t.id, owner: "Ama Mensah", driver: t.driver, route: `${t.from} → ${t.to}`, status: t.status, fare: t.fare })),
];

export const payouts = [
  { id: "P-881", driver: "Kwame Asante", period: "Oct 27 – Nov 2", amount: 1840.2, method: "MTN MoMo", status: "pending" },
  { id: "P-880", driver: "Esi Boateng", period: "Oct 27 – Nov 2", amount: 1322.6, method: "Bank · GCB", status: "pending" },
  { id: "P-874", driver: "Yaw Owusu", period: "Oct 20 – Oct 26", amount: 980.0, method: "Vodafone Cash", status: "paid" },
];

export const disputes = [
  { id: "DS-31", raisedBy: "Ama Mensah", against: "Yaw Owusu", trip: "CH-10377", reason: "Fare higher than estimate", priority: "medium", status: "open" },
  { id: "DS-30", raisedBy: "Esi Boateng", against: "Michael Addo", trip: "CH-10360", reason: "Vehicle not roadworthy at pickup", priority: "high", status: "investigating" },
  { id: "DS-28", raisedBy: "Daniel Tetteh", against: "Fiifi Quaye", trip: "CH-10302", reason: "Rough driving reported", priority: "high", status: "resolved" },
];

export const weeklyTrips = [
  { day: "Mon", trips: 142 }, { day: "Tue", trips: 156 }, { day: "Wed", trips: 171 },
  { day: "Thu", trips: 189 }, { day: "Fri", trips: 264 }, { day: "Sat", trips: 312 }, { day: "Sun", trips: 208 },
];
