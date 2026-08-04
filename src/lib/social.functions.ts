import { createServerFn } from "@tanstack/react-start";

export type SocialPlatform = "instagram" | "tiktok" | "youtube" | "facebook";

export type SocialPost = {
  id: string;
  platform: SocialPlatform;
  thumbnailUrl: string | null;
  permalink: string;
  caption: string;
  mediaType: "image" | "video" | "reel" | "carousel";
  timestamp: string | null;
};

export type SocialFeedResult = {
  items: SocialPost[];
  configured: boolean;
  error?: string;
};

const empty = (configured = false, error?: string): SocialFeedResult => ({
  items: [],
  configured,
  error,
});

// ---------------- Instagram (Graph API) ----------------
export const fetchInstagram = createServerFn({ method: "GET" }).handler(
  async (): Promise<SocialFeedResult> => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID ?? "me";
    if (!token) return empty(false);
    try {
      const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${token}`;
      const res = await fetch(url);
      if (!res.ok) return empty(true, `Instagram ${res.status}: ${await res.text()}`);
      const json = (await res.json()) as {
        data: Array<{
          id: string;
          caption?: string;
          media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
          media_url?: string;
          thumbnail_url?: string;
          permalink: string;
          timestamp: string;
        }>;
      };
      return {
        configured: true,
        items: json.data.map((p) => ({
          id: p.id,
          platform: "instagram",
          thumbnailUrl: p.thumbnail_url ?? p.media_url ?? null,
          permalink: p.permalink,
          caption: p.caption ?? "",
          mediaType:
            p.media_type === "VIDEO"
              ? "video"
              : p.media_type === "CAROUSEL_ALBUM"
                ? "carousel"
                : "image",
          timestamp: p.timestamp,
        })),
      };
    } catch (e) {
      return empty(true, e instanceof Error ? e.message : "Instagram fetch failed");
    }
  },
);

// ---------------- TikTok (Lovable connector gateway) ----------------
export const fetchTikTok = createServerFn({ method: "GET" }).handler(
  async (): Promise<SocialFeedResult> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const tiktokKey = process.env.TIKTOK_API_KEY;
    if (!lovableKey || !tiktokKey) return empty(false);
    try {
      const res = await fetch(
        "https://connector-gateway.lovable.dev/tiktok/video/list/?fields=id,title,cover_image_url,share_url,create_time,video_description",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": tiktokKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ max_count: 9 }),
        },
      );
      if (!res.ok) return empty(true, `TikTok ${res.status}: ${await res.text()}`);
      const json = (await res.json()) as {
        data?: {
          videos?: Array<{
            id: string;
            title?: string;
            video_description?: string;
            cover_image_url?: string;
            share_url: string;
            create_time?: number;
          }>;
        };
      };
      const videos = json.data?.videos ?? [];
      return {
        configured: true,
        items: videos.map((v) => ({
          id: v.id,
          platform: "tiktok",
          thumbnailUrl: v.cover_image_url ?? null,
          permalink: v.share_url,
          caption: v.title || v.video_description || "",
          mediaType: "video",
          timestamp: v.create_time ? new Date(v.create_time * 1000).toISOString() : null,
        })),
      };
    } catch (e) {
      return empty(true, e instanceof Error ? e.message : "TikTok fetch failed");
    }
  },
);

// ---------------- YouTube (Data API v3) ----------------
export const fetchYouTube = createServerFn({ method: "GET" }).handler(
  async (): Promise<SocialFeedResult> => {
    const key = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    if (!key || !channelId) return empty(false);
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet&order=date&maxResults=9&type=video`;
      const res = await fetch(url);
      if (!res.ok) return empty(true, `YouTube ${res.status}: ${await res.text()}`);
      const json = (await res.json()) as {
        items: Array<{
          id: { videoId: string };
          snippet: {
            title: string;
            publishedAt: string;
            thumbnails: { high?: { url: string }; medium?: { url: string } };
          };
        }>;
      };
      return {
        configured: true,
        items: json.items.map((v) => ({
          id: v.id.videoId,
          platform: "youtube",
          thumbnailUrl: v.snippet.thumbnails.high?.url ?? v.snippet.thumbnails.medium?.url ?? null,
          permalink: `https://www.youtube.com/watch?v=${v.id.videoId}`,
          caption: v.snippet.title,
          mediaType: "video",
          timestamp: v.snippet.publishedAt,
        })),
      };
    } catch (e) {
      return empty(true, e instanceof Error ? e.message : "YouTube fetch failed");
    }
  },
);

// ---------------- Facebook Page (Graph API) ----------------
export const fetchFacebook = createServerFn({ method: "GET" }).handler(
  async (): Promise<SocialFeedResult> => {
    const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;
    if (!token || !pageId) return empty(false);
    try {
      const url = `https://graph.facebook.com/v20.0/${pageId}/posts?fields=id,message,full_picture,permalink_url,created_time,attachments{media_type}&limit=9&access_token=${token}`;
      const res = await fetch(url);
      if (!res.ok) return empty(true, `Facebook ${res.status}: ${await res.text()}`);
      const json = (await res.json()) as {
        data: Array<{
          id: string;
          message?: string;
          full_picture?: string;
          permalink_url: string;
          created_time: string;
          attachments?: { data: Array<{ media_type?: string }> };
        }>;
      };
      return {
        configured: true,
        items: json.data.map((p) => ({
          id: p.id,
          platform: "facebook",
          thumbnailUrl: p.full_picture ?? null,
          permalink: p.permalink_url,
          caption: p.message ?? "",
          mediaType:
            p.attachments?.data[0]?.media_type === "video" ? "video" : "image",
          timestamp: p.created_time,
        })),
      };
    } catch (e) {
      return empty(true, e instanceof Error ? e.message : "Facebook fetch failed");
    }
  },
);
