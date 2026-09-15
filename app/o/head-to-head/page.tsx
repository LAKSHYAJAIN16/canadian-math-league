'use client'

import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useStudentSession } from '@/lib/client/useStudentSession'
import { useRoundTiming } from '@/lib/client/useRoundTiming'
import { useGroupTeams } from '@/lib/client/useGroupTeams'
import { setTeamPresence } from '@/lib/client/teamPresence'
import { Loader2, Swords, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

const RULES_DISPLAY_MS = 15_000

// TODO(content owner): sample problems — swap for the real Head to Head set (see lib/server/answer-keys/head-to-head.ts).
const PROBLEMS = [
  { id: 1, text: 'What is 9 × 6?' },
  { id: 2, text: 'What is 17 + 28?' },
  { id: 3, text: 'What is the value of 3⁴?' },
  { id: 4, text: 'How many degrees are in the interior angles of a pentagon?' },
  { id: 5, text: 'What is 144 ÷ 12?' },
]

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function HeadToHeadPage() {
  const { session, loading: sessionLoading } = useStudentSession()
  const timing = useRoundTiming('head_to_head')
  const { allTeams, groupName } = useGroupTeams(session?.groupId ?? null, session?.teamId ?? null)

  const [teamName, setTeamName] = useState('')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [now, setNow] = useState(Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [result, setResult] = useState<{ correctAnswers: number; totalQuestions: number } | null>(null)

  // Tracks the problem currently being typed into, so an incoming snapshot
  // from a teammate's edit never overwrites a keystroke that hasn't landed
  // in Firestore yet.
  const activeProblemRef = useRef<number | null>(null)
  // Values changed locally but not yet flushed to Firestore (debounced).
  const pendingRef = useRef<Record<number, string>>({})
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Matchups are two teams at a time, paired by their fixed position in the
  // group's roster (0v1, 2v3, ...) rather than a separate pairing doc —
  // stable for every client without any extra admin setup.
  const opponent = useMemo(() => {
    if (!session) return null
    const myIndex = allTeams.findIndex((t) => t.teamId === session.teamId)
    if (myIndex === -1) return null
    const pairedIndex = myIndex % 2 === 0 ? myIndex + 1 : myIndex - 1
    return allTeams[pairedIndex] ?? null
  }, [allTeams, session])

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!session) return
    getDoc(doc(db, 'schools', session.schoolId, 'teams', session.teamId)).then((snap) => {
      setTeamName((snap.data()?.name as string) ?? 'Your Team')
    })
  }, [session])

  useEffect(() => {
    if (!session?.groupId) return
    setTeamPresence(session.groupId, session.teamId, true).catch(() => {})
    return () => {
      setTeamPresence(session.groupId!, session.teamId, false).catch(() => {})
    }
  }, [session])

  // Hydrate from — and stay live-synced with — the team's shared answer
  // sheet, so a refresh or a teammate joining mid-round sees real progress
  // instead of a blank form, and one member's typing shows up for the rest
  // of the team without anyone needing to reload.
  useEffect(() => {
    if (!session?.groupId) return
    const answersRef = doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'head_to_head')
    const unsubscribe = onSnapshot(answersRef, (snap) => {
      const remote = (snap.data()?.answers as Record<string, string>) ?? {}
      setAnswers((prev) => {
        const next: Record<number, string> = { ...prev, ...remote }
        const active = activeProblemRef.current
        if (active != null && active in pendingRef.current) {
          next[active] = pendingRef.current[active]
        }
        return next
      })
    })
    return unsubscribe
  }, [session])

  const flushPending = useCallback(async () => {
    if (flushTimerRef.current) {
      clearTimeout(flushTimerRef.current)
      flushTimerRef.current = null
    }
    const pending = pendingRef.current
    const ids = Object.keys(pending)
    if (ids.length === 0 || !session?.groupId) return
    pendingRef.current = {}

    const answersRef = doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'head_to_head')
    const update: Record<string, string> = { roundId: 'head_to_head' }
    for (const id of ids) {
      update[`answers.${id}`] = pending[Number(id)]
    }
    await setDoc(answersRef, update, { merge: true }).catch(() => {})
  }, [session])

  const updateAnswer = useCallback(
    (problemId: number, value: string) => {
      setAnswers((prev) => ({ ...prev, [problemId]: value }))
      pendingRef.current[problemId] = value
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current)
      flushTimerRef.current = setTimeout(() => {
        flushPending()
      }, 500)
    },
    [flushPending]
  )

  const handleSubmit = useCallback(async () => {
    if (hasSubmitted) return
    setIsSubmitting(true)
    try {
      await flushPending()
      const response = await fetch('/api/rounds/head-to-head/submit', { method: 'POST' })
      const data = await response.json()
      setResult({
        correctAnswers: data.correctCount ?? data.correctAnswers ?? 0,
        totalQuestions: data.totalQuestions ?? PROBLEMS.length,
      })
      setHasSubmitted(true)
    } catch (error) {
      console.error('Error submitting Head to Head answers:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [hasSubmitted, flushPending])

  // Auto-submit once the round's end time passes, same as the manual Submit
  // button. Declared before any early return so hook order stays stable.
  useEffect(() => {
    if (!timing) return
    if (now >= timing.startMs + RULES_DISPLAY_MS && now >= timing.endMs) {
      handleSubmit()
    }
  }, [timing, now, handleSubmit])

  if (sessionLoading || !session || !timing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ledger">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-stamp-600 animate-spin mx-auto mb-4" />
          <p className="font-mono text-sm text-ink-700">Loading competition...</p>
        </div>
      </div>
    )
  }

  const rulesEndMs = timing.startMs + RULES_DISPLAY_MS
  const beforeStart = now < timing.startMs
  const showingRules = !beforeStart && now < rulesEndMs

  if (beforeStart) {
    return (
      <div className="min-h-screen bg-ledger p-4 md:p-6">
        <div className="max-w-3xl mx-auto rounded-3xl shadow-soft bg-ledger p-6 md:p-8 text-center">
          <h1 className="font-sans text-2xl md:text-3xl text-ink-900 mb-2">Welcome, {teamName}!</h1>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-500 mb-6">{groupName}</p>

          <div className="rounded-2xl bg-stamp-100 p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Swords className="h-5 w-5 text-stamp-700" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-700">
                Final round &mdash; head to head
              </span>
            </div>
            <p className="font-sans text-2xl text-stamp-700">
              {opponent ? `You vs. ${opponent.name}` : 'Waiting to be matched with an opponent'}
            </p>
          </div>

          <p className="text-ink-700 mb-2">The round starts in:</p>
          <div className="scoreboard-digit font-sans text-6xl text-ink-900">{formatTime(timing.startMs - now)}</div>
        </div>
      </div>
    )
  }

  if (showingRules) {
    return (
      <div className="max-w-4xl mx-auto rounded-3xl shadow-soft bg-ledger p-6 md:p-8 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-sans text-2xl md:text-3xl text-ink-900">Head to Head rules</h1>
          <div className="rounded-full bg-stamp-100 text-stamp-700 px-4 py-2 font-mono text-sm font-semibold uppercase tracking-wide">
            vs. {opponent?.name ?? 'TBD'}
          </div>
        </div>

        <div className="bg-ledger-deep rounded-2xl p-6">
          <h3 className="font-sans text-lg text-ink-900 mb-4">How it works:</h3>
          <ul className="space-y-3 text-ink-700">
            <li>Your team and {opponent?.name ?? 'your matched opponent'} get the same {PROBLEMS.length} problems.</li>
            <li>You have {Math.round((timing.endMs - rulesEndMs) / 1000)} seconds &mdash; the team with the most correct answers wins.</li>
            <li>Answers are saved automatically as your team types.</li>
            <li>The round automatically submits when time runs out.</li>
          </ul>
          <div className="mt-6 p-4 rounded-xl bg-stamp-100">
            <p className="font-mono text-sm text-stamp-700">
              <span className="font-semibold">On cheating:</span> Any form of cheating will result
              in immediate disqualification of the entire team.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-ink-700 mb-4">Starting in:</p>
          <div className="scoreboard-digit font-sans text-3xl text-ink-900">{formatTime(rulesEndMs - now)}</div>
        </div>
      </div>
    )
  }

  if (hasSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 rounded-3xl shadow-soft bg-ledger p-8 text-center">
        <CheckCircle className="h-16 w-16 text-stamp-600 mx-auto mb-4" />
        <h1 className="font-sans text-3xl text-ink-900 mb-2">Submitted!</h1>
        {result && (
          <p className="text-lg text-ink-700 mb-2">
            Your team got {result.correctAnswers} out of {result.totalQuestions} correct.
          </p>
        )}
        <p className="text-ink-700">
          That was the final round of the Group Stage. Results for your matchup against{' '}
          {opponent?.name ?? 'your opponent'} will be announced once every team has submitted.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ledger p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-sans text-3xl text-ink-900">Head to Head</h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stamp-100 text-stamp-700 font-mono text-xs font-semibold uppercase tracking-wide">
              <Swords className="h-3.5 w-3.5" />
              vs. {opponent?.name ?? 'TBD'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="scoreboard-digit rounded-xl bg-ink-900 text-ledger px-4 py-2 font-mono text-xl">
              {formatTime(timing.endMs - now)}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-press rounded-full font-mono text-xs font-semibold uppercase tracking-wide py-2 px-6 bg-stamp-600 shadow-stamp-glow hover:bg-stamp-700 text-ledger transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl shadow-soft bg-ledger p-6">
          <div className="space-y-6">
            {PROBLEMS.map((problem) => (
              <div key={problem.id} className="py-4 border-b border-ledger-line last:border-b-0">
                <div className="flex">
                  <span className="font-mono font-bold text-lg mr-3 text-ink-700">{problem.id}.</span>
                  <p className="text-lg text-ink-900">{problem.text}</p>
                </div>
                <div className="mt-3 ml-4">
                  <input
                    type="text"
                    value={answers[problem.id] ?? ''}
                    onChange={(e) => updateAnswer(problem.id, e.target.value)}
                    onFocus={() => { activeProblemRef.current = problem.id }}
                    onBlur={() => { activeProblemRef.current = null }}
                    className="w-full px-3 py-2 rounded-xl bg-ledger-deep/60 text-lg focus:outline-none focus:ring-2 focus:ring-stamp-600/40"
                    placeholder="Your answer"
                    autoFocus={problem.id === 1}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
