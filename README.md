# Kaevor AI Solutions — portfolio site

Next.js (App Router) implementation of the approved Claude Design export in
[design-portfolio/](design-portfolio/). Every token, size, easing curve and scroll behaviour is
ported from `WEWA Portfolio Site.dc.html` and `DESIGN.md`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- CSS Modules + a global token layer — no utility framework, so the values in the CSS are the
  literal values in the design rather than a nearest-step approximation
- `next/font/google` for Space Grotesk, Inter and JetBrains Mono (self-hosted at build time)
- Zero animation dependencies: GSAP/Framer Motion behaviours are reproduced with a single
  rAF-throttled scroll driver and IntersectionObserver

## Structure

| Path | What it is |
|---|---|
| [app/layout.tsx](app/layout.tsx) | Fonts, metadata, scroll progress bar, fixed nav |
| [app/page.tsx](app/page.tsx) | Home — hero → built-for strip → work → process → team → services → contact → footer |
| [app/work/election-calculator/page.tsx](app/work/election-calculator/page.tsx) | Case study screen |
| [app/globals.css](app/globals.css) | Design tokens, base, shared type/CTA classes, responsive scale |
| [lib/scrollDriver.ts](lib/scrollDriver.ts) | One capture-phase, rAF-throttled scroll/resize loop shared by every scroll-linked element |
| [lib/hooks.ts](lib/hooks.ts) | `useReveal`, `useMagnetic`, `useMediaQuery` |
| [lib/content.ts](lib/content.ts) | Project, process and capability copy |

## Design system

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#0A0B0D` | Page background |
| `--bg-secondary` | `#121417` | Section alternation, cards |
| `--text-primary` | `#F2F3F5` | Body and headings |
| `--text-muted` | `#8A8F98` | Secondary text, meta |
| `--accent` | `#3ED0C4` | CTAs, links, highlights |
| `--accent-secondary` | `#E8B85C` | Sparing warm accent |
| `--border` | `#22262B` | Dividers, card borders |

Type: Space Grotesk 500 for display (88px hero / 40px headings / 44px & 28px mobile), Inter 400
for body (17px / 16px mobile), JetBrains Mono for labels (uppercase, +0.08–0.14em tracking).
Container 1280px, 48px gutter (32px tablet, 20px phone), 8px base unit.

## Motion, as specified

| Interaction | Implementation |
|---|---|
| Hero particle field | Canvas 2D field of ~1–2k points scattered at rest, easing (`easeInOutCubic`) into concentric elliptical rings as the hero scrolls out. 5.5% of points use the warm accent; ring guides fade in past 30% progress. Density drops to 0.42× under 768px. |
| Hero content | Parallax `translateY(p × 72px)` with `opacity 1 − p × 1.55` |
| Selected work | 380vh runway, sticky 100vh pane, track scrubbed horizontally by pin progress; counter and 140px progress rule follow the same value |
| Card hover | Mouse-position tilt capped at 3.4°/3° + 6px lift, scrim fades off, border goes accent |
| Magnetic CTAs | Primary buttons only (hero + contact submit), 0.22×/0.3× pull |
| Process | Connector rule draws in on scrub; nodes light up past `(i + 0.1) / n` |
| Team / services cards | 4px lift + accent ring, no tilt — calmer than the work cards by design |
| Section entrance | 26px rise + fade, 800ms `cubic-bezier(.22,1,.36,1)`, 70ms stagger in groups of four |
| Scroll progress | 2px accent bar, top of viewport |
| Reduced motion | Particles settle without shimmer, tilt and magnetism disabled, reveals resolve immediately, smooth scroll off |

## Responsive

The design export shipped three screens — desktop home, desktop case study, and a 393×852 phone
frame. The phone frame's spec drives the `≤767px` layer (hero drops to a 620px left-aligned band,
work becomes a stacked 4:3 reveal, gutters go to 20px). A `768–1023px` layer sits between them:
the work section leaves the pinned horizontal pattern below 1024px, per DESIGN.md — horizontal
scroll-jacking is a poor mobile pattern.

## Notes on the port

Three places where the design export needed a decision rather than a transcription:

1. **Case study links.** In the export, every project card opened the same case screen — only
   Election Calculator was designed. All four cards link to `/work/election-calculator`; add
   siblings under `app/work/` and update `CASE_HREF` in
   [components/SelectedWork.tsx](components/SelectedWork.tsx) as those cases are written.
2. **Contact form.** The export's submit handler only called `preventDefault()`. It now shows a
   confirmation line; wire [components/Contact.tsx](components/Contact.tsx) to a real endpoint.
3. **Mobile menu + link hovers.** The phone frame drew a burger but no open state, and inline
   styles in the export meant footer links had no hover. Both are filled in with existing tokens.

The export's single "Team & capabilities" grid has since been split into a **Team** section
(founders, role and profile link) and an **Our services** section (six practices) — see
[components/Team.tsx](components/Team.tsx) and [components/Services.tsx](components/Services.tsx).
The founder LinkedIn URLs in [lib/content.ts](lib/content.ts) are `#` placeholders.

The screen-switcher pill and iOS device frame in the export are Claude Design tooling, not site
chrome — they are intentionally absent.
