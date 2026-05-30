import { Nav } from "./Nav";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

export const SiteLayout = ({
  children,
  transparentNavOffset = false,
}: {
  children: ReactNode;
  /** If true, no top padding (page renders behind transparent nav). Otherwise add nav-height pad. */
  transparentNavOffset?: boolean;
}) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Nav />
    <main className={`flex-1 ${transparentNavOffset ? "" : "pt-[60px] md:pt-[68px]"}`}>
      {children}
    </main>
    <Footer />
  </div>
);
