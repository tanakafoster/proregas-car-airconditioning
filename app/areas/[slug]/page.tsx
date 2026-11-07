import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin } from "lucide-react"
import { H2, JsonLd, PageHero } from "@/components/page"
import { Contact, HowItWorks, MoreLink, PriceCard, ServiceCards } from "@/components/sections"
import { areaFacts } from "@/lib/area-facts"
import { pageMetadata } from "@/lib/metadata"
import { areaGroups, areas, inName, inPlaceName, placeName, site } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

// Only the places listed in lib/site.ts have pages; any other address is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) return {}
  const place = inPlaceName(area)
  return pageMetadata({
    path: `/areas/${slug}`,
    title: `Car aircon regas in ${place}`,
    description: `Mobile car aircon regas and repairs in ${place}. We come to you and regas with ${site.gas} from ${site.regasFrom}. Call or WhatsApp ${site.phoneLocal}.`,
  })
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) notFound()
  const group = areaGroups.find((g) => g.region === area.region)!
  const nearby = group.areas.filter((a) => a.slug !== area.slug)
  const facts = areaFacts[area.slug]
  const where = inName(area)
  const message = `Hi ProRegas, I'm in ${area.name} and need help with my car aircon. My car is a `

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Car aircon regas and repairs in ${placeName(area)}`,
    serviceType: "Car air conditioning regas and repair",
    url: `${site.url}/areas/${slug}/`,
    areaServed: { "@type": "Place", name: placeName(area) },
    provider: { "@type": "AutoRepair", name: site.name, telephone: site.phoneIntl, url: site.url },
  }

  const localSteps = [
    { title: "Call or WhatsApp", text: `Send us your car's make, model, year and where in ${area.name} it's parked, on ${site.phoneDisplay}.` },
    { title: "We come to you", text: `We drive to you in ${where}: at home, at work or wherever your car is parked.` },
    { title: "We regas or repair", text: `We regas your aircon with ${site.gas} gas, or quote you for any repairs it needs.` },
  ]

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/areas", label: "Areas" },
          { href: `/areas/${slug}`, label: area.name },
        ]}
        title={`Car aircon regas in ${where}`}
        intro={
          <p>
            We come to your home, workplace or wherever your car is parked in {where}. We regas with {site.gas} from {site.regasFrom}, and we check
            and quote for aircon repairs.
          </p>
        }
        message={message}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <section aria-labelledby="about">
          <H2 id="about">About {where}</H2>
          {facts?.blurb && <p className="mt-4 text-lg text-slate-700">{facts.blurb}</p>}
          <p className="mt-4 flex items-center gap-2 text-slate-700">
            <MapPin className="h-5 w-5 shrink-0 text-ice-deep" aria-hidden="true" />
            <span>
              Listed under{" "}
              <Link href={`/areas#${group.slug}`} className="font-semibold text-navy underline">
                {group.region}
              </Link>{" "}
              on our areas page.
            </span>
          </p>
          {nearby.length > 0 && (
            <>
              <h3 className="mt-8 text-lg font-bold">Other areas in {group.region} we cover</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {nearby.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/areas/${a.slug}`} className="block rounded-full bg-ice-soft px-3 py-1 text-sm text-navy underline-offset-4 hover:underline">
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-6">
            <MoreLink href="/areas">See all areas</MoreLink>
          </p>
        </section>
        <PriceCard />
      </div>

      <section className="bg-slate-50 py-16" aria-labelledby="services">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <H2 id="services">Car aircon services in {where}</H2>
          <div className="mt-8">
            <ServiceCards />
          </div>
        </div>
      </section>

      <HowItWorks items={localSteps} title={`Book in ${where} in three steps`} />

      <Contact title={`Book a regas in ${where}`} area={area.name} />

      {facts && facts.sources.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <p className="text-sm text-slate-600">
            Sources for the description of {where}:{" "}
            {facts.sources.map((url, i) => (
              <span key={url}>
                {i > 0 && ", "}
                <a href={url} className="underline hover:text-navy" target="_blank" rel="noopener noreferrer">
                  {new URL(url).hostname.replace(/^www\./, "")}
                </a>
              </span>
            ))}
          </p>
        </div>
      )}
    </>
  )
}
