import Link from "next/link"
import { Fragment } from "react"
import type { Source } from "@/lib/guides"

// Renders the small markup used in lib/guides.ts: **bold**, [text](/path/) internal links and [^id] or [^id,id] citations.
// `sources` must already be in citation order, so a citation's number is its position in the list plus one.
export function RichText({ text, sources }: { text: string; sources: Source[] }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\^[^\]]+\]|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.startsWith("**")) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
        if (part.startsWith("[^")) return <Cite key={i} ids={part.slice(2, -1).split(",")} sources={sources} />
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link)
          return (
            <Link key={i} href={link[2]} className="font-semibold text-navy underline">
              {link[1]}
            </Link>
          )
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

function Cite({ ids, sources }: { ids: string[]; sources: Source[] }) {
  return (
    <sup className="ml-0.5">
      {ids.map((id) => {
        const n = sources.findIndex((s) => s.id === id)
        if (n < 0) throw new Error(`Unknown source "${id}"`)
        return (
          <a
            key={id}
            href={sources[n].url}
            className="px-0.5 text-ice-deep underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source ${n + 1}: ${sources[n].label}`}
          >
            [{n + 1}]
          </a>
        )
      })}
    </sup>
  )
}

// The guide's sources, in the order its text first cites them. Throws at build time if a listed source is never cited.
export function citationOrder(texts: string[], sources: Source[]) {
  const order: string[] = []
  for (const t of texts)
    for (const m of t.matchAll(/\[\^([^\]]+)\]/g))
      for (const id of m[1].split(",")) if (!order.includes(id)) order.push(id)
  const unused = sources.filter((s) => !order.includes(s.id))
  if (unused.length) throw new Error(`Sources listed but never cited: ${unused.map((s) => s.id).join(", ")}`)
  return order.map((id) => {
    const s = sources.find((x) => x.id === id)
    if (!s) throw new Error(`Cited source "${id}" is not in the guide's sources`)
    return s
  })
}
