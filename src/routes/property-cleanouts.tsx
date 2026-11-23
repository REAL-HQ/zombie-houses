import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ServiceLeadForm } from "@/components/services/ServiceLeadForm";

const title = "Property Cleanouts Tampa Bay | Zombie Houses";
const description = "Request a free photo quote for property cleanouts in Tampa Bay from Zombie Houses.";

export const Route = createFileRoute("/property-cleanouts")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PropertyCleanoutsPage,
});

function PropertyCleanoutsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-sm font-bold uppercase tracking-wider text-red">Tampa Bay</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Property Cleanouts
        </h1>
        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <ServiceLeadForm defaultService="Property Cleanout" sourcePage="/property-cleanouts" />
        </div>
      </section>
    </SiteLayout>
  );
}