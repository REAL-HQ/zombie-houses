import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { serviceLeadUpdateSchema, SERVICE_PHOTO_URL_TTL } from "./service-lead-admin";
import { QUOTE_PHOTO_URL_TTL } from "./photo-quote-schema";

const pinSchema = z.object({ pin: z.string().min(1) });

const checkPin = (pin: string) => {
  const expected = process.env["ADMIN_LEADS_PIN"] ?? "zhb2026";
  if (pin !== expected) throw new Error("Unauthorized");
};

export const listPhotoQuotes = createServerFn({ method: "POST" })
  .inputValidator(pinSchema)
  .handler(async ({ data }) => {
    checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: quotes, error } = await supabaseAdmin.from("quote_requests")
      .select("id,created_at,name,phone,email,zip,source_page,outcome,price_low,price_high,truck_eighths,ai_status,ai_estimate,status,photo_paths")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return quotes ?? [];
  });

export const getPhotoQuotePhotoUrls = createServerFn({ method: "POST" })
  .inputValidator(pinSchema.extend({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: quote, error } = await supabaseAdmin.from("quote_requests").select("photo_paths").eq("id", data.id).single();
    if (error) throw new Error(error.message);
    if (!quote.photo_paths.length) return [];
    const { data: photos, error: photoError } = await supabaseAdmin.storage.from("quote-photos").createSignedUrls(quote.photo_paths, QUOTE_PHOTO_URL_TTL);
    if (photoError) throw new Error(photoError.message);
    return (photos ?? []).map((photo) => {
      if (photo.error || !photo.signedUrl) throw new Error("Unable to load quote photo.");
      return { path: photo.path ?? "", url: photo.signedUrl };
    });
  });

export const listLeads = createServerFn({ method: "POST" })
  .inputValidator(pinSchema)
  .handler(async ({ data }) => {
    checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: leads, error } = await supabaseAdmin
      .from("sell_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return leads ?? [];
  });

export const updateLead = createServerFn({ method: "POST" })
  .inputValidator(
    pinSchema.extend({
      id: z.string().uuid(),
      status: z.string().optional(),
      notes: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: { status?: string; notes?: string } = {};
    if (data.status !== undefined) patch.status = data.status;
    if (data.notes !== undefined) patch.notes = data.notes;
    const { error } = await supabaseAdmin.from("sell_leads").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listServiceLeads = createServerFn({ method: "POST" })
  .inputValidator(pinSchema)
  .handler(async ({ data }) => {
    checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: leads, error } = await supabaseAdmin.from("service_leads").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return leads ?? [];
  });

export const updateServiceLead = createServerFn({ method: "POST" })
  .inputValidator(serviceLeadUpdateSchema)
  .handler(async ({ data }) => {
    checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: { status?: string; notes?: string } = {};
    if (data.status !== undefined) patch.status = data.status;
    if (data.notes !== undefined) patch.notes = data.notes;
    const { data: lead, error } = await supabaseAdmin.from("service_leads").update(patch).eq("id", data.id).select("*").single();
    if (error) throw new Error(error.message);
    return lead;
  });

export const getServiceLeadPhotoUrls = createServerFn({ method: "POST" })
  .inputValidator(pinSchema.extend({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead, error } = await supabaseAdmin.from("service_leads").select("photo_paths").eq("id", data.id).single();
    if (error) throw new Error(error.message);
    const paths = lead.photo_paths ?? [];
    if (!paths.length) return [];
    const { data: photos, error: photoError } = await supabaseAdmin.storage.from("service-lead-photos").createSignedUrls(paths, SERVICE_PHOTO_URL_TTL);
    if (photoError) throw new Error(photoError.message);
    return (photos ?? []).map((photo) => {
      if (photo.error || !photo.signedUrl) throw new Error(photo.error || "Unable to load photo.");
      return { path: photo.path ?? "", url: photo.signedUrl };
    });
  });
