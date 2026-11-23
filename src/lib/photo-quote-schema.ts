import { z } from "zod";

export const QUOTE_PHOTO_URL_TTL = 600;
export const quotePhotoPath = z.string().regex(/^quotes\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.(jpg|jpeg|png|webp|heic|heif)$/i);
export const quoteEstimateInput = z.object({
  photo_paths: z.array(quotePhotoPath).min(1).max(6),
  session: z.object({ folder: z.string().uuid(), expires: z.number().int(), proof: z.string().regex(/^[0-9a-f]{64}$/) }),
  answers: z.object({ location: z.enum(["curbside", "inside"]), stairsFlights: z.number().int().min(0).max(3), longCarry: z.boolean(), heavyMaterial: z.boolean(), hoarder: z.boolean() }),
}).refine((data) => data.photo_paths.every((path) => path.split("/")[1] === data.session.folder), "Photos must belong to this upload session");
