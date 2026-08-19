import 'server-only'

import { adminDb } from '@/lib/firebase/admin'
import { SEASON_STAGES } from '@/lib/content/season'

/**
 * Live round timing lives in Firestore (config/schedule) instead of being
 * hardcoded per-page, so shifting a round's start time is a data edit an
 * admin can make, not a redeploy. Falls back to the marketing-page date
 * (see lib/content/season.ts) until an admin sets the real doc.
 */
export async function getGroupStageStartMs(): Promise<number> {
  const snap = await adminDb().doc('config/schedule').get()
  const startsAt = snap.data()?.groupStageStartsAt
  if (startsAt?.toMillis) return startsAt.toMillis()

  return new Date(`${SEASON_STAGES.groupStage.date}T11:00:00-05:00`).getTime()
}
