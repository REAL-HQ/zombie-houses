import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Play } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  fetchInstagram,
  fetchTikTok,
  fetchYouTube,
  fetchFacebook,
  type SocialPlatform,
  type SocialFeedResult,
} from "@/lib/social.functions";

const InstagramLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="17.6" cy="6.5" r="1.2" fill="#fff" />
  </svg>
);

const TikTokLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M16.5 2h-2.7v13.4a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V10a5.4 5.4 0 1 0 4.6 5.4V8.7a7 7 0 0 0 4.2 1.4V7.4c-2.3 0-4.2-1.9-4.2-5.4z" fill="#000" />
    <path d="M17.3 2.8h-2.7v13.4a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1v-2.8a5.4 5.4 0 1 0 4.6 5.4V9.5a7 7 0 0 0 4.2 1.4V8.2c-2.3 0-4.2-1.9-4.2-5.4z" fill="#25F4EE" opacity="0.8" style={{ mixBlendMode: "screen" }} />
    <path d="M15.7 1.2H13v13.4a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.2a5.4 5.4 0 1 0 4.6 5.4V7.9a7 7 0 0 0 4.2 1.4V6.6c-2.3 0-4.2-1.9-4.2-5.4z" fill="#FE2C55" opacity="0.8" style={{ mixBlendMode: "multiply" }} />
  </svg>
);

const FacebookLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" fill="#1877F2" />
  </svg>
);

const YouTubeLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C.1 8.4.1 12 .1 12s0 3.6.4 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-5.5.4-5.5s0-3.6-.4-5.5z" fill="#FF0000" />
    <path d="M9.8 15.5V8.5L15.8 12l-6 3.5z" fill="#fff" />
  </svg>
);

export const Route = createFileRoute("/watch")({
  head: () => ({
    meta: [
      { title: "Watch — Behind the Scenes | ZombieHouses" },
      {
        name: "description",
        content: "A&E episodes, YouTube BTS, and social — every flip, every rescue, every transformation.",
      },
      { property: "og:title", content: "Watch — ZombieHouses" },
      { property: "og:description", content: "From A&E to social. Every flip. Every rescue." },
    ],
  }),
  component: WatchPage,
});

const SHOWS = [
  { tag: "A&E Network", title: "Full Episodes", subtitle: "12 seasons of Zombie House Flipping", href: "https://www.aetv.com" },
  { tag: "YouTube", title: "Rescue BTS", subtitle: "Behind the scenes of every project", href: "https://youtube.com" },
  { tag: "Social", title: "Daily Updates", subtitle: "What we're doing today, in real time", href: "https://instagram.com" },
];

const SOCIALS = [
  { icon: InstagramLogo, handle: "@zombiehouses", platform: "Instagram", href: "https://instagram.com/zombiehouses" },
  { icon: TikTokLogo, handle: "@zombiehouses", platform: "TikTok", href: "https://tiktok.com/@zombiehouses" },
  { icon: FacebookLogo, handle: "@zombiehouses", platform: "Facebook", href: "https://facebook.com/zombiehouses" },
  { icon: YouTubeLogo, handle: "@zombiehouses", platform: "YouTube", href: "https://youtube.com/@zombiehouses" },
];

const FEED_TABS: {
  id: SocialPlatform;
  label: string;
  handle: string;
  href: string;
  Icon: (props: { className?: string }) => React.ReactElement;
}[] = [
  { id: "instagram", label: "Instagram", handle: "@zombiehouses", href: "https://instagram.com/zombiehouses", Icon: InstagramLogo },
  { id: "tiktok", label: "TikTok", handle: "@zombiehouses", href: "https://tiktok.com/@zombiehouses", Icon: TikTokLogo },
  { id: "youtube", label: "YouTube", handle: "@zombiehouses", href: "https://youtube.com/@zombiehouses", Icon: YouTubeLogo },
  { id: "facebook", label: "Facebook", handle: "@zombiehouses", href: "https://facebook.com/zombiehouses", Icon: FacebookLogo },
];

