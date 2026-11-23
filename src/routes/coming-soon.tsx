import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ServiceLeadForm } from "@/components/services/ServiceLeadForm";
import { ServicePageFooter } from "@/components/services/ServicePageFooter";
import { Button } from "@/components/ui/button";
import { COMING_SOON_SERVICES, comingSoonService } from "@/lib/coming-soon-services";
import { track } from "@/lib/track";

const title = "Coming Soon | Zombie Houses Services";
const description = "Specialty cleanups Zombie Houses is adding in Tampa Bay. Tell us what you need & we'll follow up.";

export const Route = createFileRoute("/coming-soon")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => ({
    service: comingSoonService(search.service)?.slug,
  }),
  head: () => ({ meta: [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: ComingSoonPage,
});

function ComingSoonPage() {
  const { service: slug } = Route.useSearch();
  const service = comingSoonService(slug);
  useEffect(() => { track("view_service", { page: "coming-soon", service: slug ?? "none" }); }, [slug]);
  const sourcePage = service ? `/coming-soon?service=${service.slug}` : "/coming-soon";
  return <SiteLayout footer={<ServicePageFooter />} className="bg-service-background">
    <section className="border-b border-service-border bg-service-surface px-5 py-10 text-service-foreground md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <span className="inline-block rounded bg-red px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">Coming Soon</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight tracking-normal md:text-5xl">{service ? service.title : "Specialty Cleanups"}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-service-muted md:text-xl">We don't offer this yet. Tell us what you're dealing with & we'll reach out when it's available, or help you find the right specialist now.</p>
      </div>
    </section>
    <section className="bg-service-background px-5 py-12 text-service-foreground md:px-8 md:py-16">
      <div className="mx-auto max-w-xl">
        <div className="rounded-lg border border-border bg-card p-5 text-card-foreground md:p-8">
          <ServiceLeadForm key={sourcePage} defaultService="Other" sourcePage={sourcePage} buttonLabel="Get Notified" eyebrow="Service Request" thankYouItems={[
            "We review what you sent.",
            "We call or text you to talk it through.",
            "If we can't help yet, we'll point you to a specialist who can.",
          ]} />
        </div>
      </div>
    </section>
    <section aria-label="Other coming soon services" className="border-t border-service-border bg-service-surface px-5 py-10 text-service-foreground md:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
        {COMING_SOON_SERVICES.filter((item) => item.slug !== slug).map((item) => <Button key={item.slug} asChild variant="outline" className="min-h-12 border-service-border bg-service-background text-service-foreground hover:bg-service-surface hover:text-service-foreground"><Link to="/coming-soon" search={{ service: item.slug }}>{item.title}</Link></Button>)}
        <Button asChild variant="link" className="min-h-12 text-red"><Link to="/services">All Services</Link></Button>
      </div>
    </section>
  </SiteLayout>;
}
