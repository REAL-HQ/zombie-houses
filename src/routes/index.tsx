import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroCouple from "@/assets/hero-couple.jpg";
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
} from "lucide-react";
import { activeRescue, currency, daysRemaining, percent } from "@/data/rescues";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZombieHouses — Saving Homes. Changing Lives." },
      {
        name: "description",
        content:
          "We renovate neglected houses, rescue families in need, and give communities a second chance — one zombie house at a time.",
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
      
      
      <Initiatives />
      {active && <RescueTeaser />}
      <SellInline />
      <DesignPreview />
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
      {/* Full-bleed background image on the right, fading into the headline on the left */}
      <div className="absolute inset-0">
        <img
          src={heroCouple}
          alt="Zombie House Rescue team standing in a neglected home"
          className="absolute inset-0 w-full h-full object-cover object-left"
          style={{ transform: "translateX(22%)" }}
        />
        {/* Fade to solid black on the left where the headline lives */}
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
            We renovate neglected houses, rescue families in need, and give communities a second chance — one zombie house at a time.
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


function Initiatives() {
  const cards = [
    {
      icon: Video,
      title: "Zombie House Flipping",
      body: "Twelve seasons on A&E documenting the worst houses on the block — and the crews that bring them back.",
      tag: "A&E Show",
      to: "/watch" as const,
      red: false,
    },
    {
      icon: HomeIcon,
      title: "Zombie House Buyers",
      body: "We buy houses in any condition, fast. Fire damage, full gut, hoarder homes — doesn't matter. Cash in 24 hours.",
      tag: "We Buy Houses",
      to: "/sell" as const,
      red: false,
    },
    {
      icon: Heart,
      title: "Zombie House Rescue",
      body: "When a family is one missed payment from losing everything — we show up. Free services. Real rescues.",
      tag: "Free Services",
      to: "/rescue" as const,
      red: true,
    },
  ];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Three Initiatives</p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.025em]">
          We don't just flip houses.{" "}
          <em className="not-italic font-display text-red">We rescue them.</em>
        </h2>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em] max-w-2xl">
          One mission. Three ways we show up.
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

