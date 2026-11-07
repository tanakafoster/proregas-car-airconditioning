import { site } from "@/lib/site"

// Facebook and WhatsApp cache share images by URL, so the URL carries a short hash of the details the image shows.
// When the price, phone or tagline changes, the URL changes and the new image is picked up.
function shortHash(text: string) {
  let h = 5381
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0
  return h.toString(36)
}
const ogVersion = shortHash([site.tagline, site.gas, site.regasFrom, site.city, site.phoneDisplay, site.domain].join("|"))

export const homeTitle = `${site.name} | Car Aircon Regas ${site.city} from ${site.regasFrom}`
export const homeDescription = `${site.tagline} in ${site.city}. ${site.gas} regas from ${site.regasFrom}. Call or WhatsApp ${site.phoneLocal}. We come to your home or office.`

// Shared Open Graph fields. Next replaces openGraph as a whole per page, so pages spread this instead of setting a partial object.
export const baseOpenGraph = {
  type: "website" as const,
  locale: "en_ZW",
  siteName: site.name,
  title: `${site.name} | ${site.tagline}`,
  description: `Mobile ${site.gas} car aircon regas from ${site.regasFrom} in ${site.city}. Call or WhatsApp ${site.phoneLocal}.`,
  images: [{ url: `/og.png?v=${ogVersion}`, width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
}
