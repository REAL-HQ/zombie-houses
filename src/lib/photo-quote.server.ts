import { TRUCK_CUBIC_YARDS, type AiEstimate } from "./junk-quote-pricing";
import { createLovableAiGatewayRunIdFetch } from "./photo-quote-run-id.server";

// The requested Gemini 2.5 Flash retired on 2026-10-20. Do not substitute a model
// without Dolmar's approval. Set this to an approved, catalog-verified model to activate AI.
export const PHOTO_QUOTE_MODEL: string | null = null;

export async function sessionProof(folder: string, expires: number, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`photo-quote:${folder}:${expires}`));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
export async function verifySession(session: { folder: string; expires: number; proof: string }, secret: string) {
  if (session.expires < Date.now() || session.expires > Date.now() + 60 * 60 * 1000) return false;
  const expected = await sessionProof(session.folder, session.expires, secret);
  let difference = expected.length ^ session.proof.length;
  for (let index = 0; index < expected.length; index++) difference |= expected.charCodeAt(index) ^ session.proof.charCodeAt(index);
  return difference === 0;
}

const SYSTEM = `You estimate junk removal jobs from customer photos for a Tampa junk hauler.
The truck holds ${TRUCK_CUBIC_YARDS} cubic yards. One eighth of the truck is about ${(TRUCK_CUBIC_YARDS / 8).toFixed(1)} cubic yards.
Size guide: a full-size pickup bed heaped level is about 2 to 3 cubic yards (about 1/8 to 1/6 truck). A sofa is about 1.5 to 2 cubic yards. A queen mattress & box spring is about 1 cubic yard. A refrigerator is about 1 cubic yard. A one-car garage packed to shoulder height is about one full truck.
Rules:
- Several photos may show the SAME pile or room from different angles. Do not double count.
- Estimate only what would be hauled away (loose junk, furniture, debris), not the house, built-in cabinets, walls or fixtures unless they are clearly torn out & piled.
- truck_eighths: total load volume rounded to the nearest eighth of the truck (1 to 8). If the load is clearly more than one full truck, set over_one_truck true & truck_eighths 8.
- single_item: true only if the photos show exactly one item to haul. heavy_single_item: true if that one item is something like a washer/dryer combo, treadmill, sleeper sofa or a similar very heavy item.
- hoarder_conditions: true if rooms are packed with clutter (floor buried, narrow pathways, piles to waist height or higher across a room, or unsanitary conditions).
- Count add-on items you can actually see: mattresses or box springs, tires (with or without rims), freon appliances (refrigerator, freezer, window or portable AC, dehumidifier, water cooler), TVs or monitors, hot tubs, pianos, safes, pool tables.
- heavy_material_cubic_yards: loose dirt, concrete, brick, rock, roofing shingles or tile, in cubic yards. 0 if none.
- prohibited_items: list any of "paint", "chemicals", "asbestos", "biohazard" you can see (paint cans, chemical containers, suspected asbestos tile or siding, human or animal waste, needles). Empty if none.
- not_junk_photo: true if the photos do not show anything to haul or are unusable (blurry, dark, unrelated).
- confidence: low if the photos are partial, dark, close-up or you can't judge the full pile.
- summary: one short plain sentence (under 160 characters) describing what you see. No prices.
Always answer by calling report_estimate.`;

const SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    item_count: { type: "integer", description: "Approximate number of separate items or bags; 1 for a single item" },
    single_item: { type: "boolean" }, heavy_single_item: { type: "boolean" },
    truck_eighths: { type: "integer", minimum: 1, maximum: 8 }, cubic_yards: { type: "number" },
    over_one_truck: { type: "boolean" }, hoarder_conditions: { type: "boolean" },
    mattresses: { type: "integer" }, tires: { type: "integer" }, tires_with_rim: { type: "integer" },
    freon_appliances: { type: "integer" }, tvs_monitors: { type: "integer" }, hot_tubs: { type: "integer" },
    pianos_safes_pool_tables: { type: "integer" }, heavy_material_cubic_yards: { type: "number" },
    prohibited_items: { type: "array", items: { type: "string", enum: ["paint", "chemicals", "asbestos", "biohazard"] } },
    not_junk_photo: { type: "boolean" }, confidence: { type: "string", enum: ["low", "medium", "high"] },
  },
  required: ["summary", "item_count", "single_item", "heavy_single_item", "truck_eighths", "cubic_yards", "over_one_truck", "hoarder_conditions", "mattresses", "tires", "tires_with_rim", "freon_appliances", "tvs_monitors", "hot_tubs", "pianos_safes_pool_tables", "heavy_material_cubic_yards", "prohibited_items", "not_junk_photo", "confidence"],
  additionalProperties: false,
};
const int = (v: unknown, max = 50) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0; };
const num = (v: unknown, max = 100) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0; };
export function sanitizeEstimate(raw: Record<string, unknown>): AiEstimate {
  const allowed = ["paint", "chemicals", "asbestos", "biohazard"];
  return {
    summary: String(raw['summary'] ?? "").slice(0, 300), item_count: int(raw['item_count'], 999),
    single_item: raw['single_item'] === true, heavy_single_item: raw['heavy_single_item'] === true,
    truck_eighths: Math.min(8, Math.max(1, int(raw['truck_eighths'], 8) || 1)), cubic_yards: num(raw['cubic_yards']),
    over_one_truck: raw['over_one_truck'] === true, hoarder_conditions: raw['hoarder_conditions'] === true,
    mattresses: int(raw['mattresses']), tires: int(raw['tires']), tires_with_rim: int(raw['tires_with_rim']),
    freon_appliances: int(raw['freon_appliances']), tvs_monitors: int(raw['tvs_monitors']), hot_tubs: int(raw['hot_tubs'], 5),
    pianos_safes_pool_tables: int(raw['pianos_safes_pool_tables'], 10), heavy_material_cubic_yards: num(raw['heavy_material_cubic_yards']),
    prohibited_items: Array.isArray(raw['prohibited_items']) ? raw['prohibited_items'].map(String).filter((x) => allowed.includes(x)) : [],
    not_junk_photo: raw['not_junk_photo'] === true,
    confidence: raw['confidence'] === "high" || raw['confidence'] === "medium" ? raw['confidence'] : "low",
  };
}

export async function readEstimateStream(response: Response) {
  if (!response.body) throw new Error("ai_no_estimate");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let args = "";
  let finished = false;
  function consume(line: string) {
    if (!line.startsWith("data:")) return;
    const value = line.slice(5).trim();
    if (!value || value === "[DONE]") return;
    const event = JSON.parse(value);
    if (event.error) throw new Error("ai_error");
    const choice = event.choices?.[0];
    if (choice?.finish_reason) finished = true;
    if (choice?.finish_reason === "content_filter" || choice?.delta?.refusal) throw new Error("ai_refusal");
    for (const call of choice?.delta?.tool_calls ?? []) if (call.index === 0) args += call.function?.arguments ?? "";
  }
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      let newline: number;
      while ((newline = buffer.indexOf("\n")) >= 0) { consume(buffer.slice(0, newline).replace(/\r$/, "")); buffer = buffer.slice(newline + 1); }
      if (done) break;
    }
    if (buffer.trim()) consume(buffer.trim());
    if (!finished || !args) throw new Error("ai_no_estimate");
    const raw: unknown = JSON.parse(args);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("ai_no_estimate");
    return sanitizeEstimate(raw as Record<string, unknown>);
  } finally { reader.releaseLock(); }
}

export async function estimatePhotos(images: { type: "image_url"; image_url: { url: string } }[], answersText: string, apiKey: string, model: string) {
  const gateway = createLovableAiGatewayRunIdFetch();
  const response = await gateway.fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "X-Lovable-AIG-SDK": "fetch" },
    body: JSON.stringify({ model, stream: true,
      messages: [{ role: "system", content: SYSTEM }, { role: "user", content: [{ type: "text", text: `${answersText}\nEstimate this job from the ${images.length} photo(s).` }, ...images] }],
      tools: [{ type: "function", function: { name: "report_estimate", description: "Report the junk removal volume estimate.", parameters: SCHEMA } }],
      tool_choice: { type: "function", function: { name: "report_estimate" } },
    }),
  });
  if (!response.ok) {
    console.error("Photo Quote AI gateway status", response.status);
    return { ok: false as const, error: response.status === 429 ? "rate_limited" : response.status === 402 ? "ai_credits" : response.status === 403 ? "ai_denied" : "ai_error" };
  }
  return { ok: true as const, model, estimate: await readEstimateStream(response) };
}
