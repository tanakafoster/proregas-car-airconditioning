import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Trailing slashes match the canonical URLs (next.config.mjs sets trailingSlash).
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/which-aircon-gas/`, changeFrequency: "yearly", priority: 0.6 },
  ]
}
