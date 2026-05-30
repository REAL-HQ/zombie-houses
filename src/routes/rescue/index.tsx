import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { CampaignStatusBadge } from "@/components/CampaignStatusBadge";
import { activeRescues, pastRescues } from "@/data/rescues";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/rescue/")({
  head: () => ({
    meta: [
      { title: "Rescues — Zombie Houses" },
      { name: "description", content: "Active and past Zombie House rescue campaigns. See who we're helping right now." },
    ],
  }),
  component: RescueIndex,
});

const money = (n: number) => `$${n.toLocaleString()}`;

function RescueIndex() {
  const active = activeRescues();
  const past = pastRescues();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The work</p>
          <h1 className="font-display text-4xl md:text-6xl mt-3">Zombie House Rescues</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Each rescue is one home, one family, one closing deadline. Here's where we are right now — and what we've already saved.
          </p>
        </header>

        {active.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Active now</h2>
            <div className="grid gap-6">
              {active.map((r) => {
                const pct = Math.min(100, Math.round((r.raised / r.goal) * 100));
                return (
                  <Link
                    key={r.slug}
                    to="/rescue/$slug"
                    params={{ slug: r.slug }}
                    className="group relative grid md:grid-cols-[1.2fr_1fr] gap-0 overflow-hidden rounded-[22px] border border-border bg-card hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                      <img src={r.hero_image} alt={r.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <CampaignStatusBadge status={r.status} />
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" /> {r.location}
                        </p>
                        <h3 className="font-display text-3xl md:text-4xl mt-2">{r.title}</h3>
                        <p className="mt-3 text-muted-foreground">{r.subtitle}</p>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="font-semibold text-lg">{money(r.raised)} <span className="text-muted-foreground font-normal text-sm">raised of {money(r.goal)}</span></span>
                          <span className="text-sm text-muted-foreground">{pct}%</span>
                        </div>
                        <div className="h-2 bg-off rounded-full overflow-hidden">
                          <div className="h-full bg-red rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">{r.donor_count} donors · {r.service_tags.join(" · ")}</p>
                        <span className="mt-5 inline-flex items-center gap-1 font-semibold text-red">
                          See campaign <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Mission accomplished</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((r) => (
                <Link
                  key={r.slug}
                  to="/rescue/$slug"
                  params={{ slug: r.slug }}
                  className="group relative overflow-hidden rounded-[22px] border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={r.hero_image} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <CampaignStatusBadge status={r.status} />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="w-3 h-3" /> {r.location}</p>
                    <h3 className="font-display text-xl mt-1">{r.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {r.completed_at && `Completed ${new Date(r.completed_at).toLocaleString("en", { month: "short", year: "numeric" })}`}
                      {r.duration_weeks && ` · ${r.duration_weeks} weeks`}
                    </p>
                    <p className="mt-3 text-sm font-semibold">{money(r.raised)} <span className="font-normal text-muted-foreground">raised of {money(r.goal)}</span></p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {r.service_tags.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-off text-muted-foreground border border-border">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
