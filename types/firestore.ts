/**
 * Canonical shapes for every Firestore document in the project.
 * Anything reading or writing Firestore should import these instead of
 * redeclaring ad-hoc interfaces per page.
 */

import type { Timestamp, FieldValue } from 'firebase/firestore'
import type { Province } from '@/lib/content/provinces'

export type { Province }

export type Conference = 'western' | 'ontario'

/** Round identifiers used throughout the group-stage competition. */
export type RoundId = 'canadian_open' | 'team_rush' | 'capture_the_problem' | 'head_to_head'

// ---------------------------------------------------------------------------
// Registration (public form submission, pre-approval)
// ---------------------------------------------------------------------------

export interface RegistrationMember {
  name: string
  email: string
}

export interface RegistrationTeam {
  index: number
  members: RegistrationMember[]
}

export interface Registration {
  schoolName: string
  province: Province
  teacherName: string
  teacherEmail: string
  teacherPhone: string
  teams: RegistrationTeam[]
  status: 'pending' | 'approved'
  /** set once an admin approves and `schools/{schoolId}` is created */
  schoolId?: string
  submittedAt: Timestamp | FieldValue
}

// ---------------------------------------------------------------------------
// Schools / Teams / Members (created on registration approval)
// ---------------------------------------------------------------------------

export interface School {
  schoolName: string
  province: Province
  teacherName: string
  teacherEmail: string
  teacherPhone: string
  /** Firebase Auth uid for the teacher — the real access-control key. */
  teacherUid: string
  registrationId: string
  createdAt: Timestamp | FieldValue
}

export interface Team {
  schoolId: string
  name: string
  conference: Conference | null
  groupId: string | null
  createdAt: Timestamp | FieldValue
}

export interface TeamMember {
  teamId: string
  schoolId: string
  name: string
  email: string
  /** short code students type on /join; not a secret by itself — identity is proven via session, not this code alone */
  joinCode: string
  createdAt: Timestamp | FieldValue
}

// ---------------------------------------------------------------------------
// Groups (group-stage brackets) — static metadata only, no per-team fields
// ---------------------------------------------------------------------------

export interface GroupTeamRef {
  teamId: string
  /** denormalized so the "other teams in your group" UI doesn't need cross-school lookups */
  name: string
  schoolName: string
}

export interface Group {
  name: string
  conference: Conference
  province: Province
  teams: GroupTeamRef[]
}

/** groups/{groupId}/teamState/{teamId} — presence, visible to the whole group */
export interface TeamPresence {
  online: boolean
  lastSeenAt: Timestamp | FieldValue
}

/** groups/{groupId}/teamState/{teamId}/private/{roundId} — that team's answers, private */
export interface RoundAnswers {
  roundId: RoundId
  answers: Record<string, string>
  submittedAt: Timestamp | FieldValue | null
}

// ---------------------------------------------------------------------------
// Scores — server-write-only
// ---------------------------------------------------------------------------

export interface RoundScore {
  roundId: RoundId
  memberId?: string
  teamId?: string
  correctCount: number
  totalQuestions: number
  scoredAt: Timestamp | FieldValue
}

// ---------------------------------------------------------------------------
// Schedule — admin-editable, drives every countdown/timer in the app
// ---------------------------------------------------------------------------

export interface RoundSchedule {
  roundId: RoundId
  label: string
  startsAt: Timestamp
  durationSeconds: number
}

export interface CompetitionSchedule {
  groupStageStartsAt: Timestamp
  rounds: RoundSchedule[]
}
