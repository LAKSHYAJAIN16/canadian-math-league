---
name: Canadian Math League
description: The Answer Key — a national math tournament run like a real, official exam-paper booklet
colors:
  ledger:
    value: "#F5EFDF"
  ledger-deep:
    value: "#EDE4CC"
  ledger-line:
    value: "#D9CDA8"
  ink-900:
    value: "#211C15"
  ink-700:
    value: "#4A4234"
  ink-500:
    value: "#6D6452"
  ink-300:
    value: "#B4A98C"
  stamp-700:
    value: "#7E140F"
  stamp-600:
    value: "#9C1D16"
  stamp-500:
    value: "#B93227"
  stamp-100:
    value: "#F2DCD6"
typography:
  display:
    fontFamily: "Alike, Georgia, serif"
    fontSize: "clamp(2rem, 4.5vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.08
  headline:
    fontFamily: "Alike, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "Alike, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.stamp-600}"
    textColor: "{colors.ledger}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.875rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.stamp-700}"
  button-secondary:
    backgroundColor: "{colors.ledger}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.none}"
    padding: "0.875rem 1.5rem"
  card:
    backgroundColor: "{colors.ledger}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
---

# Design System: Canadian Math League

## Overview

**Creative North Star: "The Answer Key"**

CML's visual world is the cover page and answer sheet of a real, official math competition booklet — not a soft-rounded, pill-button, shadow-card "friendly SaaS" arrangement. Warm exam-paper "ledger" stock stands in for the page, near-black ink carries text and structure, and one institutional stamp-red is reserved for official marks: seals, status stamps, the primary CTA, dollar figures. Alike, a protected display serif, carries every heading and body paragraph sitewide; IBM Plex Mono carries numbers, codes, tags, and every interactive label, echoing a typewritten exam form. Structure comes from ruled hairline grids and hard-bordered ledger panels — never soft ambient shadows or rounded cards. Scantron-style bubble numerals and rotated rubber-stamp marks mark real sequence and real status (tournament stages, a timeline, a live registration-open/closed state) — never decorative flourish.

This is the third direction explored for the site, and the two prior passes are the confirmed anti-reference. "Blueprint notebook" (dark navy nav, uppercase-tracked labels, hairline technical-drawing grids) and "Friendly Field" (Canadian flag red as a single accent on soft white/off-white grounds, `rounded-2xl`/`rounded-3xl` cards, `rounded-full` pill buttons, diffuse `shadow-soft` elevation, Plus Jakarta Sans throughout, strict sentence case) are both fully retired. No `redpen-*`/`graphite-*`/`paper-*` tokens, no `shadow-soft`/`shadow-red-glow`, and no rounded cards or pill buttons remain anywhere in the current system — the one exception is the small set of circular signature marks (scantron bubble numerals, rotated seal/stamp chips) described under Components below.

**Key Characteristics:**
- Single accent color (institutional stamp red) reserved for official marks and primary actions — never a rainbow of semantic blue/green/yellow, and never spread across a page as decoration
- Hard 2px `ink-900` borders as the only structural device — no soft shadows, no drop shadows, no ambient elevation anywhere
- Sharp, un-rounded rectangular corners everywhere except the circular scantron-bubble and rotated-stamp signature marks
- Alike (serif) for every heading and paragraph; IBM Plex Mono for every label, button, nav item, tag, number, and code — no third typeface
- Uppercase, letter-tracked labels for all interactive/label text (`font-mono text-xs font-semibold uppercase tracking-wide`) — the opposite of the retired system's sentence-case rule
- Ruled hairline-grid textures and bordered ledger panels stand in for the card grids and shadow elevation of prior systems

## Colors

The palette is Restrained: a warm paper neutral, a near-black ink neutral, and one saturated accent (stamp red) that appears only on primary actions, official marks, and status/emphasis — never as page-wide decoration.

### Primary
- **Stamp Red** (`#9C1D16` / `stamp-600`): the one accent. Primary buttons, active nav/tab states, dollar figures, the registration-open stamp, links, and the full-bleed closing-CTA band. Used at full strength for anything actionable or officially significant.
- **Stamp Red Deep** (`#7E140F` / `stamp-700`): hover state for solid stamp-red buttons and links.
- **Stamp Red Mid** (`#B93227` / `stamp-500`): reserved for secondary emphasis where `stamp-600` would compete with an adjacent primary action.
- **Stamp Red Tint** (`#F2DCD6` / `stamp-100`): the fill for bordered error/alert panels (paired with `stamp-600` border and `stamp-700` text) — never a standalone background without its border.