function SocialFeed({ platform }: { platform: SocialPlatform }) {
  const igFn = useServerFn(fetchInstagram);
  const ttFn = useServerFn(fetchTikTok);
  const ytFn = useServerFn(fetchYouTube);
  const fbFn = useServerFn(fetchFacebook);
  const fn =
    platform === "instagram" ? igFn
    : platform === "tiktok" ? ttFn
    : platform === "youtube" ? ytFn
    : fbFn;

  const { data, isLoading } = useQuery<SocialFeedResult>({
    queryKey: ["social-feed", platform],
    queryFn: () => fn(),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-[14px] bg-off border border-mid animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data?.configured) {
    const tab = FEED_TABS.find((t) => t.id === platform)!;
    return (
      <div className="rounded-[18px] border border-dashed border-mid bg-off p-10 text-center">
        <tab.Icon className="w-8 h-8 mx-auto" />
        <p className="mt-4 font-display text-xl">{tab.label} isn't connected yet</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Once credentials are added, your latest {tab.label} posts from {tab.handle} will sync here automatically.
        </p>
        <a
          href={tab.href}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-5 text-xs font-bold uppercase tracking-wider text-red"
        >
          View on {tab.label} →
        </a>
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="rounded-[18px] border border-mid bg-off p-10 text-center text-sm text-muted-foreground">
        No recent posts found.
        {data.error ? <span className="block mt-2 text-xs text-red">{data.error}</span> : null}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {data.items.slice(0, 9).map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noreferrer"
          className="rounded-[14px] overflow-hidden bg-off border border-mid hover:border-[#0e0e0e]/40 transition-colors group"
        >
          <div className="aspect-video bg-gradient-to-br from-[#2a1a0e] via-[#4a2f1c] to-[#1a0f08] relative overflow-hidden">
            {post.thumbnailUrl ? (
              <img
                src={post.thumbnailUrl}
                alt={post.caption.slice(0, 80) || `${post.platform} post`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : null}
            <span className="absolute top-3 left-3 rounded-lg bg-black/60 backdrop-blur text-white text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-1">
              {post.mediaType}
            </span>
            {post.mediaType !== "image" ? (
              <Play className="absolute inset-0 m-auto w-10 h-10 text-white/80 drop-shadow-lg" />
            ) : null}
          </div>
          <div className="p-4">
            <p className="font-semibold text-sm line-clamp-2">
              {post.caption || `Post from ${post.platform}`}
            </p>
            {post.timestamp ? (
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(post.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </p>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}


function WatchPage() {
  return (
    <SiteLayout>
      <div className="bg-white text-[#0e0e0e]">
        <section className="max-w-[1160px] mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Watch</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06] max-w-3xl">
            Behind the Scenes.<br /> <em className="not-italic text-red font-display">Real Transformations.</em>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
            From A&E to social — follow every flip, every rescue, and every before-and-after.
          </p>
        </section>

        <section className="max-w-[1160px] mx-auto px-6 pb-16">
          <div className="relative aspect-video rounded-[22px] overflow-hidden bg-gradient-to-br from-[#3a1a14] via-[#1a0a07] to-[#0e0e0e] flex items-center justify-center group cursor-pointer">
            <button className="w-20 h-20 rounded-lg bg-red flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block rounded-lg bg-red text-[0.65rem] font-bold uppercase tracking-[0.15em] px-3 py-1">Featured</span>
              <h2 className="mt-3 font-display text-2xl md:text-3xl">Sherman's Story — First Look</h2>
            </div>
          </div>
        </section>

        <section className="max-w-[1160px] mx-auto px-6 pb-20">
          <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-6">Where to Watch</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {SHOWS.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[18px] bg-off border border-mid overflow-hidden hover:border-[#0e0e0e]/40 transition-colors group"
              >
                <div className="aspect-video bg-gradient-to-br from-[#0e0e0e]/10 to-transparent relative flex items-center justify-center">
                  <Play className="w-10 h-10 text-[#0e0e0e]/40 group-hover:text-[#0e0e0e] transition-colors" />
                  <span className="absolute top-3 left-3 rounded-lg bg-[#0e0e0e] text-white text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-1">{s.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-off border-y border-mid">
          <div className="max-w-[1160px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[14px] border border-mid bg-white p-5 hover:border-[#0e0e0e] transition-colors"
              >
                <s.icon className="w-6 h-6" />
                <p className="mt-3 text-[0.65rem] uppercase tracking-wider text-muted-foreground">{s.platform}</p>
                <p className="font-semibold text-sm mt-0.5">{s.handle}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-red">Follow →</p>
              </a>
            ))}
          </div>
        </section>

        <section className="max-w-[1160px] mx-auto px-6 py-20">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] tracking-[-0.025em] mb-8">Latest From The Field</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {BTS.map((b, i) => (
              <a
                key={i}
                href="#"
                className="rounded-[14px] overflow-hidden bg-off border border-mid hover:border-[#0e0e0e]/40 transition-colors group"
              >
                <div className="aspect-video bg-gradient-to-br from-[#2a1a0e] via-[#4a2f1c] to-[#1a0f08] relative">
                  <span className="absolute top-3 left-3 rounded-lg bg-black/60 backdrop-blur text-white text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-1">{b.tag}</span>
                  <Play className="absolute inset-0 m-auto w-10 h-10 text-white/60 group-hover:text-white transition" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm">{b.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
