import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, Heart, Home, ShieldCheck } from "lucide-react";
import { activeRescues } from "@/data/rescues";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zombie Houses — Saving Homes. Changing Lives." },
      { name: "description", content: "We rescue distressed homes from auction, neglect, and demolition — and return them to the families who built them." },
    ],
  }),
  component: Index,
});

function Index() {
  const active = activeRescues()[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <section className="px-4 md:px-8 pt-16 md:pt-28 pb-20 max-w-6xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Real Advisors · Zombie House Rescue</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground">
            Saving homes.<br />
            <span className="text-red">Changing lives.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We rescue distressed homes from auction, neglect, and demolition — and return them, restored, to the families who built them.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              to="/rescue"
              className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              See active rescues <ArrowRight className="w-4 h-4" />
            </Link>
            {active && (
              <Link
                to="/rescue/$slug"
                params={{ slug: active.slug }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:bg-off transition"
              >
                Meet {active.title.split("'")[0]}
              </Link>
            )}
          </div>
        </section>

        <section className="bg-off border-y border-border py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { icon: Home, title: "Find the house", body: "We track tax-deed sales, code-enforcement orders, and quiet neighborhood tips." },
              { icon: Heart, title: "Fund the rescue", body: "Donors pool small contributions through Slingshot Giving to stop the auction clock." },
              { icon: ShieldCheck, title: "Return it whole", body: "Title cleared, roof repaired, keys returned — every dollar accounted for, publicly." },
            ].map((s) => (
              <div key={s.title} className="bg-background rounded-2xl p-6 border border-border">
                <s.icon className="w-7 h-7 text-red" />
                <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[hsl(0_0%_15%)] text-white/80 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} ZombieHouses.com · Real Advisors, Inc.</p>
        <p className="italic">Saving Homes. Changing Lives.</p>
      </div>
    </footer>
  );
}
