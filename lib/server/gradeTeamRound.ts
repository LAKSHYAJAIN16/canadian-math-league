import 'server-only'

import { FieldValue } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import type { RoundId } from '@/types/firestore'
import type { SessionClaims } from '@/lib/server/auth'

/**
 * Shared grading path for the two team-based group-stage rounds (Team Rush,
 * Capture the Problem). Reads the team's already-saved answers from
 * groups/{groupId}/teamState/{teamId}/private/{roundId} (written directly by
 * the client, which Firestore rules restrict to that team only), grades
 * them server-side against the given answer key, and records the result.
 * Idempotent — a second call returns the first result instead of re-grading.
 */
export async function gradeTeamRound(
  claims: SessionClaims,
  roundId: RoundId,
  answerKey: Record<number, string>
) {
  if (!claims.teamId || !claims.groupId) {
    return { status: 401 as const, body: { error: 'Unauthorized' } }
  }

  const scoreRef = adminDb().collection('scores').doc(`${claims.teamId}_${roundId}`)
  const existingScore = await scoreRef.get()
  if (existingScore.exists) {
    return { status: 200 as const, body: { success: true, alreadySubmitted: true, ...existingScore.data() } }
  }

  const answersRef = adminDb()
    .collection('groups')
    .doc(claims.groupId)
    .collection('teamState')
    .doc(claims.teamId)
    .collection('private')
    .doc(roundId)

  const answersSnap = await answersRef.get()
  const answers = (answersSnap.data()?.answers ?? {}) as Record<string, string>

  let correctCount = 0
  const totalQuestions = Object.keys(answerKey).length
  for (const [questionNumber, correctAnswer] of Object.entries(answerKey)) {
    if (answers[questionNumber]?.trim() === correctAnswer) {
      correctCount += 1
    }
  }

  await scoreRef.set({
    roundId,
    teamId: claims.teamId,
    correctCount,
    totalQuestions,
    scoredAt: FieldValue.serverTimestamp(),
  })
  await answersRef.set({ submittedAt: FieldValue.serverTimestamp() }, { merge: true })

  return { status: 200 as const, body: { success: true, correctAnswers: correctCount, totalQuestions } }
}
