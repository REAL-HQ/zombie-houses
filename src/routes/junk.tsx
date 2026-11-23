import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { junkLanding } from "@/lib/junk-landing";

const title = "Junk Removal Tampa Bay | Zombie Houses";
const description = "Send photos for a free junk removal quote in Tampa Bay. Upfront quote before we start. Furniture, appliances, garages, yard debris & estate contents.";
export const Route = createFileRoute("/junk")({
  head: () => ({ meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { property: "og:url", content: "https://zombiehouses.com/junk" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ], links: [{ rel: "canonical", href: "https://zombiehouses.com/junk" }] }),
  component: () => <ServiceLandingPage config={junkLanding} />,
});