import { Info } from "lucide-react";

export function ServiceNoticeBand({ children }: { children: string }) {
  return <aside aria-label="Service notice" className="border-y border-service-border bg-service-surface px-5 py-6 text-service-muted md:px-8">
    <div className="mx-auto flex max-w-6xl items-start gap-3">
      <Info className="mt-1 size-5 shrink-0 text-red" aria-hidden="true" />
      <p className="max-w-4xl text-sm leading-relaxed">{children}</p>
    </div>
  </aside>;
}