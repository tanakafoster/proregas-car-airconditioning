import type { Metadata } from "next"
import { BookingBox, PageHero } from "@/components/page"
import { BrandChips, GasNote } from "@/components/sections"
import { pageMetadata } from "@/lib/metadata"
import { brandGroups, brands, site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  path: "/car-brands",
  title: `Car brands we regas in ${site.city}`,
  description: `We regas car aircon for ${brands.length} brands in ${site.city}, from Toyota, Honda and Nissan to Mercedes-Benz, BMW, Ford and Hyundai. ${site.gas} regas from ${site.regasFrom}.`,
})

export default function CarBrands() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/car-brands", label: "Car brands" },
        ]}
        title={`Car brands we regas in ${site.city}`}
        intro={<p>We regas cars from all of these brands, at your home, office or wherever your car is parked.</p>}
        message="Hi ProRegas, do you regas my car? It's a "
      />
      <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <p className="mx-auto max-w-2xl rounded-2xl bg-ice-soft p-5 text-center text-slate-700">
          <GasNote />
        </p>
        {brandGroups.map((g) => (
          <section key={g.origin} className="mt-12" aria-labelledby={`brands-${g.origin}`}>
            <h2 id={`brands-${g.origin}`} className="text-center text-2xl font-extrabold tracking-tight">
              {g.origin} brands
            </h2>
            <div className="mt-6">
              <BrandChips list={g.brands} />
            </div>
          </section>
        ))}
        <div className="mt-16">
          <BookingBox title="Don't see your car?" message="Hi ProRegas, do you regas my car? It's a ">
            <p>Send us its make, model and year and we'll tell you if we can regas it.</p>
          </BookingBox>
        </div>
      </div>
    </>
  )
}
