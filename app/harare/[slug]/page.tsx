import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Brands, Contact, Hero, HowItWorks, Locations, Pricing, Services } from "@/components/sections"
import { areas, site } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) return {}
  return {
    title: `Car Aircon Regas ${area.name}, Harare | From ${site.regasFrom}`,
    description: `Mobile ${site.gas} car aircon regas and repairs in ${area.name}, Harare from ${site.regasFrom}. We come to you. Call or WhatsApp ${site.phoneLocal}.`,
    alternates: { canonical: `/harare/${area.slug}` },
  }
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) notFound()
  return (
    <>
      <Hero
        place={area.name}
        heading={
          <>
            Mobile Car Aircon Regas in <span className="text-ice">{area.name}</span>
          </>
        }
      />
      <Services />
      <Pricing />
      <HowItWorks />
      <Brands />
      <Locations current={area.slug} />
      <Contact defaultArea={area.name} />
    </>
  )
}
