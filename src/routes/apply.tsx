import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply for Help — ZombieHouses" },
      {
        name: "description",
        content:
          "Nominate a home or family who needs a Zombie House Rescue. We review every submission.",
      },
      { property: "og:title", content: "Apply for Help — ZombieHouses" },
      { property: "og:description", content: "Nominate a home for rescue." },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  return (
    <SiteLayout>
      <section className="max-w-[820px] mx-auto px-6 pt-16 pb-12 md:pt-24">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Apply for Help</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06]">
          Nominate a home for rescue.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Know a homeowner facing a tax-deed sale, code-enforcement order, or major repair they can't afford?
          Tell us their story. We review every submission.
        </p>
      </section>

      <section className="max-w-[820px] mx-auto px-6 pb-24">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-[20px] bg-off border border-mid p-8 grid sm:grid-cols-2 gap-4"
        >
          <In placeholder="Your Name" />
          <In placeholder="Your Relationship to Homeowner" />
          <In placeholder="Phone" type="tel" />
          <In placeholder="Email" type="email" />
          <In placeholder="Homeowner Name" />
          <In placeholder="Property Address" />
          <select required defaultValue="" className="sm:col-span-2 rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]">
            <option value="" disabled>Type of help needed</option>
            <option>Back property taxes / tax-deed sale</option>
            <option>Code enforcement / demolition order</option>
            <option>Major repairs (roof, plumbing, electrical)</option>
            <option>Reverse mortgage / foreclosure</option>
            <option>Other</option>
          </select>
          <textarea
            rows={6}
            required
            placeholder="Tell us the story. Who lives there? What happened? What's the deadline?"
            className="sm:col-span-2 rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e] resize-none"
          />
          <button type="submit" className="sm:col-span-2 rounded-lg bg-red text-white py-3.5 font-bold text-sm hover:bg-[#b81830] transition">
            Submit Nomination →
          </button>
          <p className="sm:col-span-2 text-[0.7rem] text-center text-muted-foreground">
            We review every application. Most rescues start with a tip from someone who knows the family.
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}

function In(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      required
      {...props}
      className="rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
    />
  );
}
