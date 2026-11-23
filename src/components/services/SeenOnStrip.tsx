import logoAE from "@/assets/logo-ae.png";
import logoDIY from "@/assets/logo-diy.png";
import logoFYI from "@/assets/logo-fyi.png";
import logoHGTV from "@/assets/logo-hgtv.png";
import logoHulu from "@/assets/logo-hulu.png";
import logoTampa from "@/assets/logo-tampabay.png";

// Same logos & look as the homepage "Founders Seen On" strip. Media appearances only, not endorsements.
const logos = [
  { src: logoAE, alt: "A&E" },
  { src: logoDIY, alt: "DIY Network" },
  { src: logoFYI, alt: "FYI" },
  { src: logoHGTV, alt: "HGTV" },
  { src: logoHulu, alt: "Hulu" },
  { src: logoTampa, alt: "Tampa Bay Times" },
];

export function SeenOnStrip() {
  return <section aria-label="As Seen On" className="w-full border-b border-service-border bg-[hsl(0_0%_15%)]">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-4 md:flex-row md:gap-8 md:px-8 md:py-2">
      <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-white/90 md:text-sm">As Seen On</p>
      <div className="grid w-full grid-cols-3 items-center gap-x-6 gap-y-1 md:flex md:flex-1 md:justify-between md:gap-6">
        {logos.map((logo) => <div key={logo.alt} className="flex h-12 items-center justify-center md:h-20 md:w-[15%] md:max-w-[140px]">
          <img src={logo.src} alt={logo.alt} loading="lazy" className="h-full w-full object-contain" />
        </div>)}
      </div>
    </div>
  </section>;
}