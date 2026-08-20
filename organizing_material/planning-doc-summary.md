# Summary — "Canadian Math League" planning doc

Source: [Google Doc](https://docs.google.com/document/d/1ZaqgKteclkJ9v34qSqEtcuJE_t9SLcoFH5NZAyWAFas/edit) (3 tabs: General, Trophy, Sponsorship Package). Read and summarized 2026-08-20.

This is an internal working doc (round formats, prize procurement, venue budgets, trophy vendor research), not a finished spec. Values below are copied as written, including rough/unconfirmed numbers and dead-end brainstorm items.

---

## Tab 1: General

### Group Stage

| Round | Details |
|---|---|
| Individual Round — Canadian Open | 20 questions, **1 hour**, AMC12 difficulty |
| Team Rush | 25 questions, **1 hour** |
| H2H (Head-to-Head) | no details given |

### Regionals

| Round | Details |
|---|---|
| Individual Round | 15 questions, 1 hour, AIME / late-AMC12 difficulty. Tiebreakers decide the individual champion but tiebreaker points don't add to the team score. *(15-minute break follows.)* |
| Guts Round | 35 questions, **80 minutes**, 7 sets |
| MEGA Guts | 4 sets — A, G, C, N (subject areas) — 3 problems each, 45 minutes, partial marks possible. *(45-minute lunch break follows; tiebreakers happen during it.)* |
| Math Royale | MATHCOUNTS-style buzzer round, first-to-answer wins, 1 hour. 5 questions × 3 rounds. Scoring ideas listed but unresolved: "Triangle Points," "Countdown (regular questions)," "6 or 7," "It's too Complex." Links to buy physical buzzer systems (Amazon, eBay). |

Also mentioned, not elsewhere fleshed out: an **"Integration Bee"** round (link to a sample bee problem set), plus loose swag/prize ideas — "Labubus," calculus books.

### Prizes

No cash amounts appear anywhere in this section — everything is physical:

- **National Championships — Grand Prize**: a trophy (link to wilsontrophy.ca, "AMC61 Gold" style)
- **Qualifier Awards**: medals for the winning *and* losing team in each match (2 × 5 = 10), certificates (including for the chaperone), a corporate trophy/shield option from Etsy at ~$20 each
- **Group Champions**: placeholder, left blank ("-")
- **Certificates (Participants and Wildcard teams)**: free
- **Others**: two book-prize ideas (a geometry book, a non-Euclidean geometry book), a Vistaprint design job (~$60), custom medals from gsjj.ca (~$120)

Note: the doc introduces a **"Wildcard teams"** concept that doesn't appear on the current site.

### Logistics (venue budgeting)

**Ontario:**
- Food $150, Awards $200, Supplies $100 (printing, 72 file folders, a label maker) → non-venue total $450, i.e. **$275/team** at 6 teams
- Venue: $1,300 → **~$1,500/venue** after assuming ~$200 in small sponsorships
- Combined totals sketched two ways: ($2,000 venue → $2,500 total → **$83/person** at 6 teams) or ($1,500 venue → $2,000 total → **$67/person** at 6 teams)

**Vancouver:**
- Alma VanDusen Room (vpl.ca): ~$2,000 overall, "lower if we're a non-profit"
- A UBC Robson Square room: pricier alternative

These are cost estimates, not a stated participant fee — the doc doesn't say whether this cost is passed on to teams or covered by sponsorship/the organization. Worth resolving before claiming Regionals is free to attend.

---

## Tab 2: Trophy

Pure vendor comparison for the physical trophy, two options:

1. Wood trophy blanks (photos of unfinished wood blocks) — Michaels craft-store supplies (mod podge photo transfer, etc.)
2. awardsofdistinction.ca — a professional trophy vendor

No copy or numbers beyond this; a procurement decision, not content.

---

## Tab 3: Sponsorship Package

Short — a mission statement and a "why sponsor" pitch, no tier table (Platinum/Gold/Silver/Bronze, as currently shown on `/about/sponsors` and in the marketing prospectus, isn't in this doc at all).

**What is the Canadian Math League?**
> The Canadian Math League is a national mathematics competition that brings together students from across Canada to celebrate mathematical excellence and problem-solving. Our mission is to inspire and challenge young mathematicians while fostering a love for mathematics.
>
> We are Canada's premier mathematics competition, recognized for fostering academic excellence and nurturing the next generation of mathematical leaders.

**Why Sponsor Us?**
> Sponsoring our competitions provides unparalleled access to a carefully curated network that includes not only these promising students but also the dedicated educators, school administrators, and parents who support them. Our participants come from diverse backgrounds and the top competitive students... helping to remove financial barriers that might prevent talented students from participating. Your contribution funds everything from competition materials and venue costs to travel grants for students from remote communities. This ensures that every student, regardless of their socioeconomic background, has the opportunity to test their skills, gain confidence, and discover their potential in mathematics. In doing so, you're not just sponsoring a competition, you're investing in Canada's future STEM leadership and helping to build a stronger, more innovative nation.

(Confirms "Canada's premier mathematics competition" as the doc's own phrasing — matches the hero headline already restored on the site.)

---

## Discrepancies vs. the live site / recent marketing material

1. **Prizes**: site and the new prospectus/Instagram posts state $5,000 / $2,500 / $1,500 cash. This doc shows no cash prizes at all, only trophies/medals/certificates. `lib/content/season.ts` itself marks the cash figures as unconfirmed (`TODO(content owner)`).
2. **"Free" claims**: Instagram posts say "Free entry" unqualified; PRODUCT.md's free guarantee is scoped to the Group Stage only, and this doc's Regionals budgeting implies a possible ~$67–83/person cost that isn't resolved either way.
3. **Round timings**: Canadian Open (45 min on site vs. 1 hour here), Team Rush (10Q/30 min on site vs. 25Q/1 hour here), Guts Round (45 min on site vs. 80 min here), Power/MEGA Guts (30 min on site vs. 45 min here) all disagree.
4. **Concepts on the doc not on the site**: Integration Bee, Wildcard teams.
5. **Sponsorship tiers** (Platinum/Gold/Silver/Bronze) exist on the site and in the new prospectus but not in this doc at all — their source is unclear.
