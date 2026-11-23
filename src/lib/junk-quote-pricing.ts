// Photo Quote pricing. Dolmar approved this plan on 2026-11-23 ("Recommended Pricing Plan").
// Edit prices here only: the Photo Quote tool reads every number from this file.
// The AI only estimates volume & flags items. All prices are computed in code below.

export const PRICING_VERSION = "2026-11-23";

/** Assumed truck box size in cubic yards. Placeholder until Dolmar confirms the real truck size. */
export const TRUCK_CUBIC_YARDS = 15;

/** Ad anchor: "Junk Removal From $99". */
export const AD_ANCHOR_PRICE = 99;

export const SINGLE_ITEM = {
  /** One item at the curb, driveway or garage. */
  curbside: 99,
  /** One item from inside the home. */
  inside: 139,
  /** Heavy single item: washer/dryer combo, treadmill, sleeper sofa & similar. */
  heavy: 169,
} as const;

/** Truck-volume tiers. 1/8 is also the minimum for 2+ items. */
export const TRUCK_TIERS = [
  { eighths: 1, label: "1/8 Truck", price: 179 },
  { eighths: 2, label: "1/4 Truck", price: 259 },
  { eighths: 3, label: "3/8 Truck", price: 349 },
  { eighths: 4, label: "1/2 Truck", price: 439 },
  { eighths: 5, label: "5/8 Truck", price: 529 },
  { eighths: 6, label: "3/4 Truck", price: 619 },
  { eighths: 7, label: "7/8 Truck", price: 699 },
  { eighths: 8, label: "Full Truck", price: 779 },
] as const;

export const ADD_ONS = {
  mattressOrBoxSpring: 25, // each
  tire: 20, // each
  tireWithRim: 35, // each
  freonAppliance: 40, // each (fridge, freezer, AC, dehumidifier)
  tvOrMonitor: 25, // each
  extraStairFlight: 25, // first flight free, then per flight
  longCarry: 25, // carry farther than LONG_CARRY_FEET
  heavyMaterialPerCubicYard: 165, // dirt, concrete, brick, roofing, tile, rock (max 1 ft deep)
  heavyMaterialMinimum: 275,
  hotTubFrom: 375,
  pianoSafePoolTableFrom: 299, // each
} as const;
export const LONG_CARRY_FEET = 100;

/** Hoarder conditions: +25%, always quoted by walkthrough. */
export const HOARDER_SURCHARGE = 0.25;
/** 2nd+ truck on the same job (walkthrough jobs). */
export const MULTI_TRUCK_DISCOUNT = 0.1;
/** First job booked through the Photo Quote tool: $25 off loads of 1/2 truck & up. No discounts on single items or 1/8. */
export const FIRST_JOB_DISCOUNT = { amount: 25, minEighths: 4 } as const;

export const NOT_ACCEPTED = ["Paint", "Chemicals", "Asbestos", "Biohazard"] as const;
export const QUOTE_DISCLAIMER = "Estimate based on photos. Final price confirmed on site before we start.";

/** What the AI returns (see the photo-quote-estimate endpoint). */
export interface AiEstimate {
  summary: string;
  item_count: number;
  single_item: boolean;
  heavy_single_item: boolean;
  truck_eighths: number;
  cubic_yards: number;
  over_one_truck: boolean;
  hoarder_conditions: boolean;
  mattresses: number;
  tires: number;
  tires_with_rim: number;
  freon_appliances: number;
  tvs_monitors: number;
  hot_tubs: number;
  pianos_safes_pool_tables: number;
  heavy_material_cubic_yards: number;
  prohibited_items: string[];
  not_junk_photo: boolean;
  confidence: "low" | "medium" | "high";
}

export type QuoteLocation = "curbside" | "inside";
export interface QuoteAnswers {
  location: QuoteLocation;
  stairsFlights: number; // 0, 1, 2, 3 (3 = 3 or more)
  longCarry: boolean;
  heavyMaterial: boolean;
  hoarder: boolean;
}

export interface QuoteLine { label: string; low: number; high: number }
export interface QuoteResult {
  outcome: "instant" | "walkthrough" | "manual";
  reason?: string;
  sizeLabel?: string;
  eighths?: number;
  low?: number;
  high?: number;
  lines: QuoteLine[];
  discount: number;
  notes: string[];
}

const clampInt = (value: unknown, min: number, max: number) => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
};
const tier = (eighths: number) => TRUCK_TIERS[clampInt(eighths, 1, 8) - 1];
const money = (n: number) => Math.round(n);

