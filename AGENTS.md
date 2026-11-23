# Architecture Rules
- Service landing pages share ServiceLandingPage with typed per-service configs and an optional hero image, so visual refinements stay consistent.
- SiteLayout accepts optional footer and class overrides, so service pages can retain navigation without the full marketing footer.
- The service directory is the single source for card destinations and ZIP-bar selection, so both entry points open the same routes.
- Service lead admin validation and seller filtering live in a browser-safe utility module; privileged clients load only inside authorized server handlers, so secret code stays server-side.
