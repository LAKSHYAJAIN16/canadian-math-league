import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/server/auth'
import { gradeTeamRound } from '@/lib/server/gradeTeamRound'
import { HEAD_TO_HEAD_ANSWER_KEY } from '@/lib/server/answer-keys/head-to-head'

export async function POST() {
  const claims = await requireRole('student')
  if (!claims) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await gradeTeamRound(claims, 'head_to_head', HEAD_TO_HEAD_ANSWER_KEY)
  return NextResponse.json(result.body, { status: result.status })
}
