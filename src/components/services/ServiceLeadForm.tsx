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
import { track } from "@/lib/track";
import { captureAttribution, SERVICE_TYPES, TIMING_OPTIONS, serviceStepOneSchema, serviceContactSchema, sellingValue, validatePhotos, zipFromSearch, type Attribution } from "@/lib/service-lead";
import { cn } from "@/lib/utils";

export interface ServiceLeadFormProps {
  defaultService?: string;
  sourcePage: string;
  compact?: boolean;
  buttonLabel?: string;
}

export function ServiceLeadForm({ defaultService, sourcePage, compact = false, buttonLabel = "Get My Free Quote" }: ServiceLeadFormProps) {
  const id = useId();
  const [step, setStep] = useState(1);
  const [zip, setZip] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_TYPES.find((service) => service === defaultService) ?? "");
  const [timing, setTiming] = useState("");
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

  const headingClass = compact
    ? "font-display text-xl font-extrabold leading-tight tracking-normal text-foreground md:text-2xl"
    : "font-display text-2xl font-extrabold leading-tight tracking-normal text-foreground";
  if (submitted) return (
    <section className="w-full space-y-6 text-card-foreground" aria-live="polite">
      <CheckCircle2 className="size-10 text-red" aria-hidden="true" />
      <h2 ref={heading} tabIndex={-1} className={headingClass}>Got It. Here's What Happens Next.</h2>
      <ol className="list-decimal space-y-4 pl-6 text-base leading-relaxed">
        <li>We review your details and photos.</li>
        <li>We call or text you, usually the same business day, to confirm details and give an upfront quote before any work starts.</li>
        <li>We schedule a time that works for you.</li>
      </ol>
      <Button asChild className="min-h-14 w-full text-base font-bold">
        <a href="tel:+18139232042" onClick={() => track("click_call", { page: sourcePage.replace(/^\//, "") })}><Phone />813-923-2042</a>
      </Button>
    </section>
  );

  return (
    <form onSubmit={submit} onFocusCapture={start} onPointerDownCapture={start} className={cn("w-full text-card-foreground", compact ? "space-y-3.5" : "space-y-6")}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Free Photo Quote</p>
          <p className="text-xs font-semibold text-red" aria-live="polite">Step {step} of 3</p>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {[1, 2, 3].map((dot) => (
            <span key={dot} className={cn("h-1 flex-1 rounded-full transition-colors", dot <= step ? "bg-red" : "bg-border")} />
          ))}
        </div>
        <h2 ref={heading} tabIndex={-1} className={headingClass}>{step === 1 ? buttonLabel : step === 2 ? "Tell Us What You Need" : "Where Can We Reach You?"}</h2>
      </div>
      <fieldset disabled={busy} className={cn("min-w-0", compact ? "space-y-3.5" : "space-y-5")}>
        {step === 1 && <>
          <div className="space-y-1.5">
            <label htmlFor={`${id}-zip`} className="text-sm font-semibold">ZIP Code</label>
            <Input id={`${id}-zip`} value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} required pattern="[0-9]{5}" maxLength={5} inputMode="numeric" autoComplete="postal-code" placeholder="5-Digit ZIP Code" className={cn("text-base", compact ? "h-12 md:h-14" : "h-14")} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor={`${id}-service`} className="text-sm font-semibold">Service Type</label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger id={`${id}-service`} className={cn("whitespace-normal text-left text-base [&>span]:line-clamp-none", compact ? "min-h-12 md:min-h-14" : "min-h-14")}><SelectValue placeholder="Choose a Service" /></SelectTrigger>
              <SelectContent>{SERVICE_TYPES.map((service) => <SelectItem key={service} value={service} className="min-h-12 whitespace-normal">{service}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </>}
        {step === 2 && <>
          <div className="space-y-2">
            <label htmlFor={`${id}-timing`} className="text-sm font-semibold">Timing</label>
            <Select value={timing} onValueChange={setTiming}>
              <SelectTrigger id={`${id}-timing`} className="h-14 text-base"><SelectValue placeholder="Choose Timing (Optional)" /></SelectTrigger>
              <SelectContent>{TIMING_OPTIONS.map((option) => <SelectItem key={option} value={option} className="min-h-12">{option}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor={`${id}-description`} className="text-sm font-semibold">Short Description (Optional)</label>
            <Textarea id={`${id}-description`} value={description} maxLength={5000} onChange={(event) => setDescription(event.target.value)} className="min-h-28 text-base" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold">Photos (Optional) · Up to 5 Images, 10MB Each</p>
            <Input ref={fileInput} type="file" accept="image/*" multiple aria-label="Upload Photos" className="sr-only" tabIndex={-1} onChange={(event) => { addPhotos(Array.from(event.target.files ?? [])); event.target.value = ""; }} />
            <Button type="button" variant="outline" className="min-h-12 w-full" disabled={photos.length >= 5} onClick={() => fileInput.current?.click()}><Upload />Add Photos</Button>
            {photos.length > 0 && <ul className="space-y-2">{photos.map((photo, index) => <li key={`${photo.name}-${index}`} className="flex min-h-12 items-center justify-between gap-3 border-b border-border text-sm"><span className="min-w-0 break-all">{photo.name}</span><Button type="button" variant="ghost" size="icon" className="size-12 shrink-0" aria-label={`Remove ${photo.name}`} title="Remove Photo" onClick={() => { setPhotos(photos.filter((_, photoIndex) => photoIndex !== index)); setError(""); }}><X /></Button></li>)}</ul>}
          </div>
        </>}
        {step === 3 && <>
          {(["name", "phone", "email"] as const).map((field) => <div className="space-y-2" key={field}>
            <label htmlFor={`${id}-${field}`} className="text-sm font-semibold">{field === "name" ? "Name" : field === "phone" ? "Mobile Phone" : "Email (Optional)"}</label>
            <Input id={`${id}-${field}`} type={field === "phone" ? "tel" : field === "email" ? "email" : "text"} autoComplete={field === "phone" ? "tel" : field} value={contact[field]} maxLength={field === "name" ? 200 : field === "phone" ? 40 : 254} required={field !== "email"} onChange={(event) => setContact({ ...contact, [field]: event.target.value })} className="h-14 text-base" />
          </div>)}
          <div className="space-y-2">
            <label htmlFor={`${id}-selling`} className="text-sm font-semibold">Thinking About Selling the Property? (Optional)</label>
            <Select value={selling} onValueChange={setSelling}>
              <SelectTrigger id={`${id}-selling`} className="h-14 text-base"><SelectValue placeholder="Choose an Answer" /></SelectTrigger>
              <SelectContent><SelectItem value="yes" className="min-h-12">Yes</SelectItem><SelectItem value="no" className="min-h-12">No</SelectItem><SelectItem value="unsure" className="min-h-12">Not Sure</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id={`${id}-consent`} checked={smsConsent} onCheckedChange={(checked) => setSmsConsent(checked === true)} className="mt-1 size-6 shrink-0" />
            <label htmlFor={`${id}-consent`} className="text-sm leading-relaxed text-muted-foreground">By checking this box, I agree to receive text messages from {BUSINESS.legalName} about my request at the number provided. Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of any purchase or service. See our <Link to="/privacy" className="font-semibold text-red underline">Privacy Policy</Link> and <Link to="/sms-terms" className="font-semibold text-red underline">SMS Terms</Link>.</label>
          </div>
        </>}
        {error && <p role="alert" className="break-words text-sm font-medium text-destructive">{error}</p>}
        <div className="flex gap-3">
          {step > 1 && <Button type="button" variant="outline" className="min-h-14 px-4" onClick={() => changeStep(step - 1)} aria-label="Previous Step" title="Previous Step"><ArrowLeft /></Button>}
          <Button type="submit" disabled={busy} className={cn("min-w-0 flex-1 whitespace-normal px-4 text-base font-bold", compact ? "min-h-12 md:min-h-14" : "min-h-14")}>{busy ? <><Loader2 className="motion-safe:animate-spin" />Sending...</> : <>{step === 2 ? "Next" : buttonLabel}<ArrowRight /></>}</Button>
        </div>
      </fieldset>
    </form>
  );
}

export default ServiceLeadForm;