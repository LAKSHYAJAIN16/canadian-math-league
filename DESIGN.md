---
name: Canadian Math League
description: Softbound — a warm exam-booklet identity carried on soft paper and gentle shadow, not hard black rules
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
  xl: "0.75rem"
  "2xl": "1rem"
  "3xl": "1.5rem"
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
    rounded: "{rounded.full}"
    padding: "0.875rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.stamp-700}"
  button-secondary:
    backgroundColor: "{colors.ledger}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.5rem"
  card:
    backgroundColor: "{colors.ledger}"
    rounded: "{rounded.2xl}"
    padding: "1.5rem"
---

# Design System: Canadian Math League

## Overview

**Creative North Star: "Softbound"**

CML's visual world is still the exam-booklet — warm "ledger" paper stock, near-black ink, one institutional stamp-red reserved for official marks — but bound softly, not stamped in hard black rule lines. Depth comes from a diffuse paper-toned shadow lifting cards and buttons off the page; corners are gently rounded; section boundaries come from a shift in paper tone, not a 2-4px black bar. Alike, a protected display serif, still carries every heading and body paragraph sitewide; IBM Plex Mono still carries numbers, codes, tags, and every interactive label. The exam-booklet *character* — paper, ink, one red stamp, typewritten labels — is unchanged; the *construction* moved from "printed and ruled" to "a booklet you'd actually want to hold."

This is the fourth direction explored for the site. Three prior passes are the confirmed anti-reference: "Blueprint notebook" (dark navy nav, uppercase-tracked labels, hairline technical-drawing grids), "Friendly Field" (Canadian flag red on soft white grounds, Plus Jakarta Sans, strict sentence case), and "The Answer Key" (this same ledger/ink/stamp palette and Alike/Plex Mono typography, but built entirely from hard 2-4px `ink-900` borders and sharp, un-rounded corners with zero shadow vocabulary). The Answer Key's hard black rule lines read as heavy and "cooked" in real use — sitewide, load-bearing structure — so this pass keeps everything The Answer Key got right about *color and type* and replaces everything about *how structure is drawn*. No `redpen-*`/`graphite-*`/`paper-*`/`blueprint-*` tokens remain anywhere, and no `border-2`/`border-4` black rule is used as a structural device anymore — the one deliberate exception is the small set of circular seal/stamp marks described under Components.

**Key Characteristics:**
- Single accent color (institutional stamp red) reserved for official marks and primary actions — never a rainbow of semantic blue/green/yellow
- Soft, diffuse `shadow-soft`/`shadow-soft-lg` elevation lifts cards, panels, and buttons off the page — no hard black borders as structure
- Rounded corners everywhere (`rounded-xl` inputs, `rounded-2xl`/`rounded-3xl` cards, `rounded-full` buttons/pills/tags) plus the circular seal/stamp marks that predate this pass
- Alike (serif) for every heading and paragraph; IBM Plex Mono for every label, button, nav item, tag, number, and code — no third typeface
- Uppercase, letter-tracked labels for all interactive/label text (`font-mono text-xs font-semibold uppercase tracking-wide`) — unchanged from The Answer Key
- Section boundaries come from alternating `ledger`/`ledger-deep` background tone, not a black or colored rule line

## Colors

The palette is Restrained: a warm paper neutral, a near-black ink neutral, and one saturated accent (stamp red) that appears only on primary actions, official marks, and status/emphasis — never as page-wide decoration. Unchanged from The Answer Key.

### Primary
- **Stamp Red** (`#9C1D16` / `stamp-600`): the one accent. Primary buttons, active nav/tab states, dollar figures, the registration-open stamp, links, and the full-bleed closing-CTA band.
- **Stamp Red Deep** (`#7E140F` / `stamp-700`): hover state for solid stamp-red buttons and links.
- **Stamp Red Mid** (`#B93227` / `stamp-500`): reserved for secondary emphasis where `stamp-600` would compete with an adjacent primary action.
- **Stamp Red Tint** (`#F2DCD6` / `stamp-100`): the fill for rounded error/alert panels and tag chips.

### Neutral
- **Ledger** (`#F5EFDF`): the page background and default panel surface — warm exam-paper stock, never pure white.
- **Ledger Deep** (`#EDE4CC`): a slightly deeper paper tone for alternating sections, inset panels, and answered/filled table rows. This — not a border — is the primary tool for separating adjacent sections now.
- **Ledger Line** (`#D9CDA8`): a hairline divider for the rare case a genuinely minor 1px separator is needed inside a panel (e.g. a table row rule) — never a page-section boundary.
- **Ink 900** (`#211C15`): primary text and the one deliberately dark surface (footer). A warm near-black, never pure `#000`.
- **Ink 700** (`#4A4234`): body copy and secondary text.
- **Ink 500 / 300** (`#6D6452` / `#B4A98C`): placeholder text, timestamps, muted captions, disabled states. Ink 500 is tuned to clear 4.5:1 (WCAG AA) against both `ledger` and `ledger-deep` — don't lighten it back toward `#7A705C`, which fell short at 4.25:1.

