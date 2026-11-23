import type { MetaPixel } from "./track";

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (typeof window === "undefined") return;
  const gaId = import.meta.env.VITE_GA4_ID?.trim();
  const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();
  try {
    if (gaId && !document.getElementById("services-ga4")) {
      window.dataLayer ??= [];
      function gtag(..._args: unknown[]) {
        // gtag's queue contract uses the Arguments object, not event objects.
        window.dataLayer?.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", gaId);
      injectScript("services-ga4", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
    }
  } catch { /* Optional, never blocks the app. */ }
  try {
    if (pixelId && !document.getElementById("services-meta-pixel")) {
      if (!window.fbq) {
        const fbq: MetaPixel = (...args) => {
          if (fbq.callMethod) fbq.callMethod(...args);
          else fbq.queue?.push(args);
        };
        fbq.push = fbq;
        fbq.queue = [];
        fbq.loaded = true;
        fbq.version = "2.0";
        window.fbq = fbq;
        window._fbq ??= fbq;
      }
      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
      injectScript("services-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
    }
  } catch { /* Optional, never blocks the app. */ }
}