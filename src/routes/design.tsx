import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design Inspiration — ZombieHouses" },
      {
        name: "description",
        content: "Before-and-afters from our A&E flips. Shop the look. Design guides for your next project.",
      },
      { property: "og:title", content: "Design Inspiration — ZombieHouses" },
      { property: "og:description", content: "Real flips. Real before-and-afters." },
    ],
  }),
  component: DesignPage,
});

const FILTERS = ["All", "Before & After", "Design Guides", "Shop the Look", "Floor Plans"] as const;

const POSTS = [
  { tag: "Before & After", title: "1968 ranch · Tampa", desc: "How we opened up 1,400 sq ft without moving a wall." },
  { tag: "Shop the Look", title: "Sherman's kitchen", desc: "Exact paint, fixtures, and finishes — under $4,800." },
  { tag: "Design Guide", title: "Choosing paint colors for flips", desc: "The 4 palettes that sell every time." },
  { tag: "Before & After", title: "1942 bungalow · St. Pete", desc: "Saved from demolition. Restored in 17 weeks." },
  { tag: "Floor Plans", title: "Open-concept three-bed", desc: "The layout we use on most ranch-style flips." },
  { tag: "Design Guide", title: "Kitchen remodel on a budget", desc: "What to splurge on, what to skip." },
] as const;

const PRODUCTS = [
  { name: "Matte black faucet", price: "$89–$140", room: "Kitchen" },
  { name: "Brass cabinet pulls (10pk)", price: "$32", room: "Kitchen" },
  { name: "Schoolhouse pendant", price: "$120", room: "Dining" },
  { name: "LVP flooring (sq ft)", price: "$2.30", room: "Whole home" },
  { name: "Linen roman shades", price: "$45 ea", room: "Bedroom" },
  { name: "Subway tile (sq ft)", price: "$1.20", room: "Bath" },
  { name: "Wide-plank shelving", price: "$28 ea", room: "Living" },
  { name: "Brass shower set", price: "$240", room: "Bath" },
] as const;

function DesignPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = filter === "All" ? POSTS : POSTS.filter((p) => p.tag === filter);

  return (
    <SiteLayout>
      <section className="max-w-[1160px] mx-auto px-6 pt-16 pb-10 md:pt-24">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Inspiration</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06] whitespace-nowrap">
          The Transformations That <em className="not-italic text-red font-display">Started It All.</em>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Get inspired by our before-and-afters. Shop the look. Explore floor plans and design ideas from our A&E projects.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                filter === f
                  ? "bg-[#0e0e0e] text-white"
                  : "border border-mid hover:border-[#0e0e0e]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1160px] mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.title} className="rounded-[18px] border border-mid bg-card overflow-hidden group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3a2418] via-[#5a3a26] to-[#1a0f08] group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 rounded-lg bg-white text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-1">
                  {p.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-red">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-off py-20 md:py-28">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Shop the Look</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
                The Exact Finishes From Our Flips.
              </h2>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
            {PRODUCTS.map((p) => (
              <a
                key={p.name}
                href="#"
                className="group rounded-[14px] bg-white border border-mid overflow-hidden hover:border-[#0e0e0e] transition-colors"
              >
                <div className="aspect-square bg-gradient-to-br from-[#e5e1da] to-[#f8f7f4] relative">
                  <span className="absolute top-2 left-2 rounded-lg bg-white/90 text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5">
                    {p.room}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-xs font-bold inline-flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5" /> Shop on Amazon
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold leading-tight">{p.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
