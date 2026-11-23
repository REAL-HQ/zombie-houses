import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { cleanoutsLanding } from "@/lib/cleanouts-landing";
const title = "Hoarder & Estate Cleanouts Tampa | Zombie Houses";
const description = "Compassionate hoarder & estate cleanouts in Tampa Bay. Free photo quote, upfront quote before we start & the option to sell as-is.";
export const Route = createFileRoute("/cleanouts")({
  head: () => ({ meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { property: "og:url", content: "https://zombiehouses.com/cleanouts" },
    { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
  ], links: [{ rel: "canonical", href: "https://zombiehouses.com/cleanouts" }] }),
  component: () => <ServiceLandingPage config={cleanoutsLanding} />,
});
