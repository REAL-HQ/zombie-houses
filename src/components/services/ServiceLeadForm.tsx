import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Phone, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS } from "@/lib/business";
import { nextPhoneValue } from "@/lib/phone";
import { track } from "@/lib/track";
import { captureAttribution, SERVICE_TYPES, TIMING_OPTIONS, JOB_SIZE_OPTIONS, serviceStepOneSchema, serviceContactSchema, sellingValue, validatePhotos, zipFromSearch, type Attribution } from "@/lib/service-lead";
import { cn } from "@/lib/utils";

export interface ServiceLeadFormProps {
  defaultService?: string;
  sourcePage: string;
  compact?: boolean;
  buttonLabel?: string;
  /** Custom thank-you steps; defaults to the standard three. */
  thankYouItems?: string[];
  eyebrow?: string;
}

export function ServiceLeadForm({ defaultService, sourcePage, compact = false, buttonLabel = "Get My Free Quote", thankYouItems, eyebrow = "Free Photo Quote" }: ServiceLeadFormProps) {
  const id = useId();
  const [step, setStep] = useState(1);
  const [zip, setZip] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_TYPES.find((service) => service === defaultService) ?? "");
  const [timing, setTiming] = useState("");
  const [jobSize, setJobSize] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [selling, setSelling] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const started = useRef(false);
  const locked = useRef(false);
  const attribution = useRef<Attribution | null>(null);
  const folder = useRef<string | null>(null);
  // Preserve successful uploads across retries; insert failure must not duplicate photos.
  const uploaded = useRef(new Map<File, string>());
  const heading = useRef<HTMLHeadingElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setZip(zipFromSearch(window.location.search));
    let storage: Storage | undefined;
    try { storage = window.sessionStorage; } catch { /* Private browsing may block it. */ }
    attribution.current = captureAttribution(window.location.search, document.referrer, storage);
  }, []);

  function start() {
    if (started.current) return;
    started.current = true;
    track("form_start");
  }
  function changeStep(next: number) {
    setError("");
    setStep(next);
    track("form_step", { step: next });
    requestAnimationFrame(() => heading.current?.focus());
  }
  function addPhotos(files: File[]) {
    const next = [...photos, ...files];
    const message = validatePhotos(next);
    if (message) { setError(message); return; }
    setError("");
    setPhotos(next);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    start();
    if (locked.current) return;
    if (step === 1) {
      const result = serviceStepOneSchema.safeParse({ zip, service_type: serviceType });
      if (!result.success) { setError(result.error.issues[0]?.message ?? "Check Your Details"); return; }
      changeStep(2);
      return;
    }
    if (step === 2) { changeStep(3); return; }
    const first = serviceStepOneSchema.safeParse({ zip, service_type: serviceType });
    const result = serviceContactSchema.safeParse(contact);
    if (!first.success || !result.success) {
      setError(!result.success ? result.error.issues[0]?.message ?? "Check Your Contact Details" : "Check Your ZIP & Service Type");
      return;
    }
    const photoError = validatePhotos(photos);
    if (photoError) { setError(photoError); return; }
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      const photoPaths: string[] = [];
      for (const photo of photos) {
        const existing = uploaded.current.get(photo);
        if (existing) { photoPaths.push(existing); continue; }
        folder.current ??= crypto.randomUUID();
        const extension = photo.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10) || "image";
        const path = `${folder.current}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("service-lead-photos").upload(path, photo, { upsert: false, contentType: photo.type });
        if (uploadError) throw uploadError;
        uploaded.current.set(photo, path);
        photoPaths.push(path);
      }
      const { error: insertError } = await supabase.from("service_leads").insert({
        ...first.data,
        ...result.data,
        email: result.data.email || null,
        timing: timing || null,
        job_size: jobSize || null,
        description: description.trim() || null,
        photo_paths: photoPaths,
        thinking_of_selling: sellingValue(selling),
        sms_consent: smsConsent,
        sms_consent_at: smsConsent ? new Date().toISOString() : null,
        source_page: sourcePage,
        ...(attribution.current ?? captureAttribution(window.location.search, document.referrer)),
      });
      if (insertError) throw insertError;
      track("lead_submit", { service_type: serviceType, source_page: sourcePage });
      setSubmitted(true);
      requestAnimationFrame(() => heading.current?.focus());
    } catch (failure) {
      setError(failure && typeof failure === "object" && "message" in failure ? String(failure.message) : String(failure));
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  // Compact (hero) form: lg+ uses shorter controls and sizes to its content (no stretched empty space) so the hero stays above the fold.
  const fieldH = compact ? "h-12 md:h-14 lg:h-11" : "h-14";
  const gap = compact ? "space-y-1.5 lg:space-y-1" : "space-y-2";
  const headingClass = compact
    ? "font-display text-xl font-extrabold leading-tight tracking-normal text-foreground md:text-2xl lg:text-xl"
    : "font-display text-2xl font-extrabold leading-tight tracking-normal text-foreground";
  if (submitted) return (
    <section className="w-full space-y-6 text-card-foreground" aria-live="polite">
      <CheckCircle2 className="size-10 text-red" aria-hidden="true" />
      <h2 ref={heading} tabIndex={-1} className={headingClass}>Got It. Here's What Happens Next.</h2>
      <ol className="list-decimal space-y-4 pl-6 text-base leading-relaxed">
        {thankYouItems ? thankYouItems.map((item) => <li key={item}>{item}</li>) : <>
          <li>We review your details and photos.</li>
          <li>We call or text you, usually the same business day, to confirm details and give an upfront quote before any work starts.</li>
          <li>We schedule a time that works for you.</li>
        </>}
      </ol>
      <Button asChild className="min-h-14 w-full text-base font-bold">
        <a href="tel:+18139232042" onClick={() => track("click_call", { page: sourcePage.replace(/^\//, "") })}><Phone />813-923-2042</a>
      </Button>
    </section>
  );

  // Compact (hero) form asks Timing & About How Much? side by side on step 1 (sm+), so step 1 stays the same height & all 3 steps match.
  const timingField = (
    <div className={cn(gap, "min-w-0")}>
      <label htmlFor={`${id}-timing`} className="text-sm font-semibold">Timing</label>
      <Select value={timing} onValueChange={setTiming}>
        <SelectTrigger id={`${id}-timing`} className={cn("text-base", fieldH)}><SelectValue placeholder={compact ? "Optional" : "Choose Timing (Optional)"} /></SelectTrigger>
        <SelectContent>{TIMING_OPTIONS.map((option) => <SelectItem key={option} value={option} className="min-h-12">{option}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
  const jobSizeField = (
    <div className={cn(gap, "min-w-0")}>
      <label htmlFor={`${id}-size`} className="text-sm font-semibold">About How Much?</label>
      <Select value={jobSize} onValueChange={setJobSize}>
        <SelectTrigger id={`${id}-size`} className={cn("text-base", fieldH)}><SelectValue placeholder="Optional" /></SelectTrigger>
        <SelectContent>{JOB_SIZE_OPTIONS.map((option) => <SelectItem key={option} value={option} className="min-h-12">{option}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );

  return (
    <form onSubmit={submit} onFocusCapture={start} onPointerDownCapture={start} className={cn("w-full text-card-foreground", compact ? "space-y-3.5 lg:space-y-3" : "space-y-6")}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
          <p className="text-xs font-semibold text-red" aria-live="polite">Step {step} of 3</p>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {[1, 2, 3].map((dot) => (
            <span key={dot} className={cn("h-1 flex-1 rounded-full transition-colors", dot <= step ? "bg-red" : "bg-border")} />
          ))}
        </div>
        <h2 ref={heading} tabIndex={-1} className={headingClass}>{step === 1 ? buttonLabel : step === 2 ? "Tell Us What You Need" : "Where Can We Reach You?"}</h2>
      </div>
      <fieldset disabled={busy} className={cn("min-w-0", compact ? "space-y-3.5 lg:space-y-2.5" : "space-y-5")}>
        {step === 1 && <>
          <div className="space-y-1.5">
            <label htmlFor={`${id}-zip`} className="text-sm font-semibold">ZIP Code</label>
            <Input id={`${id}-zip`} value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} required pattern="[0-9]{5}" maxLength={5} inputMode="numeric" autoComplete="postal-code" placeholder="5-Digit ZIP Code" className={cn("text-base", fieldH)} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor={`${id}-service`} className="text-sm font-semibold">Service Type</label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger id={`${id}-service`} className={cn("whitespace-normal text-left text-base [&>span]:line-clamp-none", compact ? "min-h-12 md:min-h-14 lg:min-h-11 lg:h-11" : "min-h-14")}><SelectValue placeholder="Choose A Service" /></SelectTrigger>
              <SelectContent>{SERVICE_TYPES.map((service) => <SelectItem key={service} value={service} className="min-h-12 whitespace-normal">{service.replace(" or ", " Or ")}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {compact && <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-3 lg:gap-2.5">{timingField}{jobSizeField}</div>}
        </>}
        {step === 2 && <>
          {!compact && timingField}
          <div className={gap}>
            <label htmlFor={`${id}-description`} className="text-sm font-semibold">Short Description (Optional)</label>
            <Textarea id={`${id}-description`} value={description} maxLength={5000} onChange={(event) => setDescription(event.target.value)} className={cn("text-base", compact ? "min-h-28 lg:min-h-0 lg:h-[7.5rem] lg:resize-none" : "min-h-28")} />
          </div>
          <div className={compact ? "space-y-3 lg:space-y-1.5" : "space-y-3"}>
            <p className="text-sm font-semibold">Photos (Optional) · Up To 5 Images, 10MB Each</p>
            <Input ref={fileInput} type="file" accept="image/*" multiple aria-label="Upload Photos" className="sr-only" tabIndex={-1} onChange={(event) => { addPhotos(Array.from(event.target.files ?? [])); event.target.value = ""; }} />
            <Button type="button" variant="outline" className={cn("w-full", compact ? "min-h-12 lg:min-h-10 lg:h-10" : "min-h-12")} disabled={photos.length >= 5} onClick={() => fileInput.current?.click()}><Upload />Add Photos</Button>
            {photos.length > 0 && <ul className={compact ? "space-y-2 lg:flex lg:flex-wrap lg:gap-1.5 lg:space-y-0" : "space-y-2"}>{photos.map((photo, index) => <li key={`${photo.name}-${index}`} className={cn("flex min-h-12 items-center justify-between gap-3 border-b border-border text-sm", compact && "lg:min-h-0 lg:max-w-[48%] lg:gap-1 lg:rounded-full lg:border lg:py-0.5 lg:pl-3 lg:text-xs")}><span className={cn("min-w-0 break-all", compact && "lg:truncate lg:break-normal")}>{photo.name}</span><Button type="button" variant="ghost" size="icon" className={cn("size-12 shrink-0", compact && "lg:size-7")} aria-label={`Remove ${photo.name}`} title="Remove Photo" onClick={() => { setPhotos(photos.filter((_, photoIndex) => photoIndex !== index)); setError(""); }}><X /></Button></li>)}</ul>}
          </div>
        </>}
        {step === 3 && <>
          {/* Compact (hero) form: on lg+ name|phone and email|selling sit side by side so step 3 fits the viewport-sized card. */}
          <div className={cn(compact ? "space-y-3.5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-2 lg:space-y-0" : "space-y-5")}>
          {(["name", "phone", "email"] as const).map((field) => <div className={gap} key={field}>
              <label htmlFor={`${id}-${field}`} className="text-sm font-semibold">{field === "name" ? "Name" : field === "phone" ? "Mobile Phone" : "Email (Optional)"}</label>
              <Input id={`${id}-${field}`} type={field === "phone" ? "tel" : field === "email" ? "email" : "text"} inputMode={field === "phone" ? "tel" : undefined} placeholder={field === "phone" ? "(813) 555-0123" : undefined} autoComplete={field === "phone" ? "tel" : field} value={contact[field]} maxLength={field === "name" ? 200 : field === "phone" ? 40 : 254} required={field !== "email"} onChange={(event) => setContact({ ...contact, [field]: field === "phone" ? nextPhoneValue(contact.phone, event.target.value, event.target.selectionStart) : event.target.value })} className={cn("text-base", compact ? "h-12 md:h-14 lg:h-11" : "h-14")} />
            </div>)}
          <div className={gap}>
            <label htmlFor={`${id}-selling`} className="text-sm font-semibold">{compact ? <><span className="lg:hidden">Thinking About Selling The Property? (Optional)</span><span className="hidden lg:inline">Selling The Property?</span></> : "Thinking About Selling The Property? (Optional)"}</label>
            <Select value={selling} onValueChange={setSelling}>
              <SelectTrigger id={`${id}-selling`} className={cn("text-base", compact ? "h-12 md:h-14 lg:h-11" : "h-14")}><SelectValue placeholder="Choose An Answer" /></SelectTrigger>
              <SelectContent><SelectItem value="yes" className="min-h-12">Yes</SelectItem><SelectItem value="no" className="min-h-12">No</SelectItem><SelectItem value="unsure" className="min-h-12">Not Sure</SelectItem></SelectContent>
            </Select>
          </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id={`${id}-consent`} checked={smsConsent} onCheckedChange={(checked) => setSmsConsent(checked === true)} className={cn("mt-1 size-6 shrink-0", compact && "lg:mt-0.5 lg:size-5")} />
            <label htmlFor={`${id}-consent`} className={cn("text-sm leading-relaxed text-muted-foreground", compact && "lg:text-[11px] lg:leading-snug")}>By checking this box, I agree to receive text messages from {BUSINESS.legalName} about my request at the number provided. Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of any purchase or service. See our <Link to="/privacy" className="font-semibold text-red underline">Privacy Policy</Link> and <Link to="/sms-terms" className="font-semibold text-red underline">SMS Terms</Link>.</label>
          </div>
        </>}
        {error && <p role="alert" className="break-words text-sm font-medium text-destructive">{error}</p>}
        <div className={cn("flex gap-3", compact && "lg:pt-1")}>
          {step > 1 && <Button type="button" variant="outline" className={cn("px-4", compact ? "min-h-12 md:min-h-14 lg:min-h-12" : "min-h-14")} onClick={() => changeStep(step - 1)} aria-label="Previous Step" title="Previous Step"><ArrowLeft /></Button>}
          <Button type="submit" disabled={busy} className={cn("min-w-0 flex-1 whitespace-normal px-4 text-base font-bold", compact ? "min-h-12 md:min-h-14 lg:min-h-12" : "min-h-14")}>{busy ? <><Loader2 className="motion-safe:animate-spin" />Sending...</> : <>{step === 2 ? "Next" : buttonLabel}<ArrowRight /></>}</Button>
        </div>
      </fieldset>
    </form>
  );
}

export default ServiceLeadForm;
