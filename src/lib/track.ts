declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: MetaPixel;
    _fbq?: MetaPixel;
  }
  interface ImportMetaEnv {
    readonly VITE_GA4_ID?: string;
    readonly VITE_META_PIXEL_ID?: string;
  }
}

export type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: MetaPixel;
  loaded?: boolean;
  version?: string;
};

/** Analytics must never interrupt a visitor's request. */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer ??= [];
    window.dataLayer.push({ event, ...params });
  } catch { /* Blocked analytics are non-fatal. */ }
  try {
    if (typeof window.fbq === "function") window.fbq("trackCustom", event, params);
  } catch { /* Try each destination independently. */ }
}