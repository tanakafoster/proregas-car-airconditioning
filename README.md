# ProRegas Car Air Conditioning

Website for **ProRegas Car Air Conditioning**: mobile car air conditioning regas and repairs in Harare, Zimbabwe.

- Domain: [proregascaraircon.co.zw](https://proregascaraircon.co.zw)
- Phone: 0771371600 (the site also links this number to WhatsApp)

Built with Next.js (App Router), React and Tailwind CSS. The build produces plain static files, so the site needs no server.

## What's on the site

A single page with:

- a hero with the tagline, Call and WhatsApp buttons, and the R134a regas starting price
- services, pricing, how it works, the car brands we regas, Harare service areas and an FAQ
- a quote form that opens WhatsApp with the customer's details filled in. It still opens WhatsApp, with a short message, if the page's JavaScript fails to load.
- a floating WhatsApp button

It also has `sitemap.xml`, `robots.txt`, a share image for WhatsApp and Facebook links (`/og.png`, drawn by `app/og.png/route.tsx`), icons, and AutoRepair and FAQ structured data.

## Editing content

| What | Where |
| --- | --- |
| Phone, domain, price, gas type, services, steps, car brands, suburbs, FAQ | `lib/site.ts` |
| Section headings and intros, hero and pricing text, contact text | `components/sections.tsx` |
| Quote form fields and options | `components/quote-form.tsx` |
| Footer | `components/footer.tsx` |
| Header menu | `components/header.tsx` |
| "Page not found" page | `app/not-found.tsx` |
| Search and share titles and descriptions | `lib/metadata.ts` |
| Share image layout (its text comes from `lib/site.ts`) | `app/og.png/route.tsx` |
| Logo and icons | `components/icons.tsx`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` |

The price is set once, as `regasFromUsd` in `lib/site.ts`. Every price on the site, the share image and the structured data use it.

Before launch, the owner should confirm that 0771371600 is on WhatsApp (every WhatsApp button and the quote form use it), and check the car brand list, the services, the suburb list and the FAQ answers, which are draft copy.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the finished site to out/
```

To preview the built site, run `npm start`, which serves the `out/` folder at http://localhost:3000.

## Deploy

`npm run build` creates an `out/` folder of plain HTML, CSS, JS and images. You can host it anywhere:

- **Any web host with cPanel or FTP** (common for `.co.zw` domains): upload the contents of `out/` to `public_html`, including the hidden `.htaccess` file, which makes the host show the site's own "Page not found" page. cPanel's File Manager hides files starting with a dot unless you turn on "Show Hidden Files" in its settings. Set up the `www` redirect in cPanel under Domains → Redirects.
- **Netlify or Cloudflare Pages**: connect this repository, set the build command to `npm run build` and the output folder to `out`.
- **Vercel**: import the repository and keep the default Next.js settings. Vercel's free Hobby plan is for non-commercial use only, so a business website needs a Pro plan.

Whichever host you use, make `proregascaraircon.co.zw` (without `www`) the main domain and redirect `www` to it. If you would rather use `www.proregascaraircon.co.zw` as the main domain, change `url` in `lib/site.ts` to match. The canonical links, sitemap and share links are all built from that value.
