import Link from "next/link"

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="mt-4 text-slate-600">That page doesn't exist, but we can still cool your car down.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-navy px-6 py-3 font-semibold text-white">Back to home</Link>
    </section>
  )
}
