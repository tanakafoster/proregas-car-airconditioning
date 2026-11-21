import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { BookingBox, H2, JsonLd, PageHero } from "@/components/page"
import { citationOrder, RichText } from "@/components/rich-text"
import { FaqList, MoreLink } from "@/components/sections"
import { guideLinks, guides, type Block, type Guide } from "@/lib/guides"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

// Only the guides in lib/guides.ts have pages; any other address is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return {}
  return pageMetadata({ path: `/guides/${slug}`, title: guide.metaTitle, description: guide.metaDescription })
}

// All the text in a guide, in reading order, to number its sources.
function texts(guide: Guide) {
  return guide.sections.flatMap((s) =>
    s.blocks.flatMap((b) => {
      if (b.type === "p") return [b.text]
      if (b.type === "steps") return b.items.flatMap((i) => [i.title, i.text])
      if ("items" in b) return b.items
      if (b.type === "table") return b.rows.flat()
      return [b.title, b.text]
    }),
  )
}

function BlockView({ block, sources }: { block: Block; sources: Guide["sources"] }) {
  const rich = (t: string) => <RichText text={t} sources={sources} />
  switch (block.type) {
    case "p":
      return <p className="mt-4 text-lg text-slate-700">{rich(block.text)}</p>
    case "ul":
    case "ol": {
      const List = block.type
      return (
        <List className={`mt-4 space-y-2 pl-6 text-lg text-slate-700 ${block.type === "ul" ? "list-disc" : "list-decimal"}`}>
          {block.items.map((item) => (
            <li key={item}>{rich(item)}</li>
          ))}
        </List>
      )
    }
    case "steps":
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((item, i) => (
            <li key={item.title} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-royal font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-slate-700">{rich(item.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <caption className="sr-only">{block.caption}</caption>
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 font-medium">
                        {rich(cell)}
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-slate-700">
                        {rich(cell)}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "note":
      return (
        <div className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-5">
          <p className="flex items-center gap-2 font-bold text-ink">
            <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" /> {block.title}
          </p>
          <p className="mt-2 text-lg text-slate-700">{rich(block.text)}</p>
        </div>
      )
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()
  const sources = citationOrder(texts(guide), guide.sources)
  const path = `/guides/${slug}`

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    datePublished: guide.published,
    dateModified: guide.published,
    mainEntityOfPage: `${site.url}${path}/`,
    image: `${site.url}/og.png`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  }

  const others = guideLinks.filter((g) => g.href !== `${path}/`)

  return (
    <>
      <JsonLd data={articleLd} />
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { href: path, label: guide.label },
        ]}
        title={guide.h1}
        intro={<p>{guide.intro}</p>}
        buttons={false}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 lg:px-8">
        <p className="mt-8 text-sm text-slate-600">
          Published <time dateTime={guide.published}>{new Date(guide.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time> by {site.name}
        </p>

        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <H2>{section.heading}</H2>
            {section.blocks.map((block, i) => (
              <BlockView key={i} block={block} sources={sources} />
            ))}
          </section>
        ))}

        <section className="mt-14" aria-labelledby="questions">
          <H2 id="questions">Questions</H2>
          <div className="mt-6">
            <FaqList items={guide.faqs} />
          </div>
        </section>

        <div className="mt-14">
          <BookingBox title={guide.cta.title} message={guide.cta.message}>
            <p>{guide.cta.text}</p>
          </BookingBox>
        </div>

        <section className="mt-14" aria-labelledby="related">
          <H2 id="related">Related</H2>
          <ul className="mt-6 space-y-3 text-lg">
            {guide.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="font-semibold text-navy underline">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <MoreLink href="/guides">All {others.length + 1} guides</MoreLink>
          </p>
        </section>

        <h2 className="mt-14 text-lg font-bold">Sources</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm text-slate-600">
          {sources.map((s) => (
            <li key={s.id}>
              <a href={s.url} className="underline hover:text-navy" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </article>
    </>
  )
}
