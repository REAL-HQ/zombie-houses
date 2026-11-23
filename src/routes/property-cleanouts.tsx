import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { propertyCleanoutsLanding } from "@/lib/property-cleanouts-landing";
const title = "Property Cleanouts Tampa | Zombie Houses";
const description = "Move-out, eviction, foreclosure & pre-listing cleanouts for Tampa Bay landlords & realtors. Free photo quote & upfront quote before we start.";
export const Route = createFileRoute("/property-cleanouts")({
  head: () => ({ meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { property: "og:url", content: "https://zombiehouses.com/property-cleanouts" },
    { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
  ], links: [{ rel: "canonical", href: "https://zombiehouses.com/property-cleanouts" }] }),
  component: () => <ServiceLandingPage config={propertyCleanoutsLanding} />,
});
