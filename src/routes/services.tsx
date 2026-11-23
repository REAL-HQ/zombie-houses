import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ServiceLeadForm } from "@/components/services/ServiceLeadForm";

const title = "Tampa Bay Property Services | Zombie Houses";
const description = "Junk removal, hoarder and estate cleanouts, and property cleanouts across Tampa Bay.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-sm font-bold uppercase tracking-wider text-red">Tampa Bay</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Zombie Houses Services
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Junk Removal", to: "/junk" as const },
            { label: "Hoarder & Estate Cleanouts", to: "/cleanouts" as const },
            { label: "Property Cleanouts", to: "/property-cleanouts" as const },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-5 font-display text-lg font-bold text-foreground transition-colors hover:border-red"
            >
              {item.label}
              <ArrowRight className="size-5 shrink-0 text-red" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <ServiceLeadForm sourcePage="/services" />
        </div>
      </section>
    </SiteLayout>
  );
}