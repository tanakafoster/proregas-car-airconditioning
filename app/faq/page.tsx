import type { Metadata } from "next"
import Link from "next/link"
import { BookingBox, H2, JsonLd, PageHero } from "@/components/page"
import { FaqList } from "@/components/sections"
import { pageMetadata } from "@/lib/metadata"
import { faqs, services, site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "Car aircon questions",
  description: `Answers about car aircon regas in ${site.city}: what it costs, whether we come to you, which gas we use, and what it means when the aircon blows cold then warm.`,
})

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}

export default function Faq() {
  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/faq", label: "FAQ" },
        ]}
        title="Car aircon questions"
        intro={<p>Quick answers to what people ask us most. Can't find yours? Call or WhatsApp us.</p>}
        message="Hi ProRegas, I have a question about my car aircon: "
      />
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <FaqList items={faqs} />

        <section className="mt-14" aria-labelledby="more">
          <H2 id="more">More answers</H2>
          <ul className="mt-6 space-y-3 text-lg">
            <li>
              <Link href="/which-aircon-gas" className="font-semibold text-navy underline">
                Which aircon gas does my car use?
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="font-semibold text-navy underline">
                  {s.title}
                </Link>
                <span className="text-slate-600">: signs, causes and questions</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <BookingBox title="Still have a question?" message="Hi ProRegas, I have a question about my car aircon: ">
            <p>Call or WhatsApp {site.phoneDisplay} and we'll help.</p>
          </BookingBox>
        </div>
      </div>
    </>
  )
}
