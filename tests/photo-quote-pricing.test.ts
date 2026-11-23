import { describe, expect, test } from 'bun:test';
import { AD_ANCHOR_PRICE, ADD_ONS, computeQuote, FIRST_JOB_DISCOUNT, HOARDER_SURCHARGE, LONG_CARRY_FEET, MULTI_TRUCK_DISCOUNT, NOT_ACCEPTED, PRICING_VERSION, SINGLE_ITEM, TRUCK_CUBIC_YARDS, TRUCK_TIERS, type AiEstimate, type QuoteAnswers } from '../src/lib/junk-quote-pricing';
import { quoteEstimateInput, QUOTE_PHOTO_URL_TTL } from '../src/lib/photo-quote-schema';
import { readEstimateStream, sanitizeEstimate, sessionProof, verifySession } from '../src/lib/photo-quote.server';

const base: AiEstimate = { summary: 'Furniture and bags', item_count: 2, single_item: false, heavy_single_item: false, truck_eighths: 1, cubic_yards: 1.875, over_one_truck: false, hoarder_conditions: false, mattresses: 0, tires: 0, tires_with_rim: 0, freon_appliances: 0, tvs_monitors: 0, hot_tubs: 0, pianos_safes_pool_tables: 0, heavy_material_cubic_yards: 0, prohibited_items: [], not_junk_photo: false, confidence: 'high' };
const answers: QuoteAnswers = { location: 'curbside', stairsFlights: 0, longCarry: false, heavyMaterial: false, hoarder: false };
const estimate = (patch: Partial<AiEstimate> = {}) => ({ ...base, ...patch });

describe('Dolmar approved Photo Quote pricing', () => {
  test('pricing version is November 23 and provisional truck is 15 cubic yards', () => { expect(PRICING_VERSION).toBe('2026-11-23'); expect(TRUCK_CUBIC_YARDS).toBe(15); });
  test('ad anchor is $99', () => expect(AD_ANCHOR_PRICE).toBe(99));
  for (const [location, heavy, price] of [['curbside', false, 99], ['inside', false, 139], ['curbside', true, 169]] as const) {
    test(`${location} single item, heavy ${heavy}, starts at $${price}`, () => {
      const result = computeQuote(estimate({ item_count: 1, single_item: true, heavy_single_item: heavy }), { ...answers, location });
      expect(result.low).toBe(price); expect(result.high).toBe(179); expect(result.discount).toBe(0);
    });
  }
  test('single-item constants remain $99/$139/$169', () => expect(SINGLE_ITEM).toEqual({ curbside: 99, inside: 139, heavy: 169 }));
  const prices = [179, 259, 349, 439, 529, 619, 699, 779];
  for (const [index, price] of prices.entries()) test(`${index + 1}/8 truck costs $${price} before discount`, () => {
    const result = computeQuote(estimate({ truck_eighths: index + 1 }), answers);
    expect(TRUCK_TIERS[index]?.price).toBe(price);
    expect((result.low ?? 0) + result.discount).toBe(price);
    expect((result.high ?? 0) + result.discount).toBe(prices[Math.min(7, index + 1)]);
  });
  test('2+ items have at least the $179 eighth-truck minimum', () => expect(computeQuote(estimate({ truck_eighths: 0, single_item: true }), answers).low).toBe(179));
  test('low confidence widens by two eighths', () => expect(computeQuote(estimate({ confidence: 'low' }), answers).high).toBe(349));
  for (const [field, price] of [['mattresses', 25], ['tires', 20], ['tires_with_rim', 35], ['freon_appliances', 40], ['tvs_monitors', 25], ['hot_tubs', 375], ['pianos_safes_pool_tables', 299]] as const) {
    test(`${field} costs $${price} each`, () => expect(computeQuote(estimate({ [field]: 2 }), answers).low).toBe(179 + price * 2));
  }
  test('first stair flight is free', () => expect(computeQuote(base, { ...answers, stairsFlights: 1 }).low).toBe(179));
  test('second stair flight adds $25', () => expect(computeQuote(base, { ...answers, stairsFlights: 2 }).low).toBe(204));
  test('3+ stair flights add $50 minimum', () => expect(computeQuote(base, { ...answers, stairsFlights: 3 }).low).toBe(229));
  test('carry over 100 feet adds $25', () => { expect(LONG_CARRY_FEET).toBe(100); expect(computeQuote(base, { ...answers, longCarry: true }).low).toBe(204); });
  test('heavy material starts at $275', () => { expect(ADD_ONS.heavyMaterialMinimum).toBe(275); expect(computeQuote(base, { ...answers, heavyMaterial: true }).low).toBe(454); });
  test('heavy material costs $165 per rounded-up cubic yard', () => expect(computeQuote(estimate({ heavy_material_cubic_yards: 2.1 }), answers).low).toBe(179 + 3 * 165));
  test('hoarder customer answer requires walkthrough', () => expect(computeQuote(base, { ...answers, hoarder: true }).outcome).toBe('walkthrough'));
  test('AI hoarder flag requires walkthrough', () => expect(computeQuote(estimate({ hoarder_conditions: true }), answers).reason).toBe('hoarder'));
  test('hoarder surcharge is 25 percent for walkthrough pricing', () => expect(HOARDER_SURCHARGE).toBe(0.25));
  test('over one truck requires walkthrough', () => expect(computeQuote(estimate({ over_one_truck: true }), answers).reason).toBe('over_one_truck'));
  test('additional truck discount is 10 percent', () => expect(MULTI_TRUCK_DISCOUNT).toBe(0.1));
  test('$25 first-job discount starts at half-truck', () => { expect(FIRST_JOB_DISCOUNT).toEqual({ amount: 25, minEighths: 4 }); expect(computeQuote(estimate({ truck_eighths: 4 }), answers).low).toBe(414); expect(computeQuote(estimate({ truck_eighths: 3 }), answers).discount).toBe(0); });
  test('full truck is $754 after first-job discount', () => { const result = computeQuote(estimate({ truck_eighths: 8 }), answers); expect(result.low).toBe(754); expect(result.high).toBe(754); });
  test('paint, chemicals, asbestos and biohazard are excluded', () => expect(NOT_ACCEPTED).toEqual(['Paint', 'Chemicals', 'Asbestos', 'Biohazard']));
  test('missing AI result requests manual quote without prices', () => { const result = computeQuote(null, answers); expect(result.outcome).toBe('manual'); expect(result.low).toBeUndefined(); });
  test('unusable photos request manual quote', () => expect(computeQuote(estimate({ not_junk_photo: true }), answers).outcome).toBe('manual'));
});

