# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Students** (high-school, across Canada) — join a school team, register via a teacher, and compete on scheduled competition days through timed, fullscreen, sometimes team-collaborative rounds.
- **Teachers/coaches** — register their school and up to 3 teams (5 students each), then manage the roster and share join codes from a dashboard once approved.
- **Admins** (League organizers) — review and approve incoming school registrations, which provisions the teacher's account and generates the teams/join codes.
- **Prospective sponsors, parents, and the general public** — arrive via the marketing site to understand the format, prizes, and how to register or support the League.

*(Inferred from the existing codebase and this session's prior work, not a live interview — the user directed me to proceed without further questions.)*

## Product Purpose

The Canadian Math League (CML) is a free, team-based mathematics competition for
Canadian high-school students, run in partnership with the Canadian
Mathematical Society. It exists to grow a national competitive-math culture
by giving schools — not just individual students — a tournament to enter
together, at no cost.

## Positioning

Unlike a single-round written exam, CML runs a full tournament structure:
an online **Group Stage** (free, open entry) feeding into in-person
**Regional Championships** (Western/Vancouver and Ontario/Toronto
conferences), feeding into a **National Championship**. The Group Stage
itself mixes round formats — an AMC-style individual round (*Canadian
Open*), a collaborative numeric round (*Team Rush*), a competitive
problem-grid race (*Capture the Problem*), and short head-to-head matchups —
rather than one exam format repeated.

## Operating Context

- Public registration form → admin review/approval → teacher account
  provisioned (passwordless email-link) → teams and per-student join codes
  generated.
- Teachers manage their roster and retrieve join codes from
  `/platform/dashboard` and `/platform/student-details`.
- On competition day, students authenticate with a join code
  (`/join` → anonymous session tied to their team) and move through
  fullscreen, timed rounds with live teammate-presence indicators and
  anti-cheat warnings (`/o/competition`, `/o/team-competition`,
  `/o/capture-the-problem`).
- Round timing and season dates are centralized in
  `lib/content/season.ts` / Firestore `config/schedule`, not hardcoded
  per page.

## Capabilities and Constraints

- **Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS +
  Framer Motion, Firebase (Auth + Firestore, client/admin SDK split).
  This is an existing, working codebase — not greenfield.
- Real Firebase Authentication for all three roles (admin
  email/password, teacher passwordless email-link, student anonymous +
  server-verified custom claims); session cookies verified server-side.
- Firestore schema and access rules are defined in `firestore.rules`.
- Some competition content is still explicit placeholder pending the
  organizer's real numbers: exact Regional/National dates, prize
  amounts, and the group-stage question sets (`TODO(content owner)` in
  `lib/content/season.ts` and `lib/server/answer-keys/*`).
- No real sponsors exist yet — `/about/sponsors` says so honestly; do
  not fabricate sponsor logos or claims anywhere in the redesign.

## Brand Commitments

- Name: **Canadian Math League** (CML).
- Existing logo asset at `public/logo.png`.
- Red-forward color identity already in use (Canada association) —
  treat as evidence for the new visual world, not a hard lock.
- Named partnership with the **Canadian Mathematical Society** (shown
  in the current hero).
- Adjacent/inspiration competitions referenced in copy: AMC (Canadian
  Open format), HMMT (Guts Round format), MATHCOUNTS (MathRoyale
  format) — these are format inspirations, not sponsors or partners.

## Evidence on Hand

- `public/logo.png`, `public/canadian-open-logo.svg` — real CML assets.
- `public/comc.jpg`, `public/maa.png`, `public/mathcounts.png`,
  `public/waterloo.png` — real math-competition-adjacent logos, currently
  unused; provenance/permission to display as "inspired by" credits is
  unconfirmed, so treat as available assets, not verified partnerships.
- No sponsor logos, testimonials, press mentions, or participation
  statistics are confirmed real; the previous design fabricated a
  big-tech sponsor marquee and invented stats, which this session's
  prior security/architecture pass already removed. Do not reintroduce
  fabricated proof elements during the redesign.

## Product Principles

1. **Free and open** — no cost barrier to enter the Group Stage; design
   should never make the competition feel exclusive or paywalled.
2. **School-team camaraderie over solo-exam anxiety** — even
   individually-scored rounds happen inside a team context; visuals
   should carry team/tournament energy, not sterile-test-prep energy.
3. **National in scope** — spans Western and Ontario conferences;
   avoid visual choices that read as one-region-only.
4. **Format variety is the differentiator** — the four distinct
   Group Stage round types are the product's real edge over a
   single-exam competition; the design should make that legible, not
   flatten it into one generic "competition" story.
5. **Earned trust over manufactured credibility** — this project just
   went through a full security rework specifically because the old
   site faked sponsors/stats and had broken auth; the redesign must
   stay honest about what's real (no fabricated logos, numbers, or
   testimonials).

## Accessibility & Inclusion

No project-specific accessibility requirement has been established
beyond general web standards; treat standard WCAG AA practices as the
baseline during the redesign.