function RescueTeaser() {
  const r = activeRescue()!;
  const pct = percent(r.raised, r.phase1_goal);
  return (
    <section className="bg-off py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Zombie House Rescue</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,2.8rem)] tracking-[-0.025em]">
            Right now, we're saving {r.title.split("'")[0]}'s home.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
            {r.location} · Tax-deed sale in 6 days. From emergency tax payment, roof replacement and temporary relocation for repairs — we mobilize whatever the rescue requires. Every dollar is documented publicly.
          </p>
          <Link
            to="/rescue/$slug"
            params={{ slug: r.slug }}
            className="mt-8 inline-flex items-center gap-2 rounded-lg border-[1.5px] border-[#0e0e0e] px-6 py-3 font-bold text-sm hover:bg-[#0e0e0e] hover:text-white transition"
          >
            Read {r.title.split("'")[0]}'s story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="rounded-[22px] bg-[#0e0e0e] text-white p-8 md:p-10">
          <h3 className="font-display text-2xl">Help close the gap.</h3>
          <p className="mt-2 text-white/55 text-sm">{r.urgency_message}</p>
          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-display text-3xl">{currency(r.raised)}</span>
              <span className="text-sm text-white/55">of {currency(r.phase1_goal)}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-red rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-xs text-white/55">
              {r.donor_count} donors · {daysRemaining(r.deadline)} days left
            </p>
          </div>
          <Link
            to="/rescue/$slug"
            params={{ slug: r.slug }}
            className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red px-6 py-3.5 font-bold text-sm hover:bg-[#b81830] transition"
          >
            Donate to {r.title.split("'")[0]} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SellInline() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Zombie House Buyers</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
            Selling A Zombie House?<br /> <em className="not-italic text-red font-display">We'll Buy It.</em>
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
      className="rounded-[20px] bg-off border border-mid p-8 md:p-9"
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

function DesignPreview() {
  const cards = [
    { tag: "BTS Episode", title: "Inside the Lutz teardown", desc: "How a 1968 ranch got a second life." },
    { tag: "Shop the Look", title: "Sherman's kitchen reno", desc: "Exact paint, fixtures, and finishes." },
    { tag: "Design Guide", title: "Open concept done right", desc: "What we wish we knew in season 1." },
  ];
  return (
    <section className="bg-off py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Inspiration</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
              Before-and-afters worth saving.
            </h2>
          </div>
          <Link
            to="/design"
            className="inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
          >
            See all inspiration <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="rounded-[18px] bg-white border border-mid overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#2a1a0e] via-[#4a2f1c] to-[#1a0f08]" />
              <div className="p-5">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-red">{c.tag}</span>
                <h3 className="mt-2 font-display text-xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VendorPreview() {
  const cats = [
    { icon: Scissors, title: "Lawn & Landscaping" },
    { icon: Droplets, title: "Pressure Washing" },
    { icon: Hammer, title: "General Contractors" },
    { icon: Trash2, title: "Junk Removal" },
    { icon: Truck, title: "Moving" },
    { icon: Wrench, title: "Plumbing & Electric" },
    { icon: HardHat, title: "Roofing" },
    { icon: ShieldAlert, title: "Crime Scene & Biohazard" },
  ];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Vendor Network</p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em] max-w-2xl">
          The crews behind every rescue.
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c) => (
            <div key={c.title} className="rounded-[14px] border border-mid p-5 hover:border-[#0e0e0e] transition-colors">
              <c.icon className="w-5 h-5 text-red" />
              <p className="mt-3 font-semibold text-sm leading-snug">{c.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] bg-off border border-mid px-6 py-5">
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
    <section className="bg-off py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Partner With Us</p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
          Sponsor a rescue.
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="rounded-[22px] border-2 border-red bg-[#0e0e0e] text-white p-7 flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-red">Featured</span>
            <h3 className="mt-3 font-display text-2xl">Title Sponsor</h3>
            <p className="mt-1 text-white/55 text-sm">$5,000 / project</p>
            <ul className="mt-5 space-y-2 text-sm text-white/75 flex-1">
              <li>· Logo on all project media</li>
              <li>· Featured in video + social</li>
              <li>· Dedicated sponsor page</li>
              <li>· Tax receipt</li>
            </ul>
            <Link
              to="/sponsors"
              className="mt-7 rounded-lg bg-red text-white py-3 text-sm font-bold text-center hover:bg-[#b81830] transition"
            >
              Become a Title Sponsor →
            </Link>
          </div>
          <div className="rounded-[22px] border border-mid bg-white p-7 flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">Recurring</span>
            <h3 className="mt-3 font-display text-2xl">Community Sponsor</h3>
            <p className="mt-1 text-muted-foreground text-sm">$500 / month</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground flex-1">
              <li>· Logo on sponsor wall</li>
              <li>· Monthly social mention</li>
              <li>· Newsletter feature</li>
            </ul>
            <Link
              to="/sponsors"
              className="mt-7 rounded-lg border-[1.5px] border-[#0e0e0e] py-3 text-sm font-bold text-center hover:bg-[#0e0e0e] hover:text-white transition"
            >
              Become a Sponsor →
            </Link>
          </div>
          <div className="rounded-[22px] border border-mid bg-white p-7 flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">Individual</span>
            <h3 className="mt-3 font-display text-2xl">Donate</h3>
            <p className="mt-1 text-muted-foreground text-sm">Any amount · tax-deductible</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground flex-1">
              <li>· Direct to active rescue</li>
              <li>· 100% transparent ledger</li>
              <li>· Secure via Slingshot</li>
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
              Donate to {r.title.split("'")[0]} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/35 text-white px-7 py-3.5 font-bold text-sm hover:bg-white/10 transition"
          >
            Nominate a Home
          </Link>
        </div>
      </div>
    </section>
  );
}
