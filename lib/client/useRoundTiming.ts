'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { DEFAULT_ROUND_SCHEDULE, SEASON_STAGES } from '@/lib/content/season'
import type { RoundId } from '@/types/firestore'

export interface RoundTiming {
  startMs: number
  endMs: number
}

function defaultTiming(roundId: RoundId): RoundTiming | null {
  const round = DEFAULT_ROUND_SCHEDULE.find((r) => r.roundId === roundId)
  if (!round) return null

  const groupStageStartMs = new Date(`${SEASON_STAGES.groupStage.date}T11:00:00-05:00`).getTime()
  const startMs = groupStageStartMs + round.startOffsetMinutes * 60 * 1000
  return { startMs, endMs: startMs + round.durationSeconds * 1000 }
}

/**
 * Reads a round's start/end time from Firestore (config/schedule, editable
 * by an admin without a redeploy) and falls back to a computed default
 * (lib/content/season.ts) if the admin hasn't set one yet.
 */
export function useRoundTiming(roundId: RoundId): RoundTiming | null {
  const [timing, setTiming] = useState<RoundTiming | null>(() => defaultTiming(roundId))

  useEffect(() => {
    let cancelled = false

    getDoc(doc(db, 'config', 'schedule'))
      .then((snap) => {
        if (cancelled) return
        const rounds = snap.data()?.rounds as
          | Array<{ roundId: string; startsAt: Timestamp; durationSeconds: number }>
          | undefined
        const round = rounds?.find((r) => r.roundId === roundId)
        if (round?.startsAt) {
          const startMs = round.startsAt.toMillis()
          setTiming({ startMs, endMs: startMs + round.durationSeconds * 1000 })
        }
      })
      .catch(() => {
        // Fall back to the computed default already in state.
      })

    return () => {
      cancelled = true
    }
  }, [roundId])

  return timing
}
