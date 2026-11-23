import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Check, ClipboardList, MessageSquare, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceLeadForm } from "./ServiceLeadForm";
import { ServiceNoticeBand } from "./ServiceNoticeBand";
import { JobPhotoFigure, JobPhotoGrid } from "./JobPhotoGrid";
import { SeenOnStrip } from "./SeenOnStrip";
import { PhotoQuote, QUOTE_MAX_PHOTOS } from "./PhotoQuote";
import { AD_ANCHOR_PRICE, QUOTE_DISCLAIMER } from "@/lib/junk-quote-pricing";
import { OWNER_THUMBS, type JobPhoto } from "@/lib/job-photos";
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
  ownerHeading: string;
  ownerDescription: string;
  related?: readonly { title: string; to: ServiceLink }[];
  faqs: readonly { question: string; answer: string; to?: ServiceLink }[];
  quoteHeading: string;
  /** AI Photo Quote section (photo upload, instant price range). */
  photoQuote?: { heading: string; description: string; defaultLocation?: "curbside" | "inside" };
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
        <div className="relative z-10 mx-auto grid max-w-6xl gap-4 px-5 py-5 md:gap-6 md:px-8 md:py-10 lg:max-w-[1360px] lg:grid-cols-[minmax(0,1fr)_minmax(400px,440px)] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-3 lg:pb-6 lg:pt-5">
          {/* lg+: hero uses a wider container (1360px) than the rest of the page. Left column = headline, subhead & photo; right column = form spanning both rows, sized to its content. The photo fills whatever height is left so its bottom lines up with the form. Cards sit in one strip below. Everything fits above the fold at 1280x650 & up. */}
          <div className="order-1 min-w-0 lg:order-none lg:col-start-1 lg:row-start-1">
            <p className="text-xs font-bold uppercase tracking-wider text-red md:text-sm">{config.eyebrow}</p>
            <h1 className="mt-1.5 font-display text-3xl leading-[1.08] tracking-tight md:mt-2 md:text-5xl lg:mt-1 lg:text-balance lg:text-[clamp(2.25rem,3.2vw,3.25rem)] lg:leading-[1.05]">{config.headline}</h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-service-muted md:mt-3 md:max-w-none md:text-lg lg:mt-1.5 lg:max-w-[46rem] lg:text-pretty lg:text-[clamp(0.95rem,1.25vw,1.125rem)]">{config.subhead}</p>
          </div>
          {/* Mobile: form comes right after the headline, photo below it. */}
          {config.heroPhoto && <div className="relative order-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:min-h-[220px]">
            <JobPhotoFigure photo={config.heroPhoto} eager className="aspect-[21/9] shadow-2xl md:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto" />
          </div>}
          <div aria-label="Quick Quote" className="order-2 self-start rounded-xl border border-border bg-card p-4 text-card-foreground shadow-2xl md:p-7 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:px-6 lg:py-5">
            <ServiceLeadForm defaultService={config.service} sourcePage={config.sourcePage} compact />
          </div>
          <ul className="order-4 grid grid-cols-2 gap-3 pt-1 md:pt-0 lg:order-none lg:col-span-2 lg:row-start-3 lg:grid-cols-3 [&>li:last-child:nth-child(odd)]:col-span-2 lg:[&>li:last-child:nth-child(odd)]:col-span-1">
            {config.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-3 rounded-lg border border-service-border bg-service-background/70 px-3 py-3 text-sm font-semibold shadow-lg md:px-5 md:py-4 md:text-base lg:py-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red/15 md:size-9 lg:size-8"><Check className="size-4 text-red md:size-5" aria-hidden="true" /></span>{bullet}
            </li>)}
          </ul>
          {config.photoQuote && <a href="#photo-quote" onClick={() => track("click_photo_quote", { page: config.page })} className="group order-5 flex min-h-14 items-center justify-between gap-3 rounded-lg border border-red/60 bg-red/10 px-4 py-3 text-sm font-bold text-service-foreground transition-colors hover:bg-red/20 md:px-5 md:text-base lg:col-span-2 lg:row-start-4 lg:min-h-12 lg:py-2.5">
            <span className="flex items-center gap-3"><Camera className="size-5 shrink-0 text-red" aria-hidden="true" />Get A Photo Quote: See Your Price Range In About A Minute</span>
            <ArrowRight className="size-5 shrink-0 text-red motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </a>}
        </div>
      </section>

      <SeenOnStrip />

      {config.photoQuote && <section id="photo-quote" className="scroll-mt-4 border-b border-service-border">
        <div className={`${sectionClass} grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] lg:gap-14`}>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-red md:text-sm">Instant Photo Quote</p>
            <h2 className={`${headingClass} mt-2`}>{config.photoQuote.heading}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-service-muted md:text-lg">{config.photoQuote.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[`Upload Up To ${QUOTE_MAX_PHOTOS} Photos`, "See A Price Range In About A Minute", `Junk Removal From $${AD_ANCHOR_PRICE}`, "Final Price Confirmed Before We Start"].map((item) => <li key={item} className="flex items-center gap-3 rounded-lg border border-service-border bg-service-surface px-4 py-3 text-sm font-semibold md:text-base">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red/15"><Check className="size-4 text-red" aria-hidden="true" /></span>{item}
              </li>)}
            </ul>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-service-muted">{QUOTE_DISCLAIMER}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-2xl md:p-7">
            <PhotoQuote sourcePage={config.sourcePage} defaultLocation={config.photoQuote.defaultLocation} />
          </div>
        </div>
      </section>}

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
          <h2 className={headingClass}>Clean It Out Or Sell It As-Is</h2>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-service-muted">{config.sellingOption.description}</p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <Button asChild className="min-h-14 whitespace-normal text-base font-bold"><Link to="/sell">{config.sellingOption.buttonLabel}<ArrowRight aria-hidden="true" /></Link></Button>
              {config.sellingOption.quoteLinkLabel && <Button asChild variant="link" className="min-h-12 whitespace-normal px-0 text-left text-service-foreground"><a href="#quote">{config.sellingOption.quoteLinkLabel}<ArrowRight aria-hidden="true" /></a></Button>}
            </div>
          </div>
        </div>
      </section>}

      {/* Full-bleed owner photo so the whole wrecked room shows; copy sits below so it never covers the damage. */}
      <section className="border-y border-service-border bg-service-surface">
        <img src={ownerPhoto} alt="Dolmar & Keisha Cross standing in a gutted, debris-filled room" loading="lazy" className="block aspect-[16/9] w-full object-cover object-[50%_40%] md:aspect-[21/9]" />
        <div className={`${sectionClass} md:py-14`}>
          <h2 className={headingClass}>{config.ownerHeading}</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {OWNER_THUMBS.map((photo) => <JobPhotoFigure key={photo.src} photo={photo} className="aspect-[4/3]" />)}
          </div>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-service-foreground md:mt-8 md:text-xl">{config.ownerDescription}</p>
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
