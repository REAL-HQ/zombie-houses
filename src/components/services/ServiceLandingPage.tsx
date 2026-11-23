import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ClipboardList, MessageSquare, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceLeadForm } from "./ServiceLeadForm";
import { ServiceNoticeBand } from "./ServiceNoticeBand";
import { JobPhotoFigure, JobPhotoGrid } from "./JobPhotoGrid";
import type { JobPhoto } from "@/lib/job-photos";
import { track } from "@/lib/track";
import logo from "@/assets/zombie-houses-logo.png";
import heroBg from "@/assets/recent-3.jpg";
import ownerPhoto from "@/assets/hero-couple.jpg";

type ServiceLink = "/cleanouts" | "/property-cleanouts" | "/sell";
export interface ServiceLandingConfig {
  page: string;
  heroImage?: string;
  heroPhoto?: JobPhoto;
  gallery?: readonly JobPhoto[];
  feature?: { id: string; heading: string; description: string; bullets: readonly string[]; photos: readonly [JobPhoto, ...JobPhoto[]] };
  sourcePage: string;
  service: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  bullets: readonly string[];
  steps: readonly { title: string; description: string; icon: LucideIcon }[];
  itemsHeading?: string;
  items?: readonly { title: string; icon: LucideIcon }[];
  itemsNote?: string;
  care?: { heading: string; bullets: readonly string[] };
  notice?: string;
  sellingOption?: { description: string; buttonLabel: string; quoteLinkLabel?: string };
  audiences: readonly { title: string; to?: ServiceLink }[];
  ownerHeading: string;
  ownerDescription: string;
  related?: readonly { title: string; to: ServiceLink }[];
  faqs: readonly { question: string; answer: string; to?: ServiceLink }[];
  quoteHeading: string;
}

const sectionClass = "mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20";
const headingClass = "font-display text-3xl leading-tight tracking-normal md:text-4xl";

