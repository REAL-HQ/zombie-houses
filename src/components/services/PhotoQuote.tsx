import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Camera, CheckCircle2, ClipboardCheck, Loader2, MessageSquare, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS } from "@/lib/business";
import { track } from "@/lib/track";
import { captureAttribution, serviceContactSchema, zipFromSearch, type Attribution } from "@/lib/service-lead";
import { computeQuote, PRICING_VERSION, QUOTE_DISCLAIMER, type AiEstimate, type QuoteAnswers, type QuoteResult } from "@/lib/junk-quote-pricing";
import { createPhotoQuoteSession, photoQuoteEstimate } from "@/lib/photo-quote.functions";
import { cn } from "@/lib/utils";

export const QUOTE_MAX_PHOTOS = 6;
const MAX_BYTES = 10 * 1024 * 1024;
const BUCKET = "quote-photos";

/** Shrinks big phone photos before upload (faster on cell data, cheaper AI). Falls back to the original file. */
async function prepare(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    try {
      const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      if (scale === 1 && file.size < 1.5 * 1024 * 1024 && file.type === "image/jpeg") return file;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const context = canvas.getContext("2d");
      if (!context) return file;
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
      return blob ?? file;
    } finally { bitmap.close(); }
  } catch { return file; }
}

type Choice<T> = { value: T; label: string };
function ChoiceGroup<T extends string | number | boolean>({ label, value, options, onChange }: { label: string; value: T | null; options: Choice<T>[]; onChange: (value: T) => void }) {
  return <fieldset className="space-y-2">
    <legend className="text-sm font-semibold">{label}</legend>
    <div className={cn("grid gap-2", options.length > 2 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2")}>
      {options.map((option) => <Button key={String(option.value)} type="button" variant="outline" aria-pressed={value === option.value} onClick={() => onChange(option.value)}
        className={cn("h-auto min-h-12 whitespace-normal rounded-md border px-3 text-sm font-semibold transition-colors", value === option.value ? "border-red bg-red text-primary-foreground hover:bg-red/90 hover:text-primary-foreground" : "border-input bg-background hover:border-red")}>{option.label}</Button>)}
    </div>
  </fieldset>;
}

export function PhotoQuote({ sourcePage, defaultLocation = "curbside" }: { sourcePage: string; defaultLocation?: QuoteAnswers["location"] }) {
  const id = useId();
  const createSession = useServerFn(createPhotoQuoteSession);
  const estimatePhotos = useServerFn(photoQuoteEstimate);
  const session = useRef<Awaited<ReturnType<typeof createPhotoQuoteSession>> | null>(null);
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const previewUrls = useRef(new Set<string>());
  const [zip, setZip] = useState("");
  const [location, setLocation] = useState<QuoteAnswers["location"] | null>(defaultLocation);
  const [stairs, setStairs] = useState<number | null>(0);
  const [longCarry, setLongCarry] = useState<boolean | null>(false);
  const [heavy, setHeavy] = useState<boolean | null>(false);
  const [hoarder, setHoarder] = useState<boolean | null>(false);
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [smsConsent, setSmsConsent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [summary, setSummary] = useState("");
  const started = useRef(false);
  const locked = useRef(false);
  const attribution = useRef<Attribution | null>(null);
  const folder = useRef<string | null>(null);
  const uploaded = useRef(new Map<File, string>());
  const ai = useRef<{ key: string; status: "ok" | "failed"; error: string | null; model: string | null; estimate: AiEstimate | null } | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setZip(zipFromSearch(window.location.search));
    let storage: Storage | undefined;
    try { storage = window.sessionStorage; } catch { /* Private browsing may block it. */ }
    attribution.current = captureAttribution(window.location.search, document.referrer, storage);
  }, []);
  useEffect(() => { const urls = previewUrls.current; return () => urls.forEach((url) => URL.revokeObjectURL(url)); }, []);

  function start() {
    if (started.current) return;
    started.current = true;
    track("quote_start", { source_page: sourcePage });
  }
  function go(next: number) {
    setError("");
    setStep(next);
    track("quote_step", { step: next, source_page: sourcePage });
    requestAnimationFrame(() => heading.current?.focus());
  }
  function addPhotos(files: File[]) {
    start();
    const next = [...photos.map((photo) => photo.file), ...files];
    if (next.length > QUOTE_MAX_PHOTOS) { setError(`Choose Up To ${QUOTE_MAX_PHOTOS} Photos`); return; }
    if (files.some((file) => !file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name))) { setError("Choose Image Files Only"); return; }
    if (files.some((file) => file.size > MAX_BYTES * 2)) { setError("Each Photo Must Be 20MB Or Smaller"); return; }
    setError("");
    setPhotos([...photos, ...files.map((file) => { const url = URL.createObjectURL(file); previewUrls.current.add(url); return { file, url }; })]);
  }
  function removePhoto(index: number) {
    const photo = photos[index];
    if (!photo) return;
    URL.revokeObjectURL(photo.url);
    previewUrls.current.delete(photo.url);
    setPhotos(photos.filter((_, i) => i !== index));
  }
  const answers = (): QuoteAnswers => ({ location: location ?? "curbside", stairsFlights: stairs ?? 0, longCarry: !!longCarry, heavyMaterial: !!heavy, hoarder: !!hoarder });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    start();
    if (locked.current) return;
    if (step === 1) {
      if (!photos.length) { setError("Add At Least 1 Photo"); return; }
      go(2); return;
    }
    if (step === 2) {
      if (!/^\d{5}$/.test(zip)) { setError("Enter A 5-Digit ZIP Code"); return; }
      go(3); return;
    }
    const result = serviceContactSchema.safeParse(contact);
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Check Your Contact Details"); return; }
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      if (!session.current || session.current.expires < Date.now()) {
        session.current = await createSession();
        folder.current = session.current.folder;
        uploaded.current.clear();
      }
      const paths: string[] = [];
      for (const { file } of photos) {
        const existing = uploaded.current.get(file);
        if (existing) { paths.push(existing); continue; }
        const blob = await prepare(file);
        if (blob.size > MAX_BYTES) throw new Error("Each Photo Must Be 10MB Or Smaller");
        const type = blob.type || (/\.heif$/i.test(file.name) ? "image/heif" : /\.heic$/i.test(file.name) ? "image/heic" : "image/jpeg");
        const extension = type === "image/png" ? "png" : type === "image/webp" ? "webp" : type === "image/heic" ? "heic" : type === "image/heif" ? "heif" : "jpg";
        const path = `quotes/${folder.current}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, blob, { upsert: false, contentType: type });
        if (uploadError) throw uploadError;
        uploaded.current.set(file, path);
        paths.push(path);
      }
      const current = answers();
      const key = JSON.stringify([paths, current]);
      if (ai.current?.key !== key) {
        // Any AI problem falls back to a manual quote. The lead is still saved.
        let next: NonNullable<typeof ai.current> = { key, status: "failed", error: "unknown", model: null, estimate: null };
        try {
          const data = await estimatePhotos({ data: { photo_paths: paths, answers: current, session: session.current } });
          if (data.ok && data.estimate) next = { key, status: "ok", error: null, model: String(data.model ?? ""), estimate: data.estimate };
          else next.error = String(data.ok ? "unknown" : data.error).slice(0, 100);
        } catch (failure) { next.error = String(failure instanceof Error ? failure.message : failure).slice(0, 100); }
        ai.current = next;
      }
      const evaluated = ai.current;
      if (!evaluated) throw new Error("Something Went Wrong. Please Try Again or Call Us.");
      const { status, error: aiError, model, estimate } = evaluated;
      const priced = computeQuote(estimate, current);
      const { error: insertError } = await supabase.from("quote_requests").insert({
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email || null,
        zip,
        location: current.location,
        stairs_flights: current.stairsFlights,
        long_carry: current.longCarry,
        heavy_material: current.heavyMaterial,
        hoarder: current.hoarder,
        description: description.trim() || null,
        photo_paths: paths,
        ai_status: status,
        ai_error: aiError,
        ai_model: model,
        ai_estimate: estimate ? JSON.parse(JSON.stringify(estimate)) : null,
        outcome: priced.outcome,
        truck_eighths: priced.eighths ?? null,
        price_low: priced.low ?? null,
        price_high: priced.high ?? null,
        quote_lines: JSON.parse(JSON.stringify({ lines: priced.lines, notes: priced.notes, reason: priced.reason ?? null, size: priced.sizeLabel ?? null })),
        discount: priced.discount,
        pricing_version: PRICING_VERSION,
        sms_consent: smsConsent,
        sms_consent_at: smsConsent ? new Date().toISOString() : null,
        source_page: sourcePage,
        ...(attribution.current ?? captureAttribution(window.location.search, document.referrer)),
      });
      if (insertError) throw insertError;
      track("quote_submit", { source_page: sourcePage, outcome: priced.outcome, ai_status: status, price_low: priced.low, price_high: priced.high });
      setSummary(estimate?.summary ?? "");
      setQuote(priced);
      requestAnimationFrame(() => heading.current?.focus());
    } catch (failure) {
      setError(failure && typeof failure === "object" && "message" in failure ? String(failure.message) : "Something Went Wrong. Please Try Again or Call Us.");
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  const headingClass = "font-display text-2xl font-extrabold leading-tight tracking-normal text-foreground";
  const callButtons = <div className="grid grid-cols-2 gap-3">
    <Button asChild className="min-h-14 text-base font-bold"><a href="tel:+18139232042" onClick={() => track("click_call", { page: sourcePage.replace(/^\//, ""), from: "photo_quote" })}><Phone />Call To Book</a></Button>
    <Button asChild variant="outline" className="min-h-14 text-base font-bold"><a href="sms:+18139232042" onClick={() => track("click_text", { page: sourcePage.replace(/^\//, ""), from: "photo_quote" })}><MessageSquare />Text Us</a></Button>
  </div>;

  if (quote) return <section className="w-full space-y-5 text-card-foreground" aria-live="polite" data-quote-outcome={quote.outcome}>
    {quote.outcome === "instant" ? <>
      <p className="text-xs font-bold uppercase tracking-wider text-red">Your Photo Quote</p>
      <h2 ref={heading} tabIndex={-1} className={headingClass}>Estimated Price</h2>
      <div className="rounded-lg border border-border bg-muted/40 p-4">
        <p className="font-display text-4xl font-extrabold tracking-normal text-foreground md:text-5xl">{quote.low === quote.high ? `$${quote.low}` : `$${quote.low} to $${quote.high}`}</p>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">{quote.sizeLabel}</p>
      </div>
      {summary && <p className="text-sm leading-relaxed"><span className="font-semibold">What We See: </span>{summary}</p>}
      <ul className="divide-y divide-border rounded-lg border border-border text-sm">
        {quote.lines.map((line) => <li key={line.label} className="flex items-center justify-between gap-3 px-3 py-2.5"><span>{line.label}</span><span className="font-semibold tabular-nums">{line.low === line.high ? `$${line.low}` : `$${line.low} to $${line.high}`}</span></li>)}
        {quote.discount > 0 && <li className="flex items-center justify-between gap-3 px-3 py-2.5 text-red"><span className="font-semibold">First Job Discount</span><span className="font-semibold tabular-nums">-${quote.discount}</span></li>}
      </ul>
      {quote.notes.length > 0 && <ul className="space-y-1.5 text-sm text-muted-foreground">{quote.notes.map((note) => <li key={note} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-red" aria-hidden="true" />{note}</li>)}</ul>}
      <p className="rounded-md bg-muted px-3 py-2.5 text-sm font-semibold">{QUOTE_DISCLAIMER}</p>
      <p className="text-sm leading-relaxed">We'll text you shortly to confirm a time. Want it sooner? Call or text us now.</p>
      {callButtons}
    </> : quote.outcome === "walkthrough" ? <>
      <ClipboardCheck className="size-10 text-red" aria-hidden="true" />
      <h2 ref={heading} tabIndex={-1} className={headingClass}>Let's Do A Quick Walkthrough</h2>
      <p className="text-base leading-relaxed">{quote.reason === "hoarder" ? "Homes packed with belongings need a quick look in person so we can plan the crew & give you a fair, upfront price. No judgment, ever." : "This looks like more than one truckload, so we'll give you an exact price after a quick walkthrough. Every extra truck on the same job is 10% off."}</p>
      <p className="text-base leading-relaxed">We got your photos & we'll text you shortly to set up a time.</p>
      {quote.notes.map((note) => <p key={note} className="text-sm text-muted-foreground">{note}</p>)}
      {callButtons}
    </> : <>
      <CheckCircle2 className="size-10 text-red" aria-hidden="true" />
      <h2 ref={heading} tabIndex={-1} className={headingClass}>Thanks, We'll Text You A Quote</h2>
      <p className="text-base leading-relaxed">We got your photos. We couldn't build an instant price this time, so we'll look them over & text you an upfront quote shortly, usually the same business day.</p>
      {callButtons}
    </>}
  </section>;

  return <form onSubmit={submit} onFocusCapture={start} className="w-full space-y-5 text-card-foreground" noValidate>
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Photo Quote</p>
        <p className="text-xs font-semibold text-red" aria-live="polite">Step {step} of 3</p>
      </div>
      <div className="flex gap-1.5" aria-hidden="true">{[1, 2, 3].map((dot) => <span key={dot} className={cn("h-1 flex-1 rounded-full transition-colors", dot <= step ? "bg-red" : "bg-border")} />)}</div>
      <h2 ref={heading} tabIndex={-1} className={headingClass}>{step === 1 ? "Add Photos Of Your Junk" : step === 2 ? "A Few Quick Questions" : "Where Should We Send Your Quote?"}</h2>
    </div>
    <fieldset disabled={busy} className="min-w-0 space-y-5">
      {step === 1 && <>
        <p className="text-sm leading-relaxed text-muted-foreground">Snap the whole pile or room from 1 to 6 angles. Wide shots work best.</p>
        <Input ref={fileInput} type="file" accept="image/*,.heic,.heif" multiple aria-label="Upload Photos" className="sr-only" tabIndex={-1} onChange={(event) => { addPhotos(Array.from(event.target.files ?? [])); event.target.value = ""; }} />
        {photos.length > 0 && <ul className="grid grid-cols-3 gap-2">
          {photos.map((photo, index) => <li key={photo.url} className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
            <img src={photo.url} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
            <Button type="button" size="icon" onClick={() => removePhoto(index)} aria-label={`Remove Photo ${index + 1}`} className="absolute right-1 top-1 flex size-9 items-center justify-center rounded-full bg-foreground/70 text-background hover:bg-foreground"><X className="size-4" /></Button>
          </li>)}
        </ul>}
        <Button type="button" variant="outline" className="min-h-14 w-full text-base font-bold" disabled={photos.length >= QUOTE_MAX_PHOTOS} onClick={() => fileInput.current?.click()}><Camera />{photos.length ? `Add More Photos (${photos.length} Of ${QUOTE_MAX_PHOTOS})` : "Take Or Choose Photos"}</Button>
      </>}
      {step === 2 && <>
        <div className="space-y-1.5">
          <label htmlFor={`${id}-zip`} className="text-sm font-semibold">ZIP Code</label>
          <Input id={`${id}-zip`} value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="5-Digit ZIP Code" className="h-14 text-base" />
        </div>
        <ChoiceGroup label="Where Is It?" value={location} onChange={setLocation} options={[{ value: "curbside", label: "Curb, Driveway Or Garage" }, { value: "inside", label: "Inside The Home" }]} />
        <ChoiceGroup label="Stairs To Carry It Down?" value={stairs} onChange={setStairs} options={[{ value: 0, label: "None" }, { value: 1, label: "1 Flight" }, { value: 2, label: "2 Flights" }, { value: 3, label: "3+ Flights" }]} />
        <ChoiceGroup label="Carry Over 100 Ft To The Truck?" value={longCarry} onChange={setLongCarry} options={[{ value: false, label: "No" }, { value: true, label: "Yes" }]} />
        <ChoiceGroup label="Any Dirt, Concrete, Brick, Roofing Or Tile?" value={heavy} onChange={setHeavy} options={[{ value: false, label: "No" }, { value: true, label: "Yes" }]} />
        <ChoiceGroup label="Is The Home Packed Floor To Ceiling?" value={hoarder} onChange={setHoarder} options={[{ value: false, label: "No" }, { value: true, label: "Yes" }]} />
        <div className="space-y-1.5">
          <label htmlFor={`${id}-description`} className="text-sm font-semibold">Anything We Should Know? (Optional)</label>
          <Textarea id={`${id}-description`} value={description} maxLength={2000} onChange={(event) => setDescription(event.target.value)} className="min-h-20 text-base" />
        </div>
      </>}
      {step === 3 && <>
        {(["name", "phone", "email"] as const).map((field) => <div className="space-y-1.5" key={field}>
          <label htmlFor={`${id}-${field}`} className="text-sm font-semibold">{field === "name" ? "Name" : field === "phone" ? "Mobile Phone" : "Email (Optional)"}</label>
          <Input id={`${id}-${field}`} type={field === "phone" ? "tel" : field === "email" ? "email" : "text"} autoComplete={field === "phone" ? "tel" : field} value={contact[field]} maxLength={field === "name" ? 200 : field === "phone" ? 40 : 254} onChange={(event) => setContact({ ...contact, [field]: event.target.value })} className="h-14 text-base" />
        </div>)}
        <div className="flex items-start gap-3">
          <Checkbox id={`${id}-consent`} checked={smsConsent} onCheckedChange={(checked) => setSmsConsent(checked === true)} className="mt-1 size-6 shrink-0" />
          <label htmlFor={`${id}-consent`} className="text-xs leading-relaxed text-muted-foreground">By checking this box, I agree to receive text messages from {BUSINESS.legalName} about my request at the number provided. Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of any purchase or service. See our <Link to="/privacy" className="font-semibold text-red underline">Privacy Policy</Link> and <Link to="/sms-terms" className="font-semibold text-red underline">SMS Terms</Link>.</label>
        </div>
      </>}
      {error && <p role="alert" className="break-words text-sm font-medium text-destructive">{error}</p>}
      <div className="flex gap-3">
        {step > 1 && <Button type="button" variant="outline" className="min-h-14 px-4" onClick={() => go(step - 1)} aria-label="Previous Step" title="Previous Step"><ArrowLeft /></Button>}
        <Button type="submit" disabled={busy} className="min-h-14 min-w-0 flex-1 whitespace-normal px-4 text-base font-bold">
          {busy ? <><Loader2 className="motion-safe:animate-spin" />Looking at Your Photos...</> : <>{step === 3 ? "See My Price" : "Next"}<ArrowRight /></>}
        </Button>
      </div>
      {step === 3 && <p className="text-center text-xs text-muted-foreground">{QUOTE_DISCLAIMER}</p>}
    </fieldset>
  </form>;
}

export default PhotoQuote;


