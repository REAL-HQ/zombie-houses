# Architecture Rules
- Service landing pages share ServiceLandingPage with typed per-service configs and an optional hero image, so visual refinements stay consistent.
- SiteLayout accepts optional footer and class overrides, so service pages can retain navigation without the full marketing footer.
- The service directory is the single source for card destinations and ZIP-bar selection, so both entry points open the same routes.
- Service lead admin validation and seller filtering live in a browser-safe utility module; privileged clients load only inside authorized server handlers, so secret code stays server-side.
- Photo Quote prices are computed only in the shared pricing module; AI reports volume and flags so model output cannot choose prices.
- Photo Quote private AI reads require a signed, expiring upload-folder capability; admin lists and signed photo links use the existing server-side PIN check so anonymous uploads never grant public reads.
- Photo Quote AI runs through TanStack server functions with server-only streaming gateway helpers; never add new Edge Functions or silently replace a retired user-selected model.
- Keep US phone formatting, normalization, and telephone links in the browser-safe phone helper module so forms and lead displays agree.
