import { createFileRoute } from "@tanstack/react-router";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Refreshes the long-lived Instagram access token (valid 60 days).
 * Call it at least every 50 days:
 *   GET /api/public/refresh-instagram-token?secret=<INSTAGRAM_REFRESH_SECRET>
 * The refreshed token is returned so it can be saved back as INSTAGRAM_ACCESS_TOKEN.
 */
export const Route = createFileRoute("/api/public/refresh-instagram-token")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const expected = process.env["INSTAGRAM_REFRESH_SECRET"];
        const provided = new URL(request.url).searchParams.get("secret");
        if (!expected || provided !== expected) {
          return json({ error: "Unauthorized" }, 401);
        }

        const token = process.env["INSTAGRAM_ACCESS_TOKEN"];
        if (!token) return json({ error: "INSTAGRAM_ACCESS_TOKEN is not configured" }, 400);

        const res = await fetch(
          `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
        );
        const data = (await res.json()) as {
          access_token?: string;
          expires_in?: number;
          error?: unknown;
        };

        if (!res.ok || !data.access_token) {
          return json({ error: "Refresh failed", details: data }, 502);
        }

        return json({
          ok: true,
          expires_in_days: data.expires_in ? Math.round(data.expires_in / 86400) : null,
          access_token: data.access_token,
          note: "Save this value back as the INSTAGRAM_ACCESS_TOKEN secret.",
        });
      },
    },
  },
});
