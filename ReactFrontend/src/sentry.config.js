// src/sentry.ts
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://<your-public-key>@o<org-id>.ingest.sentry.io/<project-id>",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0, // Adjust this for performance tracking
  environment: import.meta.env.MODE || "development", // optional
});
