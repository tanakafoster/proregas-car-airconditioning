"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { Menu, Phone, X } from "lucide-react"
import { Logo, WhatsAppIcon } from "@/components/icons"
import { site, telHref, whatsappHref } from "@/lib/site"

// Plain <a> links (not next/link) so the browser's own fragment navigation also moves keyboard focus to the section.
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
  const pathname = usePathname()
  const toggle = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLElement>(null)

  // Close the mobile menu after any page change.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    // Escape closes the mobile menu. Focus goes back to the menu button only if it was in the menu,
    // so pressing Escape elsewhere (e.g. to dismiss form suggestions) doesn't move the visitor.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      const active = document.activeElement
      const inMenu = !!active && (menu.current?.contains(active) || active === toggle.current)
      setOpen(false)
      if (inMenu) toggle.current?.focus()
    }
    // A click anywhere outside the menu (including links to sections on the page) closes it first,
    // so the sticky header is already collapsed when the browser jumps to the section.
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (menu.current?.contains(target) || toggle.current?.contains(target)) return
      flushSync(() => setOpen(false))
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("click", onClick, true)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("click", onClick, true)
    }
  }, [open])

  function onLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    setOpen(false)
    // Leave Ctrl/Cmd/Shift/Alt and non-left clicks to the browser (open in a new tab, etc.).
    if (pathname !== "/" || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    // On the home page the router ignores a link to the current URL, so scroll back to the top ourselves
    // and drop any #section from the address bar.
    e.preventDefault()
    window.scrollTo({ top: 0 })
    if (window.location.hash) window.history.replaceState(window.history.state, "", "/")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={onLogoClick}>
          <Logo />
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight">
              Pro<span className="text-ice">Regas</span>
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-white/70">Car Air Conditioning</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-white/80 transition hover:text-ice">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-bold text-ink transition hover:brightness-95 sm:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
          </a>
          <a
            href={telHref}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sun text-ink sm:hidden"
            aria-label={`Call ${site.phoneDisplay}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            ref={toggle}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          ref={menu}
          id="mobile-menu"
          className="max-h-[calc(100dvh-5.25rem)] overflow-y-auto overscroll-contain border-t border-white/10 px-4 pb-5 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block py-3 text-base text-white/90">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-semibold text-ink"
          >
            <WhatsAppIcon /> WhatsApp us
          </a>
        </nav>
      )}
    </header>
  )
}