### Neutral
- **Ledger** (`#F5EFDF`): the page background and default panel surface — warm exam-paper stock, never pure white.
- **Ledger Deep** (`#EDE4CC`): a slightly deeper paper tone for alternating sections, inset panels, and answered/filled table rows.
- **Ledger Line** (`#D9CDA8`): the faintest hairline divider between major page sections where a full `ink-900` border would be too heavy.
- **Ink 900** (`#211C15`): primary text, all structural borders and dividers, and the one deliberately dark surface (footer). A warm near-black, never pure `#000`.
- **Ink 700** (`#4A4234`): body copy and secondary text.
- **Ink 500 / 300** (`#6D6452` / `#B4A98C`): placeholder text, timestamps, muted captions, disabled states. Ink 500 is tuned to clear 4.5:1 (WCAG AA) against both `ledger` and `ledger-deep` — don't lighten it back toward the original `#7A705C`, which fell short at 4.25:1.

### Named Rules
**The One Stamp Rule.** Stamp red is the only saturated hue in the system, and it marks only what is actionable or official (a button, a live status, a dollar amount, a seal) — never a background wash or a decorative accent.

**The Hard Border Rule.** All structure comes from a 2px `ink-900` border or an `ink-900`/`ledger-line` divider — never a soft shadow, never a `border-radius` beyond `0` (except the signature circular marks). A shadow of any kind on a card, button, or panel is a regression to the retired Friendly Field system.

## Typography

**Display/Body Font:** Alike (with Georgia, serif fallback) — one serif family carries every heading and every paragraph, sitewide, at every scale.
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace fallback) — every button, nav item, tab, tag, table header, timestamp, and numeral.

