/**
 * Single source of truth for season/competition content shown across the
 * marketing site (home, /format, /how-it-works, /2025-season) and the
 * teacher dashboard countdown. Previously these dates/numbers were
 * hardcoded independently in each page and had already drifted — e.g. the
 * home page said Regionals was Feb 15, 2026 while /format said Jan 18–19.
 *
 * TODO(content owner): the values below were picked from whichever page's
 * copy looked most authoritative during the rework; please confirm the real
 * dates/numbers before launch and update here — every page will follow.
 */

export type StageId = 'groupStage' | 'regionals' | 'nationals'

export interface SeasonStage {
  id: StageId
  title: string
  /** ISO date string, date-only (no time) — used for display, not for live round timing. */
  date: string
  displayDate: string
  location: string
  participants: string
  description: string
}

export const SEASON_STAGES: Record<StageId, SeasonStage> = {
  groupStage: {
    id: 'groupStage',
    title: 'Group Stage',
    date: '2025-12-17',
    displayDate: 'December 17, 2025',
    location: 'Online',
    participants: '32 teams (16 per conference)',
    description:
      'Schools compete online in conference groups. Free to enter — every high school student is welcome.',
  },
  regionals: {
    id: 'regionals',
    title: 'Regionals',
    // TODO(content owner): home page previously said Feb 15, 2026 — /format said Jan 18–19, 2026.
    date: '2026-01-18',
    displayDate: 'January 18–19, 2026',
    location: 'Toronto, ON & Vancouver, BC',
    participants: '12 teams (6 per conference)',
    description: 'Top group-stage teams face off in person for a spot at Nationals.',
  },
  nationals: {
    id: 'nationals',
    title: 'Nationals',
    // TODO(content owner): home page previously said Feb 21, 2026 — /format said "TBD".
    date: '2026-02-21',
    displayDate: 'February 21, 2026',
    location: 'Toronto, ON',
    participants: '6 finalist teams',
    description: "Canada's top math teams compete for the national title.",
  },
}

export const SEASON_STAGE_ORDER: StageId[] = ['groupStage', 'regionals', 'nationals']

export const REGISTRATION_DEADLINES = {
  early: 'Until November 15, 2025',
  final: 'December 1, 2025',
}

/** Splits a stage's ISO date into the day-number + "MON YYYY" pieces the schedule badges use. */
export function formatDateBadge(isoDate: string): { day: string; monthYear: string } {
  const date = new Date(`${isoDate}T00:00:00`)
  return {
    day: date.getDate().toString(),
    monthYear: `${date.toLocaleString('en-US', { month: 'short' }).toUpperCase()} ${date.getFullYear()}`,
  }
}

export interface PrizeTier {
  title: string
  amount: string
  description: string
}

// TODO(content owner): confirm these are the real prize amounts before launch.
export const PRIZE_TIERS: PrizeTier[] = [
  { title: 'Champion', amount: '$5,000', description: 'Top performer in the senior division' },
  { title: 'Runner-Up', amount: '$2,500', description: 'Second place in the senior division' },
  { title: 'Top Junior', amount: '$1,500', description: 'Top performer in the junior division' },
]

/**
 * Default group-stage round schedule, used only until an admin sets a real
 * `config/schedule` document in Firestore (see lib/server/schedule.ts and
 * lib/client/useRoundTiming.ts). Durations come from /format's published
 * rules; previously each /o/* competition page hardcoded its own absolute
 * "December ..." Date, none of which agreed with each other or with
 * /format's stated durations. Rounds are laid out back-to-back after the
 * Group Stage start time with a 5-minute buffer between each.
 */
export const DEFAULT_ROUND_SCHEDULE: Array<{
  roundId: 'canadian_open' | 'team_rush' | 'capture_the_problem' | 'head_to_head'
  label: string
  startOffsetMinutes: number
  durationSeconds: number
}> = [
  { roundId: 'canadian_open', label: 'Canadian Open', startOffsetMinutes: 0, durationSeconds: 45 * 60 },
  { roundId: 'team_rush', label: 'Team Rush', startOffsetMinutes: 50, durationSeconds: 30 * 60 },
  {
    roundId: 'capture_the_problem',
    label: 'Capture the Problem',
    startOffsetMinutes: 85,
    durationSeconds: 20 * 60,
  },
  { roundId: 'head_to_head', label: 'Head to Head Matchups', startOffsetMinutes: 110, durationSeconds: 2 * 60 },
]
