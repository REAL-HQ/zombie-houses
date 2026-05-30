import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Wrench, Clock, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Home Fast — Zombie House Buyers" },
      {
        name: "description",
        content:
          "We buy houses in any condition. No repairs. No commissions. Cash offer in 24 hours. Close on your timeline.",
      },
      { property: "og:title", content: "Sell Your Home Fast — Zombie House Buyers" },
      { property: "og:description", content: "Cash offer in 24 hours. Any condition." },
    ],
  }),
  component: SellPage,
});

const TRUST = [
  { icon: Wrench, title: "No Repairs Needed", body: "Sell as-is. Fire damage, full gut, hoarder home — doesn't matter." },
  { icon: Clock, title: "Cash Offer in 24 Hours", body: "A real number, fast. Skip months of uncertainty." },
  { icon: DollarSign, title: "Zero Fees or Commissions", body: "Our offer is what you walk away with." },
  { icon: Calendar, title: "Close on Your Timeline", body: "7 days or 90 — we work around your schedule." },
];

const FAQ = [
  { q: "Do I need to make any repairs?", a: "No. We buy houses in any condition — including fire, water, hoarder, and structural damage." },
  { q: "How fast can you close?", a: "As fast as 7 days. We can also wait 90+ days if you need more time to move." },
  { q: "Are there any fees or commissions?", a: "Zero. Our cash offer is what you walk away with — no hidden charges, no agent fees." },
  { q: "What if I owe more than the house is worth?", a: "We work with short-sale specialists and have closed dozens of upside-down properties." },
  { q: "Do you buy inherited properties?", a: "Yes. We handle the probate paperwork and pay for any title cleanup needed." },
];

function SellPage() {
  return (
    <SiteLayout>
      <section className="bg-off">
        <div className="max-w-[1160px] mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Zombie House Buyers</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06]">
              We Buy Homes in Any Condition — <em className="not-italic text-red font-display">Fast.</em>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              No repairs. No commissions. Cash offer in 24 hours. Close on your timeline.
            </p>
            <ul className="mt-10 space-y-5">
              {TRUST.map((t) => (
                <li key={t.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-mid flex items-center justify-center shrink-0">
                    <t.icon className="w-4 h-4 text-red" />
                  </div>
                  <div>
                    <h3 className="font-bold">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{t.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1160px] mx-auto px-6">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em]">How It Works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              ["01", "Submit Your Info", "Fill out the form or call us directly."],
              ["02", "Get Your Cash Offer", "We review and send a fair cash offer within 24 hours."],
              ["03", "Choose Your Closing Date", "Pick a date that works. We handle the rest."],
            ].map(([n, t, b]) => (
              <div key={n} className="rounded-[18px] border border-mid p-7">
                <p className="font-display text-5xl text-mid leading-none">{n}</p>
                <h3 className="mt-5 font-display text-xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off py-20 md:py-28">
        <div className="max-w-[820px] mx-auto px-6">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] tracking-[-0.025em]">Common Questions</h2>
          <div className="mt-8 divide-y divide-mid border-y border-mid">
            {FAQ.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function LeadForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-[20px] bg-white border border-mid p-8 md:p-9 shadow-xl"
    >
      <h3 className="font-display text-2xl">Get Your Cash Offer</h3>
      <p className="mt-1 text-sm text-muted-foreground">Takes 60 seconds. No obligation.</p>
      <div className="mt-6 space-y-3">
        <input required placeholder="Property Address" className="w-full rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]" />
        <input required placeholder="Your Name" className="w-full rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]" />
        <input required type="tel" placeholder="Phone" className="w-full rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]" />
        <select required defaultValue="" className="w-full rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]">
          <option value="" disabled>Condition</option>
          <option>Move-in Ready</option>
          <option>Minor Repairs</option>
          <option>Major Repairs</option>
          <option>Condemned or Distressed</option>
        </select>
        <textarea rows={3} placeholder="Optional notes" className="w-full rounded-xl border border-mid bg-off px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e] resize-none" />
        <button type="submit" className="w-full rounded-full bg-[#0e0e0e] text-white py-3.5 font-bold text-sm hover:bg-black transition">
          Get My Cash Offer →
        </button>
        <p className="text-[0.7rem] text-muted-foreground text-center">
          Your info is never sold or shared. We'll call within 24 hours.
        </p>
      </div>
    </form>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="w-full text-left py-5 flex items-start justify-between gap-4"
    >
      <div className="flex-1">
        <p className="font-display text-lg">{q}</p>
        {open && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>}
      </div>
      <span className="text-2xl font-display text-red leading-none mt-0.5">{open ? "−" : "+"}</span>
    </button>
  );
}
