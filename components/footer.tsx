import { MapPin, Phone } from "lucide-react"
import { Logo, WhatsAppIcon } from "@/components/icons"
import { popularAreas, services, site, telHref, whatsappHref } from "@/lib/site"

const pages = [
  { href: "/pricing/", label: "Pricing" },
  { href: "/car-brands/", label: "Car brands we regas" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
]

// Plain <a> links: the footer stays on screen between pages, so with next/link keyboard focus would be left at the bottom.
const linkClass = "hover:text-ice hover:underline underline-offset-4"

function Heading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-sm font-semibold uppercase tracking-widest text-white ${className}`}>{children}</h2>
}

export function Footer() {
  return (
    <footer className="bg-royal-dark text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-extrabold text-white">
              Pro<span className="text-ice">Regas</span>
            </span>
          </div>
          <p className="mt-4 text-sm">
            {site.name}. {site.tagline} in {site.city}, {site.country}.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={telHref} className={`flex items-center gap-2 ${linkClass}`}>
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${linkClass}`}>
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Mobile service, {site.city}
            </li>
          </ul>
        </div>

        <div>
          <Heading>Services</Heading>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`/services/${s.slug}/`} className={linkClass}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading>Popular areas</Heading>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {popularAreas.map((a) => (
              <li key={a.slug}>
                <a href={`/areas/${a.slug}/`} className={linkClass}>
                  {a.name}
                </a>
              </li>
            ))}
          </ul>
          <a href="/areas/" className="mt-3 inline-block text-sm text-white underline underline-offset-4 hover:text-ice">
            All areas
          </a>
        </div>

        <div>
          <Heading>More</Heading>
          <ul className="mt-4 space-y-2 text-sm">
            {pages.map((p) => (
              <li key={p.href}>
                <a href={p.href} className={linkClass}>
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
          <Heading className="mt-8">Guides</Heading>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="/which-aircon-gas/" className="text-white underline underline-offset-4 hover:text-ice">
                Which aircon gas does my car use?
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Extra bottom padding on phones keeps this line clear of the floating WhatsApp button. */}
      <div className="border-t border-white/10 px-4 pt-6 pb-24 text-center text-xs text-white/70 sm:pb-6">
        © {site.name} · {site.domain}
      </div>
    </footer>
  )
}
