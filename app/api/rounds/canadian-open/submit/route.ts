import { NextResponse } from 'next/server'
import { z } from 'zod'
import { FieldValue } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { requireRole } from '@/lib/server/auth'
import { CANADIAN_OPEN_ANSWER_KEY } from '@/lib/server/answer-keys/canadian-open'

const bodySchema = z.object({
  answers: z.record(z.string()),
})

/**
 * Grades the individual "Canadian Open" round. Replaces
 * /api/validate_results, which trusted a client-supplied `userId` with no
 * auth check at all (full IDOR — anyone could overwrite anyone's score).
 * The identity being scored now comes from the verified session cookie.
 */
export async function POST(request: Request) {
  const claims = await requireRole('student')
  if (!claims?.memberId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const scoreRef = adminDb().collection('scores').doc(`${claims.memberId}_canadian_open`)

  // Idempotent: a resubmission (or a script retrying) gets back the
  // original result instead of being re-graded or overwriting it.
  const existing = await scoreRef.get()
  if (existing.exists) {
    return NextResponse.json({ success: true, alreadySubmitted: true })
  }

  let correctCount = 0
  const totalQuestions = Object.keys(CANADIAN_OPEN_ANSWER_KEY).length
  for (const [questionNumber, correctAnswer] of Object.entries(CANADIAN_OPEN_ANSWER_KEY)) {
    if (parsed.data.answers[questionNumber]?.trim() === correctAnswer) {
      correctCount += 1
    }
  }

  await scoreRef.set({
    roundId: 'canadian_open',
    memberId: claims.memberId,
    teamId: claims.teamId ?? null,
    correctCount,
    totalQuestions,
    scoredAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ success: true })
}
