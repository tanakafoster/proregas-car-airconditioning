# ProRegas Car Air Conditioning

Website for **ProRegas Car Air Conditioning**, mobile car air conditioning regas & repairs in Harare, Zimbabwe.

- Domain: [proregascaraircon.co.zw](https://proregascaraircon.co.zw)
- Phone / WhatsApp: 0771371600

Built with Next.js (App Router), React and Tailwind CSS. Every page is statically generated.

## What's on the site

- Home page: hero, services, R134a regas pricing (from $30), how it works, car brands, Harare service areas, FAQ and a quote form
- One landing page per Harare suburb at `/harare/<suburb>` (for local search)
- Call (`tel:`) and WhatsApp (`wa.me`) buttons throughout, plus a floating WhatsApp button
- The quote form opens WhatsApp with the customer's details pre-filled, so no backend or email setup is needed
- `sitemap.xml`, `robots.txt` and LocalBusiness / FAQ structured data

## Editing content

Almost all text lives in [`lib/site.ts`](lib/site.ts): phone number, price, services, car brands, suburbs and FAQs. Change it there and every page updates.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy

The easiest option is [Vercel](https://vercel.com): import this repository, keep the default Next.js settings, then add `proregascaraircon.co.zw` under Project → Domains and point the domain's DNS records at Vercel as instructed.
