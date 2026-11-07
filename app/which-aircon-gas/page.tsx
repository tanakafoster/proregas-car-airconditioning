import type { Metadata } from "next"
import Link from "next/link"
import { CallButtons } from "@/components/sections"
import { baseOpenGraph } from "@/lib/metadata"
import { site } from "@/lib/site"

const path = "/which-aircon-gas"
const title = "Which aircon gas does my car use? R134a or R1234yf"
const description = `Check whether your car's aircon uses R134a or R1234yf before you book a regas, with examples from Honda and Toyota data. ${site.name}, ${site.city}.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...baseOpenGraph, url: path, title, description },
}

// Examples taken from the manufacturers' own environmental data sheets (linked under Sources).
const examples = [
  { car: "Honda Fit, 3rd generation (GK3–GK6, and the GP5/GP6 hybrid)", gas: "R134a", sticker: "HFC-134a", amount: "430 g", source: 0 },
  { car: "Toyota Corolla Axio (NZE161, NZE164, NRE161, and the NKE165 hybrid)", gas: "R134a", sticker: "HFC-134a", amount: "370 g or 420 g", source: 1 },
  { car: "Honda Fit, 4th generation (GR and GS models, including hybrids)", gas: "R1234yf", sticker: "HFO-1234yf", amount: "", source: 2 },
  { car: "Toyota Aqua, 2nd generation (MXPK11, MXPK16)", gas: "R1234yf", sticker: "HFO-1234yf", amount: "450 g", source: 3 },
]

const sources = [
  { label: "Honda Fit environmental specifications, April 2017 (Japanese)", url: "https://www.honda.co.jp/auto-archive/fit/2017/common/pdf/fit_environment_list.pdf" },
  { label: "Toyota Corolla Axio environmental specifications (Japanese)", url: "https://toyota.jp/pages/contents/corollaaxio/002_p_010/pdf/corollaaxio_ecology_202403.pdf" },
  { label: "Honda Fit environmental specifications, July 2026 (Japanese)", url: "https://www.honda.co.jp/Fit/common/pdf/fit_environment_list.pdf" },
  { label: "Toyota Aqua environmental specifications, 2024 (Japanese)", url: "https://toyota.jp/pages/contents/aqua/002_p_001/pdf/aqua_ecology_202404.pdf" },
  {
    label: "European Commission: mobile air-conditioning systems (the 2017 rule for new cars in the EU)",
    url: "https://single-market-economy.ec.europa.eu/sectors/automotive-industry/environmental-protection/mobile-air-conditioning-systems-macs_en",
  },
  { label: "Delphi: servicing air conditioning on hybrid vehicles", url: "https://delphiautoparts.com/en-gb/mom/how-to/servicing-air-conditioning-on-hybrid-vehicles" },
]

function SourceLink({ index }: { index: number }) {
  return (
    <a
      href={sources[index].url}
      className="ml-1 text-ice-deep underline"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Source: ${sources[index].label}`}
    >
      <sup>source</sup>
    </a>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-2xl font-extrabold tracking-tight sm:text-3xl">{children}</h2>
}

export default function WhichAirconGas() {
  return (
    <>
      <section className="frost text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="underline underline-offset-4 hover:text-sun">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Which aircon gas?</li>
            </ol>
          </nav>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Which aircon gas does my car use?
          </h1>
          <p className="mt-6 text-lg text-white/80">
            Most car aircon systems use one of two gases: <strong className="text-white">R134a</strong> or the newer{" "}
            <strong className="text-white">R1234yf</strong>. We regas with {site.gas}, so it helps to know which one your car has
            before we come out.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-20 lg:px-8">
        <H2>Why it matters</H2>
        <p className="mt-4 text-lg text-slate-700">
          The two gases can't be mixed, and each needs its own equipment. Your car must be regassed with the gas it was built for.
        </p>

        <H2>The year doesn't tell you</H2>
        <p className="mt-4 text-lg text-slate-700">
          Since 2017, all new cars sold in the EU have had to use a gas like R1234yf.
          <SourceLink index={4} /> Japanese makers changed over one model at a time, so cars of the same age can use different
          gases. These examples come from the manufacturers' own data sheets:
        </p>
        {/* Cards on phones, a table on wider screens. */}
        <ul className="mt-6 space-y-3 sm:hidden">
          {examples.map((e) => (
            <li key={e.car} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-medium">
                {e.car}
                <SourceLink index={e.source} />
              </p>
              <p className="mt-2 text-slate-700">
                <span className="font-semibold">{e.gas}</span> <span className="text-sm text-slate-600">({e.sticker} on the sticker)</span>
              </p>
              <p className="text-sm text-slate-600">Amount: {e.amount || "not listed"}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 sm:block">
          <table className="w-full text-left">
            <caption className="sr-only">Aircon gas used by some common Japanese cars</caption>
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Car
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Aircon gas
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {examples.map((e) => (
                <tr key={e.car}>
                  <th scope="row" className="px-4 py-3 font-medium">
                    {e.car}
                    <SourceLink index={e.source} />
                  </th>
                  <td className="px-4 py-3">
                    <span className="font-semibold">{e.gas}</span>
                    <span className="block whitespace-nowrap text-sm text-slate-600">{e.sticker} on the sticker</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{e.amount || "Not listed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-slate-600">
          So a 3rd-generation Honda Fit uses R134a, while a 4th-generation Fit or a 2nd-generation Aqua uses R1234yf. Hybrids can
          use either gas.
        </p>

        <H2>How to check your car</H2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg text-slate-700">
          <li>
            Look under the bonnet. Many cars have an aircon sticker that names the gas, for example <strong>HFC-134a</strong> (R134a)
            or <strong>HFO-1234yf</strong> (R1234yf), and how much the system holds.
          </li>
          <li>Check your owner's manual or service book.</li>
          <li>
            Or send us your car's make, model and year on WhatsApp, with a photo of the sticker if you can find it, and we'll
            confirm whether we can regas it.
          </li>
        </ol>

        <H2>Hybrid cars</H2>
        <p className="mt-4 text-lg text-slate-700">
          Some hybrids have an electric aircon compressor that needs a special oil.
          <SourceLink index={5} /> Always tell us if your car is a hybrid when you book.
        </p>

        <div className="mt-12 rounded-3xl bg-ice-soft p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight">Need a regas?</h2>
          <p className="mt-3 text-lg text-slate-700">
            We regas cars that use {site.gas}, from {site.regasFrom}, at your home or office in {site.city}. If your car uses R1234yf,
            send us your car's details and we'll tell you what we can do.
          </p>
          <div className="mt-6">
            <CallButtons message="Hi ProRegas, which aircon gas does my car use? It's a " />
          </div>
        </div>

        <h2 className="mt-12 text-lg font-bold">Sources</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm text-slate-600">
          {sources.map((s) => (
            <li key={s.url}>
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
