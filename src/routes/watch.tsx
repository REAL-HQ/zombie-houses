import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Play, Instagram, Youtube, Facebook, Music2 } from "lucide-react";

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
  { icon: Instagram, handle: "@zombiehouses", platform: "Instagram", href: "https://instagram.com" },
  { icon: Music2, handle: "@zombiehouses", platform: "TikTok", href: "https://tiktok.com" },
  { icon: Facebook, handle: "ZombieHouses", platform: "Facebook", href: "https://facebook.com" },
  { icon: Youtube, handle: "@zombiehouses", platform: "YouTube", href: "https://youtube.com" },
];

const BTS = [
  { tag: "BTS", title: "First walkthrough at Sherman's" },
  { tag: "Episode", title: "S12 E04 · The Lutz Teardown" },
  { tag: "Rescue", title: "Code-enforcement save in Largo" },
  { tag: "BTS", title: "Roof crew at 6am" },
  { tag: "Episode", title: "S12 E03 · A 1955 ranch reborn" },
  { tag: "BTS", title: "Sherman meets the team" },
];

function WatchPage() {
  return (
    <SiteLayout>
      <div className="bg-[#0e0e0e] text-white">
        <section className="max-w-[1160px] mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Watch</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06] max-w-3xl">
            Behind the Scenes. <em className="not-italic text-red font-display">Real Transformations.</em>
          </h1>
          <p className="mt-5 text-white/55 max-w-2xl text-lg">
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
          <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/55 mb-6">Where to Watch</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {SHOWS.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[18px] bg-white/[0.04] border border-white/10 overflow-hidden hover:border-white/30 transition-colors group"
              >
                <div className="aspect-video bg-gradient-to-br from-white/10 to-transparent relative flex items-center justify-center">
                  <Play className="w-10 h-10 text-white/40 group-hover:text-white transition-colors" />
                  <span className="absolute top-3 left-3 rounded-lg bg-black/60 backdrop-blur text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-1">{s.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{s.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-white/[0.03] border-y border-white/10">
          <div className="max-w-[1160px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[14px] border border-white/10 p-5 hover:border-white/40 transition-colors"
              >
                <s.icon className="w-5 h-5 text-red" />
                <p className="mt-3 text-[0.65rem] uppercase tracking-wider text-white/55">{s.platform}</p>
                <p className="font-semibold text-sm mt-0.5">{s.handle}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-red">Follow →</p>
              </a>
            ))}
          </div>
        </section>

        <section className="max-w-[1160px] mx-auto px-6 py-20">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] tracking-[-0.025em] mb-8">Latest from the field</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {BTS.map((b, i) => (
              <a
                key={i}
                href="#"
                className="rounded-[14px] overflow-hidden bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors group"
              >
                <div className="aspect-video bg-gradient-to-br from-[#2a1a0e] via-[#4a2f1c] to-[#1a0f08] relative">
                  <span className="absolute top-3 left-3 rounded-lg bg-black/60 backdrop-blur text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-1">{b.tag}</span>
                  <Play className="absolute inset-0 m-auto w-10 h-10 text-white/40 group-hover:text-white transition" />
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
