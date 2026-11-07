"use client"

import { useState } from "react"
import { WhatsAppIcon } from "@/components/icons"
import { areas, brands, whatsappHref } from "@/lib/site"

const issues = ["Aircon regas", "Not blowing cold", "Leak / gas keeps running out", "Compressor noise", "Fan or electrical fault", "Full aircon service", "Other"]

export function QuoteForm({ defaultArea = "" }: { defaultArea?: string }) {
  const [form, setForm] = useState({ name: "", car: "", model: "", area: defaultArea, issue: issues[0], notes: "" })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const lines = [
      "Hi ProRegas, I'd like a quote.",
      form.name && `Name: ${form.name}`,
      `Car: ${[form.car, form.model].filter(Boolean).join(" ") || "-"}`,
      `Location: ${form.area || "-"}`,
      `Issue: ${form.issue}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean)
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer")
  }

  const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-ice focus:ring-2 focus:ring-ice/30"

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-6 text-ink shadow-xl sm:grid-cols-2">
      <label className="text-sm font-medium">
        Your name
        <input className={field} value={form.name} onChange={set("name")} autoComplete="name" />
      </label>
      <label className="text-sm font-medium">
        Location
        <input className={field} value={form.area} onChange={set("area")} list="areas" placeholder="e.g. Avondale" required />
        <datalist id="areas">
          {areas.map((a) => <option key={a.slug} value={a.name} />)}
        </datalist>
      </label>
      <label className="text-sm font-medium">
        Car make
        <input className={field} value={form.car} onChange={set("car")} list="brands" placeholder="e.g. Toyota" required />
        <datalist id="brands">
          {brands.map((b) => <option key={b} value={b} />)}
        </datalist>
      </label>
      <label className="text-sm font-medium">
        Model &amp; year
        <input className={field} value={form.model} onChange={set("model")} placeholder="e.g. Fortuner 2016" />
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        What do you need?
        <select className={field} value={form.issue} onChange={set("issue")}>
          {issues.map((i) => <option key={i}>{i}</option>)}
        </select>
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Anything else?
        <textarea className={field} rows={3} value={form.notes} onChange={set("notes")} placeholder="When would suit you?" />
      </label>
      <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 font-bold text-white transition hover:brightness-95 sm:col-span-2">
        <WhatsAppIcon /> Send quote request on WhatsApp
      </button>
    </form>
  )
}
