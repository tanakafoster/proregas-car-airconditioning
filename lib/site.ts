// Business details and most of the site's wording live in this file. The longer service page text is in lib/service-pages.ts,
// and the short description of each suburb is in lib/area-facts.ts.
// The owner confirmed: name, tagline, phone number, domain, R134a gas, "regas starts from $30" and Harare.
// Still to confirm with the owner: that 0771371600 is on WhatsApp, the car brand list, the services,
// the suburb list and the FAQ answers. These are draft copy.

const regasFromUsd = 30

export const site = {
  name: "ProRegas Car Air Conditioning",
  shortName: "ProRegas",
  tagline: "Mobile Car Air Conditioning Regas & Repairs",
  domain: "proregascaraircon.co.zw",
  url: "https://proregascaraircon.co.zw",
  phoneDisplay: "077\u00a0137\u00a01600", // non-breaking spaces keep the number on one line
  phoneLocal: "0771371600",
  phoneIntl: "+263771371600",
  city: "Harare",
  country: "Zimbabwe",
  regasFromUsd,
  regasFrom: `$${regasFromUsd}`,
  gas: "R134a",
}

export const telHref = `tel:${site.phoneIntl}`
export const whatsappNumber = site.phoneIntl.replace("+", "")
export const defaultWhatsappMessage = "Hi ProRegas, I'd like to book a car aircon regas."

