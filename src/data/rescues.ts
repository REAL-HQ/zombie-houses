import shermanHero from "@/assets/sherman-hero.jpg";

export type RescueStatus = "active" | "complete" | "paused";

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
    urgency_line: "Tax-deed sale in 6 days",
    urgency_message:
      "Urgent: Sherman faces a tax deed sale in 6 days. We need to close $23,580 to stop the auction.",
    status: "active",
    current_phase: 1,
    hero_image: shermanHero,
    thumb_image: shermanHero,
    story_html: `
      <p>Sherman Whitfield bought his small block house off 22nd Avenue in 1974 — the year his daughter was born. He framed the back porch himself, planted the avocado tree out front, and raised three kids inside its walls.</p>
      <p>Then his wife got sick. Medical bills piled up. A reverse-mortgage salesman knocked at the wrong moment. Within four years, Sherman was three property-tax cycles behind and a tax-deed sale was scheduled.</p>
      <p>If we don't close the gap by then, the home gets auctioned on the courthouse steps. We're not letting that happen.</p>
    `,
    pull_quote:
      "I built this porch with my own two hands. I'd like to die looking out from it.",
    raised: 11420,
    phase1_goal: 25000,
    donor_count: 187,
    deadline: "2026-06-04",
    started_at: "2026-05-01",
    service_tags: ["Back Taxes", "Title Clearing", "Roof Repair"],
    share_copy:
      "Sherman is 84. He built his Tampa home with his own hands. We have 6 days to stop the auction. Help us save it:",
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
      {
        id: "u1",
        created_at: "2026-05-12",
        title: "Campaign live on Slingshot",
        content_html: "<p>First $1,200 came in within six hours of the soft launch. Thank you to the early supporters.</p>",
      },
    ],
    recent_donors: [
      { name: "Maria L.", is_anonymous: false, amount: 250, created_at: "2026-05-29T14:20:00Z" },
      { name: "Anonymous", is_anonymous: true, amount: 1000, created_at: "2026-05-29T11:05:00Z" },
      { name: "Devon K.", is_anonymous: false, amount: 50, created_at: "2026-05-29T09:42:00Z" },
      { name: "The Patel Family", is_anonymous: false, amount: 500, created_at: "2026-05-28T20:15:00Z" },
      { name: "Anonymous", is_anonymous: true, amount: 25, created_at: "2026-05-28T18:33:00Z" },
    ],
  },
  {
    slug: "miss-eleanors-cottage",
    title: "Miss Eleanor's Cottage",
    location: "St. Petersburg, FL",
    urgency_line: "Saved from demolition",
    status: "complete",
    current_phase: 3,
    hero_image: shermanHero,
    thumb_image: shermanHero,
    story_html:
      "<p>A 1942 bungalow rescued from a code-enforcement teardown order. Miss Eleanor had lived there for 61 years.</p>",
    completion_story_html:
      "<p>On December 10, 2025, Miss Eleanor walked back through her front door for the first time in eight months. She brought peach cobbler for the whole crew.</p>",
    raised: 42800,
    phase1_goal: 40000,
    donor_count: 314,
    deadline: "2025-11-01",
    started_at: "2025-08-15",
    completed_at: "2025-12-10",
    duration_weeks: 17,
    service_tags: ["Code Violations", "Roof", "Foundation"],
    share_copy: "Miss Eleanor is home. Share her story and inspire the next rescue:",
    slingshot_url: "https://slingshotgiving.com/c/miss-eleanors-cottage",
    phases: [],
    ledger: [
      { label: "Code violation settlements", amount: 12400, status: "paid" },
      { label: "Roof replacement", amount: 18900, status: "paid" },
      { label: "Foundation repair", amount: 8200, status: "paid" },
      { label: "Returned to rescue fund", amount: 3300, status: "returned" },
      { label: "Project Total", amount: 42800, status: "paid", is_total_row: true },
    ],
    updates: [
      {
        id: "ue1",
        created_at: "2025-12-10",
        title: "Miss Eleanor came home",
        content_html: "<p>She brought peach cobbler. We brought tissues. The neighbors clapped.</p>",
        is_final: true,
      },
    ],
    recent_donors: [],
  },
];

export const getRescue = (slug: string) => rescues.find((r) => r.slug === slug);
export const activeRescue = () => rescues.find((r) => r.status === "active");
export const pastRescues = () =>
  rescues
    .filter((r) => r.status === "complete")
    .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""));

export const daysRemaining = (deadline: string) => {
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
