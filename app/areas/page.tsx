import type { Metadata } from "next"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { BookingBox, PageHero } from "@/components/page"
import { areaFacts } from "@/lib/area-facts"
import { pageMetadata } from "@/lib/metadata"
import { areaGroups, areas, site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  path: "/areas",
  title: `Areas we cover in ${site.city}`,
  description: `Mobile car aircon regas and repairs in ${areas.length} ${site.city} suburbs and nearby towns, from Borrowdale to Waterfalls, Chitungwiza and Ruwa. We come to you.`,
})

// The first sentence of a place's description, for the overview cards.
function firstSentence(text: string) {
  const m = text.match(/^.*?[.!?](\s|$)/)
  return (m ? m[0] : text).trim()
}

export default function Areas() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/areas", label: "Areas" },
        ]}
        title={`Areas we cover in ${site.city}`}
        intro={
          <p>
            We're a mobile service: we come to your home, workplace or wherever your car is parked. These are the {site.city} suburbs and nearby
            towns we cover. Not listed? Call or WhatsApp us to check.
          </p>
        }
        message="Hi ProRegas, do you come to my area? I'm in "
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <nav aria-label="Regions" className="flex flex-wrap gap-2">
          {areaGroups.map((g) => (
            <a key={g.slug} href={`#${g.slug}`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-navy hover:bg-ice-soft">
              {g.region}
            </a>
          ))}
        </nav>

        {areaGroups.map((g) => (
          <section key={g.slug} id={g.slug} className="mt-14 scroll-mt-24" aria-labelledby={`${g.slug}-heading`}>
            <h2 id={`${g.slug}-heading`} className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              <MapPin className="h-6 w-6 text-ice-deep" aria-hidden="true" /> {g.region}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.areas.map((a) => {
                const blurb = areaFacts[a.slug]?.blurb
                return (
                  <li key={a.slug} className="relative rounded-2xl border border-slate-200 p-5 transition hover:shadow-md">
                    <h3 className="font-bold">
                      <Link href={`/areas/${a.slug}`} className="text-navy after:absolute after:inset-0 after:rounded-2xl hover:underline">
                        {a.name}
                      </Link>
                    </h3>
                    {blurb && <p className="mt-2 text-sm text-slate-600">{firstSentence(blurb)}</p>}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}

        <div className="mt-16">
          <BookingBox title="Not sure if we cover you?" message="Hi ProRegas, do you come to my area? I'm in ">
            <p>Call or WhatsApp us with where your car is parked and we'll tell you.</p>
          </BookingBox>
        </div>
      </div>
    </>
  )
}
