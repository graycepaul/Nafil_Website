# Nafil Estates — Website

Marketing site for Nafil Estates: landing page, About, Support/Contact, Privacy Policy, and
Terms & Conditions. Built with Next.js (App Router) and Tailwind CSS to satisfy Apple App
Store submission requirements (privacy policy URL, support URL) alongside the mobile app in
`../Nafil Mobile`.

## Pages

- `/` — landing page
- `/about` — About Us
- `/contact` — Support / Contact Us (includes account deletion instructions)
- `/privacy` — Privacy Policy
- `/terms` — Terms & Conditions

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Theme

Brand palette mirrors `Nafil Mobile/constants/colors.ts` (`airForceBlue`, primary
`#084DA5`), defined in `app/globals.css` under `@theme inline` as `--color-brand-*`
(Tailwind v4 CSS-based config, no `tailwind.config.js`).

## Deploy

Static/SSR Next.js app — deploys as-is to Vercel, or `npm run build && npm run start`
anywhere else that runs Node.
