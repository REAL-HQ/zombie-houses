import { describe, expect, test } from 'bun:test';
import { filterPossibleSellers, SERVICE_LEAD_STATUSES, SERVICE_PHOTO_URL_TTL, serviceLeadUpdateSchema, formatServiceLeadDate } from '../src/lib/service-lead-admin';
import { serviceDestination } from '../src/lib/services-directory';
import { zipFromSearch } from '../src/lib/service-lead';

const credentials = { pin: 'test-only', id: '11111111-1111-4111-8111-111111111111' };
describe('service lead admin rules', () => {
  test('supports exactly the six service statuses', () => {
    expect(SERVICE_LEAD_STATUSES).toEqual(['new', 'contacted', 'quoted', 'booked', 'won', 'lost']);
    for (const status of SERVICE_LEAD_STATUSES) expect(serviceLeadUpdateSchema.safeParse({ ...credentials, status }).success).toBe(true);
    expect(serviceLeadUpdateSchema.safeParse({ ...credentials, status: 'offer_sent' }).success).toBe(false);
  });
  test('only possible sellers includes explicit yes, not no or unknown', () => {
    const leads = [{ thinking_of_selling: true }, { thinking_of_selling: false }, { thinking_of_selling: null }];
    expect(filterPossibleSellers(leads, true)).toEqual([leads[0]]);
    expect(filterPossibleSellers(leads, false)).toEqual(leads);
  });
  test('photo links expire after ten minutes', () => { expect(SERVICE_PHOTO_URL_TTL).toBe(600); });
  test('notes allow 10000 characters, not 10001', () => {
    expect(serviceLeadUpdateSchema.safeParse({ ...credentials, notes: 'x'.repeat(10000) }).success).toBe(true);
    expect(serviceLeadUpdateSchema.safeParse({ ...credentials, notes: 'x'.repeat(10001) }).success).toBe(false);
  });
  test('updates need status or notes', () => {
    expect(serviceLeadUpdateSchema.safeParse(credentials).success).toBe(false);
    expect(serviceLeadUpdateSchema.safeParse({ ...credentials, notes: '' }).success).toBe(true);
  });
  test('dates use Eastern time in winter and summer', () => {
    expect(formatServiceLeadDate('2026-01-15T17:00:00Z')).toContain('12:00 PM EST');
    expect(formatServiceLeadDate('2026-07-15T17:00:00Z')).toContain('1:00 PM EDT');
  });
});
describe('service destination rules', () => {
  for (const [title, path] of [
    ['Junk Removal', '/junk'], ['Hoarder & Estate Cleanouts', '/cleanouts'],
    ['Property Cleanouts', '/property-cleanouts'], ['Remodeling', '/remodel'],
    ['Sell Your House', '/sell'], ['Design & Shop the Look', '/design'], ['Rescue & Community', '/rescue'],
  ]) test(`${title} opens ${path}`, () => { expect(serviceDestination(title ?? '')).toBe(path); });
  test('unknown services cannot navigate', () => { expect(serviceDestination('unknown')).toBeUndefined(); });
  test('ZIP prefill preserves five digits and leading zero', () => {
    expect(zipFromSearch('?zip=33602')).toBe('33602');
    expect(zipFromSearch('?zip=01234')).toBe('01234');
    expect(zipFromSearch('?zip=1234')).toBe('');
  });
});
