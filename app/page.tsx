import type { Metadata } from "next"
import { Brands, Contact, Faq, Hero, HowItWorks, Locations, Pricing, Services } from "@/components/sections"
import { baseOpenGraph } from "@/lib/metadata"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, url: "/" },
}

// The home page gives a short summary of each part of the site, with links to the full pages.
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Pricing />
      <HowItWorks />
      <Brands />
      <Locations />
      <Faq />
      <Contact />
    </>
  )
}