export function ServiceLandingPage({ config }: { config: ServiceLandingConfig }) {
  useEffect(() => { track("view_service", { page: config.page }); }, [config.page]);
  const call = () => track("click_call", { page: config.page });
  const text = () => track("click_text", { page: config.page });

  function scrollToQuote() {
    document.getElementById("quote")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  return <div className="bg-service-background pb-[calc(88px+env(safe-area-inset-bottom))] text-service-foreground md:pb-0">
    {/* Same bar & logo placement as the site Nav (logo hangs over the bar), minus the menu. */}
    <header className="relative z-[200] bg-[hsl(0_0%_15%)]">
      <div className="w-full px-4 md:px-8 h-16 md:h-20 flex items-center justify-between relative overflow-visible">
        <Link
          to="/"
          className="relative z-40 block h-16 md:h-20 w-24 md:w-40 shrink-0 overflow-visible"
        >
          <img
            src={logo}
            alt="Zombie Houses"
            className="absolute top-2 md:top-2 left-0 h-14 md:h-20 w-auto max-w-none object-contain drop-shadow-lg"
          />
        </Link>
        <Button asChild variant="ghost" className="min-h-12 px-2 text-sm font-bold text-service-foreground hover:bg-service-background hover:text-service-foreground md:text-base">
          <a href="tel:8139232042" onClick={call}><Phone aria-hidden="true" />813-923-2042</a>
        </Button>
      </div>
    </header>

    <main>
      <section className="relative overflow-hidden border-b border-service-border bg-service-surface">
        <img
          src={config.heroImage ?? heroBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-service-background/95 via-service-background/85 to-service-background/95 md:bg-gradient-to-r md:from-service-background/95 md:via-service-background/80 md:to-service-background/70"
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-4 px-5 py-5 md:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] md:gap-x-14 md:gap-y-6 md:px-8 md:py-14">
          {/* Headline & subhead span the full width; on lg+ each stays on one line and scales down instead of wrapping. */}
          <div className="min-w-0 md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-red md:text-sm">{config.eyebrow}</p>
            <h1 className="mt-1.5 font-display text-3xl leading-[1.08] tracking-tight md:mt-3 md:text-5xl lg:whitespace-nowrap lg:text-[clamp(3rem,5.2vw,4.25rem)]">{config.headline}</h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-service-muted md:mt-4 md:max-w-none md:text-lg lg:whitespace-nowrap lg:text-[clamp(0.95rem,1.55vw,1.25rem)]">{config.subhead}</p>
          </div>
          {config.heroPhoto && <JobPhotoFigure photo={config.heroPhoto} eager className="aspect-[21/9] shadow-2xl md:aspect-[16/10] md:self-start" />}
          <div aria-label="Quick Quote" className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-2xl md:row-span-2 md:self-start md:p-7">
            <ServiceLeadForm defaultService={config.service} sourcePage={config.sourcePage} compact />
          </div>
          <ul className="grid gap-2.5 pt-1 md:self-start md:gap-3 md:pt-0">
            {config.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-3 text-sm font-semibold md:text-base"><Check className="size-5 shrink-0 text-red" aria-hidden="true" />{bullet}</li>)}
          </ul>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>How It Works</h2>
        <ol className="mt-8 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-10">
          {config.steps.map((step, index) => <li key={step.title} className="border-t border-service-border pt-5">
            <div className="flex items-center justify-between"><span className="font-display text-3xl tracking-normal text-red">0{index + 1}</span><step.icon className="size-7 text-service-muted" aria-hidden="true" /></div>
            <h3 className="mt-5 font-display text-xl tracking-normal">{step.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-service-muted">{step.description}</p>
          </li>)}
        </ol>
      </section>

      {config.items && config.items.length > 0 && <section className="border-y border-service-border bg-service-surface">
        <div className={sectionClass}>
          <h2 className={headingClass}>{config.itemsHeading}</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-10 md:grid-cols-4 md:gap-10">
            {config.items.map((item) => <li key={item.title} className="min-w-0"><item.icon className="mb-4 size-8 text-red" aria-hidden="true" /><h3 className="font-display text-base leading-snug tracking-normal md:text-lg">{item.title}</h3></li>)}
          </ul>
          {config.itemsNote && <p className="mt-10 max-w-3xl border-t border-service-border pt-5 text-sm leading-relaxed text-service-muted">{config.itemsNote}</p>}
        </div>
      </section>}

      <section className={sectionClass}>
        <h2 className={headingClass}>Who We Help</h2>
        <ul className="mt-7 grid gap-0 md:grid-cols-2 md:gap-x-12">
          {config.audiences.map((audience) => <li key={audience.title} className="border-b border-service-border">
            {audience.to ? <Button asChild variant="link" className="flex h-auto min-h-16 w-full justify-between whitespace-normal px-0 py-4 text-left text-base text-service-foreground"><Link to={audience.to}>{audience.title}<ArrowRight className="text-red" aria-hidden="true" /></Link></Button> : <p className="flex min-h-16 items-center py-4 text-base font-medium">{audience.title}</p>}
          </li>)}
        </ul>
      </section>

      {config.care && <section className="border-t border-service-border">
        <div className={`${sectionClass} grid gap-7 md:grid-cols-[1fr_2fr] md:gap-16`}>
          <h2 className={headingClass}>{config.care.heading}</h2>
          <ul className="space-y-5">
            {config.care.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-base leading-relaxed"><Check className="mt-1 size-5 shrink-0 text-red" aria-hidden="true" />{bullet}</li>)}
          </ul>
        </div>
      </section>}

      {config.notice && <ServiceNoticeBand>{config.notice}</ServiceNoticeBand>}

      {config.sellingOption && <section id="sell-option" className="scroll-mt-6 border-y border-service-border bg-service-surface">
        <div className={`${sectionClass} grid gap-7 md:grid-cols-[1fr_2fr] md:gap-16`}>
          <h2 className={headingClass}>Clean It Out or Sell It As-Is</h2>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-service-muted">{config.sellingOption.description}</p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <Button asChild className="min-h-14 whitespace-normal text-base font-bold"><Link to="/sell">{config.sellingOption.buttonLabel}<ArrowRight aria-hidden="true" /></Link></Button>
              {config.sellingOption.quoteLinkLabel && <Button asChild variant="link" className="min-h-12 whitespace-normal px-0 text-left text-service-foreground"><a href="#quote">{config.sellingOption.quoteLinkLabel}<ArrowRight aria-hidden="true" /></a></Button>}
            </div>
          </div>
        </div>
      </section>}

      <section className="border-y border-service-border bg-service-surface">
        <div className={`${sectionClass} grid items-center gap-6 md:grid-cols-2 md:gap-14`}>
          <img src={ownerPhoto} alt="Dolmar & Keisha Cross" loading="lazy" className="aspect-[4/5] w-full rounded-xl border border-service-border object-cover object-[52%_center] md:aspect-square" />
          <div className="space-y-4">
            <h2 className={headingClass}>{config.ownerHeading}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-service-foreground md:text-xl">{config.ownerDescription}</p>
          </div>
        </div>
      </section>

      {config.feature && <section id={config.feature.id} className="scroll-mt-4 border-b border-service-border">
        <div className={`${sectionClass} grid gap-8 md:grid-cols-2 md:items-center md:gap-14`}>
          <div className="space-y-5">
            <h2 className={headingClass}>{config.feature.heading}</h2>
            <p className="max-w-xl text-lg leading-relaxed text-service-muted">{config.feature.description}</p>
            <ul className="grid gap-3">
              {config.feature.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-3 text-base font-semibold"><Check className="size-5 shrink-0 text-red" aria-hidden="true" />{bullet}</li>)}
            </ul>
            <Button className="min-h-12 px-6 text-base font-bold" onClick={scrollToQuote}>Get My Free Quote<ArrowRight aria-hidden="true" /></Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <JobPhotoFigure photo={config.feature.photos[0]} className="col-span-2 aspect-[16/10]" />
            {config.feature.photos.slice(1).map((photo) => <JobPhotoFigure key={photo.src} photo={photo} className="aspect-[4/3]" />)}
          </div>
        </div>
      </section>}

      {config.gallery && config.gallery.length > 0 && <section className={sectionClass}>
        <h2 className={headingClass}>Recent Jobs</h2>
        <JobPhotoGrid photos={config.gallery} />
      </section>}

      {config.related && config.related.length > 0 && <section className={`${sectionClass} border-t border-service-border`}>
        <h2 className={headingClass}>Bigger Job?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {config.related.map((related) => <Button key={related.to} asChild variant="outline" className="h-auto min-h-28 justify-between whitespace-normal border-service-border bg-service-surface p-6 text-left font-display text-xl tracking-normal text-service-foreground hover:bg-service-background hover:text-service-foreground motion-safe:transition-transform motion-safe:hover:-translate-y-1"><Link to={related.to}>{related.title}<ArrowRight className="text-red" aria-hidden="true" /></Link></Button>)}
        </div>
      </section>}

      <section className="border-y border-service-border bg-service-surface">
        <div className={`${sectionClass} grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16`}>
          <h2 className={headingClass}>FAQ</h2>
          <Accordion type="single" collapsible>
            {config.faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`} className="border-service-border">
              <AccordionTrigger className="min-h-16 gap-4 text-base font-semibold leading-relaxed [&>svg]:text-service-muted motion-reduce:[&>svg]:transition-none">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-service-muted motion-reduce:animate-none">
                {faq.to ? <Link to={faq.to} className="underline decoration-red underline-offset-4 hover:text-service-foreground">{faq.answer}</Link> : faq.answer}
              </AccordionContent>
            </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section id="quote" className={`${sectionClass} scroll-mt-6`}>
        <div className="mx-auto max-w-xl">
          <h2 className={`${headingClass} mb-8`}>{config.quoteHeading}</h2>
          <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-2xl md:p-8"><ServiceLeadForm defaultService={config.service} sourcePage={config.sourcePage} /></div>
        </div>
      </section>
    </main>

    <footer className="border-t border-service-border px-5 py-8 md:px-8">
      <nav aria-label="Landing page footer" className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2">
        <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/privacy">Privacy</Link></Button>
        <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/terms">Terms</Link></Button>
        <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/sms-terms">SMS Terms</Link></Button>
        <Button asChild variant="link" className="min-h-12 whitespace-normal px-0 text-service-foreground md:ml-auto"><Link to="/services">More Zombie Houses Services<ArrowRight aria-hidden="true" /></Link></Button>
      </nav>
    </footer>

    <nav aria-label="Quick Contact" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-service-border bg-service-surface px-3 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:hidden">
      <Button asChild variant="outline" className="h-12 min-h-12 border-service-border bg-service-background text-base font-bold text-service-foreground hover:bg-service-surface hover:text-service-foreground"><a href="tel:8139232042" onClick={call}><Phone aria-hidden="true" />Call</a></Button>
      <Button asChild variant="outline" className="h-12 min-h-12 border-service-border bg-service-background text-base font-bold text-service-foreground hover:bg-service-surface hover:text-service-foreground"><a href="sms:8139232042" onClick={text}><MessageSquare aria-hidden="true" />Text</a></Button>
      <Button className="h-12 min-h-12 bg-red text-base font-bold text-primary-foreground hover:bg-red/90" onClick={scrollToQuote}><ClipboardList aria-hidden="true" />Quote</Button>
    </nav>
  </div>;
}
