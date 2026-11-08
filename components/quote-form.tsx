"use client"

import { useRef, useState } from "react"
import { Phone } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons"
import { areas, brands, defaultWhatsappMessage, site, telHref, whatsappNumber } from "@/lib/site"

const issues = ["Aircon regas", "Not blowing cold", "Gas keeps running out", "Noise from the aircon", "Fan or electrical fault", "Cabin filter check", "Compressor or condenser replacement", "Other"]

// defaultArea and defaultMake fill in the Location and Car make fields, e.g. on a suburb's or a car brand's page.
export function QuoteForm({ defaultArea = "", defaultMake = "" }: { defaultArea?: string; defaultMake?: string }) {
  const [form, setForm] = useState({ name: "", car: defaultMake, model: "", area: defaultArea, issue: issues[0], notes: "" })
  const message = useRef<HTMLInputElement>(null)
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  // The form submits natively to wa.me in a new tab, so it still opens WhatsApp if the page's JavaScript fails.
  // With JavaScript, the hidden "text" field is filled with the customer's details just before the browser submits.
  function fillMessage() {
    const lines = [
      "Hi ProRegas, I'd like a quote.",
      form.name && `Name: ${form.name}`,
      `Car: ${[form.car, form.model].filter(Boolean).join(" ") || "-"}`,
      `Location: ${form.area || "-"}`,
      `Issue: ${form.issue}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean)
    if (message.current) message.current.value = lines.join("\n")
  }

  const field =
    "mt-1 w-full rounded-lg border border-slate-500 bg-white px-3 py-2.5 text-base text-ink placeholder:text-slate-500 focus:outline-2 focus:outline-offset-2 focus:outline-navy"
  const required = <span className="font-normal text-slate-600"> (required)</span>

  return (
    <form
      action={`https://wa.me/${whatsappNumber}`}
      method="get"
      target="_blank"
      rel="noopener noreferrer"
      onSubmit={fillMessage}
      className="grid gap-4 rounded-2xl bg-white p-6 text-ink shadow-xl sm:grid-cols-2"
    >
      <input ref={message} type="hidden" name="text" defaultValue={defaultWhatsappMessage} />
      <label className="text-sm font-medium">
        Your name
        <input className={field} value={form.name} onChange={set("name")} autoComplete="name" />
      </label>
      <label className="text-sm font-medium">
        Location{required}
        <input className={field} value={form.area} onChange={set("area")} list="area-options" placeholder="e.g. Avondale" required />
        <datalist id="area-options">
          {areas.map((a) => (
            <option key={a.name} value={a.name} />
          ))}
        </datalist>
      </label>
      <label className="text-sm font-medium">
        Car make{required}
        <input className={field} value={form.car} onChange={set("car")} list="brand-options" placeholder="e.g. Toyota" required />
        <datalist id="brand-options">
          {brands.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
      </label>
      <label className="text-sm font-medium">
        Model &amp; year
        <input className={field} value={form.model} onChange={set("model")} placeholder="e.g. Fortuner 2016" />
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        What do you need?
        <select className={field} value={form.issue} onChange={set("issue")}>
          {issues.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Anything else?
        <textarea className={field} rows={3} value={form.notes} onChange={set("notes")} placeholder="When would suit you?" />
      </label>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-ink transition hover:brightness-95 sm:col-span-2"
      >
        <WhatsAppIcon /> Send quote request on WhatsApp
      </button>
      <p className="text-center text-sm text-slate-600 sm:col-span-2">
        Prefer to call?{" "}
        <a href={telHref} className="inline-flex items-center gap-1 font-semibold text-navy underline">
          <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
        </a>
      </p>
    </form>
  )
}
