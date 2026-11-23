import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BUSINESS } from "@/lib/business";

const title = "About | Zombie Houses";
const description = "Learn about Zombie Houses — renovating neglected homes and helping families across Tampa Bay.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-sm font-bold uppercase tracking-wider text-red">About</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Zombie Houses
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          We renovate neglected houses, rescue families in need, and restore hope to the communities they call home — one zombie house at a time.
        </p>
        <p className="mt-4 text-base text-muted-foreground">{BUSINESS.address}</p>
      </section>
    </SiteLayout>
  );
}