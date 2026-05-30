import shermanHero from "@/assets/sherman-hero.jpg";

export type RescueStatus = "active" | "funded" | "complete" | "paused";

export interface Phase {
  number: number;
  status: "active" | "upcoming" | "complete";
  label: string;
  title: string;
  description: string;
  goal?: number;
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
  subtitle: string;
  location: string;
  status: RescueStatus;
  hero_image: string;
  story_html: string;
  raised: number;
  goal: number;
  donor_count: number;
  deadline: string;
  started_at: string;
  completed_at?: string;
  duration_weeks?: number;
  service_tags: string[];
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
    subtitle: "An 84-year-old veteran. Three weeks from losing the home he built with his own hands.",
    location: "Tampa, FL",
    status: "active",
    hero_image: shermanHero,
    story_html: `
      <p>Sherman Whitfield bought his small block house off 22nd Avenue in 1974 — the year his daughter was born. He framed the back porch himself, planted the avocado tree out front, and raised three kids inside its walls.</p>
      <p>Then his wife got sick. Medical bills piled up. A reverse-mortgage salesman knocked at the wrong moment. Within four years, Sherman was three property-tax cycles behind and a tax-deed sale was scheduled for the third week of next month.</p>
      <p>If we don't close the gap by then, the home gets auctioned on the courthouse steps. Sherman moves into his daughter's spare room. The avocado tree gets bulldozed for a flip.</p>
      <p>We're not letting that happen.</p>
    `,
    raised: 11420,
    goal: 35000,
    donor_count: 187,
    deadline: "2026-06-21",
    started_at: "2026-05-01",
    service_tags: ["Back Taxes", "Title Clearing", "Roof Repair"],
    slingshot_url: "https://slingshotgiving.com/c/shermans-home",
    phases: [
      {
        number: 1,
        status: "active",
        label: "Active Now — Phase 1",
        title: "Stop the auction",
        description: "Pay off three years of back property taxes plus penalties and clear the tax-deed lien before the June 21 sale date.",
        goal: 35000,
      },
      {
        number: 2,
        status: "upcoming",
        label: "Coming Next",
        title: "Roof, plumbing, safety repairs",
        description: "Once the home is secure, Phase 2 funds a new roof, replaces the failing water heater, and brings electrical up to code so Sherman can age in place.",
        goal: 28000,
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
        content_html: "<p>Sat on the porch for an hour. He showed us the original mortgage paperwork in a manila folder he's kept for 52 years. We're not letting this one go.</p>",
      },
      {
        id: "u2",
        created_at: "2026-05-20",
        title: "Title search came back clean",
        content_html: "<p>No second mortgage, no judgments. Just the tax lien. That means once we settle the county, the home is fully Sherman's again — free and clear.</p>",
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
    subtitle: "Saved from demolition. Restored. Returned.",
    location: "St. Petersburg, FL",
    status: "complete",
    hero_image: shermanHero,
    story_html: "<p>A 1942 bungalow rescued from a code-enforcement teardown order.</p>",
    raised: 42800,
    goal: 40000,
    donor_count: 314,
    deadline: "2025-11-01",
    started_at: "2025-08-15",
    completed_at: "2025-12-10",
    duration_weeks: 17,
    service_tags: ["Code Violations", "Roof Repair", "Foundation"],
    slingshot_url: "https://slingshotgiving.com/c/miss-eleanors-cottage",
    phases: [],
    ledger: [],
    updates: [],
    recent_donors: [],
  },
];

export const getRescue = (slug: string) => rescues.find((r) => r.slug === slug);
export const activeRescues = () => rescues.filter((r) => r.status === "active" || r.status === "funded");
export const pastRescues = () => rescues.filter((r) => r.status === "complete");
