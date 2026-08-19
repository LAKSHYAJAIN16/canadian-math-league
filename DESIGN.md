---
name: Canadian Math League
description: Friendly Field — a warm red/white tournament identity for a free, team-based national math competition
colors:
  flag-red:
    value: "#DC1F35"
  flag-red-tint:
    value: "#FEF3F4"
  flag-red-soft:
    value: "#FCE2E5"
  flag-red-deep:
    value: "#B41225"
  paper:
    value: "#FFFFFF"
  paper-line:
    value: "#F1E4E5"
  paper-ink:
    value: "#FDF7F7"
  graphite-900:
    value: "#241E1F"
  graphite-700:
    value: "#493D3F"
  graphite-600:
    value: "#6B5B5D"
  graphite-400:
    value: "#9C8A8C"
  graphite-300:
    value: "#C9BABB"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
rounded:
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  full: "9999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.flag-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.flag-red-deep}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.flag-red}"
    rounded: "{rounded.full}"
    padding: "1rem 2rem"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
---

# Design System: Canadian Math League

## Overview

**Creative North Star: "Friendly Field"**

CML's visual world is a warm, approachable tournament identity, not a sterile test-prep interface. It carries a Canadian flag red as its single accent against white and warm off-white grounds, soft rounded cards, and pill-shaped buttons — the register-your-team energy of a school sports league poster, not a standardized-exam booklet. Type is Plus Jakarta Sans throughout: a rounded, friendly grotesque that reads as approachable at display sizes and stays legible in dense body copy. Depth comes from soft, diffuse shadows rather than hard strokes; the one recurring hand-drawn touch is the "red-pen circle" — an SVG underline stroke that draws itself around a key phrase in the hero, referencing a teacher's red pen without leaning on it anywhere else.

This is the third direction explored for the site. Two prior passes are the confirmed anti-reference: a "blueprint notebook" theme (dark navy nav, uppercase-tracked labels, hairline technical-drawing grids) and a flat red/white neobrutalist theme (hard 2px black borders, sharp corners, offset block shadows, `shadow-stamp`). Both are fully retired — no hard `border-2 border-graphite-900` outlines, no uppercase letter-spaced labels as a structural device, no offset block shadows anywhere in the current system.

**Key Characteristics:**
- Single accent color (Canadian flag red) at full page scale — never a rainbow of semantic blue/green/yellow
- Soft rounded cards (`rounded-2xl`/`rounded-3xl`) with diffuse `shadow-soft`, never hard borders
- Pill-shaped (`rounded-full`) buttons and tabs everywhere, primary always solid red with a red glow shadow
- Plus Jakarta Sans for everything — display, body, and labels; no serif, no mono-as-decoration
- Sentence case throughout; no uppercase-tracked labels or kicker/eyebrow rows

## Colors

The palette is Restrained: two neutrals (white paper, warm dark graphite) plus one saturated accent (flag red) that carries roughly 10–20% of any given screen — enough to feel confident, never drenched.

### Primary
- **Flag Red** (`#DC1F35` / `redpen-600`): the one accent. Primary buttons, links, active nav/tab states, icon tints, the red-pen hero mark, and the solid CTA band. Used at full strength for anything actionable.
- **Flag Red Tint** (`#FEF3F4` / `redpen-50`): soft background fill for info panels, secondary card backgrounds, and icon chips — the "this is emphasized but not urgent" surface.
- **Flag Red Soft** (`#FCE2E5` / `redpen-100`): pill badge fills, numeral badges, selected-state chips.
- **Flag Red Deep** (`#B41225` / `redpen-700`): hover state for solid red buttons; heading text inside a tinted red panel.

### Neutral
- **Paper** (`#FFFFFF`): the page background and default card surface.
- **Paper Line** (`#F1E4E5`): hairline dividers and section borders — barely-there, warm-tinted, never a hard black rule.
- **Paper Ink** (`#FDF7F7`): the faintest warm-white, used for subtle inset panels (search inputs, quiet info chips).
- **Graphite 900** (`#241E1F`): primary text and dark surfaces (footer, solid dark info panels). A warm near-black, never pure `#000`.
- **Graphite 700 / 600** (`#493D3F` / `#6B5B5D`): body copy and secondary text.
- **Graphite 400 / 300** (`#9C8A8C` / `#C9BABB`): placeholder text, disabled states, quiet dividers.

