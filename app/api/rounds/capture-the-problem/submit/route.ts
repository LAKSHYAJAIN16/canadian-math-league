import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/server/auth'
import { gradeTeamRound } from '@/lib/server/gradeTeamRound'
import { CAPTURE_THE_PROBLEM_ANSWER_KEY } from '@/lib/server/answer-keys/capture-the-problem'

export async function POST() {
  const claims = await requireRole('student')
  if (!claims) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await gradeTeamRound(claims, 'capture_the_problem', CAPTURE_THE_PROBLEM_ANSWER_KEY)
  return NextResponse.json(result.body, { status: result.status })
}
