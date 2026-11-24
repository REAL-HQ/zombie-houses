import { useId } from "react";

/** Red rubber-stamp seal shown on the Dolmar & Keisha photo. Pure SVG, so it stays sharp & is never baked into the photo. */
export function RealHouseSeal({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ring = `seal-ring-${id}`;
  const ink = `seal-ink-${id}`;
  return <svg viewBox="0 0 200 200" role="img" aria-label="Real House We Cleaned Out, Tampa Bay" className={`pointer-events-none select-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)] ${className}`}>
    <defs>
      <path id={ring} d="M100,30 a70,70 0 1,1 -0.01,0" />
      {/* Speckled ink: fractal noise punches small gaps so it reads like a real rubber stamp. */}
      <filter id={ink} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -14 10.2" result="speckle" />
        <feComposite in="SourceGraphic" in2="speckle" operator="in" />
      </filter>
    </defs>
    <g filter={`url(#${ink})`}>
      <circle cx="100" cy="100" r="96" fill="#d7263d" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#fff" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="#fff" strokeWidth="2" />
      <text fill="#fff" fontSize="15" fontWeight="800" letterSpacing="2" fontFamily="inherit">
        <textPath href={`#${ring}`} textLength="430" lengthAdjust="spacing">★ Tampa Bay ★ Tampa Bay ★ Tampa Bay</textPath>
      </text>
      <text x="100" y="93" textAnchor="middle" fill="#fff" fontSize="25" fontWeight="800" textLength="110" lengthAdjust="spacingAndGlyphs" fontFamily="inherit">Real House</text>
      <line x1="62" y1="104" x2="138" y2="104" stroke="#fff" strokeWidth="1.5" />
      <text x="100" y="125" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800" textLength="106" lengthAdjust="spacingAndGlyphs" fontFamily="inherit">We Cleaned Out</text>
    </g>
  </svg>;
}
