import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { H2, JsonLd, PageHero } from "@/components/page"
import { BrandChips, Contact, HowItWorks, PriceCard, ServiceCards } from "@/components/sections"
import { pageMetadata } from "@/lib/metadata"
import { brandList, site } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

// Only the brands in lib/site.ts have pages; any other address is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return brandList.map((b) => ({ slug: b.slug }))
}

// Examples from the manufacturers' own data sheets, as cited on the gas guide page (/which-aircon-gas/).
const examples: Record<string, string[]> = {
  Toyota: [
    "The Corolla Axio (NZE161, NZE164, NRE161 and the NKE165 hybrid) uses R134a.",
    "The 2nd-generation Aqua (MXPK11, MXPK16) uses R1234yf.",
  ],
  Honda: [
    "The 3rd-generation Fit (GK3 to GK6, and the GP5 and GP6 hybrids) uses R134a.",
    "The 4th-generation Fit (GR and GS models, including hybrids) uses R1234yf.",
  ],
}

function gasNote(name: string, origin: string) {
  if (origin === "Japanese")
    return `Japanese car makers have been changing from R134a to R1234yf one model at a time, so ${name} models of the same age can use different gases.`
  if (origin === "European")
    return `Since 2017, every new car sold in the EU has had to use a gas like R1234yf, so a ${name} first sold new in Europe from 2017 on won't use R134a.`
  return `Depending on the model, its age and the country it was built for, a ${name} can use R134a or the newer R1234yf.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brand = brandList.find((b) => b.slug === slug)
  if (!brand) return {}
  return pageMetadata({
    path: `/car-brands/${slug}`,
    title: `${brand.name} aircon regas in ${site.city}`,
    description: `Mobile ${brand.name} car aircon regas and repairs in ${site.city}. We come to you and regas with ${site.gas} from ${site.regasFrom}. Call or WhatsApp ${site.phoneLocal}.`,
  })
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params
  const brand = brandList.find((b) => b.slug === slug)
  if (!brand) notFound()
  const others = brandList.filter((b) => b.origin === brand.origin && b.slug !== brand.slug).map((b) => b.name)
  const message = `Hi ProRegas, I'd like help with my car aircon. My car is a ${brand.name} `

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} car aircon regas and repairs`,
    serviceType: "Car air conditioning regas and repair",
    url: `${site.url}/car-brands/${slug}/`,
    areaServed: { "@type": "City", name: site.city },
    provider: { "@type": "AutoRepair", name: site.name, telephone: site.phoneIntl, url: site.url },
  }

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/car-brands", label: "Car brands" },
          { href: `/car-brands/${slug}`, label: brand.name },
        ]}
        title={`${brand.name} aircon regas in ${site.city}`}
        intro={
          <p>
            We regas {brand.name} aircon with {site.gas} from {site.regasFrom}, and we check and quote for aircon repairs, at your home, office or
            wherever your car is parked in {site.city}.
          </p>
        }
        message={message}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <section aria-labelledby="gas">
          <H2 id="gas">Which gas does your {brand.name} use?</H2>
          <p className="mt-4 text-lg text-slate-700">
            We regas with {site.gas}. {gasNote(brand.name, brand.origin)}
          </p>
          {examples[brand.name] && (
            <>
              <p className="mt-4 text-lg text-slate-700">From {brand.name}'s own data sheets:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-lg text-slate-700">
                {examples[brand.name].map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-4 text-lg text-slate-700">
            The aircon sticker under the bonnet usually names the gas. If you can't find it, send us your {brand.name}'s model and year, with a photo
            of the sticker if you have one, and we'll confirm whether we can regas it.
          </p>
          <p className="mt-4">
            <Link href="/which-aircon-gas" className="font-semibold text-navy underline">
              Read our guide: which aircon gas does my car use?
            </Link>
          </p>
        </section>
        <PriceCard />
      </div>

      <section className="bg-slate-50 py-16" aria-labelledby="services">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <H2 id="services">Aircon services for your {brand.name}</H2>
          <div className="mt-8">
            <ServiceCards />
          </div>
        </div>
      </section>

      <HowItWorks />

      {others.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16 text-center lg:px-8" aria-labelledby="other-brands">
          <H2 id="other-brands">Other {brand.origin.toLowerCase()} brands we regas</H2>
          <div className="mt-8">
            <BrandChips list={others} />
          </div>
          <p className="mt-8">
            <Link href="/car-brands" className="font-semibold text-navy underline">
              See all car brands
            </Link>
          </p>
        </section>
      )}

      <Contact title={`Book a regas for your ${brand.name}`} make={brand.name} />
    </>
  )
}
