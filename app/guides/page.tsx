import type { Metadata } from "next"
import Link from "next/link"
import { BookingBox, PageHero } from "@/components/page"
import { guideLinks } from "@/lib/guides"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  path: "/guides",
  title: "Car aircon guides",
  description: `Plain-English guides to your car's aircon: fuel use, cooling a hot car, recirculation, looking after it and checking it on a used car. From ${site.name}, ${site.city}.`,
})

export default function Guides() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
        ]}
        title="Car aircon guides"
        intro={<p>Practical answers about your car's aircon, with links to the research behind them.</p>}
        buttons={false}
      />
      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2">
          {guideLinks.map((g) => (
            <li key={g.href} className="rounded-2xl border border-slate-200 p-6 transition hover:border-ice-deep">
              <h2 className="text-xl font-bold text-ink">
                <Link href={g.href} className="hover:text-navy hover:underline">
                  {g.label}
                </Link>
              </h2>
              <p className="mt-2 text-slate-600">{g.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <BookingBox title="Need your aircon looked at?" message="Hi ProRegas, I have a question about my car aircon: ">
            <p>
              We come to your home or office in {site.city}. Call or WhatsApp {site.phoneDisplay}.
            </p>
          </BookingBox>
        </div>
      </div>
    </>
  )
}
