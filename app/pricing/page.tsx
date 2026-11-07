import type { Metadata } from "next"
import Link from "next/link"
import { BookingBox, H2, PageHero } from "@/components/page"
import { FaqList, PriceCard } from "@/components/sections"
import { pageMetadata } from "@/lib/metadata"
import { faqs, services, site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: `Car aircon regas prices in ${site.city}`,
  description: `A standard ${site.gas} car aircon regas in ${site.city} starts from ${site.regasFrom}, at your home or office. Repairs are quoted once we know what's wrong. Call or WhatsApp ${site.phoneLocal}.`,
})

const quoteNeeds = [
  "Your car's make, model and year",
  "Where in Harare the car is parked",
  "What the aircon is doing, for example blowing warm, cold then warm, or making a noise",
  "A photo of the aircon sticker under the bonnet, if you can find it",
]

export default function Pricing() {
  const repairs = services.filter((s) => !("from" in s))
  const priceFaq = faqs.filter((f) => /cost|Which gas/.test(f.q))
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/pricing", label: "Pricing" },
        ]}
        title={`Car aircon regas prices in ${site.city}`}
        intro={
          <p>
            A standard {site.gas} regas starts from <strong className="text-white">{site.regasFrom}</strong>, and we come to you. Send us your car's
            details for a quote.
          </p>
        }
        message="Hi ProRegas, how much is a regas for my car? It's a "
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8">
        <PriceCard />
        <section aria-labelledby="quote">
          <H2 id="quote">What we need for a quote</H2>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-lg text-slate-700">
            {quoteNeeds.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600">
            We regas with {site.gas}. If your car uses R1234yf, send us its details and we'll tell you what we can do.{" "}
            <Link href="/which-aircon-gas" className="font-semibold text-navy underline">
              Which gas does my car use?
            </Link>
          </p>
        </section>
      </div>

      <section className="bg-slate-50 py-16" aria-labelledby="repairs">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <H2 id="repairs">Repairs</H2>
          <p className="mt-4 text-lg text-slate-700">
            Repair prices depend on what's wrong, so we check what's causing the problem and quote you for the repair.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {repairs.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block rounded-xl bg-white p-4 font-semibold text-navy shadow-sm hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        {priceFaq.length > 0 && (
          <section aria-labelledby="price-questions">
            <H2 id="price-questions">Price questions</H2>
            <div className="mt-6">
              <FaqList items={priceFaq} />
            </div>
          </section>
        )}
        <div className="mt-14">
          <BookingBox title="Get a quote" message="Hi ProRegas, how much is a regas for my car? It's a ">
            <p>Call or WhatsApp {site.phoneDisplay} with your car's details and location.</p>
          </BookingBox>
        </div>
      </div>
    </>
  )
}
