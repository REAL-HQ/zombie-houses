import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroCouple from "@/assets/hero-couple.jpg";
import shermanHero from "@/assets/sherman-hero.jpg";
import storyLutz from "@/assets/recent-2.jpg";
import storyCleanup from "@/assets/recent-5.jpg";
import logoAE from "@/assets/logo-ae.png";
import logoDIY from "@/assets/logo-diy.png";
import logoFYI from "@/assets/logo-fyi.png";
import logoHGTV from "@/assets/logo-hgtv.png";
import logoHulu from "@/assets/logo-hulu.png";
import logoTampa from "@/assets/logo-tampabay.png";
import {
  ArrowRight,
  Video,
  Home as HomeIcon,
  Heart,
  Scissors,
  Droplets,
  Hammer,
  Trash2,
  Truck,
  Wrench,
  HardHat,
  ShieldAlert,
  Share2,
  AlertCircle,
  Zap,
  Snowflake,
} from "lucide-react";
import { activeRescue, comingSoonRescue, currency } from "@/data/rescues";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZombieHouses — Saving Homes. Changing Lives." },
      {
        name: "description",
        content:
          "We renovate neglected houses, rescue families in need, and restore hope to the communities they call home — one zombie house at a time.",
      },
      { property: "og:title", content: "ZombieHouses — Saving Homes. Changing Lives." },
      {
        property: "og:description",
        content: "Watch the A&E show. Sponsor a rescue. Sell your home fast. All in one place.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const active = activeRescue();
  const comingSoon = comingSoonRescue();
  return (
    <SiteLayout transparentNavOffset>
      <Hero />
      <FoundersSeenOn />
      {!active && comingSoon && <ComingSoonMission />}
      <Initiatives />
      <SellInline />
      <MissionStories />
      <VendorPreview />
      <SponsorsPreview />
      <ClosingStrip />
    </SiteLayout>
  );
}

