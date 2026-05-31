import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CampaignStatusBadge } from "@/components/CampaignStatusBadge";
import {
  activeRescue,
  pastRescues,
  currency,
  daysRemaining,
  percent,
} from "@/data/rescues";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/rescue/")({
  head: () => ({
    meta: [
      { title: "Rescues — ZombieHouses" },
      {
        name: "description",
        content:
          "Active and past Zombie House Rescue campaigns. See who we're saving right now.",
      },
      { property: "og:title", content: "Zombie House Rescues" },
      { property: "og:description", content: "We show up when no one else will." },
    ],
  }),
  component: RescueIndex,
});

function RescueIndex() {
  const active = activeRescue();
  const past = pastRescues();

  return (
    <SiteLayout>
      <section className="max-w-[1160px] mx-auto px-6 pt-16 md:pt-24 pb-12">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Zombie House Rescue</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06] max-w-3xl">
          We Show Up When No One Else Will.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Every rescue is one home, one family, one closing deadline. Here's where we are right now —
          and the homes we've already saved.
        </p>
      </section>

      {active && (
        <section className="max-w-[1160px] mx-auto px-6 pb-16">
          <ActiveCard r={active} />
        </section>
      )}

      {past.length > 0 && (
        <section className="max-w-[1160px] mx-auto px-6 pb-24">
          <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Mission Accomplished
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((r) => (
              <Link
                key={r.slug}
                to="/rescue/$slug"
                params={{ slug: r.slug }}
                className="group rounded-[22px] border border-mid bg-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {r.thumb_image ? (
                    <img src={r.thumb_image} alt={r.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#2a1a0e] via-[#4a2f1c] to-[#1a0f08]" />
                  )}
                  <div className="absolute top-3 left-3">
                    <CampaignStatusBadge status={r.status} />
                  </div>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {r.location}
                  </p>
                  <h3 className="mt-1 font-display text-xl">{r.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {r.completed_at &&
                      `Completed ${new Date(r.completed_at).toLocaleString("en", {
                        month: "short",
                        year: "numeric",
                      })}`}
                    {r.duration_weeks && ` · ${r.duration_weeks} weeks`}
                  </p>
                  <p className="mt-3 text-sm font-semibold">
                    {currency(r.raised)}{" "}
                    <span className="font-normal text-muted-foreground">raised</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.service_tags.map((t) => (
                      <span
                        key={t}
                        className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-lg bg-off text-muted-foreground border border-mid"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function ActiveCard({ r }: { r: ReturnType<typeof activeRescue> & {} }) {
  const pct = percent(r.raised, r.phase1_goal);
  const days = daysRemaining(r.deadline);
  return (
    <Link
      to="/rescue/$slug"
      params={{ slug: r.slug }}
      className="group block rounded-[22px] border-2 border-red bg-card overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(192,57,43,0.4)] transition-all duration-300"
    >
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="relative h-[280px] md:h-auto overflow-hidden">
          <img src={r.hero_image} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/85" />
          <div className="absolute top-5 left-5">
            <CampaignStatusBadge status={r.status} />
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <h2 className="font-display text-3xl md:text-4xl">{r.title}</h2>
            <p className="mt-1 text-sm text-white/75">
              {r.location} · {r.urgency_line}
            </p>
          </div>
        </div>
        <div className="p-8 md:p-10 flex flex-col">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Active Rescue
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-4xl">{currency(r.raised)}</span>
            <span className="text-sm text-muted-foreground">of {currency(r.phase1_goal)}</span>
          </div>
          <div className="mt-3 h-2 bg-off rounded-full overflow-hidden">
            <div className="h-full bg-red rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 border-t border-mid pt-5">
            <Stat label="Donors" value={r.donor_count.toString()} />
            <Stat label="Days Left" value={days.toString()} />
            <Stat label="Funded" value={`${pct}%`} />
          </div>
          <div className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-red text-white px-6 py-3.5 font-bold text-sm group-hover:bg-[#b81830] transition">
            Donate Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl">{value}</p>
      <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
