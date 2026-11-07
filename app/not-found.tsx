import type { Metadata } from "next"
import Link from "next/link"
import { site, telHref } from "@/lib/site"

export const metadata: Metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="mt-4 text-slate-600">
        That page doesn't exist. Go back to the home page or call us on{" "}
        <a href={telHref} className="font-semibold text-navy underline">
          {site.phoneDisplay}
        </a>
        .
      </p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-navy px-6 py-3 font-semibold text-white">
        Back to home
      </Link>
    </section>
  )
}
