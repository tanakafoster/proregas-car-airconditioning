export const site = {
  name: "ProRegas Car Air Conditioning",
  shortName: "ProRegas",
  tagline: "Mobile Car Air Conditioning Regas & Repairs",
  domain: "proregascaraircon.co.zw",
  url: "https://proregascaraircon.co.zw",
  phoneDisplay: "077 137 1600",
  phoneLocal: "0771371600",
  phoneIntl: "+263771371600",
  city: "Harare",
  country: "Zimbabwe",
  regasFrom: "$30",
  gas: "R134a",
}

export const telHref = `tel:${site.phoneIntl}`

export function whatsappHref(message = "Hi ProRegas, I'd like to book a car aircon regas.") {
  return `https://wa.me/${site.phoneIntl.replace("+", "")}?text=${encodeURIComponent(message)}`
}

export const services = [
  {
    title: "R134a Aircon Regas",
    description:
      "We recover, vacuum and recharge your system with the correct weight of R134a gas and compressor oil, then test vent temperatures before we leave.",
    from: "From $30",
    icon: "snowflake",
  },
  {
    title: "Leak Detection & Repair",
    description:
      "Gas keeps running out? We pressure test and use UV dye to find leaking hoses, O-rings, valves and condensers, then fix them so the regas lasts.",
    icon: "search",
  },
  {
    title: "Compressor Repairs",
    description:
      "Noisy, seized or not engaging? We diagnose compressor, magnetic clutch and relay faults and repair or replace the unit.",
    icon: "cog",
  },
  {
    title: "Condenser & Evaporator",
    description:
      "Replacement and flushing of blocked or damaged condensers, evaporators, driers and expansion valves.",
    icon: "layers",
  },
  {
    title: "Electrical & Fan Faults",
    description:
      "Blower motors, resistors, cooling fans, pressure switches, fuses and wiring that stop your aircon from blowing cold.",
    icon: "zap",
  },
  {
    title: "Aircon Service & Diagnostics",
    description:
      "Full system health check, cabin filter check and a clear explanation of what your car needs.",
    icon: "gauge",
  },
] as const

export const steps = [
  { title: "Call or WhatsApp", text: `Send us your car make, model and location on ${site.phoneDisplay}.` },
  { title: "We come to you", text: "Our mobile technician drives to your home, office or roadside anywhere in Harare." },
  { title: "Test & regas", text: "We check pressures, find any leaks and recharge with the right amount of R134a gas." },
  { title: "Drive off cool", text: "We confirm cold air at the vents before we leave." },
]

export const brands = [
  "Toyota", "Honda", "Nissan", "Mazda", "Mitsubishi", "Isuzu", "Subaru", "Suzuki",
  "Daihatsu", "Lexus", "Infiniti", "Mercedes-Benz", "BMW", "Audi", "Volkswagen",
  "Porsche", "Mini", "Land Rover", "Range Rover", "Jaguar", "Volvo", "Ford",
  "Chevrolet", "Jeep", "Opel", "Peugeot", "Renault", "Citroën", "Fiat", "Alfa Romeo",
  "Hyundai", "Kia", "SsangYong", "Haval", "GWM", "Chery", "JAC", "BAIC", "Foton",
  "Geely", "Mahindra", "Tata", "Datsun", "Proton", "Hino", "UD Trucks",
]

export type Area = { name: string; slug: string; region: string }

const regions: Record<string, string[]> = {
  "Northern Suburbs": [
    "Borrowdale", "Borrowdale Brooke", "Mount Pleasant", "Avondale", "Belgravia", "Alexandra Park",
    "Gunhill", "Highlands", "Chisipite", "Glen Lorne", "Greystone Park", "Ballantyne Park",
    "Emerald Hill", "Marlborough", "Mabelreign", "Pomona", "Vainona", "Mandara",
  ],
  "Eastern Suburbs": [
    "Greendale", "Msasa", "Eastlea", "Hatfield", "Highfield East", "Mabvuku", "Tafara",
    "Arcadia", "Braeside", "Queensdale",
  ],
  "Western Suburbs": [
    "Westgate", "Bluff Hill", "Milton Park", "Belvedere", "Kuwadzana", "Warren Park",
    "Dzivarasekwa", "Marimba Park", "Mufakose", "Budiriro", "Glen View",
  ],
  "Southern Suburbs": [
    "Waterfalls", "Southerton", "Highfield", "Mbare", "Ardbennie", "Prospect", "Hopley",
    "Glen Norah", "Sunningdale",
  ],
  "CBD & Industrial": ["Harare CBD", "Avenues", "Workington", "Graniteside", "Southerton Industrial", "Willowvale"],
  "Surrounding Towns": ["Ruwa", "Chitungwiza", "Epworth", "Norton", "Domboshava"],
}

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const areaGroups = Object.entries(regions).map(([region, names]) => ({
  region,
  areas: names.map((name) => ({ name, slug: slugify(name), region })),
}))

export const areas: Area[] = areaGroups.flatMap((g) => g.areas)

export const faqs = [
  {
    q: "How much does a car aircon regas cost?",
    a: `A standard R134a regas starts from ${site.regasFrom}. The final price depends on your vehicle and how much gas the system holds. If we find a leak or faulty part we'll quote you before doing any extra work.`,
  },
  {
    q: "Do you really come to me?",
    a: "Yes. We are a fully mobile service. We bring our gas, gauges, vacuum pump and tools to your home, workplace or wherever your car is parked in and around Harare.",
  },
  {
    q: "How long does a regas take?",
    a: "Most regas jobs take 30 to 60 minutes, including vacuum and leak testing. Repairs that need parts may take longer and we'll give you a time upfront.",
  },
  {
    q: "Which gas do you use?",
    a: "We regas with R134a, the refrigerant used in most cars on Zimbabwean roads. We charge to the manufacturer's specified weight rather than guessing.",
  },
  {
    q: "My aircon blows cold then warm. Is it just gas?",
    a: "Sometimes. It can also be a compressor clutch, a fan, a pressure switch or a blocked condenser. We test the whole system so you don't pay for gas that won't fix the problem.",
  },
]
