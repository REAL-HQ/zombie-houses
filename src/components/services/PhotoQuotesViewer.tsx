import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listPhotoQuotes, getPhotoQuotePhotoUrls } from "@/lib/leads.functions";
import { formatServiceLeadDate } from "@/lib/service-lead-admin";

type PhotoQuoteRow = Awaited<ReturnType<typeof listPhotoQuotes>>[number];
const message = (error: unknown) => error instanceof Error ? error.message : "Unable to load photo quotes.";

function QuotePhotos({ id, pin }: { id: string; pin: string }) {
  const getUrls = useServerFn(getPhotoQuotePhotoUrls);
  const [photos, setPhotos] = useState<{ path: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const rows = await getUrls({ data: { pin, id } });
        if (active) { setPhotos(rows); setError(""); }
      } catch (failure) { if (active) setError(message(failure)); }
      finally { if (active) setLoading(false); }
    }
    void load();
    const timer = window.setInterval(() => { void load(); }, 9 * 60 * 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, [getUrls, id, pin, refresh]);
  return <div className="mt-5">
    <h3 className="mb-3 text-sm font-semibold">Photos</h3>
    {loading && <p role="status" className="text-sm text-muted-foreground">Loading photos...</p>}
    {error && <div className="mb-3 flex flex-wrap items-center gap-3"><p role="alert" className="text-sm text-destructive">{error}</p><Button variant="outline" onClick={() => setRefresh((value) => value + 1)}><RefreshCw />Retry Photos</Button></div>}
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {photos.map((photo, index) => <a key={photo.path} href={photo.url} target="_blank" rel="noreferrer" title={`Open photo ${index + 1}`} className="block aspect-square overflow-hidden rounded-lg border border-border focus-visible:ring-2 focus-visible:ring-ring"><img src={photo.url} alt={`Quote photo ${index + 1}`} className="h-full w-full object-cover" onError={() => setError("Photo expired or unavailable. Refresh photos to try again.")} /></a>)}
    </div>
  </div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="min-w-0"><dt className="text-xs font-semibold text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-sm leading-relaxed">{children ?? "Not provided"}</dd></div>;
}

function QuoteCard({ quote, pin }: { quote: PhotoQuoteRow; pin: string }) {
  const estimate = quote.ai_estimate;
  const summary = estimate && typeof estimate === "object" && !Array.isArray(estimate) && typeof estimate['summary'] === "string" ? estimate['summary'] : "Not available";
  return <article aria-label={`Photo quote: ${quote.name}`} className="min-w-0 rounded-lg border border-border bg-card p-5 text-card-foreground md:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><h2 className="break-words font-display text-xl tracking-normal">{quote.name}</h2><p className="mt-1 text-xs text-muted-foreground">{formatServiceLeadDate(quote.created_at)}</p></div>
      <p className="text-sm font-semibold">{quote.status}</p>
    </div>
    <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-4">
      <Field label="Phone"><a href={`tel:${quote.phone}`} className="underline underline-offset-4">{quote.phone}</a></Field>
      <Field label="Email">{quote.email ? <a href={`mailto:${quote.email}`} className="break-all underline underline-offset-4">{quote.email}</a> : "Not provided"}</Field>
      <Field label="ZIP">{quote.zip}</Field><Field label="Source Page">{quote.source_page}</Field>
      <Field label="Outcome">{quote.outcome}</Field>
      <Field label="Price Range">{quote.price_low === null || quote.price_high === null ? "Pending Review" : quote.price_low === quote.price_high ? `$${quote.price_low}` : `$${quote.price_low} to $${quote.price_high}`}</Field>
      <Field label="Truck Eighths">{quote.truck_eighths}</Field><Field label="AI Status">{quote.ai_status}</Field>
    </dl>
    <dl className="mt-5"><Field label="What AI Sees">{summary}</Field></dl>
    <QuotePhotos id={quote.id} pin={pin} />
  </article>;
}

export function PhotoQuotesViewer({ pin }: { pin: string }) {
  const list = useServerFn(listPhotoQuotes);
  const [quotes, setQuotes] = useState<PhotoQuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true; setLoading(true);
    void list({ data: { pin } }).then((rows) => { if (active) { setQuotes(rows); setError(""); } })
      .catch((failure: unknown) => { if (active) setError(message(failure)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [list, pin, refresh]);
  return <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h2 className="font-display text-xl tracking-normal">Photo Quotes</h2><div className="flex items-center gap-3"><span className="text-sm text-muted-foreground">{quotes.length} quotes</span><Button variant="outline" className="min-h-12" disabled={loading} onClick={() => setRefresh((value) => value + 1)}><RefreshCw />Refresh Quotes</Button></div></div>
    {error && <p role="alert" className="mb-5 text-sm text-destructive">{error}</p>}
    {loading && <p role="status" className="py-6 text-sm text-muted-foreground">Loading photo quotes...</p>}
    {!loading && !error && quotes.length === 0 && <p className="py-10 text-sm text-muted-foreground">No photo quotes yet.</p>}
    <div className="space-y-5">{quotes.map((quote) => <QuoteCard key={quote.id} quote={quote} pin={pin} />)}</div>
  </section>;
}