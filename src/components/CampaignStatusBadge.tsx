import { Check, Square } from "lucide-react";
import type { RescueStatus } from "@/data/rescues";

export const CampaignStatusBadge = ({ status }: { status: RescueStatus }) => {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
        <span className="h-2 w-2 rounded-full bg-white pulse-dot" />
        Active Rescue
      </span>
    );
  }
  if (status === "funded") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
        <Check className="h-3 w-3" /> Fully Funded
      </span>
    );
  }
  if (status === "complete") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
        <Check className="h-3 w-3" /> Rescue Complete
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted-foreground px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
      <Square className="h-3 w-3" /> Paused
    </span>
  );
};