### Named Rules
**The One Accent Rule.** Flag red is the only saturated hue in the system. Never introduce Tailwind-default blue, green, yellow, or gray for status or category color — differentiate states with the red/graphite scale, weight, or an icon, not a second hue.

**The No Hard Border Rule.** Structure comes from soft shadows and generous corner radius, never a 2px solid border used as a shape-defining device. A 1px `paper-line` hairline is acceptable for a genuinely flat divider (table rows, a footer rule); it is never a card's outline.

## Typography

**Display Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Body Font:** Plus Jakarta Sans
**Label Font:** Plus Jakarta Sans, weight 600

**Character:** One friendly, rounded grotesque family carries the whole system at every scale — extrabold for display headlines, semibold for interactive labels, regular for body copy. No serif is ever mixed in; a stray `font-serif italic` anywhere in the codebase is a regression to an earlier, discarded direction.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 5vw, 4.5rem)`, 1.05 line-height): hero headlines only, one per page.
- **Headline** (700, `clamp(1.75rem, 3vw, 3rem)`, 1.15): section titles.
- **Title** (700, 1.125–1.5rem): card and panel headings.
- **Body** (400–500, 1rem, 1.6 line-height): paragraph copy, 65–75ch measure where the layout allows.
- **Label** (600, 0.75–0.875rem): buttons, nav items, pills, form labels — sentence case.

### Named Rules
**The Sentence Case Rule.** Labels, nav items, and buttons are set in normal sentence case, not uppercase with tracked letter-spacing. Uppercase-tracked labels are a tell of the retired "blueprint" pass.

## Layout

Sections run in a centered `max-w-7xl` (or `max-w-5xl`/`max-w-4xl` for text-heavy pages) container with `px-4 sm:px-6 lg:px-8` gutters. Vertical rhythm is generous: `py-16`–`py-24` between major sections, `gap-6` between cards in a grid. Card grids are typically 3-up on desktop (`md:grid-cols-3`), collapsing to 1-up on mobile. Content panels favor a single strong card over multi-column hairline grids — the retired "blueprint" pass's `gap-px bg-graphite-900` hairline-grid tables are fully replaced by individually-shadowed rounded cards in a normal `gap-4`/`gap-6` grid.

## Elevation & Depth

Hybrid: mostly flat within a section, with soft ambient shadows lifting individual cards and buttons off the page. Depth is a response to importance and interaction, not a universal outline.

### Shadow Vocabulary
- **soft** (`0 2px 8px -2px rgba(36,30,31,.08), 0 8px 24px -8px rgba(36,30,31,.10)`): default card elevation.
- **soft-lg** (`0 4px 16px -4px rgba(36,30,31,.10), 0 16px 40px -12px rgba(36,30,31,.14)`): hover state for elevated cards, and prominent standalone panels (login card, hero card).
- **red-glow** (`0 8px 24px -8px rgba(220,31,53,.35)`): reserved for solid red primary buttons — a colored glow instead of a neutral shadow, reinforcing the one-accent rule.

### Named Rules
**The Hover-Lift Rule.** Interactive cards lift (`hover:-translate-y-1`) and their shadow steps from `soft` to `soft-lg` on hover; static/non-interactive cards stay at `soft` with no lift.

## Shapes

Rounded and soft everywhere. Buttons, tabs, badges, and pills are always `rounded-full`. Cards use `rounded-2xl` (small/inline cards) or `rounded-3xl` (section-level cards, hero panels). Inputs use `rounded-xl` with a tinted `redpen-50/60` fill instead of a stroked border. No sharp corners, no hard-edged rectangles, anywhere in the current system.

## Components

### Buttons
- **Shape:** fully pill (`rounded-full`, 9999px).
- **Primary:** solid `flag-red` background, white text, `shadow-red-glow`, hover to `flag-red-deep`. A small `translateY(-2px)` lift on hover/press via the shared `.btn-press` utility class.
- **Secondary:** white background, `flag-red` text, either no border or a soft `border-2 border-redpen-100` for a hero-level secondary action; hover fills with `redpen-50`.
- **Dark/neutral:** `graphite-900` background with white text, used sparingly (e.g. "Volunteer Now") where red would compete with an adjacent red primary action on the same card.

### Chips / Pills
- **stamp-label** (the shared badge component in `globals.css`): solid `flag-red` fill, white text, `rounded-full`, small caps-free bold label — used for "Free", "Online", section eyebrows like "Rulebook", "Practice".
- **Tab pills:** inactive = `redpen-50` fill with `graphite-700` text; active = solid `flag-red` fill with white text and `shadow-red-glow`.

### Cards / Containers
- **Corner Style:** `rounded-2xl` to `rounded-3xl`.
- **Background:** `paper` (white) by default; `redpen-50` for a tinted emphasis panel; `graphite-900` for a dark contrast panel (footer, "before you write in" notices).
- **Shadow Strategy:** `shadow-soft` at rest, `shadow-soft-lg` on hover for interactive cards.
- **Border:** none. Structure comes from the shadow and the surrounding whitespace.
- **Internal Padding:** `p-6` to `p-8` for section-level cards, `p-4`–`p-5` for compact list items.

### Inputs / Fields
- **Style:** no stroke; a soft `bg-redpen-50/60` fill with `rounded-xl` corners.
- **Focus:** `focus:ring-2 focus:ring-redpen-400`, no border-color change (there is no border to change).
- **Error:** message rendered in a `bg-redpen-50` / `text-redpen-700` panel below the field, not a red field outline.

### Navigation
- **Style:** light sticky bar (`bg-paper/90 backdrop-blur-sm`), a thin `paper-line` bottom hairline. Nav items are sentence-case, semibold, `graphite-700` at rest, `flag-red` on hover, with an animated underline sliding in from the left. Dropdowns are `rounded-2xl` white panels with `shadow-soft-lg`, no border. The register CTA is always the one solid red pill button in the bar.
- **Mobile:** same token language in a collapsing panel; items become full-width rounded-pill hit targets.
- **Footer:** the one deliberately dark surface — `graphite-900` background with a `redpen-600` top accent bar, white/`graphite-300` text, red-tinted link hovers.

### Live competition rounds (signature operate-mode surface)
The fullscreen, timed competition interfaces (`/o/competition`, `/o/capture-the-problem`, `/o/team-competition`) inherit the same token set — `flag-red` for the active/selected state and progress fill, `redpen-50`/`redpen-100` for "answered" indicators, soft rounded cards for the question and answer panels — but stay functionally restrained per Operate mode: no decorative motion, no pill buttons where a clear rectangular action button reads faster during a timed round, and the anti-cheat warning banner is the one place a saturated full-bleed red band is used outside the marketing CTA sections.

## Do's and Don'ts

### Do:
- **Do** use `flag-red` as the only saturated accent color across the entire product, including the live competition rounds and teacher/admin surfaces.
- **Do** build cards as `rounded-2xl`/`rounded-3xl` with `shadow-soft`, never a hard border.
- **Do** set every button, tab, and badge as `rounded-full`.
- **Do** keep all text in Plus Jakarta Sans, sentence case, no letter-spacing tricks.
- **Do** use `redpen-50`-tinted panels (not Tailwind-default blue/green/yellow) to differentiate an info/note/warning callout from the surrounding card.

### Don't:
- **Don't** reintroduce `border-2 border-graphite-900` hard outlines, hairline `gap-px` grid tables, or offset block shadows (`shadow-stamp`) — these belong to the two retired directions.
- **Don't** use Tailwind-default `blue-*`, `green-*`, `yellow-*`, or `gray-*` utility colors anywhere; every color must resolve to a `redpen-*`, `graphite-*`, or `paper*` token.
- **Don't** render white text on `bg-grid-blueprint` or `bg-grid-paper` — both are light gradients now (a holdover dark-hero assumption caused several white-on-near-white bugs during this redesign).
- **Don't** use uppercase-tracked labels, kicker/eyebrow rows above headings, or `font-serif italic` — all are tells of an earlier pass and read as inconsistent against the rest of the product.
