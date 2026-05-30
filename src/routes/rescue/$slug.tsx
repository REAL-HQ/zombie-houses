import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { CampaignStatusBadge } from "@/components/CampaignStatusBadge";
import { getRescue, type LedgerItem, type Phase, type Update, type Donor } from "@/data/rescues";
import { ArrowLeft, Calendar, Copy, ExternalLink, Facebook, Instagram, MapPin, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/rescue/$slug")({
  head: ({ params }) => {
    const r = getRescue(params.slug);
    const title = r ? `${r.title} — Zombie Houses Rescue` : "Rescue — Zombie Houses";
    const desc = r?.subtitle ?? "A Zombie House rescue campaign.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(r?.hero_image ? [{ property: "og:image", content: r.hero_image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const r = getRescue(params.slug);
    if (!r) throw notFound();
    return r;
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <div className="flex-1 grid place-items-center text-center px-4">
        <div>
          <h1 className="font-display text-4xl">Rescue not found</h1>
          <Link to="/rescue" className="mt-4 inline-flex items-center gap-1 text-red font-semibold"><ArrowLeft className="w-4 h-4" /> All rescues</Link>
        </div>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center"><button onClick={reset}>Retry</button></div>
  ),
  component: CampaignPage,
});

const money = (n: number) => `$${n.toLocaleString()}`;

