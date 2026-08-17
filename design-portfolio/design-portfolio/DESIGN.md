# Company Portfolio Site — Design System

> This file is the source of truth between Claude Design (high-fidelity exploration) and Claude Code (implementation). Update this file after each Claude Design iteration is approved, then hand the updated version to Claude Code.

## 1. Design Direction — v1 proposal

- **Tone**: Precise, technical-confident, engineering-first — minimal chrome, no startup-generic gradients-and-emoji. Should read as "built by people who ship hard systems," not "designed by a template."
- **Reference points**: Awwwards-tier agency sites (Locomotive, Resn, Active Theory) for motion craft; Linear/Vercel for restrained UI precision. Aim for their production quality, not their exact look.
- **Differentiator**: One signature motion moment tied to identity — a subtle "flow" motif (particles/lines settling from motion into structure, echoing the WEWA water-heritage thesis) used sparingly, likely in the hero only. Everything else stays restrained so that moment lands. Avoid decorative motion elsewhere — the site should feel engineered, not decorated.

> Bring this into Claude Design as the brief. Revise this section after the first high-fidelity pass if the direction shifts.

## 2. Typography

| Role | Font | Weight | Size (desktop / mobile) |
|---|---|---|---|
| Display / Hero | Space Grotesk | 500–600 | 88px / 44px |
| Headings | Space Grotesk | 500 | 40px / 28px |
| Body | Inter | 400 | 17px / 16px |
| Mono/Label (tags, meta) | JetBrains Mono | 400–500 | 13px / 12px, uppercase, tracked +0.05em |

- Type scale ratio: 1.333 (perfect fourth) — enough contrast for a bold hero without fragmenting the hierarchy
- Line height: headings 1.05–1.1 (tight, display-style) / body 1.6 (readable at technical-content length)
- Rationale: Space Grotesk gives geometric, engineered character for display type without feeling like a generic SaaS sans (Inter/Poppins everywhere). Inter for body keeps long-form case study text readable. Mono label for tags/meta reinforces the technical-precision tone.

## 3. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#0A0B0D` | Main background (near-black, not pure black — softer on OLED and easier to layer motion on) |
| `--bg-secondary` | `#121417` | Section alternation, card backgrounds |
| `--text-primary` | `#F2F3F5` | Body/heading text |
| `--text-muted` | `#8A8F98` | Secondary text, meta labels |
| `--accent` | `#3ED0C4` | CTAs, links, highlights — teal, ties to WEWA water identity without going literal-blue/corporate |
| `--accent-secondary` | `#E8B85C` | Optional warm accent for sparing use (badges, hover states) — resolves your earlier cyan-vs-amber decision by using teal as primary, amber as accent rather than choosing one exclusively |
| `--border` | `#22262B` | Dividers, card borders |

- Dark mode: **dark-first, no light mode planned for v1**. A dark, near-black base suits the "engineered precision + water/motion" direction better than a light theme, and halves the design/QA surface area for launch. Revisit light mode post-launch if needed.

## 4. Spacing & Grid

- Base unit: 8px
- Container max-width: 1280px (content), full-bleed allowed for hero/project imagery
- Section vertical rhythm: 128px desktop / 72px mobile between sections
- Grid: 12-col desktop (24px gutter), 4-col mobile (16px gutter)
- Breakpoints: sm 640px / md 768px / lg 1024px / xl 1280px / 2xl 1536px (Tailwind defaults — no need to customize)

## 5. Motion Principles

| Interaction | Behavior |
|---|---|
| Section entrance | Scrub-linked to scroll position, not fixed-duration fade |
| Hero background | GPGPU particle field (WEWA motif) — particles settle from scattered motion into a structured formation as the user scrolls past the hero, echoing "order from chaos." Same technique family as the portfolio-3d hero, adapted/simplified for a company site (lighter particle count, no monsoon/reservoir narrative — just the settle motion) |
| Project card hover | Image reveal + subtle tilt (2-4° max, mouse-position-driven). Skip full magnetic-pull on cards — reserve magnetic cursor for CTA buttons only, so it reads as an intentional signal, not decoration everywhere |
| Page transition | Framer Motion `AnimatePresence`, fade + 8px vertical shift (understated — a wipe would compete with the hero's signature moment) |
| Scroll progress indicator | Thin 2px bar, top of viewport, accent-teal color |
| Reduced motion fallback | All scrub animations become simple fade-in on view; hero particle field replaced with a static gradient-mesh frame |

- Easing: `power3.out` for GSAP entrances, `power2.inOut` for pinned/scrub sections; Framer Motion uses `[0.22, 1, 0.36, 1]` (custom ease-out-expo-ish) for consistency with GSAP's feel
- Duration ranges: micro-interactions 150-250ms / section reveals 700-900ms / hero particle settle 2-3s (one-time, tied to scroll not autoplay)

## 6. Section-by-Section Spec

### Hero
- Layout: Centered headline over full-bleed particle background, left-aligned on mobile for readability
- Background treatment: GPGPU particle field (see Motion Principles) — starts scattered, settles into structured pattern as user scrolls
- Copy hierarchy: eyebrow label (mono, accent color) → headline (Space Grotesk, 88px) → subhead (Inter, 20px, text-muted) → single primary CTA button

### Featured Projects
- Layout: Horizontal pinned scroll (GSAP ScrollTrigger pin + horizontal translate) for 3-4 featured cases, desktop only — falls back to vertical stacked cards on mobile/tablet (horizontal scroll-jacking is a poor mobile pattern)
- Card anatomy: image (16:9), mono-label tags (domain/tech), title, one-line outcome in accent color
- Scroll behavior: pin + scrub on desktop; simple fade/slide-up reveal on mobile

### Process
- Layout: Vertical numbered steps with a connecting line that draws in via ScrollTrigger scrub as the user scrolls (line-draw = one small "flow" echo without repeating the hero's full particle treatment)

### Team / Capabilities
- Layout: Grid (3-col desktop / 1-col mobile), capability-focused (not headshot-heavy since it's a company page, not a "meet the team" page) — pair each capability with a short technical proof point
- Hover behavior: Border color shifts to accent, subtle 4px lift — no tilt/magnetic here, keep it calm relative to the Projects section

### CTA / Contact
- Layout: Full-viewport closing section, centered, minimal form (name, email, message) — no sticky bar (feels salesy for a technical-buyer audience)

## 7. Handoff Notes for Claude Code

- Once Claude Design output is approved, replace every `TBD` above with final values.
- Export/describe exact hex codes, font names + weights, and spacing values — Claude Code should not guess these.
- Include annotated screenshots or Figma-style specs per section if available (paste image descriptions or attach exports).
- Flag any section where the high-fidelity design differs from the original wireframe assumption in ARCHITECTURE.md, so the component structure can be adjusted before build.
