import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, MapPin, MessageSquare, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ServicePageFooter } from "@/components/services/ServicePageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICE_DESTINATIONS, serviceDestination } from "@/lib/services-directory";
import { COMING_SOON_SERVICES } from "@/lib/coming-soon-services";
import { zipFromSearch } from "@/lib/service-lead";
import { track } from "@/lib/track";
import recent1 from "@/assets/recent-1.jpg";
import recent4 from "@/assets/recent-4.jpg";
import sherman from "@/assets/sherman-hero.jpg";
import { JOB_PHOTOS } from "@/lib/job-photos";

// One photo per card, keyed by card title. Real job photos for the cleanout & remodel cards.
const cardImages: Record<string, { src: string; alt: string }> = {
  "Junk Removal": JOB_PHOTOS.truckJones2,
  "Yard Debris Removal": JOB_PHOTOS.yardTruckJunk,
  "Hoarder & Estate Cleanouts": JOB_PHOTOS.coolrdBefore1,
  "Property Cleanouts": JOB_PHOTOS.leilaBefore1,
  "Remodeling": JOB_PHOTOS.goldenBefore3,
  "Sell Your House": { src: recent1, alt: "Zombie Houses property project for sell your house" },
  "Design & Shop the Look": { src: recent4, alt: "Zombie Houses property project for design & shop the look" },
  "Rescue & Community": { src: sherman, alt: "Sherman outside his Tampa Bay home" },
};
const description = "Junk removal, hoarder & estate cleanouts, property cleanouts & remodeling consultations in Tampa Bay from the Zombie Houses team.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Zombie Houses" },
      { name: "description", content: description },
      { property: "og:title", content: "Services | Zombie Houses" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zombiehouses.com/services" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://zombiehouses.com/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setZip(zipFromSearch(window.location.search));
    track("view_service", { page: "services" });
  }, []);

  function getStarted(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const destination = serviceDestination(service);
    if (!destination) { setError("Choose What You Need"); return; }
    if (!/^\d{5}$/.test(zip)) { setError("Enter a 5-Digit ZIP Code"); return; }
    setError("");
    // Numeric-looking strings are JSON-quoted by the router; leading-zero ZIPs remain strings.
    void navigate({ to: destination.to, hash: destination.hash, search: { zip: zip.startsWith("0") ? zip : Number(zip) } });
  }

  return <SiteLayout footer={<ServicePageFooter />}>
    <section className="border-b border-service-border bg-service-surface px-5 pb-10 pt-10 text-service-foreground md:px-8 md:pb-14 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-red">Tampa Bay</p>
        <h1 className="mt-3 font-display text-5xl leading-none tracking-normal md:text-7xl">Services</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-service-muted md:text-xl">Cleanouts, junk removal &amp; home projects from a Tampa house flipper.</p>
        <form onSubmit={getStarted} className="mt-8 grid gap-3 rounded-lg bg-card p-3 text-card-foreground md:grid-cols-[minmax(0,1fr)_200px_180px] md:items-end md:p-4">
          <div className="min-w-0 space-y-2">
            <label htmlFor="services-choice" className="block text-sm font-semibold">What Do You Need?</label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id="services-choice" className="min-h-14 whitespace-normal text-left text-base [&>span]:line-clamp-none"><SelectValue placeholder="Choose a Service" /></SelectTrigger>
              <SelectContent>{SERVICE_DESTINATIONS.map((item) => <SelectItem key={item.title} value={item.title} className="min-h-12">{item.title}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="services-zip" className="block text-sm font-semibold">ZIP Code</label>
            <div className="relative"><MapPin className="pointer-events-none absolute left-3 top-5 size-4 text-red" aria-hidden="true" /><Input id="services-zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" required maxLength={5} placeholder="5-Digit ZIP" value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} className="h-14 pl-10 text-base" /></div>
          </div>
          <Button type="submit" className="h-14 text-base font-bold">Get Started<ArrowRight /></Button>
          {error && <p role="alert" className="text-sm text-destructive md:col-span-3">{error}</p>}
        </form>
      </div>
    </section>

    <section aria-label="Services" className="bg-service-background px-4 py-8 text-service-foreground md:px-8 md:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
        {SERVICE_DESTINATIONS.map((item, index) => <Link key={item.title} to={item.to} hash={item.hash} className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-service-border bg-service-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={cardImages[item.title].src} alt={cardImages[item.title].alt} loading={index < 3 ? "eager" : "lazy"} className="h-full w-full object-cover" />
            {item.to === "/remodel" && <span className="absolute bottom-2 left-2 rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground md:bottom-3 md:left-3">Consultation</span>}
          </div>
          <div className="flex flex-1 flex-col p-3 md:p-5">
            <h2 className="font-display text-base leading-snug tracking-normal md:text-2xl">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-service-muted">{item.description}</p>
            <span className="mt-auto flex items-center justify-between gap-2 pt-5 text-sm font-bold text-red"><span>{item.cta}</span><ArrowRight className="size-4 shrink-0" aria-hidden="true" /></span>
          </div>
        </Link>)}
      </div>
    </section>

    <section aria-labelledby="coming-soon-heading" className="border-t border-service-border bg-service-background px-4 py-8 text-service-foreground md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="coming-soon-heading" className="font-display text-2xl tracking-normal md:text-4xl">Specialty Cleanups</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-service-muted md:text-base">We're adding these. Until then, tell us what you need & we'll follow up or point you to a specialist.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
          {COMING_SOON_SERVICES.map((item) => <Link key={item.slug} to="/coming-soon" search={{ service: item.slug }} className="group flex min-w-0 flex-col rounded-lg border border-dashed border-service-border bg-service-surface p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red md:p-5">
            {item.photo ? <div className="relative -mx-3 -mt-3 mb-1 aspect-[16/9] overflow-hidden rounded-t-lg md:-mx-5 md:-mt-5">
              <img src={item.photo.src} alt={item.photo.alt} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-red md:text-xs">Coming Soon</span>
              <span className="absolute bottom-2 left-2 rounded bg-red px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">Before</span>
            </div> : <div className="flex items-start justify-between gap-2">
              <item.icon className="size-7 shrink-0 text-service-muted md:size-8" aria-hidden="true" />
              <span className="rounded bg-service-background px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-red md:text-xs">Coming Soon</span>
            </div>}
            <h3 className="mt-4 font-display text-base leading-snug tracking-normal md:text-xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-service-muted">{item.description}</p>
            <span className="mt-auto flex items-center justify-between gap-2 pt-5 text-sm font-bold text-service-foreground"><span>Get Notified</span><ArrowRight className="size-4 shrink-0" aria-hidden="true" /></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="border-y border-service-border bg-service-surface px-5 py-10 text-service-foreground md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="font-display text-2xl tracking-normal md:text-3xl">Not Sure What You Need?</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="min-h-14 whitespace-normal text-base font-semibold"><a href="tel:+18139232042" onClick={() => track("click_call", { page: "services" })}><Phone />Call 813-923-2042</a></Button>
          <Button asChild variant="outline" className="min-h-14 border-service-border bg-service-background px-6 text-base text-service-foreground hover:bg-service-surface hover:text-service-foreground"><a href="sms:8139232042" onClick={() => track("click_text", { page: "services" })}><MessageSquare />Text</a></Button>
        </div>
      </div>
    </section>
  </SiteLayout>;
}
