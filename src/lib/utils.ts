import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  apiVersion: "2024-06-12",
  useCdn: false,
  dataset: "production",
  token: import.meta.env.VITE_SANITY_PROJECT_TOKEN,
});

const builder = imageUrlBuilder(sanity);

export const urlFor = (source: string) => builder.image(source);
