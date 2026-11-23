import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bath, CookingPot, Hammer } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ServiceLeadForm } from "@/components/services/ServiceLeadForm";
import { ServiceNoticeBand } from "@/components/services/ServiceNoticeBand";
import { JobPhotoGrid } from "@/components/services/JobPhotoGrid";
import { JOB_PHOTOS } from "@/lib/job-photos";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";
const title = "Remodeling Consultations | Zombie Houses";
const description = "Request a consultation for a bathroom, kitchen or smaller home project in Tampa Bay.";
const projects = [
  { title: "Bathrooms", description: "Showers, tubs, vanities, tile & full refreshes.", icon: Bath },
  { title: "Kitchens", description: "Cabinets, counters, backsplash & layout updates.", icon: CookingPot },
  { title: "Smaller Projects", description: "Flooring, paint, doors, trim & repairs.", icon: Hammer },
];
export const Route = createFileRoute("/remodel")({
  head: () => ({ meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { property: "og:url", content: "https://zombiehouses.com/remodel" },
    { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
  ], links: [{ rel: "canonical", href: "https://zombiehouses.com/remodel" }] }),
  component: RemodelPage,
});

function RemodelPage() {
  useEffect(() => { track("view_service", { page: "remodel" }); }, []);
  // Keep the full site navigation, but omit network references from this service page's footer.
  const footer = <footer className="border-t border-service-border bg-service-background px-5 py-8 text-service-muted">
    <nav aria-label="Service page footer" className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2">
      <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/privacy">Privacy</Link></Button>
      <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/terms">Terms</Link></Button>
      <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/sms-terms">SMS Terms</Link></Button>
      <Button asChild variant="link" className="min-h-12 whitespace-normal px-0 text-service-foreground md:ml-auto"><Link to="/services">More Zombie Houses Services</Link></Button>
    </nav>
  </footer>;
  return <SiteLayout footer={footer} className="bg-service-background">
    <section className="border-b border-service-border bg-service-surface px-5 py-10 text-service-foreground md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold text-red">Remodeling</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight tracking-normal md:text-5xl">Bathroom, Kitchen &amp; Smaller Projects</h1>
        <p className="mt-5 text-base leading-relaxed text-service-muted md:text-xl">Tell us about your project &amp; we'll set up a consultation.</p>
      </div>
    </section>
    <section aria-label="Project types" className="bg-service-background px-5 py-10 text-service-foreground md:px-8 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-6">
        {projects.map((project) => <article key={project.title} className="rounded-lg border border-service-border bg-service-surface p-6">
          <project.icon className="size-8 text-red" aria-hidden="true" />
          <h2 className="mt-5 font-display text-2xl tracking-normal">{project.title}</h2>
          <p className="mt-3 text-base leading-relaxed text-service-muted">{project.description}</p>
        </article>)}
      </div>
    </section>
    <section aria-labelledby="remodel-jobs" className="border-t border-service-border bg-service-background px-5 py-10 text-service-foreground md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <h2 id="remodel-jobs" className="font-display text-3xl tracking-normal md:text-4xl">Recent Jobs</h2>
        <JobPhotoGrid photos={[JOB_PHOTOS.goldenBefore3, JOB_PHOTOS.leilaBefore5, JOB_PHOTOS.elmwoodBefore4, JOB_PHOTOS.goldenBefore4, JOB_PHOTOS.elmwoodBefore6, JOB_PHOTOS.goldenBefore5]} />
      </div>
    </section>
    <ServiceNoticeBand>Work that requires a license, such as structural, plumbing, electrical or general contracting, is handled by appropriately licensed professionals. We'll confirm who does what during your consultation.</ServiceNoticeBand>
    <section id="quote" className="bg-service-background px-5 py-12 text-service-foreground md:px-8 md:py-16">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-8 font-display text-3xl tracking-normal md:text-4xl">Request a Consultation</h2>
        <div className="rounded-lg border border-border bg-card p-5 text-card-foreground md:p-8">
          <ServiceLeadForm defaultService="Remodeling Consultation" sourcePage="/remodel" buttonLabel="Request a Consultation" />
        </div>
      </div>
    </section>
  </SiteLayout>;
}
