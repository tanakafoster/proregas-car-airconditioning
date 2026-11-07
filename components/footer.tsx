import { MapPin, Phone } from "lucide-react"
import { Logo, WhatsAppIcon } from "@/components/icons"
import { site, telHref, whatsappHref } from "@/lib/site"

const popular = ["Borrowdale", "Avondale", "Mount Pleasant", "Msasa", "Greendale", "Westgate", "Waterfalls", "Harare CBD"]

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-extrabold text-white">
              Pro<span className="text-ice">Regas</span>
            </span>
          </div>
          <p className="mt-4 text-sm">
            {site.name}. {site.tagline} in {site.city}, {site.country}.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={telHref} className="flex items-center gap-2 hover:text-ice">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ice">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Mobile service, {site.city}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Popular areas</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {popular.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <a href="/#locations" className="mt-3 inline-block text-sm text-white underline underline-offset-4 hover:text-ice">
            All areas
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              {site.gas} regas from {site.regasFrom}
            </li>
            <li>Leak repairs</li>
            <li>Compressor problems</li>
            <li>Electrical and fan faults</li>
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
