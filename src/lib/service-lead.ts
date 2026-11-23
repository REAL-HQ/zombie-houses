import { z } from "zod";

export const SERVICE_TYPES = ["Junk Removal", "Hoarder or Estate Cleanout", "Property Cleanout", "Remodeling Consultation", "Other"] as const;
export const TIMING_OPTIONS = ["ASAP", "This Week", "This Month", "Flexible"] as const;
export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
export function zipFromSearch(search: string): string {
  const value = new URLSearchParams(search).get("zip") ?? "";
  return /^\d{5}$/.test(value) ? value : "";
}
export const serviceStepOneSchema = z.object({
  zip: z.string().regex(/^\d{5}$/, "Enter A 5-Digit ZIP Code"),
  service_type: z.enum(SERVICE_TYPES, { errorMap: () => ({ message: "Choose A Service Type" }) }),
});
export const serviceContactSchema = z.object({
  name: z.string().trim().min(1, "Enter Your Name").max(200),
  phone: z.string().trim().max(40).refine((value) => value.replace(/\D/g, "").length >= 10, "Enter A Valid Mobile Phone Number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter A Valid Email Address").max(254)]),
});

export function validatePhotos(files: readonly Pick<File, "type" | "size">[]): string | null {
  if (files.length > MAX_PHOTOS) return "Choose Up To 5 Images";
  if (files.some((file) => !file.type.startsWith("image/"))) return "Choose Image Files Only";
  if (files.some((file) => file.size > MAX_PHOTO_BYTES)) return "Each Image Must Be 10MB Or Smaller";
  return null;
}

export function sellingValue(value: string): boolean | null {
  return value === "yes" ? true : value === "no" ? false : null;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Attribution = Record<(typeof UTM_KEYS)[number] | "referrer", string | null>;
export const ATTRIBUTION_KEY = "service-lead-first-touch";

export function captureAttribution(search: string, referrer: string, storage?: Pick<Storage, "getItem" | "setItem">): Attribution {
  try {
    const stored = storage?.getItem(ATTRIBUTION_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (parsed && typeof parsed === "object" && [...UTM_KEYS, "referrer"].every((key) => key in parsed && (typeof Reflect.get(parsed, key) === "string" || Reflect.get(parsed, key) === null))) return parsed as Attribution;
    }
  } catch { /* Storage can be unavailable or malformed. */ }
  const query = new URLSearchParams(search);
  const attribution: Attribution = {
    utm_source: query.get("utm_source"), utm_medium: query.get("utm_medium"),
    utm_campaign: query.get("utm_campaign"), utm_term: query.get("utm_term"),
    utm_content: query.get("utm_content"), referrer: referrer || null,
  };
  try { storage?.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution)); } catch { /* Still submit without persistence. */ }
  return attribution;
}
