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
        <Phone className="h-5 w-5" /> Call {site.phoneDisplay}
      </a>
      <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-white shadow-lg shadow-whatsapp/20 transition hover:brightness-95">
        <WhatsAppIcon /> WhatsApp us
      </a>
    </div>
  )
}

export function Hero({ place = "Harare", heading }: { place?: string; heading?: React.ReactNode }) {
  return (
    <section className="frost relative overflow-hidden text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/90">
            <Truck className="h-4 w-4 text-ice" /> We come to you, anywhere in {place}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {heading ?? (
              <>
                Mobile Car Air Conditioning <span className="text-ice">Regas &amp; Repairs</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            {site.name} brings professional {site.gas} aircon regassing and repairs to your home, office or roadside in {place}.
            Get ice-cold air again without the trip to a workshop.
          </p>
          <div className="mt-8">
            <CallButtons message={`Hi ProRegas, I'd like to book a car aircon regas in ${place}.`} />
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
            {["Fully mobile service", `${site.gas} gas regassing`, "All car makes & models", "Leak testing before we regas"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ice" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur">
            <Snowflake className="mx-auto h-14 w-14 text-ice" />
            <p className="mt-4 text-sm uppercase tracking-widest text-white/70">{site.gas} car aircon regas</p>
            <p className="mt-2 text-lg text-white/80">from</p>
            <p className="text-7xl font-extrabold text-sun">{site.regasFrom}</p>
            <p className="mt-4 text-sm text-white/70">Price depends on your vehicle and gas capacity. We confirm the price with you before we start.</p>
            <a href="#pricing" className="mt-6 inline-block text-sm font-semibold text-ice hover:underline">
              What's included →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, intro, light }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-ice">{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-white/75" : "text-slate-600"}`}>{intro}</p>}
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle eyebrow="What we do" title="Car aircon regas & repair services" intro="Everything your car's air conditioning needs, done on-site by a mobile technician with the right gauges, gas and tools." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon]
            return (
              <article key={s.title} className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-soft text-navy">
                  <Icon className="h-6 w-6" />
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
  const included = [
    "Mobile callout to your location",
    "System pressure & leak check",
    "Old gas recovery and vacuum",
    `Recharge with ${site.gas} to the correct weight`,
    "Compressor oil & UV dye where needed",
    "Vent temperature test before we leave",
  ]
  return (
    <section id="pricing" className="frost scroll-mt-20 py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-ice">Pricing</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {site.gas} regas starts from <span className="text-sun">{site.regasFrom}</span>
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Most cars on Zimbabwean roads run on {site.gas} refrigerant. Your final price depends on the make and model and how much gas the
            system holds. If we find a leak or faulty part, we'll explain it and quote before doing anything extra.
          </p>
          <div className="mt-8">
            <CallButtons message="Hi ProRegas, how much is a regas for my car?" />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 text-ink shadow-2xl">
          <div className="flex items-end justify-between border-b border-slate-200 pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Standard regas</p>
              <p className="mt-1 text-lg font-bold">{site.gas} gas</p>
            </div>
            <p className="text-right">
              <span className="block text-sm text-slate-500">from</span>
              <span className="text-5xl font-extrabold text-navy">{site.regasFrom}</span>
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {included.map((i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ice" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section className="bg-ice-soft py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle eyebrow="How it works" title="Cold air in four easy steps" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-bold text-white">{i + 1}</span>
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
    <section id="brands" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          eyebrow="Car brands we regas"
          title="We regas all makes and models"
          intro="Japanese, European, Korean, Chinese and American vehicles, from hatchbacks and sedans to SUVs, bakkies, kombis and light trucks."
        />
        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          {brands.map((b) => (
            <li key={b} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-navy">
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-slate-600">
          Don't see your car? We most likely do it too.{" "}
          <a href={whatsappHref("Hi ProRegas, do you regas my car? It's a ")} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline">
            Ask us on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  )
}

export function Locations({ current }: { current?: string }) {
  return (
    <section id="locations" className="scroll-mt-20 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle eyebrow="Service areas" title="Mobile car aircon regas across Harare" intro="We drive to you in all of these suburbs and nearby towns. Not listed? Call us, we probably cover you." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areaGroups.map((g) => (
            <div key={g.region} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <MapPin className="h-5 w-5 text-ice" /> {g.region}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.areas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/harare/${a.slug}`}
                      className={`inline-block rounded-full px-3 py-1 text-sm transition ${
                        current === a.slug ? "bg-navy text-white" : "bg-ice-soft text-navy hover:bg-navy hover:text-white"
                      }`}
                    >
                      {a.name}
                    </Link>
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
    <section id="faq" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionTitle eyebrow="FAQ" title="Car aircon questions" />
        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-2xl text-ice transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact({ defaultArea }: { defaultArea?: string }) {
  return (
    <section id="contact" className="frost scroll-mt-20 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-ice">Book a regas</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Hot car? Let's fix that today.</h2>
          <p className="mt-4 text-lg text-white/75">
            Call or WhatsApp <strong className="text-white">{site.phoneDisplay}</strong> with your car make, model and location, or fill in the
            form and we'll reply on WhatsApp with a quote.
          </p>
          <div className="mt-8">
            <CallButtons />
          </div>
          <dl className="mt-10 space-y-4 text-white/80">
            <div>
              <dt className="text-sm uppercase tracking-widest text-white/50">Phone &amp; WhatsApp</dt>
              <dd className="text-xl font-bold text-white">{site.phoneLocal}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-widest text-white/50">Website</dt>
              <dd className="text-xl font-bold text-white">{site.domain}</dd>
            </div>
          </dl>
        </div>
        <QuoteForm defaultArea={defaultArea} />
      </div>
    </section>
  )
}
