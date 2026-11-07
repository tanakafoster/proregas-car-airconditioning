import type { Metadata } from "next"
import { Brands, Contact, Faq, Hero, HowItWorks, Locations, Pricing, Services } from "@/components/sections"
import { baseOpenGraph } from "@/lib/metadata"
import { faqs } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, url: "/" },
}

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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
