import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hy0aw49y", 
  dataset: "production",
  useCdn: false, 
  apiVersion: "2023-01-01", 
});

export default client;
