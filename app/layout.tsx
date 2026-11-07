import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { areas, site } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Car Aircon Regas Harare from ${site.regasFrom}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.tagline} in Harare. R134a car aircon regas from ${site.regasFrom}, leak detection and repairs at your home or office. Call or WhatsApp ${site.phoneLocal}.`,
  keywords: [
    "car aircon regas Harare",
    "car air conditioning Harare",
    "R134a regas",
    "mobile car aircon",
    "car aircon repairs Zimbabwe",
    "aircon gas refill Harare",
    "ProRegas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: `Mobile R134a car aircon regas from ${site.regasFrom} anywhere in Harare. Call or WhatsApp ${site.phoneLocal}.`,
  },
  robots: { index: true, follow: true },
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
  areaServed: areas.map((a) => ({ "@type": "Place", name: `${a.name}, Harare` })),
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: `${site.gas} car aircon regas` },
    priceSpecification: { "@type": "PriceSpecification", minPrice: 30, priceCurrency: "USD" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
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
