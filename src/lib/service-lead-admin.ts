import { z } from "zod";

export const SERVICE_LEAD_STATUSES = ["new", "contacted", "quoted", "booked", "won", "lost"] as const;
export const SERVICE_PHOTO_URL_TTL = 10 * 60;
export const serviceLeadUpdateSchema = z.object({
  pin: z.string().min(1),
  id: z.string().uuid(),
  status: z.enum(SERVICE_LEAD_STATUSES).optional(),
  notes: z.string().max(10000).optional(),
}).refine((data) => data.status !== undefined || data.notes !== undefined, "Provide status or notes.");

export function filterPossibleSellers<T extends { thinking_of_selling: boolean | null }>(leads: readonly T[], onlySellers: boolean): T[] {
  return leads.filter((lead) => !onlySellers || lead.thinking_of_selling === true);
}

export function formatServiceLeadDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short",
  });
}
