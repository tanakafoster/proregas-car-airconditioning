import type { MetadataRoute } from "next"
import { areas, brandList, services, site } from "@/lib/site"

export const dynamic = "force-static"

// Every page on the site. Addresses end in "/" to match the canonical URLs (next.config.mjs sets trailingSlash).
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  })
  return [
    page("/", 1),
    page("/services/", 0.9),
    ...services.map((s) => page(`/services/${s.slug}/`, 0.8)),
    page("/pricing/", 0.8),
    page("/areas/", 0.8),
    ...areas.map((a) => page(`/areas/${a.slug}/`, 0.6)),
    page("/car-brands/", 0.7),
    ...brandList.map((b) => page(`/car-brands/${b.slug}/`, 0.5)),
    page("/faq/", 0.6),
    page("/contact/", 0.7),
    page("/which-aircon-gas/", 0.6, "yearly"),
  ]
}