describe('private Photo Quote access and limits', () => {
  const folder = '11111111-1111-4111-8111-111111111111';
  const path = `quotes/${folder}/22222222-2222-4222-8222-222222222222.webp`;
  const input = { photo_paths: [path], session: { folder, expires: Date.now() + 60000, proof: 'a'.repeat(64) }, answers };
  test('one to six photos, never zero or seven', () => { expect(quoteEstimateInput.safeParse(input).success).toBe(true); expect(quoteEstimateInput.safeParse({ ...input, photo_paths: Array(6).fill(path) }).success).toBe(true); for (const count of [0, 7]) expect(quoteEstimateInput.safeParse({ ...input, photo_paths: Array(count).fill(path) }).success).toBe(false); });
  test('cannot estimate another upload folder', () => expect(quoteEstimateInput.safeParse({ ...input, session: { ...input.session, folder: '33333333-3333-4333-8333-333333333333' } }).success).toBe(false));
  test('rejects non-image and traversal paths', () => { for (const invalid of ['../private.jpg', path.replace('.webp', '.pdf')]) expect(quoteEstimateInput.safeParse({ ...input, photo_paths: [invalid] }).success).toBe(false); });
  test('stairs limited to zero through three', () => { for (const stairsFlights of [-1, 4, 1.5]) expect(quoteEstimateInput.safeParse({ ...input, answers: { ...answers, stairsFlights } }).success).toBe(false); });
  test('admin photo URLs last ten minutes', () => expect(QUOTE_PHOTO_URL_TTL).toBe(600));
  test('signed sessions reject forgery and expiration', async () => {
    const expires = Date.now() + 60000; const proof = await sessionProof(folder, expires, 'test-secret');
    expect(await verifySession({ folder, expires, proof }, 'test-secret')).toBe(true);
    expect(await verifySession({ folder, expires, proof: '0'.repeat(64) }, 'test-secret')).toBe(false);
    const expired = Date.now() - 1000;
    expect(await verifySession({ folder, expires: expired, proof: await sessionProof(folder, expired, 'test-secret') }, 'test-secret')).toBe(false);
  });
  test('AI values are bounded and prohibited flags are allowlisted', () => { const clean = sanitizeEstimate({ mattresses: -10, truck_eighths: 100, tires: 1000, prohibited_items: ['paint', 'invented'], confidence: 'unknown' }); expect(clean.mattresses).toBe(0); expect(clean.truck_eighths).toBe(8); expect(clean.tires).toBe(50); expect(clean.prohibited_items).toEqual(['paint']); expect(clean.confidence).toBe('low'); });
  test('split streaming tool arguments reconstruct a real estimate', async () => {
    const args = JSON.stringify(base);
    const body = `data: ${JSON.stringify({ choices: [{ delta: { tool_calls: [{ index: 0, function: { arguments: args.slice(0, 33) } }] } }] })}\n\ndata: ${JSON.stringify({ choices: [{ delta: { tool_calls: [{ index: 0, function: { arguments: args.slice(33) } }] }, finish_reason: 'tool_calls' }] })}\n\ndata: [DONE]\n\n`;
    const chunks = new TextEncoder().encode(body);
    const stream = new ReadableStream({ start(controller) { for (let i = 0; i < chunks.length; i += 17) controller.enqueue(chunks.slice(i, i + 17)); controller.close(); } });
    expect(await readEstimateStream(new Response(stream))).toEqual(base);
  });
  test('refusals never produce an estimate', async () => {
    const body = 'data: {"choices":[{"delta":{"refusal":"blocked"},"finish_reason":"content_filter"}]}\n\n';
    expect(readEstimateStream(new Response(body))).rejects.toThrow('ai_refusal');
  });
});
