import { describe, expect, mock, test } from 'bun:test';

// Exercise the actual handlers without TanStack's HTTP wrapper; the PIN check remains real.
mock.module('@tanstack/react-start', () => ({
  createServerFn: () => {
    let validator: { parse: (data: unknown) => unknown };
    const builder = {
      inputValidator(schema: { parse: (data: unknown) => unknown }) { validator = schema; return builder; },
      handler(handler: (input: { data: unknown }) => Promise<unknown>) {
        return ({ data }: { data: unknown }) => handler({ data: validator.parse(data) });
      },
    };
    return builder;
  },
}));
let touchedAdmin = false;
let sort: unknown;
let ttl: unknown;
const query = {
  select: (_columns: string) => query,
  order: async (_column: string, options: unknown) => { touchedAdmin = true; sort = options; return { data: [], error: null }; },
  eq: (_column: string, _value: unknown) => query,
  single: async () => { touchedAdmin = true; return { data: { photo_paths: ['quotes/test/photo.jpg'] }, error: null }; },
};
mock.module('../src/integrations/supabase/client.server', () => ({ supabaseAdmin: {
  from: (_table: string) => { touchedAdmin = true; return query; },
  storage: { from: (_bucket: string) => ({ createSignedUrls: async (_paths: string[], expires: number) => { ttl = expires; return { data: [{ path: 'quotes/test/photo.jpg', signedUrl: 'https://example.com/signed-qa-photo' }], error: null }; } }) },
} }));
const { listPhotoQuotes, getPhotoQuotePhotoUrls } = await import('../src/lib/leads.functions');
const pin = process.env['ADMIN_LEADS_PIN'] ?? 'zhb2026';
const wrong = `${pin}-incorrect`;

describe('Photo Quote admin uses the unchanged server-side PIN check', () => {
  test('list refuses incorrect PIN before privileged access', async () => {
    touchedAdmin = false;
    await expect(listPhotoQuotes({ data: { pin: wrong } })).rejects.toThrow('Unauthorized');
    expect(touchedAdmin).toBe(false);
  });
  test('photo links refuse incorrect PIN before privileged access', async () => {
    touchedAdmin = false;
    await expect(getPhotoQuotePhotoUrls({ data: { pin: wrong, id: '11111111-1111-4111-8111-111111111111' } })).rejects.toThrow('Unauthorized');
    expect(touchedAdmin).toBe(false);
  });
  test('authorized requests are newest first', async () => {
    await listPhotoQuotes({ data: { pin } });
    expect(sort).toEqual({ ascending: false });
  });
  test('authorized signed photos expire after 600 seconds', async () => {
    const photos = await getPhotoQuotePhotoUrls({ data: { pin, id: '11111111-1111-4111-8111-111111111111' } });
    expect(ttl).toBe(600);
    expect(photos).toHaveLength(1);
  });
});
