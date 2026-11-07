"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { Logo, WhatsAppIcon } from "@/components/icons"
import { site, telHref, whatsappHref } from "@/lib/site"

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#brands", label: "Car Brands" },
  { href: "/#locations", label: "Harare Locations" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight">
              Pro<span className="text-ice">Regas</span>
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-white/60">Car Air Conditioning</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-white/80 transition hover:text-ice">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-bold text-ink transition hover:brightness-95 sm:flex"
          >
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </a>
          <a
            href={telHref}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sun text-ink sm:hidden"
            aria-label={`Call ${site.phoneDisplay}`}
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-5 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block py-3 text-base text-white/90">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-semibold text-white"
          >
            <WhatsAppIcon /> WhatsApp us
          </a>
        </nav>
      )}
    </header>
  )
}
