import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, MapPin, MessageSquare, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ServicePageFooter } from "@/components/services/ServicePageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICE_DESTINATIONS, serviceDestination } from "@/lib/services-directory";
import { zipFromSearch } from "@/lib/service-lead";
import { track } from "@/lib/track";
import recent1 from "@/assets/recent-1.jpg";
import recent2 from "@/assets/recent-2.jpg";
import recent3 from "@/assets/recent-3.jpg";
import recent4 from "@/assets/recent-4.jpg";
import recent5 from "@/assets/recent-5.jpg";
import recent6 from "@/assets/recent-6.jpg";
import sherman from "@/assets/sherman-hero.jpg";

const images = [recent2, recent6, recent3, recent5, recent1, recent4, sherman];
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
    const to = serviceDestination(service);
    if (!to) { setError("Choose what you need."); return; }
    if (!/^\d{5}$/.test(zip)) { setError("Enter a 5-digit ZIP code."); return; }
    setError("");
    // Numeric-looking strings are JSON-quoted by the router; leading-zero ZIPs remain strings.
    void navigate({ to, search: { zip: zip.startsWith("0") ? zip : Number(zip) } });
  }

  return <SiteLayout footer={<ServicePageFooter />}>
    <section className="border-b border-service-border bg-service-surface px-5 pb-10 pt-10 text-service-foreground md:px-8 md:pb-14 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-red">Tampa Bay</p>
        <h1 className="mt-3 font-display text-5xl leading-none tracking-normal md:text-7xl">Services</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-service-muted md:text-xl">Cleanouts, junk removal &amp; home projects from a Tampa house flipper.</p>
        <form onSubmit={getStarted} className="mt-8 grid gap-3 rounded-lg bg-card p-3 text-card-foreground md:grid-cols-[minmax(0,1fr)_200px_180px] md:items-end md:p-4">
          <div className="min-w-0 space-y-2">
            <label htmlFor="services-choice" className="block text-sm font-semibold">What do you need?</label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id="services-choice" className="min-h-14 whitespace-normal text-left text-base [&>span]:line-clamp-none"><SelectValue placeholder="Choose a service" /></SelectTrigger>
              <SelectContent>{SERVICE_DESTINATIONS.map((item) => <SelectItem key={item.to} value={item.title} className="min-h-12">{item.title}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="services-zip" className="block text-sm font-semibold">ZIP Code</label>
            <div className="relative"><MapPin className="pointer-events-none absolute left-3 top-5 size-4 text-red" aria-hidden="true" /><Input id="services-zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" required maxLength={5} placeholder="5-digit ZIP" value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} className="h-14 pl-10 text-base" /></div>
          </div>
          <Button type="submit" className="h-14 text-base font-bold">Get Started<ArrowRight /></Button>
          {error && <p role="alert" className="text-sm text-destructive md:col-span-3">{error}</p>}
        </form>
      </div>
    </section>

    <section aria-label="Services" className="bg-service-background px-4 py-8 text-service-foreground md:px-8 md:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
        {SERVICE_DESTINATIONS.map((item, index) => <Link key={item.to} to={item.to} className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-service-border bg-service-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={images[index]} alt={item.to === "/rescue" ? "Sherman outside his Tampa Bay home" : `Zombie Houses property project for ${item.title.toLowerCase()}`} loading={index < 3 ? "eager" : "lazy"} className="h-full w-full object-cover" />
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
