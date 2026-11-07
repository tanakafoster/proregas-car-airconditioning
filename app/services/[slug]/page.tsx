import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { BookingBox, H2, JsonLd, PageHero } from "@/components/page"
import { FaqList, HowItWorks, MoreLink, ServiceCards } from "@/components/sections"
import { pageMetadata } from "@/lib/metadata"
import { servicePages } from "@/lib/service-pages"
import { popularAreas, services, site } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

// Only the services in lib/site.ts have pages; any other address is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

function find(slug: string) {
  const service = services.find((s) => s.slug === slug)
  return service && { service, page: servicePages[service.slug] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const found = find(slug)
  if (!found) return {}
  return pageMetadata({ path: `/services/${slug}`, title: found.page.metaTitle, description: found.page.metaDescription })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const found = find(slug)
  if (!found) notFound()
  const { service, page } = found
  const isRegas = "from" in service
  const message = `Hi ProRegas, I'd like help with ${service.title.toLowerCase()}. My car is a `

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: page.metaDescription,
    url: `${site.url}/services/${slug}/`,
    areaServed: { "@type": "City", name: site.city },
    provider: { "@type": "AutoRepair", name: site.name, telephone: site.phoneIntl, url: site.url },
    ...(isRegas
      ? { offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: site.regasFromUsd, priceCurrency: "USD" } } }
      : {}),
  }

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${slug}`, label: service.title },
        ]}
        title={page.h1}
        intro={<p>{page.intro}</p>}
        message={message}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <div className="rounded-2xl border border-slate-200 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-600">Price</p>
            {isRegas ? (
              <p className="mt-1 text-2xl font-extrabold text-navy">
                {site.gas} regas from <span className="text-ink">{site.regasFrom}</span>
              </p>
            ) : (
              <p className="mt-1 text-xl font-bold text-navy">We check what's causing it and quote you for the repair.</p>
            )}
          </div>
          <p className="mt-4 text-slate-600 sm:mt-0 sm:max-w-xs">
            Send us your car's make, model, year and location for a quote. <Link href="/pricing" className="font-semibold text-navy underline">Pricing</Link>
          </p>
        </div>

        <section className="mt-14" aria-labelledby="signs">
          <H2 id="signs">Signs you need this</H2>
          <ul className="mt-6 space-y-3 text-lg text-slate-700">
            {page.signs.map((s) => (
              <li key={s} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-ice-deep" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="causes">
          <H2 id="causes">Common causes</H2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.causes.map((c) => (
              <div key={c.title} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-slate-700">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="what-we-do">
          <H2 id="what-we-do">What we do</H2>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-lg text-slate-700">
            {page.whatWeDo.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
      </div>

      <HowItWorks />

      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <section aria-labelledby="questions">
          <H2 id="questions">Questions about {service.title.toLowerCase()}</H2>
          <div className="mt-6">
            <FaqList items={page.faqs} />
          </div>
          <p className="mt-6 text-slate-600">
            More answers on our <Link href="/faq" className="font-semibold text-navy underline">FAQ page</Link>, and in our guide{" "}
            <Link href="/which-aircon-gas" className="font-semibold text-navy underline">
              Which aircon gas does my car use?
            </Link>
          </p>
        </section>

        <section className="mt-14" aria-labelledby="areas">
          <H2 id="areas">Where we come to you</H2>
          <p className="mt-4 text-lg text-slate-700">
            We're a mobile service, so we come to your home, workplace or wherever your car is parked in {site.city}, including{" "}
            {popularAreas.slice(0, 5).map((a, i) => (
              <span key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="font-semibold text-navy underline">
                  {a.name}
                </Link>
                {i < 3 ? ", " : i === 3 ? " and " : "."}
              </span>
            ))}
          </p>
          <p className="mt-4">
            <MoreLink href="/areas">See all areas</MoreLink>
          </p>
        </section>

        <div className="mt-14">
          <BookingBox title="Book it" message={message}>
            <p>Call or WhatsApp us with your car's make, model, year and where it's parked, and tell us what the aircon is doing.</p>
          </BookingBox>
        </div>
      </div>

      <section className="bg-slate-50 py-16" aria-labelledby="other-services">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <H2 id="other-services">Other services</H2>
          <div className="mt-8">
            <ServiceCards exclude={service.slug} />
          </div>
        </div>
      </section>

      {page.sources.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
          <h2 className="text-lg font-bold">Sources</h2>
          <p className="mt-1 text-sm text-slate-600">For the general information about car aircon on this page.</p>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm text-slate-600">
            {page.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="underline hover:text-navy" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