### Named Rules
**The One Stamp Rule.** Stamp red is the only saturated hue in the system, and it marks only what is actionable or official — never a background wash or decorative accent.

**The Soft Structure Rule.** Structure comes from a `shadow-soft`/`shadow-soft-lg` elevation or a `ledger`/`ledger-deep` tone shift — never a hard `ink-900` (or any color) border/rule used to divide sections, wrap cards, or separate rows. The one exception is the circular seal/stamp marks (see Components) — a thin border reads as an intentional stamped-seal edge there, not structural furniture.

## Typography

**Display/Body Font:** Alike (with Georgia, serif fallback) — one serif family carries every heading and every paragraph, sitewide, at every scale.
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace fallback) — every button, nav item, tab, tag, table header, timestamp, and numeral.

**Character:** Unchanged from The Answer Key — Alike reads as a real, printed exam booklet's body text, while IBM Plex Mono reads as the typewritten stamps and codes overlaid on that paper. Never mix in a rounded grotesque (Plus Jakarta Sans) or any other sans as a body or label voice.

### Hierarchy
- **Display** (400, `clamp(2rem, 4.5vw, 3.75rem)`, 1.08 line-height, Alike): hero headlines only, one per page.
- **Headline** (400, `clamp(1.5rem, 2.5vw, 2.25rem)`, 1.15, Alike): section titles.
- **Title** (400, 1.125–1.5rem, Alike): card and panel headings.
- **Body** (400, 1rem, 1.6 line-height, Alike): paragraph copy.
- **Label** (600, 0.625–0.75rem, IBM Plex Mono, uppercase, `tracking-wide`): buttons, nav items, tabs, tags, table headers, form labels.

### Named Rules
**The Uppercase-Mono-Label Rule.** Every interactive or structural label is set in uppercase, letter-tracked IBM Plex Mono. Unchanged from The Answer Key.

**No Third Typeface Rule.** Only Alike (prose) and IBM Plex Mono (labels/data) ever appear.

## Layout

Sections run in a centered `max-w-4xl`/`max-w-5xl` (occasionally `max-w-7xl` for admin data views) container with `px-4 sm:px-6 lg:px-8` gutters. Vertical rhythm is generous between sections (`py-16`–`py-20`). Card grids run as a normal `gap-6`/`gap-8` grid of individually-shadowed rounded cards (`md:grid-cols-3`, collapsing to 1-up on mobile) — the touching-cell hairline grid (`gap-px bg-ink-900`) is retired along with the hard-border system. A single content panel (e.g. a form, a data table) is one `shadow-soft` rounded card rather than a bordered box; internal row/field separators use `divide-ledger-line`, not `divide-ink-900`.

## Elevation & Depth

Hybrid: mostly flat within a section, with soft ambient shadows lifting individual cards, panels, and buttons off the page. Depth is a response to importance and interaction, not a universal border.

### Shadow Vocabulary
- **soft** (`0 2px 8px -2px rgba(33,28,21,.08), 0 8px 24px -8px rgba(33,28,21,.10)`): default card/panel elevation.
- **soft-lg** (`0 4px 16px -4px rgba(33,28,21,.10), 0 16px 40px -12px rgba(33,28,21,.14)`): hover state for interactive cards, and prominent standalone panels (login card, hero card).
- **stamp-glow** (`0 8px 24px -8px rgba(156,29,22,.35)`): reserved for solid `stamp-600` primary buttons — a colored glow instead of a neutral shadow, reinforcing the one-accent rule.

### Named Rules
**The Hover-Lift Rule.** Interactive cards lift (`hover:-translate-y-1`) and their shadow steps from `soft` to `soft-lg` on hover; static/non-interactive cards stay at `soft` with no lift.

**No Hard Border Rule.** A `border` is never the way a card, panel, table, or section is outlined. If a surface needs to read as "raised" or "important," give it `shadow-soft`/`shadow-soft-lg` and/or a `stamp-600` fill — never a black or colored rule line. (The circular seal/stamp marks are the named exception — see Components.)

## Shapes

Rounded and soft everywhere. Buttons, tabs, badges, tags, and pills are always `rounded-full`. Cards use `rounded-2xl` (compact/inline cards) or `rounded-3xl` (section-level cards, hero panels). Inputs use `rounded-xl`. The circular seal/stamp marks (scantron bubble numerals, rotated rubber-stamp chips, the logo) stay `rounded-full` as they always were — they're not an exception anymore, just the same shape everything else now uses too.

## Components

### Buttons
- **Shape:** fully pill (`rounded-full`, 9999px).
- **Primary:** solid `stamp-600` background, `ledger` text, uppercase-mono label, `shadow-stamp-glow`, hover to `stamp-700`. A small `translateY(-2px)` lift on hover/press via the shared `.btn-press` utility class.
- **Secondary:** `ledger` background, `ink-900` text, `shadow-soft` (steps to `shadow-soft-lg` on hover), no border. Hover may also shift background to `ledger-deep`.
- **Dark/neutral:** `ink-900` background with `ledger` text, used sparingly where `stamp-600` would compete with an adjacent primary action on the same card.
- **Disabled:** `ink-300` fill, `opacity-70`, `cursor-not-allowed`, no shadow.