export function computeQuote(estimate: AiEstimate | null, answers: QuoteAnswers): QuoteResult {
  const notes: string[] = [];
  if (!estimate || estimate.not_junk_photo) {
    return { outcome: "manual", reason: estimate ? "Photos didn't show the items clearly" : "Estimate unavailable", lines: [], discount: 0, notes };
  }
  const prohibited = (estimate.prohibited_items ?? []).filter(Boolean);
  if (prohibited.length) notes.push(`We can't take ${NOT_ACCEPTED.join(", ")}. We'll leave those items behind.`);
  if (answers.hoarder || estimate.hoarder_conditions) {
    return { outcome: "walkthrough", reason: "hoarder", lines: [], discount: 0, notes };
  }
  if (estimate.over_one_truck) {
    return { outcome: "walkthrough", reason: "over_one_truck", lines: [], discount: 0, notes };
  }

  const lines: QuoteLine[] = [];
  let eighths = 0;
  let sizeLabel: string;
  const single = estimate.single_item && clampInt(estimate.item_count, 0, 99) <= 1;
  if (single) {
    const base = estimate.heavy_single_item ? SINGLE_ITEM.heavy : answers.location === "inside" ? SINGLE_ITEM.inside : SINGLE_ITEM.curbside;
    sizeLabel = estimate.heavy_single_item ? "Heavy Single Item" : answers.location === "inside" ? "Single Item, Inside" : "Single Item, Curbside";
    // Range tops out at the 1/8 minimum in case there's more than the photo shows.
    lines.push({ label: sizeLabel, low: base, high: Math.max(base, TRUCK_TIERS[0].price) });
  } else {
    eighths = clampInt(estimate.truck_eighths, 1, 8);
    const step = estimate.confidence === "low" ? 2 : 1;
    const low = tier(eighths);
    const high = tier(Math.min(8, eighths + step));
    sizeLabel = low.label === high.label ? `About ${low.label}` : `About ${low.label} To ${high.label}`;
    lines.push({ label: low.label === high.label ? low.label : `${low.label} To ${high.label}`, low: low.price, high: high.price });
    if (eighths === 8) notes.push(`If it needs a second truck, the 2nd truck is ${MULTI_TRUCK_DISCOUNT * 100}% off.`);
  }

  const each = (count: unknown, price: number, label: string) => {
    const n = clampInt(count, 0, 50);
    if (n > 0) lines.push({ label: `${label}${n > 1 ? ` x${n}` : ""}`, low: n * price, high: n * price });
  };
  each(estimate.mattresses, ADD_ONS.mattressOrBoxSpring, "Mattress / Box Spring");
  each(estimate.tires, ADD_ONS.tire, "Tire");
  each(estimate.tires_with_rim, ADD_ONS.tireWithRim, "Tire With Rim");
  each(estimate.freon_appliances, ADD_ONS.freonAppliance, "Freon Appliance");
  each(estimate.tvs_monitors, ADD_ONS.tvOrMonitor, "TV / Monitor");
  each(estimate.hot_tubs, ADD_ONS.hotTubFrom, "Hot Tub (From)");
  each(estimate.pianos_safes_pool_tables, ADD_ONS.pianoSafePoolTableFrom, "Piano, Safe Or Pool Table (From)");
  const flights = clampInt(answers.stairsFlights, 0, 3);
  if (flights > 1) lines.push({ label: `Stairs, ${flights - 1} Extra Flight${flights > 2 ? "s" : ""}${flights === 3 ? " Or More" : ""}`, low: (flights - 1) * ADD_ONS.extraStairFlight, high: (flights - 1) * ADD_ONS.extraStairFlight });
  if (answers.longCarry) lines.push({ label: `Carry Over ${LONG_CARRY_FEET} Ft`, low: ADD_ONS.longCarry, high: ADD_ONS.longCarry });
  const yards = Math.max(0, Number(estimate.heavy_material_cubic_yards) || 0);
  if (answers.heavyMaterial || yards > 0) {
    const charge = money(Math.max(ADD_ONS.heavyMaterialMinimum, Math.ceil(yards) * ADD_ONS.heavyMaterialPerCubicYard));
    lines.push({ label: yards > 0 ? `Heavy Material, About ${Math.ceil(yards)} Cu Yd` : "Heavy Material (From)", low: charge, high: charge });
    notes.push("Heavy material is priced by the cubic yard, up to 1 ft deep.");
  }

  const discount = !single && eighths >= FIRST_JOB_DISCOUNT.minEighths ? FIRST_JOB_DISCOUNT.amount : 0;
  const low = money(lines.reduce((sum, line) => sum + line.low, 0) - discount);
  const high = money(lines.reduce((sum, line) => sum + line.high, 0) - discount);
  notes.push("Same-day pickup is free when available.");
  return { outcome: "instant", sizeLabel, eighths: single ? 0 : eighths, low, high, lines, discount, notes };
}
