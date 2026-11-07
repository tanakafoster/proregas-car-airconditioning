import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

// Share image for WhatsApp, Facebook and other link previews, served as /og.png.
// It is generated at build time from lib/site.ts, so the price and phone number never go stale.
// (A plain route with a .png name, rather than Next's opengraph-image file, so static hosts serve it as an image.)
const size = { width: 1200, height: 630 }
export const dynamic = "force-static"

// Inter Bold for the share image, fetched at build time. Falls back to the default font if the download fails.
async function loadInterBold(): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@800", { signal: AbortSignal.timeout(5000) })
    if (!cssRes.ok) return null
    const url = (await cssRes.text()).match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!url) return null
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
    return res.ok ? await res.arrayBuffer() : null
  } catch {
    return null
  }
}

export async function GET() {
  const bold = await loadInterBold()
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "white",
          backgroundImage: "linear-gradient(135deg, #1e3a8a, #1e40af 60%)",
          // Only set fontFamily when Inter loaded: an undefined style value crashes the renderer.
          ...(bold ? { fontFamily: "Inter" } : {}),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill="#ffffff" />
            <g stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M24 9v30M11 16.5l26 15M37 16.5l-26 15" />
              <path d="M19.5 10.5 24 14l4.5-3.5M19.5 37.5 24 34l4.5 3.5" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 56 }}>
              Pro<span style={{ color: "#bfdbfe" }}>Regas</span>
            </div>
            <div style={{ fontSize: 24, letterSpacing: 6, color: "rgba(255,255,255,0.75)" }}>CAR AIR CONDITIONING</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1 }}>{site.tagline}</div>
          <div style={{ display: "flex", fontSize: 40, color: "rgba(255,255,255,0.85)" }}>
            {site.gas} regas from&nbsp;<span style={{ color: "#ffffff", fontWeight: 700 }}>{site.regasFrom}</span>&nbsp;in {site.city}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 34 }}>
          <div style={{ display: "flex", background: "#ffffff", color: "#1e3a8a", padding: "14px 32px", borderRadius: 999 }}>
            Call or WhatsApp {site.phoneDisplay}
          </div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 28 }}>{site.domain}</div>
        </div>
      </div>
    ),
    { ...size, ...(bold ? { fonts: [{ name: "Inter", data: bold, weight: 800 as const, style: "normal" as const }] } : {}) },
  )
}
