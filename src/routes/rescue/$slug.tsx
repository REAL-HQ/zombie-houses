import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CampaignStatusBadge } from "@/components/CampaignStatusBadge";
import {
  getRescue,
  activeRescue,
  currency,
  daysRemaining,
  percent,
  timeAgo,
  type LedgerItem,
  type Phase,
  type Update,
  type Donor,
  type Rescue,
} from "@/data/rescues";
import { AlertTriangle, ArrowRight, Check, Copy, Facebook, Instagram } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/rescue/$slug")({
  loader: ({ params }) => {
    const rescue = getRescue(params.slug);
    if (!rescue) throw notFound();
    return { rescue };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.rescue;
    return {
      meta: r
        ? [
            { title: `${r.title} — Zombie House Rescue` },
            { name: "description", content: `${r.location} · ${r.urgency_line}` },
            { property: "og:title", content: `${r.title} — Zombie House Rescue` },
            { property: "og:description", content: r.urgency_line },
            { property: "og:image", content: r.hero_image },
          ]
        : [{ title: "Rescue not found" }],
    };
  },
  component: CampaignPage,
});

function CampaignPage() {
  const { rescue } = Route.useLoaderData();
  if (rescue.status === "complete") return <CompletedPage r={rescue} />;
  return <ActivePage r={rescue} />;
}

function Hero({ r }: { r: Rescue }) {
  return (
    <section className="relative bg-[#111] text-white overflow-hidden">
      <img
        src={r.hero_image}
        alt={r.title}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.46]"
        style={{ objectPosition: "center 20%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.65) 48%, rgba(8,8,8,0.15) 100%)",
        }}
      />
      <div className="relative max-w-[1160px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 min-h-[400px] flex flex-col justify-end">
        <CampaignStatusBadge
          status={r.status}
          phase={r.status === "active" ? r.current_phase : undefined}
        />
        <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,3.2rem)] tracking-[-0.03em] leading-[1.05] max-w-3xl">
          {r.title}
        </h1>
        <p className="mt-3 text-white/55 text-base">
          {r.location} ·{" "}
          {r.status === "complete" && r.completed_at
            ? `Completed ${new Date(r.completed_at).toLocaleString("en", {
                month: "long",
                year: "numeric",
              })}${r.duration_weeks ? ` · ${r.duration_weeks} weeks` : ""}`
            : r.urgency_line}
        </p>
      </div>
    </section>
  );
}

function ActivePage({ r }: { r: Rescue }) {
  const days = daysRemaining(r.deadline);
  return (
    <SiteLayout>
      <Hero r={r} />

      {r.urgency_message && days <= 14 && (
        <div className="max-w-[1160px] mx-auto px-6 mt-8">
          <div className="flex items-start gap-4 rounded-[14px] border-[1.5px] border-[#f5bfba] bg-[#fef0ef] p-5">
            <div className="w-9 h-9 rounded-lg bg-red text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-[17px] h-[17px]" />
            </div>
            <p className="text-sm text-[#7d1f15] leading-relaxed">{r.urgency_message}</p>
          </div>
        </div>
      )}

      <div className="max-w-[1160px] mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="space-y-14">
          <Story r={r} />
          <PhaseTimeline phases={r.phases} />
          <TransparencyLedger items={r.ledger} />
          <UpdatesFeed updates={r.updates} />
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <DonationCard r={r} />
          <ShareCard r={r} />
          <DonorsCard donors={r.recent_donors} />
        </aside>
      </div>
    </SiteLayout>
  );
}

