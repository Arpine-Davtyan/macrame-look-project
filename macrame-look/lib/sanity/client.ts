import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yxl0hqm6",
  dataset: "production",
  apiVersion: "2026-08-07",
  useCdn: true,
});