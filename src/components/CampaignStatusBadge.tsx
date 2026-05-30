import type { RescueStatus } from "@/data/rescues";
import { Check } from "lucide-react";

export const CampaignStatusBadge = ({
  status,
  phase,
}: {
  status: RescueStatus;
  phase?: number;
}) => {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
        <span className="h-2 w-2 rounded-full bg-white pulse-dot" />
        Active Rescue{phase ? ` · Phase ${phase}` : ""}
      </span>
    );
  }
  if (status === "complete") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
        <Check className="h-3 w-3" /> Rescue Complete
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted-foreground px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
      Paused
    </span>
  );
};
