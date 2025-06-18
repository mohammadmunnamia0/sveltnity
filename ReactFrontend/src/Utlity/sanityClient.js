import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hy0aw49y", // from sanity.config.ts
  dataset: "production",
  useCdn: true, // set to false if you want fresh data
  apiVersion: "2023-01-01", // use a UTC date string
});

export default client;