function CompletedPage({ r }: { r: Rescue }) {
  return (
    <SiteLayout>
      <Hero r={r} />
      <div className="max-w-[1160px] mx-auto px-6 mt-8">
        <div className="flex items-start gap-4 rounded-[14px] border-[1.5px] border-green/30 bg-[#e8f5ef] p-5">
          <div className="w-9 h-9 rounded-lg bg-green text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <p className="text-sm text-[#0e3a22] leading-relaxed">
            <strong>This rescue is complete.</strong> Thanks to {r.donor_count} donors, {r.title.split("'")[0]} is home.
          </p>
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="space-y-14">
          <Story r={r} />
          {r.completion_story_html && (
            <div className="prose prose-neutral max-w-none">
              <h2 className="font-display text-2xl mb-4">Coming Home</h2>
              <div
                className="text-[0.95rem] text-[#444] leading-[1.85]"
                dangerouslySetInnerHTML={{ __html: r.completion_story_html }}
              />
            </div>
          )}
          <TransparencyLedger items={r.ledger} />
          <UpdatesFeed updates={r.updates} />
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <CompletedCard r={r} />
          <ShareCard r={r} completed />
        </aside>
      </div>
    </SiteLayout>
  );
}

function Story({ r }: { r: Rescue }) {
  return (
    <section>
      <h2 className="font-display text-[1.6rem] mb-5">{r.title.split("'")[0]}'s Story</h2>
      <div
        className="text-[0.95rem] text-[#444] leading-[1.85] space-y-4 [&>p]:m-0"
        dangerouslySetInnerHTML={{ __html: r.story_html }}
      />
      {r.pull_quote && (
        <blockquote className="mt-7 border-l-[3px] border-red bg-off rounded-r-lg p-5 font-display italic text-[1.1rem] leading-relaxed">
          "{r.pull_quote}"
        </blockquote>
      )}
    </section>
  );
}

function PhaseTimeline({ phases }: { phases: Phase[] }) {
  if (!phases.length) return null;
  return (
    <section>
      <h2 className="font-display text-[1.6rem] mb-6">Project Phases</h2>
      <ol className="relative space-y-7">
        {phases.map((p, i) => {
          const isActive = p.status === "active";
          const isComplete = p.status === "complete";
          return (
            <li key={p.number} className="relative pl-14">
              {i < phases.length - 1 && (
                <span className="absolute left-[17px] top-9 bottom-[-1.75rem] w-[2px] bg-mid" />
              )}
              <div
                className={`absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  isActive
                    ? "bg-red text-white"
                    : isComplete
                    ? "bg-green text-white"
                    : "bg-off border-2 border-mid text-muted-foreground"
                }`}
              >
                {isComplete ? <Check className="w-4 h-4" /> : p.number}
              </div>
              <p
                className={`text-[0.65rem] font-bold uppercase tracking-[0.15em] ${
                  isActive ? "text-red" : "text-muted-foreground"
                }`}
              >
                {isActive
                  ? `Active Now — Phase ${p.number}`
                  : isComplete
                  ? `Complete — Phase ${p.number}`
                  : `Coming Next — Phase ${p.number}`}
              </p>
              <h3 className="mt-1 font-display text-xl">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-[0.65rem] uppercase tracking-wider px-2 py-1 rounded-full ${
                      isActive
                        ? "bg-red/10 text-red"
                        : "bg-off text-muted-foreground border border-mid"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function TransparencyLedger({ items }: { items: LedgerItem[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="font-display text-[1.6rem] mb-5">Where Every Dollar Goes</h2>
      <div className="rounded-2xl bg-off border border-mid divide-y divide-mid">
        {items.map((row, i) => (
          <div
            key={i}
            className={`flex items-center justify-between gap-4 px-5 py-4 ${
              row.is_total_row ? "bg-white rounded-b-2xl" : ""
            }`}
          >
            <span
              className={`text-sm ${
                row.is_total_row ? "font-display text-lg" : "text-[#222]"
              }`}
            >
              {row.label}
            </span>
            <div className="flex items-center gap-3">
              <span
                className={`tabular-nums ${
                  row.is_total_row
                    ? "font-display text-xl text-red"
                    : "text-sm font-semibold"
                }`}
              >
                {currency(row.amount)}
              </span>
              {!row.is_total_row && <LedgerStatus row={row} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LedgerStatus({ row }: { row: LedgerItem }) {
  const map = {
    due: { bg: "bg-red/10", text: "text-red", label: row.due_label ?? "Due" },
    pending: { bg: "bg-off", text: "text-muted-foreground", label: "Pending" },
    paid: { bg: "bg-green/10", text: "text-green", label: "Paid" },
    returned: { bg: "bg-green/10", text: "text-green", label: "Returned" },
  } as const;
  const s = map[row.status];
  return (
    <span className={`text-[0.65rem] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

function UpdatesFeed({ updates }: { updates: Update[] }) {
  if (!updates.length) return null;
  return (
    <section>
      <h2 className="font-display text-[1.6rem] mb-6">Project Updates</h2>
      <ol className="relative space-y-7">
        {updates.map((u, i) => (
          <li key={u.id} className="relative pl-7">
            {i < updates.length - 1 && (
              <span className="absolute left-[5px] top-4 bottom-[-1.75rem] w-[2px] bg-mid" />
            )}
            <span className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${u.is_final ? "bg-green" : "bg-red"}`} />
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {new Date(u.created_at).toLocaleString("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h3 className="mt-1 font-display text-lg">{u.title}</h3>
            <div
              className="mt-2 text-sm text-[#444] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: u.content_html }}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

const AMOUNTS = [25, 50, 100, 250];

function DonationCard({ r }: { r: Rescue }) {
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const days = daysRemaining(r.deadline);
  const pct = percent(r.raised, r.phase1_goal);
  const finalAmount = custom ? Number(custom) || 0 : amount;

  return (
    <div className="rounded-[22px] border-2 border-red bg-white p-6">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-red">Phase {r.current_phase} Goal</p>
      <p className="mt-2 font-display text-[2.2rem] leading-none">{currency(r.raised)}</p>
      <p className="mt-1 text-xs text-muted-foreground">raised of {currency(r.phase1_goal)}</p>
      <div className="mt-4 h-2 bg-off rounded-full overflow-hidden">
        <div className="h-full bg-red rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center border-t border-mid pt-4">
        <div>
          <p className="font-display text-lg">{r.donor_count}</p>
          <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">Donors</p>
        </div>
        <div>
          <p className="font-display text-lg">{days}</p>
          <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">Days Left</p>
        </div>
        <div>
          <p className="font-display text-lg">{pct}%</p>
          <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">Funded</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setAmount(a);
              setCustom("");
            }}
            className={`rounded-xl py-2.5 font-bold text-sm transition ${
              !custom && amount === a
                ? "bg-[#0e0e0e] text-white"
                : "border border-mid hover:border-[#0e0e0e]"
            }`}
          >
            ${a}
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Other amount"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        className="mt-2 w-full rounded-xl border border-mid px-3 py-2.5 text-sm focus:outline-none focus:border-[#0e0e0e]"
      />
      <a
        href={`${r.slingshot_url}?amount=${finalAmount}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block w-full rounded-full bg-red text-white text-center py-3.5 font-bold text-sm hover:bg-[#a93226] transition"
      >
        Donate {finalAmount ? currency(finalAmount) : ""} →
      </a>
      <p className="mt-3 text-[0.65rem] text-center text-muted-foreground">
        Powered by Slingshot Giving · Secure · Tax-deductible
      </p>
    </div>
  );
}

function CompletedCard({ r }: { r: Rescue }) {
  const next = activeRescue();
  return (
    <div className="rounded-[22px] border-2 border-green bg-white p-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green text-white text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1">
        <Check className="w-3 h-3" /> 100% Funded
      </span>
      <p className="mt-3 font-display text-[2.2rem] leading-none">{currency(r.raised)}</p>
      <p className="mt-1 text-xs text-muted-foreground">raised from {r.donor_count} donors</p>
      <div className="mt-4 h-2 bg-off rounded-full overflow-hidden">
        <div className="h-full bg-green rounded-full w-full" />
      </div>
      <p className="mt-5 text-sm text-[#444] leading-relaxed">
        This rescue is complete. {r.title.split("'")[0]} is home.
      </p>
      {next && (
        <Link
          to="/rescue/$slug"
          params={{ slug: next.slug }}
          className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#0e0e0e] text-white py-3 font-bold text-sm hover:bg-black transition"
        >
          Help the next rescue <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

function ShareCard({ r, completed = false }: { r: Rescue; completed?: boolean }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    const text = `${r.share_copy} ${url}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="rounded-[22px] border border-mid bg-white p-6">
      <h3 className="font-display text-lg">
        {completed ? `Share ${r.title.split("'")[0]}'s story` : `Share ${r.title.split("'")[0]}'s campaign`}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">Help us reach more donors.</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-mid py-2.5 flex items-center justify-center hover:bg-off transition"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="rounded-xl border border-mid py-2.5 flex items-center justify-center hover:bg-off transition"
          aria-label="Copy for Instagram"
        >
          <Instagram className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="rounded-xl border border-mid py-2.5 flex items-center justify-center hover:bg-off transition"
          aria-label="Copy link"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      {copied && <p className="mt-3 text-xs text-green text-center">Copied to clipboard</p>}
    </div>
  );
}

function DonorsCard({ donors }: { donors: Donor[] }) {
  if (!donors.length) return null;
  return (
    <div className="rounded-[22px] border border-mid bg-white p-6">
      <h3 className="font-display text-lg">Recent Donors</h3>
      <ul className="mt-4 space-y-3">
        {donors.slice(0, 5).map((d, i) => {
          const name = d.is_anonymous ? "Anonymous" : d.name;
          const initials = d.is_anonymous
            ? "?"
            : name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
          return (
            <li key={i} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                  d.is_anonymous
                    ? "bg-off text-muted-foreground"
                    : "bg-[#0e0e0e] text-white"
                }`}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{name}</p>
                <p className="text-[0.7rem] text-muted-foreground">{timeAgo(d.created_at)}</p>
              </div>
              <span className="font-display text-sm">{currency(d.amount)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