### Tags / Status marks
- **Tag:** a small `rounded-full` pill, `stamp-100` fill with `stamp-700` text (or `ledger-deep` fill with `ink-700` text for a neutral tag) — used for format labels ("Free", "Online"), timeline entries, and table-cell metadata. No border.
- **Stamp mark** (the `.exam-stamp` component): a circular seal that plays a one-time `stamp-press-in` entrance animation — used for the CMS partnership seal, the registration-open/closed status, and admission-style tickets (`/join`). This keeps its `border-2 border-ink-900` — see the Named Exception below.
- **Bubble numeral** (`BubbleNumeral`): a `rounded-full`, `border-2` circle with a zero-padded Plex Mono number — marks real sequence only (tournament stage order, a timeline). Also keeps its border, same reason.

**Named Exception: seal borders.** The logo, the CMS partner seal, `.exam-stamp` chips, and `BubbleNumeral` keep a thin `border-2 border-ink-900` ring. A border on a small circular badge reads as an intentional stamped-seal edge, not the load-bearing structural device the rest of the system moved away from. Don't extend this exception to any rectangular card, panel, or section.

### Cards / Panels
- **Corner Style:** `rounded-2xl` to `rounded-3xl`.
- **Background:** `ledger` by default; `ledger-deep` for a tinted emphasis panel or alternating section; `ink-900` for the one deliberately dark surface (footer).
- **Shadow Strategy:** `shadow-soft` at rest, `shadow-soft-lg` on hover for interactive cards. No border.
- **Internal Padding:** `p-6`–`p-8` for section-level panels, `p-4`–`p-5` for compact list/table cells.

### Inputs / Fields
- **Style:** no stroke; a soft `bg-ledger-deep/60` fill with `rounded-xl` corners, label above the field in uppercase Plex Mono.
- **Focus:** `focus:ring-2 focus:ring-stamp-600/40`, no border-color change (there is no border to change).
- **Error:** a `rounded-xl bg-stamp-100` panel with `text-stamp-700` Plex Mono copy below the field, not a border outline.

### Navigation
- **Style:** `bg-ledger/95 backdrop-blur-sm` sticky bar with `shadow-soft` (no border). Nav items are uppercase Plex Mono, `ink-700` at rest, `stamp-600` on hover. Dropdowns are `rounded-2xl ledger` panels with `shadow-soft-lg`, no border.
- **Mobile:** same token language in a collapsing panel; items become full-width `rounded-xl` hit targets.
- **Footer:** the one deliberately dark surface — `ink-900` background, `ledger`/`ink-300` text, `stamp-500` link hovers. No top border/rule; the color contrast against the page above is separation enough.

### Live competition rounds & admin/platform surfaces (Operate mode)
The fullscreen timed competition interfaces (`/o/competition`, `/o/capture-the-problem`, `/o/team-competition`) and the authenticated admin/teacher surfaces (`/admin`, `/platform/*`) use the same token set and soft-shadow, rounded component language as the marketing site — `stamp-600` for the active/selected/primary-action state, `ledger-deep` for filled/answered indicators, `shadow-soft` rounded panels for question/answer/data displays. Per Operate-mode restraint, these surfaces add no decorative motion beyond the shared `.btn-press` hover lift, and the anti-cheat warning banner is the one place outside the marketing closing-CTA section that uses a full-bleed saturated `stamp-600` band.

## Do's and Don'ts

### Do:
- **Do** use `stamp-600`/`stamp-700` as the only saturated accent color across the entire product, including live competition rounds and admin/teacher surfaces.
- **Do** build every card, panel, and input as `rounded-xl`/`2xl`/`3xl` with `shadow-soft` — never a border.
- **Do** set every button, tab, badge, and tag as `rounded-full`.
- **Do** set every button, nav item, tab, tag, and form label in uppercase, letter-tracked IBM Plex Mono.
- **Do** keep every heading and body paragraph in Alike (serif) — never a sans-serif display face.
- **Do** keep `border-2 border-ink-900` on the named circular seal/stamp exceptions only (logo, partner seal, exam-stamp chips, bubble numerals).
- **Do** use `stamp-100`-filled rounded panels (not Tailwind-default red/blue/green/yellow) for error and alert states.

### Don't:
- **Don't** reintroduce any `redpen-*`, `graphite-*`, `paper-*`, or `blueprint-*` token, or Plus Jakarta Sans — all belong to retired directions.
- **Don't** use Tailwind-default `blue-*`, `green-*`, `yellow-*`, `amber-*`, or `gray-*` utility colors anywhere; every color must resolve to a `ledger-*`, `ink-*`, or `stamp-*` token.
- **Don't** add a hard `border`/`border-2`/`border-4` to a card, panel, section, table, or input as a structural device — that's the retired Answer Key system. Use `shadow-soft` and rounded corners instead.
- **Don't** set interactive labels or nav items in sentence case — uppercase-tracked Plex Mono is still the rule.
- **Don't** leave a sharp `rounded-none` card, button, or input sitting next to rounded ones — the whole system rounds now, not just the circular marks.
