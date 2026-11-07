import Link from "next/link"
import { CheckCircle2, Cog, Gauge, Layers, MapPin, Phone, Search, Snowflake, Truck, Zap } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons"
import { QuoteForm } from "@/components/quote-form"
import { areaGroups, brands, faqs, services, site, steps, telHref, whatsappHref } from "@/lib/site"

const icons = { snowflake: Snowflake, search: Search, cog: Cog, layers: Layers, zap: Zap, gauge: Gauge }

export function CallButtons({ message }: { message?: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={telHref} className="flex items-center justify-center gap-2 rounded-full bg-sun px-7 py-3.5 font-bold text-ink shadow-lg shadow-sun/20 transition hover:brightness-95">
        <Phone className="h-5 w-5" aria-hidden="true" /> Call {site.phoneDisplay}
      </a>
      <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-ink shadow-lg shadow-whatsapp/20 transition hover:brightness-95">
        <WhatsAppIcon /> WhatsApp us
      </a>
    </div>
  )
}

export function Hero() {
  return (
    <section className="frost relative overflow-hidden text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/90">
            <Truck className="h-4 w-4 text-ice" aria-hidden="true" /> We come to you in {site.city}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Mobile Car Air Conditioning <span className="text-ice">Regas &amp; Repairs</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            {site.name} brings {site.gas} aircon regassing and repairs to your home, office or wherever your car is parked in {site.city}.
            No need to bring your car to us: we come to you.
          </p>
          <div className="mt-8">
            <CallButtons />
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
            {["Mobile: we come to you", `${site.gas} gas regassing`, `Regas from ${site.regasFrom}`, "Aircon repairs"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ice" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur">
            <Snowflake className="mx-auto h-14 w-14 text-ice" aria-hidden="true" />
            <p className="mt-4 text-sm uppercase tracking-widest text-white/80">{site.gas} car aircon regas</p>
            <p className="mt-2 text-lg text-white/80">from</p>
            <p className="text-7xl font-extrabold text-sun">{site.regasFrom}</p>
            <p className="mt-4 text-sm text-white/80">Send us your car's make, model, year and location for a quote.</p>
            <a href="#pricing" className="mt-6 inline-block text-sm font-semibold text-white underline underline-offset-4 hover:text-sun">
              See pricing →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-ice-deep">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-slate-600">{intro}</p>}
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle eyebrow="What we do" title="Car aircon regas & repair services" intro="Car aircon regas and repairs at your home, office or wherever your car is parked." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon]
            return (
              <article key={s.title} className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-soft text-navy">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.description}</p>
                {"from" in s && <p className="mt-4 inline-block rounded-full bg-sun px-3 py-1 text-sm font-bold">{s.from}</p>}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="frost py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-ice">Pricing</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {site.gas} regas starts from <span className="text-sun">{site.regasFrom}</span>
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Call or WhatsApp us with your car's make, model, year and location for a quote.
          </p>
          <div className="mt-8">
            <CallButtons message="Hi ProRegas, how much is a regas for my car? It's a " />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 text-ink shadow-2xl">
          <div className="flex items-end justify-between border-b border-slate-200 pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-600">Car aircon regas</p>
              <p className="mt-1 text-lg font-bold">{site.gas} gas</p>
            </div>
            <p className="text-right">
              <span className="block text-sm text-slate-600">from</span>
              <span className="text-5xl font-extrabold text-navy">{site.regasFrom}</span>
            </p>
          </div>
          <p className="mt-6 text-slate-600">Send us your car's make, model, year and location and we'll give you a price.</p>
          <p className="mt-4 font-semibold">
            Call or WhatsApp{" "}
            <a href={telHref} className="text-navy underline underline-offset-4">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section className="bg-ice-soft py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle eyebrow="How it works" title="Book in three easy steps" />
        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-bold text-white" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Brands() {
  return (
    <section id="brands" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle eyebrow="Car brands" title="Car brands we regas" intro="We regas cars from all of these brands." />
        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          {brands.map((b) => (
            <li key={b} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-navy">
              {b}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-slate-600">
          We regas with {site.gas}. Some newer cars use a different gas called R1234yf.{" "}
          <Link href="/which-aircon-gas" className="font-semibold text-navy underline">
            Which gas does my car use?
          </Link>{" "}
          Don't see your brand?{" "}
          <a href={whatsappHref("Hi ProRegas, do you regas my car? It's a ")} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline">
            Ask us on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  )
}

export function Locations() {
  return (
    <section id="locations" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          eyebrow="Service areas"
          title={`Mobile car aircon regas across ${site.city}`}
          intro={`We come to you in these ${site.city} suburbs and nearby areas. Not listed? Call us to check.`}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areaGroups.map((g) => (
            <div key={g.region} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <MapPin className="h-5 w-5 text-ice-deep" aria-hidden="true" /> {g.region}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.areas.map((a) => (
                  <li key={a.name} className="rounded-full bg-ice-soft px-3 py-1 text-sm text-navy">
                    {a.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionTitle eyebrow="FAQ" title="Car aircon questions" />
        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span aria-hidden="true" className="text-2xl text-ice-deep transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-slate-600">
          Not sure which gas your car uses?{" "}
          <Link href="/which-aircon-gas" className="font-semibold text-navy underline">
            Read our aircon gas guide
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="frost py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-ice">Book a regas</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Hot car? Let's get it fixed.</h2>
          <p className="mt-4 text-lg text-white/80">
            Call or WhatsApp <strong className="text-white">{site.phoneDisplay}</strong> with your car's make, model and location, or fill in the
            form and send it to us on WhatsApp.
          </p>
          <div className="mt-8">
            <CallButtons />
          </div>
          <dl className="mt-10 space-y-4 text-white/80">
            <div>
              <dt className="text-sm uppercase tracking-widest text-white/70">Phone &amp; WhatsApp</dt>
              <dd className="text-xl font-bold text-white">
                <a href={telHref} className="hover:text-sun">
                  {site.phoneLocal}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-widest text-white/70">Website</dt>
              <dd className="text-xl font-bold text-white">{site.domain}</dd>
            </div>
          </dl>
        </div>
        <QuoteForm />
      </div>
    </section>
  )
}
