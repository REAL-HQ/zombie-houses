import type { JobPhoto } from "@/lib/job-photos";
import { cn } from "@/lib/utils";

export function JobPhotoFigure({ photo, className, eager = false }: { photo: JobPhoto; className?: string; eager?: boolean }) {
  return <figure className={cn("relative overflow-hidden rounded-lg border border-service-border bg-service-surface", className)}>
    <img src={photo.src} alt={photo.alt} loading={eager ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined} />
    <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-8 text-xs font-semibold text-white md:text-sm">
      {photo.before && <span className="rounded bg-red px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground md:text-xs">Before</span>}
      <span>{photo.caption}</span>
    </figcaption>
  </figure>;
}

export function JobPhotoGrid({ photos }: { photos: readonly JobPhoto[] }) {
  return <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
    {photos.map((photo) => <JobPhotoFigure key={photo.src} photo={photo} className="aspect-[4/3]" />)}
  </div>;
}
