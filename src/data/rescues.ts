import shermanHero from "@/assets/sherman-hero.jpg";

export type RescueStatus = "coming_soon" | "active" | "complete" | "paused";

export interface Phase {
  number: number;
  status: "active" | "upcoming" | "complete";
  title: string;
  description: string;
  tags: string[];
}

export interface LedgerItem {
  label: string;
  amount: number;
  status: "pending" | "due" | "paid" | "returned";
  due_label?: string;
  is_total_row?: boolean;
}

export interface Update {
  id: string;
  created_at: string;
  title: string;
  content_html: string;
  is_final?: boolean;
}

export interface Donor {
  name: string;
  is_anonymous: boolean;
  amount: number;
  created_at: string;
}

export interface Rescue {
  slug: string;
  title: string;
  location: string;
  urgency_line: string;
  urgency_message?: string;
  status: RescueStatus;
  current_phase: number;
  hero_image: string;
  thumb_image?: string;
  story_html: string;
  completion_story_html?: string;
  pull_quote?: string;
  raised: number;
  phase1_goal: number;
  donor_count: number;
  deadline: string;
  started_at: string;
  completed_at?: string;
  duration_weeks?: number;
  service_tags: string[];
  share_copy: string;
  slingshot_url: string;
  phases: Phase[];
  ledger: LedgerItem[];
  updates: Update[];
  recent_donors: Donor[];
}

export const rescues: Rescue[] = [
  {
    slug: "shermans-home",
    title: "Sherman's Home",
    location: "Tampa, FL",
    urgency_line: "Our first rescue — launching soon",
    status: "coming_soon",
    current_phase: 1,
    hero_image: shermanHero,
    thumb_image: shermanHero,
    story_html: `
      <p>Sherman Whitfield bought his small block house off 22nd Avenue in 1974 — the year his daughter was born. He framed the back porch himself, planted the avocado tree out front, and raised three kids inside its walls.</p>
      <p>Then his wife got sick. Medical bills piled up. A reverse-mortgage salesman knocked at the wrong moment. Within four years, Sherman was three property-tax cycles behind and a tax-deed sale was scheduled.</p>
      <p>We went to buy the house. Instead, we decided to fight for it. Sherman's rescue campaign is in final preparation now — and it will be the first campaign Zombie House Rescue ever launches.</p>
    `,
    pull_quote:
      "I built this porch with my own two hands. I'd like to die looking out from it.",
    raised: 0,
    phase1_goal: 35000,
    donor_count: 0,
    deadline: "",
    started_at: "2026-05-01",
    service_tags: ["Back Taxes", "Title Clearing", "Roof Repair"],
    share_copy:
      "Sherman is 84. He built his Tampa home with his own hands. Zombie House Rescue is launching his campaign soon:",
    slingshot_url: "https://slingshotgiving.com/c/shermans-home",
    phases: [
      {
        number: 1,
        status: "active",
        title: "Stop the auction",
        description:
          "Pay off three years of back property taxes plus penalties and clear the tax-deed lien before the June 21 sale date.",
        tags: ["Back Taxes", "Penalties", "Title Clearing"],
      },
      {
        number: 2,
        status: "upcoming",
        title: "Roof, plumbing, safety repairs",
        description:
          "Once the home is secure, Phase 2 funds a new roof, replaces the failing water heater, and brings electrical up to code.",
        tags: ["Roof", "Plumbing", "Electrical"],
      },
      {
        number: 3,
        status: "upcoming",
        title: "Comfort & dignity",
        description:
          "Fresh paint, new flooring in the bedrooms, a working AC unit, and restoration of the back porch Sherman built himself.",
        tags: ["Paint", "Flooring", "AC"],
      },
    ],
    ledger: [
      { label: "Back taxes (2023)", amount: 8420, status: "due", due_label: "Due Jun 21" },
      { label: "Back taxes (2024)", amount: 9180, status: "due", due_label: "Due Jun 21" },
      { label: "Back taxes (2025)", amount: 9640, status: "due", due_label: "Due Jun 21" },
      { label: "Penalties + interest", amount: 4210, status: "due", due_label: "Due Jun 21" },
      { label: "Title clearing + recording", amount: 1850, status: "pending" },
      { label: "Legal review", amount: 1700, status: "paid" },
      { label: "Phase 1 Total", amount: 35000, status: "pending", is_total_row: true },
    ],
    updates: [
      {
        id: "u3",
        created_at: "2026-05-28",
        title: "We met Sherman this morning",
        content_html:
          "<p>Sat on the porch for an hour. He showed us the original mortgage paperwork in a manila folder he's kept for <strong>52 years</strong>. We're not letting this one go.</p>",
      },
      {
        id: "u2",
        created_at: "2026-05-20",
        title: "Title search came back clean",
        content_html:
          "<p>No second mortgage, no judgments. Just the tax lien. Once we settle the county, the home is fully Sherman's again — free and clear.</p>",
      },
    ],
    recent_donors: [],
  },
];

export const getRescue = (slug: string) => rescues.find((r) => r.slug === slug);
export const activeRescue = () => rescues.find((r) => r.status === "active");
export const comingSoonRescue = () => rescues.find((r) => r.status === "coming_soon");
export const pastRescues = () =>
  rescues
    .filter((r) => r.status === "complete")
    .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""));

export const daysRemaining = (deadline: string) => {
  if (!deadline) return 0;
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
};

export const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const percent = (raised: number, goal: number) =>
  Math.min(100, Math.round((raised / goal) * 100));

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};