export function whatsappHref(message = defaultWhatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const services = [
  {
    slug: "car-aircon-regas",
    title: `${site.gas} Aircon Regas`,
    description: `We regas your car's aircon with ${site.gas} gas at your home, office or wherever your car is parked in ${site.city}.`,
    from: `From ${site.regasFrom}`,
    icon: "snowflake",
  },
  {
    slug: "aircon-leak-repairs",
    title: "Leak Repairs",
    description: "Gas keeps running out? There's usually a leak somewhere in the system. We check what's causing it and quote you for the repair.",
    icon: "search",
  },
  {
    slug: "aircon-compressor-repairs",
    title: "Compressor Problems",
    description: "Noisy compressor, or the aircon clutch won't engage? We check what's causing it and quote you for the repair.",
    icon: "cog",
  },
  {
    slug: "condenser-evaporator-repairs",
    title: "Condenser & Evaporator",
    description: "Blocked or damaged condensers and evaporators stop your aircon from cooling properly. We check them and quote you for the repair.",
    icon: "layers",
  },
  {
    slug: "aircon-electrical-fan-faults",
    title: "Electrical & Fan Faults",
    description: "Fan not blowing, or the aircon won't switch on? We check the fans, switches, fuses and wiring that stop it from working.",
    icon: "zap",
  },
  {
    slug: "aircon-check-ups",
    title: "Aircon Check-ups",
    description: "Not sure what's wrong? Tell us what your aircon is doing and we'll check it and tell you what it needs.",
    icon: "gauge",
  },
] as const

export type Service = (typeof services)[number]
export type ServiceSlug = Service["slug"]

export const steps = [
  { title: "Call or WhatsApp", text: `Send us your car's make, model, year and location on ${site.phoneDisplay}.` },
  { title: "We come to you", text: `We drive to your home, office or wherever your car is parked in ${site.city}.` },
  { title: "We regas or repair", text: `We regas your aircon with ${site.gas} gas, or quote you for any repairs it needs.` },
]

export const brandGroups = [
  {
    origin: "Japanese",
    brands: ["Toyota", "Honda", "Nissan", "Mazda", "Mitsubishi", "Isuzu", "Subaru", "Suzuki", "Daihatsu", "Lexus", "Infiniti", "Datsun"],
  },
  {
    origin: "European",
    brands: [
      "Mercedes-Benz", "BMW", "Audi", "Volkswagen", "Porsche", "Mini", "Land Rover", "Range Rover", "Jaguar", "Volvo",
      "Opel", "Peugeot", "Renault", "Citroën", "Fiat", "Alfa Romeo",
    ],
  },
  { origin: "American", brands: ["Ford", "Chevrolet", "Jeep"] },
  { origin: "Korean", brands: ["Hyundai", "Kia", "SsangYong"] },
  { origin: "Chinese", brands: ["Haval", "GWM", "Chery", "JAC", "BAIC", "Foton", "Geely"] },
  { origin: "Indian and Malaysian", brands: ["Mahindra", "Tata", "Proton"] },
]

export const brands = brandGroups.flatMap((g) => g.brands)

// Each brand has its own page at /car-brands/<slug>/.
export type Brand = { name: string; slug: string; origin: string }
export const brandList: Brand[] = brandGroups.flatMap((g) => g.brands.map((name) => ({ name, slug: slugify(name), origin: g.origin })))

// Shown on the home page, which links to the full list.
export const popularBrands = ["Toyota", "Honda", "Nissan", "Mazda", "Mercedes-Benz", "BMW", "Volkswagen", "Ford", "Isuzu", "Mitsubishi", "Hyundai", "Kia"]

export type Area = { name: string; region: string; slug: string }

// "Borrowdale Brooke" -> "borrowdale-brooke", used in page addresses such as /areas/borrowdale-brooke/.
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// Region groupings follow common local usage (e.g. property listing sites); boundaries vary between sources.
const regions: Record<string, string[]> = {
  "Northern Suburbs": [
    "Borrowdale", "Borrowdale Brooke", "Mount Pleasant", "Avondale", "Belgravia", "Alexandra Park",
    "Gunhill", "Highlands", "Chisipite", "Glen Lorne", "Greystone Park", "Ballantyne Park",
    "Emerald Hill", "Marlborough", "Mabelreign", "Pomona", "Vainona", "Mandara",
  ],
  "Eastern Suburbs": ["Greendale", "Msasa", "Eastlea", "Mabvuku", "Tafara"],
  "Western Suburbs": [
    "Westgate", "Bluff Hill", "Milton Park", "Belvedere", "Kuwadzana", "Warren Park",
    "Dzivarasekwa", "Marimba Park", "Mufakose", "Budiriro", "Glen View",
  ],
  "Southern Suburbs": [
    "Waterfalls", "Hatfield", "Braeside", "Queensdale", "Arcadia", "Highfield", "Mbare",
    "Ardbennie", "Prospect", "Hopley", "Glen Norah", "Sunningdale",
  ],
  "CBD & Industrial": ["Harare CBD", "Avenues", "Workington", "Graniteside", "Southerton", "Willowvale"],
  // Chitungwiza, Epworth and Ruwa are separate towns inside Harare Metropolitan Province.
  "Greater Harare": ["Chitungwiza", "Epworth", "Ruwa"],
}

export const areaGroups = Object.entries(regions).map(([region, names]) => ({
  region,
  slug: slugify(region),
  areas: names.map((name): Area => ({ name, region, slug: slugify(name) })),
}))

export const areas: Area[] = areaGroups.flatMap((g) => g.areas)

// Shown in the footer.
export const popularAreas = ["Borrowdale", "Avondale", "Mount Pleasant", "Msasa", "Greendale", "Westgate", "Waterfalls", "Harare CBD"].map(
  (name) => areas.find((a) => a.name === name)!,
)

// How a place reads after "in": "in the Avenues", but "in Borrowdale".
const inNames: Record<string, string> = { Avenues: "the Avenues" }
export function inName(area: Area) {
  return inNames[area.name] ?? area.name
}

// "Borrowdale, Harare", but "Harare CBD" and "Chitungwiza" as they are.
export function placeName(area: Area) {
  if (area.region === "Greater Harare" || area.name.includes(site.city)) return area.name
  return `${area.name}, ${site.city}`
}

// placeName for use after "in": "in the Avenues, Harare".
export function inPlaceName(area: Area) {
  return placeName({ ...area, name: inName(area) })
}

export const faqs = [
  {
    q: "How much does a car aircon regas cost?",
    a: `A standard ${site.gas} regas starts from ${site.regasFrom}. Send us your car's make, model, year and location for a quote.`,
  },
  {
    q: "Do you really come to me?",
    a: `Yes. We are a mobile service, so we come to your home, workplace or wherever your car is parked in ${site.city}.`,
  },
  {
    q: "Which gas do you use?",
    a: `We regas with ${site.gas}. Many cars use it, but some newer models use a different gas called R1234yf, and the year alone doesn't tell you which. Send us your make, model and year and we'll confirm whether we can regas yours.`,
  },
  {
    q: "My aircon blows cold then warm. Is it just gas?",
    a: "Sometimes. It can also be the compressor clutch, a fan, a pressure switch or a blocked condenser. Tell us what it's doing and we'll check what's causing it.",
  },
]