function FoundersSeenOn() {
  const logos = [
    { src: logoAE, alt: "A&E" },
    { src: logoDIY, alt: "DIY Network" },
    { src: logoFYI, alt: "FYI" },
    { src: logoHGTV, alt: "HGTV" },
    { src: logoHulu, alt: "Hulu" },
    { src: logoTampa, alt: "Tampa Bay Times" },
  ];

  return (
    <section className="w-full bg-[hsl(0_0%_15%)] py-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-6">
        <p className="text-white/90 font-bold tracking-widest text-sm md:text-base shrink-0">
          FOUNDERS SEEN ON
        </p>
        <div className="flex flex-1 items-center justify-between gap-4 md:gap-6 min-w-0">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center h-16 md:h-24 w-[15%] min-w-[72px] max-w-[140px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Hero() {
  return (
    <section className="relative bg-[#0e0e0e] text-white w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroCouple}
          alt="Zombie House Rescue team standing in a neglected home"
          className="absolute inset-0 w-full h-full object-cover object-left"
          style={{ transform: "translateX(22%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] from-15% via-[#0e0e0e]/85 via-40% to-transparent to-75%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/40" />
      </div>

      <div className="relative w-full px-6 md:px-12 lg:px-20 pt-32 pb-24 md:pt-40 md:pb-36 min-h-[72vh] flex items-center">
        <div className="max-w-[600px]">
          <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/15 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em]">
            <span className="h-2 w-2 rounded-full bg-red pulse-dot" />
            As Seen on A&amp;E
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4rem)] leading-[1.04] tracking-[-0.03em]">
            Saving Homes.<br />
            <em className="not-italic text-red font-display">Changing Lives.</em>
          </h1>
          <p className="mt-6 text-[1.05rem] text-white/75 max-w-[760px] leading-relaxed">
            We renovate neglected houses, rescue families in need, and restore hope<br />
            to the communities they call home — one zombie house at a time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/rescue"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-[#0e0e0e] px-7 py-3.5 font-bold text-sm hover:bg-white/90 transition"
            >
              See Our Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/35 text-white px-7 py-3.5 font-bold text-sm hover:bg-white/10 transition"
            >
              Sell Your Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComingSoonMission() {
  const r = comingSoonRescue()!;
  return (
    <section className="relative bg-[#0e0e0e] text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-[1160px] mx-auto px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red" />
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">
            Why We're Launching Zombie House Rescue
          </p>
        </div>
        <h2 className="mt-3 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.05] tracking-[-0.03em] max-w-3xl">
          We Walked Into Sherman's Home.{" "}
          <em className="not-italic text-red font-display">We Couldn't Walk Away.</em>
        </h2>
        <p className="mt-5 text-white/70 leading-relaxed max-w-2xl">
          Sherman is 84. He built his Tampa home with his own hands in 1974. After years of medical
          bills and a predatory reverse mortgage, three years of unpaid property taxes put his home on
          the auction block. We went to buy it. Instead, we're fighting to save it. This is why Zombie
          House Rescue exists.
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-[22px] overflow-hidden border border-white/10 bg-white/[0.03] flex flex-col">
            <div className="aspect-[9/16] max-h-[560px] overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/-mRQEHQz3gE?rel=0&playsinline=1"
                title="Meet Sherman — Why We're Launching Zombie House Rescue"
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <p className="text-white/70 leading-relaxed flex-1">
                Sherman refused to sell. He said: <em>"I built this porch with my own two hands. I'd
                like to die looking out from it."</em> We heard that and decided — we're not buying
                this one. We're saving it.
              </p>
            </div>
          </div>

          <div className="rounded-[22px] bg-white text-[#0e0e0e] p-8 md:p-10 flex flex-col shadow-2xl">
            <span className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              <span className="w-2 h-2 rounded-full bg-[#555]" /> First Rescue — Launching Soon
            </span>
            <h3 className="font-display text-2xl md:text-3xl">{r.title}</h3>
            <p className="mt-2 text-muted-foreground text-sm">{r.location}</p>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              We're preparing Sherman's rescue campaign now — clearing title, verifying liens, and
              building the full fundraising plan. When we launch, every dollar will be publicly
              tracked and accounted for.
            </p>

            <div className="mt-6 rounded-xl border border-mid bg-off p-5">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                Phase 1 Goal
              </p>
              <p className="font-display text-3xl">{currency(r.phase1_goal)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Back taxes · Code violations · Title clearing · Temp housing
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/rescue/$slug"
                params={{ slug: r.slug }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red text-white px-6 py-3.5 font-bold text-sm hover:bg-[#b81830] transition"
              >
                Read Sherman's Story <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#0e0e0e] px-6 py-3.5 font-bold text-sm hover:bg-[#0e0e0e] hover:text-white transition"
              >
                Nominate a Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Initiatives() {
  const cards = [
    {
      icon: Video,
      title: "Zombie House Flipping",
      body: "Transforming neglected houses into beautiful homes.",
      tag: "Watch Now",
      to: "/watch" as const,
      red: false,
    },
    {
      icon: HomeIcon,
      title: "Zombie House Buyers",
      body: "Need to sell a distressed property? We buy houses in any condition in 3 days.",
      tag: "Get a Cash Offer",
      to: "/sell" as const,
      red: false,
    },
    {
      icon: Heart,
      title: "Zombie House Rescue",
      body: "Helping homeowners facing impossible situations through FREE cleanups, repairs, community support, and life-changing rescue projects.",
      tag: "Nominate Someone",
      to: "/rescue" as const,
      red: true,
    },
  ];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Three Initiatives</p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.025em]">
          We Don't Just Flip Houses.{" "}
          <em className="not-italic font-display text-red">We Rescue Them.</em>
        </h2>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
          One Mission. Three Ways We Help.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group rounded-[22px] border border-mid bg-white p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${
                  c.red ? "bg-red" : "bg-[#0e0e0e]"
                }`}
              >
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight">{c.title}</h3>
              <p className="mt-3 text-[0.95rem] text-muted-foreground leading-relaxed flex-1">{c.body}</p>
              <div className="mt-6 pt-5 border-t border-mid flex items-center justify-between">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {c.tag}
                </span>
                <span className="w-9 h-9 rounded-full bg-[#0e0e0e] text-white flex items-center justify-center group-hover:bg-red transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellInline() {
  return (
    <section className="bg-off py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Zombie House Buyers</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
            Got A Zombie House?<br /> <em className="not-italic text-red font-display">We'll Buy It.</em>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
            No repairs. No commissions. No showings. Just a fair cash offer in 24 hours and a closing date you choose.
          </p>
          <ul className="mt-8 space-y-3">
            {["No Repairs Needed", "Cash Offer in 24 Hours", "Close on Your Timeline", "Zero Fees or Commissions"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red" />
                <span className="font-semibold">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <SellFormCard />
      </div>
    </section>
  );
}

function SellFormCard({ compact = false }: { compact?: boolean }) {
  const [vals, setVals] = useState({ address: "", name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parts = vals.name.trim().split(" ");
      await supabase.from("sell_leads").insert({
        address: vals.address,
        first_name: parts[0] || vals.name,
        last_name: parts.slice(1).join(" "),
        email: vals.email,
        phone: vals.phone,
        status: "new",
      });
    } catch (err) {
      console.error("Lead submission error:", err);
    }
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-[20px] bg-white border border-mid p-8 md:p-9 text-center">
        <CheckCircle2 className="w-12 h-12 text-red mx-auto mb-3" />
        <h3 className="font-display text-2xl">You're All Set!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll call within 24 hours with your cash offer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] bg-white border border-mid p-8 md:p-9">
      {!compact && (
        <>
          <h3 className="font-display text-2xl">Get Your Cash Offer</h3>
          <p className="mt-1 text-sm text-muted-foreground">Takes 60 seconds. No obligation.</p>
        </>
      )}
      <div className="mt-6 space-y-3">
        <input
          required
          placeholder="Property Address"
          value={vals.address}
          onChange={(e) => setVals({ ...vals, address: e.target.value })}
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <input
          required
          placeholder="Your Name"
          value={vals.name}
          onChange={(e) => setVals({ ...vals, name: e.target.value })}
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <input
          required
          type="tel"
          placeholder="Phone"
          value={vals.phone}
          onChange={(e) => setVals({ ...vals, phone: e.target.value })}
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={vals.email}
          onChange={(e) => setVals({ ...vals, email: e.target.value })}
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#0e0e0e] text-white py-3.5 font-bold text-sm hover:bg-black transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Get My Cash Offer →"}
        </button>
        <p className="text-[0.7rem] text-muted-foreground text-center">
          Your info is never sold or shared. We'll call within 24 hours.
        </p>
      </div>
    </form>
  );
}

export { SellFormCard };

function MissionStories() {
  const cards = [
    {
      tag: "Sherman Rescue",
      title: "Saving a home before tax sale.",
      desc: "Inside our race to stop a Tampa auction.",
      to: "/rescue" as const,
      image: shermanHero,
      alt: "Sherman's Tampa home facing tax-deed sale",
    },
    {
      tag: "Zombie House Flipping",
      title: "Inside the Lutz teardown.",
      desc: "How a 1968 ranch got a second life.",
      to: "/watch" as const,
      image: storyLutz,
      alt: "Foundation and siding repair on a 1968 ranch in Lutz",
    },
    {
      tag: "Community Cleanup",
      title: "Helping a homeowner reclaim their property.",
      desc: "A weekend, a crew, and a fresh start.",
      to: "/rescue" as const,
      image: storyCleanup,
      alt: "Neglected property being cleared and restored by the crew",
    },
  ];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Mission Stories</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
              Stories Worth Saving.
            </h2>
          </div>
          <Link
            to="/rescue"
            className="inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
          >
            See All Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <Link key={c.title} to={c.to} className="group rounded-[18px] bg-off border border-mid overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-red">{c.tag}</span>
                <h3 className="mt-2 font-display text-xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function VendorPreview() {
  const cats = [
    { icon: HardHat, title: "Roofing" },
    { icon: Droplets, title: "Plumbing" },
    { icon: Zap, title: "Electrical" },
    { icon: Snowflake, title: "HVAC" },
    { icon: Scissors, title: "Landscaping" },
    { icon: Wrench, title: "Pressure Washing" },
    { icon: Trash2, title: "Junk Removal" },
    { icon: Truck, title: "Moving" },
    { icon: Hammer, title: "General Contracting" },
    { icon: ShieldAlert, title: "Crime Scene & Biohazard" },
  ];
  return (
    <section className="bg-off py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Vendor Network</p>
        <h2 className="mt-3 font-display text-[clamp(1.4rem,3vw,2.4rem)] tracking-[-0.025em] whitespace-nowrap">
          Trusted Vendors. Nationwide Impact.
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          Join the network helping us rescue homes and transform communities.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cats.map((c) => (
            <div key={c.title} className="rounded-[14px] border border-mid bg-white p-5 hover:border-[#0e0e0e] transition-colors">
              <c.icon className="w-5 h-5 text-red" />
              <p className="mt-3 font-semibold text-sm leading-snug">{c.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] bg-white border border-mid px-6 py-5">
          <p className="text-sm">
            <span className="font-bold">Contractor Or Service Provider?</span>{" "}
            <span className="text-muted-foreground">Join Our Vendor Network.</span>
          </p>
          <Link
            to="/sponsors"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0e0e0e] text-white px-5 py-2.5 text-sm font-bold hover:bg-black transition"
          >
            Apply as a Vendor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SponsorsPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Partner With Us</p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
          Sponsor A Rescue.
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="rounded-[22px] border-2 border-red bg-[#0e0e0e] text-white p-7 flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-red">Featured</span>
            <h3 className="mt-3 font-display text-2xl">Rescue Partner</h3>
            <p className="mt-1 text-white/55 text-sm">Featured mission sponsorship</p>
            <ul className="mt-5 space-y-2 text-sm text-white/75 flex-1">
              <li>· Named partner on an active rescue</li>
              <li>· Featured in mission video + social</li>
              <li>· Dedicated sponsor recognition</li>
              <li>· Tax receipt</li>
            </ul>
            <Link
              to="/sponsors"
              className="mt-7 rounded-lg bg-red text-white py-3 text-sm font-bold text-center hover:bg-[#b81830] transition"
            >
              Become a Rescue Partner →
            </Link>
          </div>
          <div className="rounded-[22px] border border-mid bg-off p-7 flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">Recurring</span>
            <h3 className="mt-3 font-display text-2xl">Community Partner</h3>
            <p className="mt-1 text-muted-foreground text-sm">Monthly supporter</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground flex-1">
              <li>· Sustained impact across every rescue</li>
              <li>· Recognition on our sponsor wall</li>
              <li>· Newsletter feature</li>
            </ul>
            <Link
              to="/sponsors"
              className="mt-7 rounded-lg border-[1.5px] border-[#0e0e0e] py-3 text-sm font-bold text-center hover:bg-[#0e0e0e] hover:text-white transition"
            >
              Become a Community Partner →
            </Link>
          </div>
          <div className="rounded-[22px] border border-mid bg-off p-7 flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">Individual</span>
            <h3 className="mt-3 font-display text-2xl">Donate</h3>
            <p className="mt-1 text-muted-foreground text-sm">Support active rescue missions</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground flex-1">
              <li>· Goes directly to a family in need</li>
              <li>· 100% transparent ledger</li>
              <li>· Tax-deductible · any amount</li>
            </ul>
            <Link
              to="/rescue"
              className="mt-7 rounded-lg border-[1.5px] border-[#0e0e0e] py-3 text-sm font-bold text-center hover:bg-[#0e0e0e] hover:text-white transition"
            >
              Donate Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingStrip() {
  return (
    <section className="bg-[#0e0e0e] text-white">
      <div className="max-w-[1160px] mx-auto px-6 py-24 md:py-32 text-center">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.03em]">
          Saving Homes. <em className="not-italic font-display text-red">Changing Lives.</em>
        </h2>
        <p className="mt-5 text-white/55 max-w-xl mx-auto leading-relaxed">
          Zombie House Rescue is launching soon. We're preparing our first campaign and are accepting
          nominations, sponsors, and volunteers now. Get involved.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 rounded-lg bg-red text-white px-7 py-3.5 font-bold text-sm hover:bg-[#b81830] transition"
          >
            <HomeIcon className="w-4 h-4" /> Nominate A Homeowner
          </Link>
          <Link
            to="/sponsors"
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/35 text-white px-7 py-3.5 font-bold text-sm hover:bg-white/10 transition"
          >
            Become A Sponsor
          </Link>
        </div>
      </div>
    </section>
  );
}
