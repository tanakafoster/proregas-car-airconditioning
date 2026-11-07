import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/page"
import { Contact as ContactSection } from "@/components/sections"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact us",
  description: `Call or WhatsApp ${site.shortName} on ${site.phoneLocal} to book a mobile car aircon regas or repair in ${site.city}, or send us your car's details with the quote form.`,
})

export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
        title={`Contact ${site.shortName}`}
        buttons={false}
        intro={
          <p>
            Call or WhatsApp <strong className="text-white">{site.phoneDisplay}</strong>. We're a mobile service, so we come to you anywhere in{" "}
            <Link href="/areas" className="text-white underline underline-offset-4 hover:text-ice">
              the areas we cover
            </Link>
            .
          </p>
        }
      />
      <ContactSection title="Send us your car's details" />
    </>
  )
}