function CampaignPage() {
  const r = Route.useLoaderData();
  const pct = Math.min(100, Math.round((r.raised / r.goal) * 100));
  const daysLeft = Math.max(0, Math.ceil((new Date(r.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const isActive = r.status === "active";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
            <img src={r.hero_image} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 px-4 md:px-8 pb-10 max-w-6xl mx-auto">
              <Link to="/rescue" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4">
                <ArrowLeft className="w-4 h-4" /> All rescues
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <CampaignStatusBadge status={r.status} />
                <span className="text-white/80 text-sm flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {r.location}</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl text-white max-w-3xl">{r.title}</h1>
              <p className="mt-3 text-white/85 text-lg md:text-xl max-w-2xl">{r.subtitle}</p>
            </div>
          </div>
        </section>

        <div className="px-4 md:px-8 py-12 max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Main column */}
          <div className="space-y-12">
            {/* Story */}
            <article className="prose prose-neutral max-w-none">
              <h2 className="font-display text-3xl mb-4">The Story</h2>
              <div className="space-y-4 text-foreground/90 leading-relaxed [&_p]:text-[17px]" dangerouslySetInnerHTML={{ __html: r.story_html }} />
            </article>

            {/* Phases */}
            {r.phases.length > 0 && (
              <section>
                <h2 className="font-display text-3xl mb-6">The Plan</h2>
                <div className="space-y-6">
                  {r.phases.map((p) => <PhaseItem key={p.number} phase={p} />)}
                </div>
              </section>
            )}

            {/* Ledger */}
            {r.ledger.length > 0 && (
              <section>
                <h2 className="font-display text-3xl mb-2">Where Every Dollar Goes</h2>
                <p className="text-muted-foreground mb-6">Full transparency. Updated as bills are paid.</p>
                <div className="rounded-[20px] border border-border overflow-hidden">
                  {r.ledger.map((it, i) => <LedgerRow key={i} item={it} />)}
                </div>
              </section>
            )}

            {/* Updates */}
            {r.updates.length > 0 && (
              <section>
                <h2 className="font-display text-3xl mb-6">Project Updates</h2>
                <div className="space-y-6">
                  {r.updates.map((u) => <UpdateItem key={u.id} update={u} />)}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-6 self-start">
            {isActive ? (
              <DonateCard
                raised={r.raised}
                goal={r.goal}
                pct={pct}
                donorCount={r.donor_count}
                daysLeft={daysLeft}
                slingshotUrl={r.slingshot_url}
              />
            ) : r.status === "complete" ? (
              <MissionAccomplishedCard raised={r.raised} goal={r.goal} donorCount={r.donor_count} />
            ) : (
              <div className="rounded-[20px] border border-border bg-off p-6">
                <h3 className="font-display text-xl">Phase 2 coming soon</h3>
                <p className="mt-2 text-sm text-muted-foreground">This phase is fully funded. We'll open the next phase shortly.</p>
              </div>
            )}

            <ShareCard title={r.title} />

            {r.recent_donors.length > 0 && (
              <RecentDonors donors={r.recent_donors} />
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

function PhaseItem({ phase }: { phase: Phase }) {
  const isActive = phase.status === "active";
  return (
    <div className="rounded-[20px] border border-border p-6 bg-card">
      <div className="flex items-start gap-4">
        <div className={`h-10 w-10 rounded-full grid place-items-center font-semibold text-white ${isActive ? "bg-red" : "bg-muted-foreground"}`}>
          {phase.number}
        </div>
        <div className="flex-1">
          <p className={`text-xs uppercase tracking-wider font-semibold ${isActive ? "text-red" : "text-muted-foreground"}`}>
            {phase.label}
          </p>
          <h3 className="font-display text-2xl mt-1">{phase.title}</h3>
          <p className="mt-2 text-muted-foreground">{phase.description}</p>
          {phase.goal && (
            <p className="mt-3 text-sm font-semibold">Goal: ${phase.goal.toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function LedgerRow({ item }: { item: LedgerItem }) {
  const statusColor = {
    paid: "text-green",
    due: "text-red",
    pending: "text-muted-foreground",
    returned: "text-muted-foreground",
  }[item.status];

  return (
    <div className={`flex items-center justify-between px-5 py-4 border-b border-border last:border-b-0 ${item.is_total_row ? "bg-off font-semibold" : ""}`}>
      <div>
        <p className={`${item.is_total_row ? "font-display text-lg" : ""}`}>{item.label}</p>
        {item.due_label && !item.is_total_row && (
          <p className="text-xs text-muted-foreground mt-0.5">{item.due_label}</p>
        )}
      </div>
      <div className="text-right">
        <p className={`${item.is_total_row ? "text-lg" : ""}`}>${item.amount.toLocaleString()}</p>
        {!item.is_total_row && (
          <p className={`text-xs uppercase tracking-wider font-semibold ${statusColor}`}>{item.status}</p>
        )}
      </div>
    </div>
  );
}

function UpdateItem({ update }: { update: Update }) {
  return (
    <article className="rounded-[20px] border border-border p-6 bg-card">
      <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Calendar className="w-3 h-3" /> {new Date(update.created_at).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
      </p>
      <h3 className="font-display text-2xl mt-2">{update.title}</h3>
      <div className="mt-3 text-foreground/90 [&_p]:leading-relaxed" dangerouslySetInnerHTML={{ __html: update.content_html }} />
    </article>
  );
}

function DonateCard({ raised, goal, pct, donorCount, daysLeft, slingshotUrl }: {
  raised: number; goal: number; pct: number; donorCount: number; daysLeft: number; slingshotUrl: string;
}) {
  const [amount, setAmount] = useState<number>(50);
  const presets = [25, 50, 100, 250];
  const href = `${slingshotUrl}?amount=${amount}`;

  return (
    <div className="rounded-[20px] border border-border bg-card p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-3xl">${raised.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground">{pct}%</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">raised of ${goal.toLocaleString()} goal</p>
      <div className="mt-3 h-2 bg-off rounded-full overflow-hidden">
        <div className="h-full bg-red rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="w-3.5 h-3.5" /> {donorCount} donors</span>
        <span className="font-semibold text-red">{daysLeft} days left</span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setAmount(p)}
            className={`rounded-full border py-2 text-sm font-semibold transition ${amount === p ? "bg-red text-white border-red" : "border-border hover:border-red"}`}
          >
            ${p}
          </button>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-red py-3.5 text-white font-semibold hover:opacity-90 transition"
      >
        Donate ${amount} <ExternalLink className="w-4 h-4" />
      </a>
      <p className="mt-3 text-[11px] text-center text-muted-foreground">
        Secure giving via Slingshot Giving · 100% goes to the rescue
      </p>
    </div>
  );
}

function MissionAccomplishedCard({ raised, goal, donorCount }: { raised: number; goal: number; donorCount: number }) {
  return (
    <div className="rounded-[20px] border border-green/30 bg-green/5 p-6">
      <p className="text-xs uppercase tracking-wider font-semibold text-green">Mission Accomplished</p>
      <h3 className="font-display text-2xl mt-2">Home returned.</h3>
      <p className="mt-2 text-sm text-muted-foreground">${raised.toLocaleString()} raised of ${goal.toLocaleString()} goal · {donorCount} donors made it happen.</p>
    </div>
  );
}

function ShareCard({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[20px] border border-border p-6">
      <h3 className="font-display text-xl">Share {title}</h3>
      <div className="mt-4 space-y-2">
        <button
          onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold hover:bg-off transition"
        >
          <Facebook className="w-4 h-4" /> Share on Facebook
        </button>
        <button
          onClick={copy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold hover:bg-off transition"
        >
          <Instagram className="w-4 h-4" /> Share on Instagram
        </button>
        <button
          onClick={copy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold hover:bg-off transition"
        >
          <Copy className="w-4 h-4" /> {copied ? "Link copied!" : "Copy campaign link"}
        </button>
      </div>
    </div>
  );
}

function RecentDonors({ donors }: { donors: Donor[] }) {
  return (
    <div className="rounded-[20px] border border-border p-6">
      <h3 className="font-display text-xl mb-4">Recent donors</h3>
      <ul className="space-y-3">
        {donors.map((d, i) => {
          const initials = d.is_anonymous
            ? "?"
            : d.name.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase();
          return (
            <li key={i} className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-semibold ${d.is_anonymous ? "bg-off text-muted-foreground" : "bg-red/10 text-red"}`}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.is_anonymous ? "Anonymous" : d.name}</p>
                <p className="text-xs text-muted-foreground">{timeAgo(d.created_at)}</p>
              </div>
              <span className="text-sm font-semibold">${d.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
