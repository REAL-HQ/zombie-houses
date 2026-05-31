import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Scissors,
  Droplets,
  Hammer,
  Trash2,
  Truck,
  Wrench,
  HardHat,
  ShieldAlert,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsor a Rescue — ZombieHouses" },
      {
        name: "description",
        content:
          "Your brand funds real transformations — documented on video and shared with our audience. Real impact. Real exposure.",
      },
      { property: "og:title", content: "Sponsor a Rescue — ZombieHouses" },
      { property: "og:description", content: "Partner with us. Documented impact." },
    ],
  }),
  component: SponsorsPage,
});

const CATS = [
  { icon: Scissors, title: "Lawn & Landscaping" },
  { icon: Droplets, title: "Pressure Washing" },
  { icon: Hammer, title: "General Contractors" },
  { icon: Trash2, title: "Junk Removal" },
  { icon: Wrench, title: "Plumbing & Electric" },
  { icon: HardHat, title: "Roofing" },
  { icon: Truck, title: "Moving" },
  { icon: ShieldAlert, title: "Crime Scene & Biohazard" },
];

const SPONSORS = [
  "Gulfside Roofing",
  "Tampa Bay Pressure",
  "Bayshore Builders",
  "Cypress Junk",
  "Watson Plumbing",
  "Acme Electric",
];

function SponsorsPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1160px] mx-auto px-6 pt-16 pb-12 md:pt-24">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Partner With Us</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06] max-w-3xl">
          Sponsor A Rescue.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Your brand funds real transformations — documented on video and shared with our entire audience. Real impact. Real exposure.
        </p>
      </section>

      <section className="max-w-[1160px] mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <TierCard
            featured
            label="Featured"
            title="Title Sponsor"
            price="$5,000 / project"
            perks={[
              "Logo on all project media",
              "Featured in video + social",
              "A&E mention (case by case)",
              "Dedicated sponsor page",
              "Tax receipt",
            ]}
            ctaLabel="Become a Title Sponsor →"
            ctaRed
            ctaHref="#apply"
          />
          <TierCard
            label="Recurring"
            title="Community Sponsor"
            price="$500 / month"
            perks={[
              "Logo on sponsor wall",
              "Monthly social mention",
              "Newsletter feature",
              "Tax receipt",
            ]}
            ctaLabel="Become a Sponsor →"
            ctaHref="#apply"
          />
          <TierCard
            label="Individual"
            title="Donate"
            price="Any amount · tax-deductible"
            perks={[
              "Direct to active rescue",
              "100% transparent ledger",
              "Secure via Slingshot",
            ]}
            ctaLabel="Donate Now →"
            ctaTo="/rescue"
          />
        </div>
      </section>

      <section id="apply" className="bg-off py-20 md:py-28">
        <div className="max-w-[820px] mx-auto px-6">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Sponsor Inquiry</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
            Let's Talk Partnership.
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 rounded-[20px] bg-white border border-mid p-8 grid sm:grid-cols-2 gap-4"
          >
            <Input placeholder="Your Name" />
            <Input placeholder="Company" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone" type="tel" />
            <select required defaultValue="" className="sm:col-span-2 rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]">
              <option value="" disabled>Tier interest</option>
              <option>Title Sponsor ($5k/project)</option>
              <option>Community Sponsor ($500/mo)</option>
              <option>Custom partnership</option>
            </select>
            <textarea rows={4} placeholder="Tell us about your brand and goals" className="sm:col-span-2 rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e] resize-none" />
            <button type="submit" className="sm:col-span-2 rounded-lg bg-[#0e0e0e] text-white py-3.5 font-bold text-sm hover:bg-black transition">
              Send Inquiry →
            </button>
          </form>
        </div>
      </section>

      <section id="vendors" className="bg-white py-20 md:py-28">
        <div className="max-w-[1160px] mx-auto px-6">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Vendor Network</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">
            Join The Crews Behind Every Rescue.
          </h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATS.map((c) => (
              <div key={c.title} className="rounded-[14px] border border-mid p-5">
                <c.icon className="w-5 h-5 text-red" />
                <p className="mt-3 font-semibold text-sm leading-snug">{c.title}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-12 rounded-[20px] bg-off border border-mid p-8 grid sm:grid-cols-2 gap-4"
          >
            <h3 className="sm:col-span-2 font-display text-2xl">Apply as a Vendor</h3>
            <Input placeholder="Name" />
            <Input placeholder="Company" />
            <Input placeholder="Trade" />
            <Input placeholder="Service Area" />
            <Input placeholder="License #" />
            <Input placeholder="Phone" type="tel" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Website" />
            <button type="submit" className="sm:col-span-2 rounded-lg bg-[#0e0e0e] text-white py-3.5 font-bold text-sm hover:bg-black transition">
              Submit Application →
            </button>
          </form>
        </div>
      </section>

      <section className="bg-off py-20">
        <div className="max-w-[1160px] mx-auto px-6">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground text-center">Our Sponsors</p>
          <h2 className="mt-3 font-display text-3xl text-center">Powered by these partners</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPONSORS.map((s) => (
              <div
                key={s}
                className="aspect-[3/2] rounded-[14px] border border-mid bg-white flex items-center justify-center font-display text-sm text-muted-foreground grayscale hover:grayscale-0 hover:text-[#0e0e0e] transition-all"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
    />
  );
}

function TierCard({
  featured = false,
  label,
  title,
  price,
  perks,
  ctaLabel,
  ctaRed = false,
  ctaHref,
  ctaTo,
}: {
  featured?: boolean;
  label: string;
  title: string;
  price: string;
  perks: string[];
  ctaLabel: string;
  ctaRed?: boolean;
  ctaHref?: string;
  ctaTo?: "/rescue";
}) {
  const cls = featured
    ? "border-2 border-red bg-[#0e0e0e] text-white"
    : "border border-mid bg-white";
  const muted = featured ? "text-white/55" : "text-muted-foreground";
  return (
    <div className={`rounded-[22px] p-7 flex flex-col ${cls}`}>
      <span className={`text-[0.65rem] font-bold uppercase tracking-[0.15em] ${featured ? "text-red" : "text-muted-foreground"}`}>
        {label}
      </span>
      <h3 className="mt-3 font-display text-2xl">{title}</h3>
      <p className={`mt-1 text-sm ${muted}`}>{price}</p>
      <ul className="mt-6 space-y-2 flex-1">
        {perks.map((p) => (
          <li key={p} className={`flex items-start gap-2 text-sm ${muted}`}>
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-red" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {ctaTo ? (
        <Link
          to={ctaTo}
          className={
            ctaRed
              ? "mt-7 rounded-lg bg-red text-white py-3 text-sm font-bold text-center hover:bg-[#b81830] transition"
              : "mt-7 rounded-lg border-[1.5px] border-[#0e0e0e] py-3 text-sm font-bold text-center hover:bg-[#0e0e0e] hover:text-white transition"
          }
        >
          {ctaLabel}
        </Link>
      ) : (
        <a
          href={ctaHref}
          className={
            ctaRed
              ? "mt-7 rounded-lg bg-red text-white py-3 text-sm font-bold text-center hover:bg-[#b81830] transition"
              : featured
              ? "mt-7 rounded-lg border-[1.5px] border-white/35 text-white py-3 text-sm font-bold text-center hover:bg-white/10 transition"
              : "mt-7 rounded-lg border-[1.5px] border-[#0e0e0e] py-3 text-sm font-bold text-center hover:bg-[#0e0e0e] hover:text-white transition"
          }
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}
