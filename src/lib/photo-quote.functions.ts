import { createServerFn } from "@tanstack/react-start";
import { quoteEstimateInput } from "./photo-quote-schema";

export const createPhotoQuoteSession = createServerFn({ method: "POST" }).handler(async () => {
  const secret = process.env['LOVABLE_API_KEY'];
  if (!secret) throw new Error("Photo Quote is temporarily unavailable. Please call us.");
  const { sessionProof } = await import("./photo-quote.server");
  const folder = crypto.randomUUID();
  const expires = Date.now() + 60 * 60 * 1000;
  return { folder, expires, proof: await sessionProof(folder, expires, secret) };
});

export const photoQuoteEstimate = createServerFn({ method: "POST" })
  .inputValidator(quoteEstimateInput)
  .handler(async ({ data }) => {
    try {
      const secret = process.env['LOVABLE_API_KEY'];
      if (!secret) return { ok: false as const, error: "ai_not_configured" };
      const { verifySession, estimatePhotos, PHOTO_QUOTE_MODEL } = await import("./photo-quote.server");
      if (!(await verifySession(data.session, secret))) return { ok: false as const, error: "invalid_session" };
      // Never call the retired requested model or silently select a different one.
      if (!PHOTO_QUOTE_MODEL) return { ok: false as const, error: "model_approval_required" };
      // The signed upload-session capability is verified before any private storage read.
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const images: { type: "image_url"; image_url: { url: string } }[] = [];
      for (const path of data.photo_paths) {
        const { data: image, error } = await supabaseAdmin.storage.from("quote-photos").download(path);
        if (error || !image) return { ok: false as const, error: "photo_not_found" };
        if (image.size > 10 * 1024 * 1024) return { ok: false as const, error: "photo_too_large" };
        const mime = image.type?.startsWith("image/") ? image.type : "image/jpeg";
        const bytes = new Uint8Array(await image.arrayBuffer());
        let binary = "";
        for (let offset = 0; offset < bytes.length; offset += 8192) binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
        images.push({ type: "image_url", image_url: { url: `data:${mime};base64,${btoa(binary)}` } });
      }
      const a = data.answers;
      const answersText = `Customer answers: items are ${a.location === "inside" ? "inside the home" : "at the curb, driveway or garage"}; stairs flights: ${a.stairsFlights}; carry over 100 ft: ${a.longCarry ? "yes" : "no"}; heavy material (dirt, concrete, brick, roofing, tile): ${a.heavyMaterial ? "yes" : "no"}; hoarder situation: ${a.hoarder ? "yes" : "no"}.`;
      return await estimatePhotos(images, answersText, secret, PHOTO_QUOTE_MODEL);
    } catch {
      console.error("Photo Quote estimate unavailable");
      return { ok: false as const, error: "server_error" };
    }
  });
