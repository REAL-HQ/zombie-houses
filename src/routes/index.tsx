import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroCouple from "@/assets/hero-couple.jpg";
import shermanHero from "@/assets/sherman-hero.jpg";
import logoAE from "@/assets/logo-ae.png";
import logoDIY from "@/assets/logo-diy.png";
import logoHGTV from "@/assets/logo-hgtv.png";
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
import { activeRescue, currency, daysRemaining, percent } from "@/data/rescues";

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
  return (
    <SiteLayout transparentNavOffset>
      <Hero />
      <FoundersSeenOn />
      {active && <CurrentRescueMission />}
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
  return (
    <section className="w-full bg-[hsl(0_0%_15%)] py-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-around gap-6">
        <p className="text-white/90 font-bold tracking-widest text-sm md:text-base">
          FOUNDERS SEEN ON
        </p>
        <img src={logoAE} alt="A&E" loading="lazy" className="h-16 md:h-24 w-auto object-contain" />
        <img src={logoDIY} alt="DIY Network" loading="lazy" className="h-16 md:h-24 w-auto object-contain" />
        <img src={logoHGTV} alt="HGTV" loading="lazy" className="h-16 md:h-24 w-auto object-contain" />
        <img src={logoTampa} alt="Tampa Bay Times" loading="lazy" className="h-20 md:h-28 w-auto object-contain" />
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

function CurrentRescueMission() {
  const r = activeRescue()!;
  const pct = percent(r.raised, r.phase1_goal);
  const days = daysRemaining(r.deadline);
  const deadlineLabel = new Date(r.deadline).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return (
    <section className="relative bg-[#0e0e0e] text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red/10 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-[1160px] mx-auto px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red pulse-dot" />
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">
            Current Rescue Mission
          </p>
        </div>
        <h2 className="mt-3 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.05] tracking-[-0.03em] max-w-none whitespace-nowrap">
          Sherman Could Lose Everything <em className="not-italic text-red font-display">This Week.</em>
        </h2>
        <p className="mt-5 text-white/75 leading-relaxed max-w-2xl">
          Sherman is facing a tax deed sale, a collapsed roof, and a city order to vacate his home. Rain pours through the ceiling every time it storms. We're racing against time to help him keep the home he refuses to give up on.
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Sherman story */}
          <div className="rounded-[22px] overflow-hidden border border-white/10 bg-white/[0.03] flex flex-col">
            <div className="aspect-[9/16] max-h-[560px] overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/-mRQEHQz3gE?rel=0&playsinline=1"
                title="Meet Sherman — Zombie House Rescue"
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <p className="text-white/80 leading-relaxed flex-1">
                Sherman, 84, built the back porch of his Tampa home with his own two hands in 1974. After his wife's illness drained their savings, three years of unpaid property taxes have put the home he raised his family in on the courthouse auction block.
              </p>
              <Link
                to="/rescue/$slug"
                params={{ slug: r.slug }}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border-[1.5px] border-white/35 px-6 py-3 font-bold text-sm hover:bg-white/10 transition"
              >
                Meet Sherman <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Campaign card */}
          <div className="rounded-[22px] bg-white text-[#0e0e0e] p-8 md:p-10 flex flex-col shadow-2xl">
            <h3 className="font-display text-2xl md:text-3xl flex items-center gap-2">
              Save Sherman's Home <Heart className="w-6 h-6 text-red fill-red" />
            </h3>

            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display text-3xl md:text-4xl">{currency(r.raised)}</span>
                <span className="text-sm text-muted-foreground">of {currency(r.phase1_goal)}</span>
              </div>
              <div className="h-3 bg-mid rounded-full overflow-hidden">
                <div className="h-full bg-red rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{r.donor_count} donors</p>
            </div>

            {/* Urgency block */}
            <div className="mt-6 rounded-xl border-2 border-red bg-red/5 p-5">
              <div className="flex items-center gap-2 text-red font-bold text-[0.7rem] uppercase tracking-[0.15em]">
                <AlertCircle className="w-4 h-4" />
                Tax Sale Deadline
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl text-[#0e0e0e]">{deadlineLabel}</span>
                <span className="font-display text-3xl text-red">
                  {days} <span className="text-base font-bold uppercase tracking-wider">days left</span>
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/rescue/$slug"
                params={{ slug: r.slug }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red text-white px-6 py-3.5 font-bold text-sm hover:bg-[#b81830] transition"
              >
                Donate Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/rescue/$slug"
                params={{ slug: r.slug }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#0e0e0e] px-6 py-3.5 font-bold text-sm hover:bg-[#0e0e0e] hover:text-white transition"
              >
                <Share2 className="w-4 h-4" /> Share This Mission
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
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-[20px] bg-white border border-mid p-8 md:p-9"
    >
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
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <input
          required
          placeholder="Your Name"
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <input
          required
          type="tel"
          placeholder="Phone"
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-[#0e0e0e] text-white py-3.5 font-bold text-sm hover:bg-black transition"
        >
          Get My Cash Offer →
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
    },
    {
      tag: "Zombie House Flipping",
      title: "Inside the Lutz teardown.",
      desc: "How a 1968 ranch got a second life.",
      to: "/watch" as const,
    },
    {
      tag: "Community Cleanup",
      title: "Helping a homeowner reclaim their property.",
      desc: "A weekend, a crew, and a fresh start.",
      to: "/rescue" as const,
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
              <div className="aspect-[4/3] bg-gradient-to-br from-[#2a1a0e] via-[#4a2f1c] to-[#1a0f08]" />
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
            <span className="font-bold">Contractor or service provider?</span>{" "}
            <span className="text-muted-foreground">Join our vendor network.</span>
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
  const r = activeRescue();
  return (
    <section className="bg-[#0e0e0e] text-white">
      <div className="max-w-[1160px] mx-auto px-6 py-24 md:py-32 text-center">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.03em]">
          Saving Homes. <em className="not-italic font-display text-red">Changing Lives.</em>
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {r && (
            <Link
              to="/rescue/$slug"
              params={{ slug: r.slug }}
              className="inline-flex items-center gap-2 rounded-lg bg-red text-white px-7 py-3.5 font-bold text-sm hover:bg-[#b81830] transition"
            >
              <Heart className="w-4 h-4 fill-white" /> Help Sherman
            </Link>
          )}
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/35 text-white px-7 py-3.5 font-bold text-sm hover:bg-white/10 transition"
          >
            <HomeIcon className="w-4 h-4" /> Nominate A Homeowner
          </Link>
        </div>
        <p className="mt-8 text-sm text-white/55 max-w-2xl mx-auto leading-relaxed">
          Every donation, volunteer, vendor, and sponsor helps restore homes, hope, and dignity to families facing difficult situations.
        </p>
      </div>
    </section>
  );
}
