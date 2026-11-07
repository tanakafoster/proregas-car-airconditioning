import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { baseOpenGraph, homeDescription, homeTitle } from "@/lib/metadata"
import { areas, placeName, site } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// Canonical URLs and og:url are set per page (see app/page.tsx), so they don't leak onto other pages.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.shortName}`,
  },
  description: homeDescription,
  keywords: [
    "car aircon regas Harare",
    "car air conditioning Harare",
    `${site.gas} regas`,
    "mobile car aircon",
    "car aircon repairs Zimbabwe",
    "aircon gas refill Harare",
    site.shortName,
  ],
  openGraph: baseOpenGraph,
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = { themeColor: "#071a2f" }

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  description: site.tagline,
  url: site.url,
  telephone: site.phoneIntl,
  priceRange: `From ${site.regasFrom}`,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "ZW" },
  areaServed: areas.map((a) => ({ "@type": "Place", name: placeName(a) })),
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: `${site.gas} car aircon regas` },
    priceSpecification: { "@type": "PriceSpecification", minPrice: site.regasFromUsd, priceCurrency: "USD" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior lets Next turn smooth scrolling off during page changes.
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
