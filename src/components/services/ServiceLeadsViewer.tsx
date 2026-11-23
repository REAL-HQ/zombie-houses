import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw, Save } from "lucide-react";
import { listServiceLeads, updateServiceLead, getServiceLeadPhotoUrls } from "@/lib/leads.functions";
import { SERVICE_LEAD_STATUSES, filterPossibleSellers, formatServiceLeadDate } from "@/lib/service-lead-admin";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ServiceLead = Database["public"]["Tables"]["service_leads"]["Row"];
const message = (error: unknown) => error instanceof Error ? error.message : "Unable to complete request.";

function LeadPhotos({ lead, pin }: { lead: ServiceLead; pin: string }) {
  const getUrls = useServerFn(getServiceLeadPhotoUrls);
  const [photos, setPhotos] = useState<{ path: string; url: string }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const result = await getUrls({ data: { pin, id: lead.id } });
        if (active) { setPhotos(result); setError(""); }
      } catch (failure) { if (active) setError(message(failure)); }
      finally { if (active) setLoading(false); }
    }
    void load();
    // Refresh before the ten-minute expiry while the viewer remains open.
    const timer = window.setInterval(() => { void load(); }, 9 * 60 * 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, [getUrls, pin, lead.id, refresh]);
  return <div className="mt-5">
    <h3 className="mb-3 text-sm font-semibold">Photos</h3>
    {loading && <p className="text-sm text-muted-foreground">Loading photos...</p>}
    {error && <div className="flex flex-wrap items-center gap-3"><p role="alert" className="text-sm text-destructive">{error}</p><Button variant="outline" onClick={() => setRefresh((value) => value + 1)}><RefreshCw />Retry Photos</Button></div>}
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      {photos.map((photo, index) => <a key={photo.path} href={photo.url} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden rounded-lg border border-border focus-visible:ring-2 focus-visible:ring-ring" title={`Open photo ${index + 1}`}><img src={photo.url} alt={`Lead photo ${index + 1}`} className="h-full w-full object-cover" onError={() => setError("Photo expired or unavailable. Refresh photos to try again.")} /></a>)}
    </div>
  </div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="min-w-0"><dt className="text-xs font-semibold text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-sm leading-relaxed">{children || "Not provided"}</dd></div>;
}

function ServiceLeadCard({ lead, pin, onUpdated }: { lead: ServiceLead; pin: string; onUpdated: (lead: ServiceLead) => void }) {
  const update = useServerFn(updateServiceLead);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => { setNotes(lead.notes ?? ""); }, [lead.notes]);
  async function save(patch: { status?: (typeof SERVICE_LEAD_STATUSES)[number]; notes?: string }) {
    setBusy(true); setError(""); setSaved(false);
    try { onUpdated(await update({ data: { pin, id: lead.id, ...patch } })); setSaved(true); }
    catch (failure) { setError(message(failure)); }
    finally { setBusy(false); }
  }
  return <article aria-label={`Service lead: ${lead.name}`} className="min-w-0 rounded-lg border border-border bg-card p-5 text-card-foreground md:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        {lead.thinking_of_selling === true && <p className="mb-3 inline-block rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Thinking About Selling</p>}
        <h2 className="break-words font-display text-xl tracking-normal">{lead.name}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{lead.created_at ? formatServiceLeadDate(lead.created_at) : "Date unavailable"}</p>
      </div>
      <div className="w-40 shrink-0"><label htmlFor={`status-${lead.id}`} className="mb-1 block text-xs font-semibold">Status</label>
        <Select value={lead.status} disabled={busy} onValueChange={(value) => { const status = z.enum(SERVICE_LEAD_STATUSES).safeParse(value); if (status.success) void save({ status: status.data }); }}>
          <SelectTrigger id={`status-${lead.id}`} className="min-h-12"><SelectValue /></SelectTrigger>
          <SelectContent>{SERVICE_LEAD_STATUSES.map((status) => <SelectItem key={status} value={status} className="min-h-12">{status}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    </div>
    <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-4">
      <Field label="Phone"><a href={`tel:${lead.phone}`} className="underline underline-offset-4">{lead.phone}</a></Field>
      <Field label="Email">{lead.email ? <a href={`mailto:${lead.email}`} className="break-all underline underline-offset-4">{lead.email}</a> : "Not provided"}</Field>
      <Field label="ZIP">{lead.zip}</Field><Field label="Service Type">{lead.service_type}</Field>
      <Field label="Timing">{lead.timing}</Field><Field label="About How Much?">{lead.job_size}</Field><Field label="Source Page">{lead.source_page}</Field>
      <Field label="SMS Consent">{lead.sms_consent ? "Yes" : "No"}</Field>
      <Field label="UTM Source">{lead.utm_source}</Field><Field label="UTM Medium">{lead.utm_medium}</Field><Field label="UTM Campaign">{lead.utm_campaign}</Field>
    </dl>
    <dl className="mt-5"><Field label="Description">{lead.description}</Field></dl>
    {(lead.photo_paths?.length ?? 0) > 0 && <LeadPhotos lead={lead} pin={pin} />}
    <div className="mt-5 border-t border-border pt-5">
      <label htmlFor={`notes-${lead.id}`} className="mb-2 block text-sm font-semibold">Notes</label>
      <Textarea id={`notes-${lead.id}`} value={notes} maxLength={10000} onChange={(event) => { setNotes(event.target.value); setSaved(false); }} className="min-h-24" />
      <div className="mt-3 flex flex-wrap items-center gap-3"><Button disabled={busy} className="min-h-12" onClick={() => { void save({ notes }); }}><Save />{busy ? "Saving..." : "Save Notes"}</Button>{saved && <p role="status" className="text-sm text-muted-foreground">Saved</p>}</div>
      {error && <p role="alert" className="mt-3 break-words text-sm text-destructive">{error}</p>}
    </div>
  </article>;
}

export function ServiceLeadsViewer({ pin }: { pin: string }) {
  const list = useServerFn(listServiceLeads);
  const [leads, setLeads] = useState<ServiceLead[]>([]);
  const [onlySellers, setOnlySellers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true; setLoading(true);
    void list({ data: { pin } }).then((rows) => { if (active) { setLeads(rows); setError(""); } }).catch((failure: unknown) => { if (active) setError(message(failure)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [list, pin, refresh]);
  const filtered = filterPossibleSellers(leads, onlySellers);
  return <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm font-semibold"><Switch checked={onlySellers} onCheckedChange={setOnlySellers} aria-label="Only possible sellers" />Only possible sellers</label>
      <div className="flex items-center gap-3"><span className="text-sm text-muted-foreground">{filtered.length} of {leads.length} leads</span><Button variant="outline" className="min-h-12" disabled={loading} onClick={() => setRefresh((value) => value + 1)}><RefreshCw />Refresh Services</Button></div>
    </div>
    {error && <p role="alert" className="mb-5 text-sm text-destructive">{error}</p>}
    {loading && <p role="status" className="py-6 text-sm text-muted-foreground">Loading service leads...</p>}
    {!loading && !error && filtered.length === 0 && <p className="py-10 text-sm text-muted-foreground">{onlySellers ? "No possible sellers found." : "No service leads yet."}</p>}
    <div className="space-y-5">{filtered.map((lead) => <ServiceLeadCard key={lead.id} lead={lead} pin={pin} onUpdated={(updated) => setLeads((rows) => rows.map((row) => row.id === updated.id ? updated : row))} />)}</div>
  </section>;
}
