import Link from "next/link"
import { CallButtons } from "@/components/sections"
import { site } from "@/lib/site"

export type Crumb = { href: string; label: string }

// Structured data for search engines, rendered as a <script> tag.
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// Breadcrumb structured data. Addresses end in "/" to match the canonical URLs (next.config.mjs sets trailingSlash).
export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href === "/" ? "/" : `${c.href}/`}`,
    })),
  }
}

// The dark banner at the top of every inner page: breadcrumb, heading, intro and (optionally) call buttons.
// The last crumb is the current page.
export function PageHero({
  crumbs,
  title,
  intro,
  message,
  buttons = true,
}: {
  crumbs: Crumb[]
  title: React.ReactNode
  intro?: React.ReactNode
  message?: string
  buttons?: boolean
}) {
  return (
    <section className="frost text-white">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-white/80">
          <ol className="flex flex-wrap gap-2">
            {crumbs.map((c, i) =>
              i < crumbs.length - 1 ? (
                <li key={c.href} className="flex gap-2">
                  <Link href={c.href} className="underline underline-offset-4 hover:text-ice">
                    {c.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ) : (
                <li key={c.href} aria-current="page">
                  {c.label}
                </li>
              ),
            )}
          </ol>
        </nav>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h1>
        {intro && <div className="mt-6 max-w-3xl text-lg text-white/80">{intro}</div>}
        {buttons && (
          <div className="mt-8">
            <CallButtons message={message} />
          </div>
        )}
      </div>
    </section>
  )
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
      {children}
    </h2>
  )
}

// A light-blue box that asks the visitor to call or WhatsApp.
export function BookingBox({ title, children, message }: { title: string; children: React.ReactNode; message?: string }) {
  return (
    <div className="rounded-3xl bg-ice-soft p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
      <div className="mt-3 text-lg text-slate-700">{children}</div>
      <div className="mt-6">
        <CallButtons message={message} tone="light" />
      </div>
    </div>
  )
}
