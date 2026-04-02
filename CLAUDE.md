@AGENTS.md

# Journey Through The Silicon World - Website

Commemorative + educational website for the Unite! Seed Fund project by **KN Solvro** (Wrocław University of Science and Technology) and **BEST Graz** (Technische Universität Graz).

## Project overview

The project "Journey Through The Silicon World" consisted of two student exchange visits:
- **May 2025** - Solvro members visited Graz (ams OSRAM, Silicon Austria Labs, TU Graz labs)
- **October 2025** - BEST Graz students visited Wrocław (XTPL, Balluff, WCSS, PWr Clean Room with NaMi)

The website has two purposes:
1. **Commemorative** - celebrates the exchange project and its outcomes
2. **Educational** - explains how sand becomes a silicon chip (5-step journey)

Funded by the Unite! Seed Fund. Patronage: Prof. dr hab. inż. Renata Krzyżyńska (PWr Vice-Rector for External Relations). Coordinated with PWr Centre for National and International Relations.

## Tech stack

- **Next.js 16** (App Router) - note: uses `proxy.ts` NOT `middleware.ts` (renamed in v16)
- **TypeScript**
- **Tailwind CSS v4** - uses `@import "tailwindcss"` in globals.css (no tailwind.config.ts needed)
- **Framer Motion** - scroll animations (`whileInView`), lightbox transitions
- **next-intl** - EN/PL i18n via `[locale]` dynamic segment

## Design system

| Token | Value |
|---|---|
| Background | `#0B110E` (Rich Black) |
| Dark Green | `#0D2B1E` (card backgrounds) |
| Bangladesh Green | `#0C6B3C` |
| Mountain Meadow | `#1FBB6E` (Wrocław accent) |
| Caribbean Green | `#00E87A` (primary accent, Graz) |
| Anti-Flash White | `#F2F4F3` (text) |

Font: **Space Grotesk** (Google Fonts) - substitute for Airforma from the design mockups.

## File structure

```
app/
  layout.tsx              ← minimal root (just returns children)
  page.tsx                ← redirects / → /en
  globals.css             ← design system CSS vars + Space Grotesk import
  [locale]/
    layout.tsx            ← HTML shell, Space_Grotesk font, NextIntlClientProvider
    page.tsx              ← assembles all section components + generateStaticParams

components/
  ui/
    Navbar.tsx            ← fixed top, transparent→dark on scroll, EN/PL toggle
  sections/
    Hero.tsx              ← full-viewport hero with animated grid + glow
    SiliconJourney.tsx    ← 5-step educational scroll (sand→chip), whileInView
    StatsGrid.tsx         ← bento grid: 90%, 50×, 2040, 1.7M
    TheExchange.tsx       ← SVG Europe map + two visit cards with photos
    PhotoGallery.tsx      ← tab switcher (Graz/Wrocław), grid, lightbox
    Quotes.tsx            ← testimonials (Paweł Kozioł quote)
    AboutOrgs.tsx         ← org cards (Solvro, BEST Graz, Unite!) + partner logos
    Footer.tsx            ← logos row + copyright

i18n/
  routing.ts              ← locales: ['en', 'pl'], defaultLocale: 'en'
  request.ts              ← server-side message loading

messages/
  en.json                 ← full English strings
  pl.json                 ← full Polish strings

proxy.ts                  ← i18n routing middleware (Next.js 16 convention)

public/
  photos/
    graz/                 ← graz-1.jpg … graz-10.jpg, graz-11.jpeg (11 photos)
    wroclaw/              ← wroclaw-1.jpg … wroclaw-8.jpg (8 photos)
  logos/
    solvro.svg / solvro.png
    best-graz.png
    tu-graz.png
    pwr.png
    unite.png
```

## i18n

Routes: `/en` (English) and `/pl` (Polish). Language switcher in Navbar.

Translation keys are organized by section: `nav`, `hero`, `silicon`, `stats`, `exchange`, `gallery`, `quotes`, `about`, `footer`.

Content sources used for translations:
- English: `memory/unite website.txt`, `memory/application.txt`
- Polish: `memory/press pack.txt`, `memory/press pack 0.txt`, `memory/blog.txt.txt`

## Key people & orgs

- **Dawid Linek** - project coordinator (KN Solvro)
- **Yurii Chubenko** - BEST Graz participant
- **Paweł Kozioł** - Solvro project leader (quoted on site)
- **KN Solvro** - 102 active members, PWr Wrocław
- **BEST Graz** - 20 active members, TU Graz

## Assets source

All raw assets (photos, logos, design mockups) are in `../unite-web/memory/` (relative to this project). The design color palette and typography are in `memory/d713edbbad768090961187c5d584974a 1.png`. Design mockups: `memory/MacBook Air.png`, `memory/MacBook Air (1).png`, `memory/MacBook Air2.png`.

## Development

```bash
npm run dev    # starts on localhost:3000
npm run build  # production build (zero warnings/errors)
```

## Notes

- `proxy.ts` is the Next.js 16 equivalent of `middleware.ts` - do NOT create a `middleware.ts` file alongside it
- Photos were renamed from original filenames to `graz-N.jpg` / `wroclaw-N.jpg` for clean URLs
- `.HEIC` photos from Graz were not copied (not web-compatible); only `.jpg`/`.jpeg` were used
- The SVG Europe map in TheExchange is hand-crafted (no map library dependency)
