# Journey Through The Silicon World

Commemorative and educational website for the **Unite! Seed Fund** project by [KN Solvro](https://solvro.pwr.edu.pl) (Wrocław University of Science and Technology) and [BEST Graz](https://www.bestgraz.org) (Technische Universität Graz).

## About the project

"Journey Through The Silicon World" consisted of two student exchange visits:

- **May 2025** — Solvro members visited Graz: ams OSRAM, Silicon Austria Labs, TU Graz labs
- **October 2025** — BEST Graz students visited Wrocław: XTPL, Balluff, WCSS, PWr Clean Room with NaMi

The website has two purposes:
1. **Commemorative** — celebrates the exchange project and its participants
2. **Educational** — explains how sand becomes a silicon chip (5-step journey)

Funded by the **Unite! Seed Fund**. Under the patronage of Prof. dr hab. inż. Renata Krzyżyńska (PWr Vice-Rector for External Relations), coordinated with the PWr Centre for National and International Relations.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) — scroll animations, lightbox transitions
- [next-intl](https://next-intl-docs.vercel.app) — EN/PL i18n

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` by default.

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project structure

```
app/
  [locale]/         # EN/PL routes
    layout.tsx
    page.tsx
  globals.css       # design system CSS vars + Space Grotesk
  layout.tsx
  page.tsx          # redirects / → /en

components/
  ui/
    Navbar.tsx      # fixed top, transparent→dark on scroll, language toggle
  sections/
    Hero.tsx
    SiliconJourney.tsx
    StatsGrid.tsx
    TheExchange.tsx
    PhotoGallery.tsx
    Quotes.tsx
    AboutOrgs.tsx
    Footer.tsx

i18n/               # next-intl routing config
messages/           # en.json, pl.json
proxy.ts            # i18n middleware (Next.js 16 equivalent of middleware.ts)
public/
  photos/           # graz/, wroclaw/
  logos/
```

## i18n

Available at `/en` (English) and `/pl` (Polish). Language switcher in the navbar.

## Organizations

| Organization | University |
|---|---|
| [KN Solvro](https://solvro.pwr.edu.pl) | Wrocław University of Science and Technology |
| [BEST Graz](https://www.bestgraz.org) | Technische Universität Graz |
