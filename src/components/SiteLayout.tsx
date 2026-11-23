import { Nav } from "./Nav";
import { Footer } from "./Footer";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SiteLayout = ({
  children,
  transparentNavOffset = false,
  footer,
  className,
}: {
  children: ReactNode;
  /** If true, no top padding (page renders behind transparent nav). Otherwise add nav-height pad. */
  transparentNavOffset?: boolean;
  footer?: ReactNode;
  className?: string;
}) => (
  <div className={cn("min-h-screen flex flex-col bg-background", className)}>
    <Nav />
    <main className={`flex-1 ${transparentNavOffset ? "" : "pt-16 md:pt-20"}`}>
      {children}
    </main>
    {footer ?? <Footer />}
  </div>
);