**Character:** The serif/mono pairing is the whole system's typographic signature: Alike reads as a real, printed exam booklet's body text, while IBM Plex Mono reads as the typewritten stamps and codes overlaid on that paper. Never mix in a rounded grotesque (Plus Jakarta Sans, the retired system's display font) or any other sans as a body or label voice.

### Hierarchy
- **Display** (400, `clamp(2rem, 4.5vw, 3.75rem)`, 1.08 line-height, Alike): hero headlines only, one per page.
- **Headline** (400, `clamp(1.5rem, 2.5vw, 2.25rem)`, 1.15, Alike): section titles.
- **Title** (400, 1.125–1.5rem, Alike): card and panel headings.
- **Body** (400, 1rem, 1.6 line-height, Alike): paragraph copy.
- **Label** (600, 0.625–0.75rem, IBM Plex Mono, uppercase, `tracking-wide`): buttons, nav items, tabs, tags, table headers, form labels.

### Named Rules
**The Uppercase-Mono-Label Rule.** Every interactive or structural label — buttons, nav items, tabs, form labels, table headers, tags, timestamps — is set in uppercase, letter-tracked IBM Plex Mono. This is a deliberate reversal of the retired system's sentence-case rule and is the fastest tell of an unmigrated page.

**No Third Typeface Rule.** Only Alike (prose) and IBM Plex Mono (labels/data) ever appear. A stray Plus Jakarta Sans, system-ui, or Tailwind default sans anywhere is a regression to a retired pass.

## Layout

Sections run in a centered `max-w-4xl`/`max-w-5xl` (occasionally `max-w-7xl` for admin data views) container with `px-4 sm:px-6 lg:px-8` gutters — narrower than the retired system's `max-w-7xl` default, in keeping with a booklet's page measure. Vertical rhythm is generous between sections (`py-16`–`py-20`) but dense within a bordered panel. Card grids typically render as a single bordered panel divided internally by `divide-ink-900` rules (a ruled ledger sheet), rather than a grid of individually-shadowed floating cards — the retired system's `gap-6` card grid is replaced by `grid-cols-3 gap-px bg-ink-900` (cells touching, separated by a single hairline) or a `divide-x`/`divide-y divide-ink-900` panel.

## Elevation & Depth

Flat. There is no shadow vocabulary in this system — depth is never simulated with `box-shadow`. Every surface sits at the same visual plane; separation between elements comes entirely from a 2px `ink-900` border, an `ink-900`/`ledger-line` divider, or a shift between `ledger` and `ledger-deep` background tone.

### Named Rules
**The No-Shadow Rule.** No card, button, input, or panel ever carries a `box-shadow`. If a surface needs to read as "raised" or "important," give it a `border-2 border-ink-900` and/or a `stamp-600` fill — never a shadow.

## Shapes

Sharp and rectangular everywhere, with one deliberate exception. Cards, panels, inputs, and buttons all use `rounded-none` (no radius) — the exam-booklet page has square-cut edges. The single exception is the signature circular marks: scantron-style bubble numerals and rotated rubber-stamp/seal chips, which are `rounded-full` by design, echoing a real stamped or bubbled mark on paper. No other rounding exists in the system.

## Components

### Buttons
- **Shape:** sharp rectangle, no radius.
- **Primary:** solid `stamp-600` background, `ledger` text, uppercase-mono label, hover to `stamp-700`. A small `translateY(-2px)` lift on hover/press via the shared `.btn-press` utility class (no shadow change accompanies the lift).
- **Secondary:** `ledger` background with a `border-2 border-ink-900`, `ink-900` text; hover inverts to solid `ink-900` background with `ledger` text.
- **Disabled:** `ink-300`/`opacity-70` fill, `cursor-not-allowed`, no other state change.

### Tags / Status marks
- **Tag:** a small rectangle with a 1px `ink-900` border, uppercase Plex Mono label — used for format labels ("Free", "Online"), timeline entries, and table-cell metadata.
- **Stamp mark** (the `.exam-stamp` component): a bordered chip or circular seal that plays a one-time `stamp-press-in` entrance animation (scale + rotate settling in, via `--stamp-rotate`) — used for the CMS partnership seal, the registration-open/closed status, and admission-style tickets (`/join`). Rotation and the press-in animation are the one recurring signature motion in the system; disabled under `prefers-reduced-motion`.
- **Bubble numeral** (`BubbleNumeral`): a `rounded-full`, `border-2` circle with a zero-padded Plex Mono number — marks real sequence only (tournament stage order, a timeline), never decorative section counters.

### Cards / Panels
- **Corner Style:** `rounded-none`, always.
- **Background:** `ledger` by default; `ledger-deep` for an alternating section or an inset/filled sub-panel; `ink-900` for the one deliberately dark surface (footer).
- **Border:** `border-2 border-ink-900` is the default container boundary; internal subdivisions use `divide-ink-900` (or the softer `ledger-line` for a genuinely minor divider).
- **Shadow Strategy:** none — see Elevation & Depth.
- **Internal Padding:** `p-6`–`p-8` for section-level panels, `p-4` for compact list/table cells.

### Inputs / Fields
- **Style:** `border-2 border-ink-900`, `bg-ledger`, `rounded-none`, label above the field in uppercase Plex Mono.
- **Focus:** `focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30` — the border itself changes color, unlike the retired system's borderless-fill-only focus treatment.
- **Error:** a `border-2 border-stamp-600 bg-stamp-100` panel with `text-stamp-700` Plex Mono copy below the field, not a red field outline.

### Navigation
- **Style:** `bg-ledger` sticky bar with a `border-b-2 border-ink-900` (no blur, no translucency). Nav items are uppercase Plex Mono, `ink-700` at rest, `stamp-600` on hover. Dropdowns are square-cornered `ledger` panels with a `border-2 border-ink-900`, no shadow.
- **Mobile:** same token language in a collapsing panel; items remain full-width rectangular hit targets, no rounding.
- **Footer:** the one deliberately dark surface — `ink-900` background with a `stamp-600` top accent bar (`border-t-4`), `ledger`/`ink-300` text, `stamp-500` link hovers.

### Live competition rounds & admin/platform surfaces (Operate mode)
The fullscreen timed competition interfaces (`/o/competition`, `/o/capture-the-problem`, `/o/team-competition`) and the authenticated admin/teacher surfaces (`/admin`, `/platform/*`) use the same token set and hard-bordered, unrounded, unshadowed component language as the marketing site — `stamp-600` for the active/selected/primary-action state, `ledger-deep` for filled/answered indicators, `border-2 border-ink-900` panels for question/answer/data displays. Per Operate-mode restraint, these surfaces add no decorative motion beyond the shared `.btn-press` hover lift, and the anti-cheat warning banner is the one place outside the marketing closing-CTA section that uses a full-bleed saturated `stamp-600` band.

## Do's and Don'ts

### Do:
- **Do** use `stamp-600`/`stamp-700` as the only saturated accent color across the entire product, including live competition rounds and admin/teacher surfaces.
- **Do** build every card, panel, button, and input as `rounded-none` with a `border-2 border-ink-900` — never a shadow.
- **Do** set every button, nav item, tab, tag, and form label in uppercase, letter-tracked IBM Plex Mono.
- **Do** keep every heading and body paragraph in Alike (serif) — never a sans-serif display face.
- **Do** reserve `rounded-full` exclusively for the scantron bubble-numeral and rotated stamp/seal signature marks.
- **Do** use `stamp-100`-filled, `stamp-600`-bordered panels (not Tailwind-default red/blue/green/yellow) for error and alert states.

### Don't:
- **Don't** reintroduce any `redpen-*`, `graphite-*`, `paper-*`, or `blueprint-*` token, `shadow-soft`/`shadow-soft-lg`/`shadow-red-glow`, or Plus Jakarta Sans — all belong to the two retired directions.
- **Don't** use Tailwind-default `blue-*`, `green-*`, `yellow-*`, `amber-*`, or `gray-*` utility colors anywhere; every color must resolve to a `ledger-*`, `ink-*`, or `stamp-*` token.
- **Don't** round a card, button, input, or panel corner (`rounded-lg`/`xl`/`2xl`/`3xl`) — the system is sharp-cornered by design outside the named circular signature marks.
- **Don't** set interactive labels or nav items in sentence case — uppercase-tracked Plex Mono is the rule here, not the exception it was in the retired system.
- **Don't** add a `box-shadow` to anything. Depth is a border or a background-tone shift, never a shadow.
