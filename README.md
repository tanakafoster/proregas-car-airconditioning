# ProRegas Car Air Conditioning

Website for **ProRegas Car Air Conditioning**: mobile car air conditioning regas and repairs in Harare, Zimbabwe.

- Domain: [proregascaraircon.co.zw](https://proregascaraircon.co.zw)
- Phone: 0771371600 (the site also links this number to WhatsApp)

Built with Next.js (App Router), React and Tailwind CSS. The build produces plain static files, so the site needs no server.

## What's on the site

| Page | Address |
| --- | --- |
| Home: a short summary of everything below, with Call and WhatsApp buttons and the quote form | `/` |
| Services, and a page for each of the 7 services (signs, common causes, what we do, questions) | `/services/`, `/services/car-aircon-regas/` and so on |
| Pricing: R134a regas from $30, what we need for a quote, repairs | `/pricing/` |
| Areas, and a page for each of the 55 Harare suburbs and nearby towns | `/areas/`, `/areas/borrowdale/` and so on |
| Car brands we regas, grouped by where the make comes from | `/car-brands/` |
| FAQ | `/faq/` |
| Contact, with the quote form | `/contact/` |
| Guide: "Which aircon gas does my car use?" (R134a or R1234yf, with example cars from Honda and Toyota data sheets) | `/which-aircon-gas/` |

The quote form opens WhatsApp with the customer's details filled in. It still opens WhatsApp, with a short message, if the page's JavaScript fails to load. A floating WhatsApp button shows on every page.

The site also has `sitemap.xml` (every page), `robots.txt`, a share image for WhatsApp and Facebook links (`/og.png`, drawn by `app/og.png/route.tsx`), icons, and structured data: AutoRepair on every page, Service on the service and suburb pages, BreadcrumbList on inner pages and FAQPage on `/faq/`.

## Editing content

| What | Where |
| --- | --- |
| Phone, domain, price, gas type, services (names, card text, page addresses), steps, car brands, suburbs, FAQ | `lib/site.ts` |
| Service page text (signs, causes, what we do, questions, sources) | `lib/service-pages.ts` |
| The short description on each suburb's page, with its sources | `lib/area-facts.ts` |
| Home page sections and the parts shared with other pages | `components/sections.tsx` |
| Page banner, breadcrumbs and booking box used on inner pages | `components/page.tsx` |
| Each page's layout | `app/<page>/page.tsx`, e.g. `app/pricing/page.tsx`, `app/services/[slug]/page.tsx`, `app/areas/[slug]/page.tsx` |
| Quote form fields and options | `components/quote-form.tsx` |
| Gas guide page (text, example cars and sources) | `app/which-aircon-gas/page.tsx` |
| Footer | `components/footer.tsx` |
| Header menu | `components/header.tsx` |
| "Page not found" page | `app/not-found.tsx` |
| Search and share titles and descriptions | `lib/metadata.ts` (home page), and the top of each page's file |
| Pages listed in `sitemap.xml` (add any new page here) | `app/sitemap.ts` |
| Share image layout (its text comes from `lib/site.ts`) | `app/og.png/route.tsx` |
| Logo and icons | `components/icons.tsx`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` |

Adding a suburb to `lib/site.ts` adds its page, its link on the Areas and home pages and its sitemap entry. The same goes for a service, which also needs its text in `lib/service-pages.ts`.

The price is set once, as `regasFromUsd` in `lib/site.ts`. Every price on the site, the share image and the structured data use it.

Before launch, the owner should confirm that 0771371600 is on WhatsApp (every WhatsApp button and the quote form use it), and check the car brand list, the evaporator, fan and check-up services (the owner asked for the others on 2026-11-08), the suburb list and the FAQ answers, which are draft copy.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the finished site to out/
```

To preview the built site, run `npm start`, which serves the `out/` folder at http://localhost:3000.

## Deploy

The site is currently deployed on Vercel at https://proregas-car-airconditioning.vercel.app, which rebuilds it every time `main` changes.

`npm run build` creates an `out/` folder of plain HTML, CSS, JS and images. You can host it anywhere:

- **Any web host with cPanel or FTP** (common for `.co.zw` domains): upload the contents of `out/` to `public_html`, including its folders (each page is a folder with its own `index.html`, such as `which-aircon-gas/index.html`) and the hidden `.htaccess` file, which makes the host show the site's own "Page not found" page. cPanel's File Manager hides files starting with a dot unless you turn on "Show Hidden Files" in its settings. Set up the `www` redirect in cPanel under Domains → Redirects.
- **Netlify or Cloudflare Pages**: connect this repository, set the build command to `npm run build` and the output folder to `out`.
- **Vercel**: import the repository and keep the default Next.js settings. Vercel's free Hobby plan is for non-commercial use only, so a business website needs a Pro plan.

Whichever host you use, make `proregascaraircon.co.zw` (without `www`) the main domain and redirect `www` to it. If you would rather use `www.proregascaraircon.co.zw` as the main domain, change `url` in `lib/site.ts` to match. The canonical links, sitemap and share links are all built from that value.
