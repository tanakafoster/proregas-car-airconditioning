import type { Metadata } from "next"
import Link from "next/link"
import { BookingBox, PageHero } from "@/components/page"
import { HowItWorks, ServiceCards } from "@/components/sections"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: `Car aircon services in ${site.city}`,
  description: `Mobile car aircon services in ${site.city}: ${site.gas} regas from ${site.regasFrom}, leak, compressor, condenser, electrical and fan repairs, and check-ups. We come to you.`,
})

export default function Services() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
        title={`Car aircon services in ${site.city}`}
        intro={
          <p>
            We regas and repair car aircon at your home, office or wherever your car is parked in {site.city}. Choose a service to see the signs
            to look out for, what usually causes them and how booking works.
          </p>
        }
      />
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <ServiceCards headingLevel={2} />
        <p className="mx-auto mt-10 max-w-2xl text-center text-slate-600">
          Not sure what's wrong? Start with an{" "}
          <Link href="/services/aircon-check-ups" className="font-semibold text-navy underline">
            aircon check-up
          </Link>
          . Not sure which gas your car uses? Read{" "}
          <Link href="/which-aircon-gas" className="font-semibold text-navy underline">
            our aircon gas guide
          </Link>
          .
        </p>
      </div>
      <HowItWorks />
      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <BookingBox title="Book a regas or repair" message="Hi ProRegas, I need help with my car aircon. My car is a ">
          <p>Call or WhatsApp us with your car's make, model, year and location, and tell us what the aircon is doing.</p>
        </BookingBox>
      </div>
    </>
  )
}
