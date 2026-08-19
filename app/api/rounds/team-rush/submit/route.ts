import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/server/auth'
import { gradeTeamRound } from '@/lib/server/gradeTeamRound'
import { TEAM_RUSH_ANSWER_KEY } from '@/lib/server/answer-keys/team-rush'

/**
 * Replaces /api/validate_team_results, which trusted a client-supplied
 * `groupId`/`teamId` with no auth check (IDOR — anyone could submit for any
 * team) and echoed back the correct-answer count to an unauthenticated
 * caller (a brute-force oracle).
 */
export async function POST() {
  const claims = await requireRole('student')
  if (!claims) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await gradeTeamRound(claims, 'team_rush', TEAM_RUSH_ANSWER_KEY)
  return NextResponse.json(result.body, { status: result.status })
}
