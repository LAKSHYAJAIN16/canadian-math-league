'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useStudentSession } from '@/lib/client/useStudentSession'
import { useRoundTiming } from '@/lib/client/useRoundTiming'
import { useGroupTeams } from '@/lib/client/useGroupTeams'
import { setTeamPresence } from '@/lib/client/teamPresence'
import { Loader2, Users, Clock, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

const RULES_DISPLAY_MS = 15_000

// TODO(content owner): sample problems — swap for the real set (see lib/server/answer-keys/capture-the-problem.ts).
const PROBLEMS = [
  { id: 1, text: 'What is 2 + 2?' },
  { id: 2, text: 'What is the square root of 144?' },
  { id: 3, text: 'Solve for x: 3x + 5 = 20' },
  { id: 4, text: 'What is the area of a circle with radius 7? (Use π = 22/7)' },
  { id: 5, text: 'What is the sum of the first 10 natural numbers?' },
  { id: 6, text: 'What is the value of 5! (5 factorial)?' },
  { id: 7, text: 'What is the next number in the sequence: 2, 4, 8, 16, ...?' },
  { id: 8, text: 'What is the value of π (pi) to two decimal places?' },
  { id: 9, text: 'What is the square of 15?' },
  { id: 10, text: 'What is the sum of the interior angles of a triangle?' },
]

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function CaptureTheProblemPage() {
  const router = useRouter()
  const { session, loading: sessionLoading } = useStudentSession()
  const timing = useRoundTiming('capture_the_problem')
  const { teams: otherTeams, groupName, conference } = useGroupTeams(
    session?.groupId ?? null,
    session?.teamId ?? null
  )

  const [teamName, setTeamName] = useState('')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentProblem, setCurrentProblem] = useState(1)
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
    const answersRef = doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'capture_the_problem')
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

    const answersRef = doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'capture_the_problem')
    const update: Record<string, string> = { roundId: 'capture_the_problem' }
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

  const goToProblem = useCallback(
    (n: number) => {
      flushPending()
      setCurrentProblem(n)
    },
    [flushPending]
  )

  const handleSubmit = useCallback(
    async (event?: React.FormEvent) => {
      event?.preventDefault()
      if (hasSubmitted) return
      setIsSubmitting(true)
      try {
        await flushPending()
        const response = await fetch('/api/rounds/capture-the-problem/submit', { method: 'POST' })
        const data = await response.json()
        setResult({ correctAnswers: data.correctCount ?? data.correctAnswers ?? 0, totalQuestions: data.totalQuestions ?? PROBLEMS.length })
        setHasSubmitted(true)
        // Brief pause so the team sees their score before moving on — the
        // next (final) round is Head to Head.
        setTimeout(() => router.push('/o/head-to-head'), 4000)
      } catch (error) {
        console.error('Error submitting answers:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [hasSubmitted, flushPending, router]
  )

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
        <div className="max-w-4xl mx-auto rounded-3xl shadow-soft bg-ledger p-6 md:p-8 text-center">
          <h1 className="font-sans text-2xl md:text-3xl text-ink-900 mb-4 md:mb-6">
            Welcome to Capture the Problem
          </h1>
          <div className="bg-ledger-deep rounded-full inline-flex items-center px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-ink-700 mr-2" />
            <span className="font-mono text-sm md:text-base text-ink-900">Starting in {formatTime(timing.startMs - now)}</span>
          </div>
          <div className="rounded-xl bg-stamp-100 p-4 mb-6">
            <h2 className="font-sans text-xl md:text-2xl text-stamp-700 mb-2">{teamName}</h2>
            <p className="font-mono text-sm text-stamp-700">{groupName}</p>
            {conference && <p className="font-mono text-sm text-stamp-600">{conference} Conference</p>}
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Users className="h-5 w-5 text-ink-700 mr-2" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700">Teams in your group</h3>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {otherTeams.length > 0 ? (
                otherTeams.map((team) => (
                  <div
                    key={team.teamId}
                    className={`flex items-center p-3 rounded-xl ${
                      team.online ? 'shadow-soft bg-stamp-100' : 'bg-ledger-deep'
                    }`}
                  >
                    <div className={`h-2.5 w-2.5 rounded-full mr-3 ${team.online ? 'bg-stamp-500' : 'bg-ink-300'}`} />
                    <div className="flex-1 text-left">
                      <span className="font-medium text-ink-900">{team.name}</span>
                      <span className="text-ink-700 text-sm ml-2">({team.schoolName})</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-mono text-sm text-ink-700 py-4">No other teams in your group yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showingRules) {
    return (
      <div className="max-w-4xl mx-auto rounded-3xl shadow-soft bg-ledger p-6 md:p-8 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-sans text-2xl md:text-3xl text-ink-900">Competition rules</h1>
          <div className="rounded-full bg-stamp-100 text-stamp-700 px-4 py-2 font-mono text-sm font-semibold uppercase tracking-wide">{teamName}</div>
        </div>

        <div className="bg-ledger-deep rounded-full inline-flex items-center px-4 md:px-6 py-2 mb-6">
          <Clock className="h-4 w-4 md:h-5 md:w-5 text-ink-700 mr-2" />
          <span className="font-mono text-sm md:text-base text-ink-900">Starting in {formatTime(rulesEndMs - now)}</span>
        </div>

        <div className="bg-ledger-deep rounded-2xl p-6">
          <h3 className="font-sans text-lg text-ink-900 mb-4">How it works:</h3>
          <ul className="space-y-3 text-ink-700">
            <li>You&apos;ll have {Math.round((timing.endMs - rulesEndMs) / 60000)} minutes to solve {PROBLEMS.length} problems.</li>
            <li>You can navigate freely between problems.</li>
            <li>Your answers are saved automatically as you type.</li>
            <li>The round automatically submits when time runs out.</li>
          </ul>
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
        <p className="font-mono text-sm text-ink-500">Taking you to the final round &mdash; Head to Head...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ledger p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl shadow-soft bg-ledger overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-ledger-line bg-ledger flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-3 sm:mb-0">
              <h1 className="font-sans text-xl text-ink-900">Capture the Problem</h1>
              <span className="ml-3 px-3 py-1 rounded-full bg-stamp-100 text-stamp-700 font-mono text-xs font-medium uppercase tracking-wide">
                {conference}
              </span>
            </div>
            <div className="scoreboard-digit rounded-xl bg-ledger-deep px-4 py-2 font-mono text-base sm:text-lg flex items-center text-ink-900">
              <Clock className="h-4 w-4 text-ink-700 mr-2 flex-shrink-0" />
              <span>{formatTime(timing.endMs - now)}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm font-medium text-ink-700">
                  Problem {currentProblem} of {PROBLEMS.length}
                </span>
                <span className="font-mono text-sm text-ink-700">
                  {Object.keys(answers).length}/{PROBLEMS.length} answered
                </span>
              </div>
              <div className="w-full bg-ledger-deep rounded-full h-2">
                <div
                  className="bg-stamp-600 rounded-full h-full transition-all duration-300"
                  style={{ width: `${(Object.keys(answers).length / PROBLEMS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-ledger-deep rounded-2xl p-6 mb-6">
              <h3 className="font-sans text-xl text-ink-900 mb-4">Problem {currentProblem}</h3>
              <div className="text-lg text-ink-700">{PROBLEMS[currentProblem - 1]?.text}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={answers[currentProblem] ?? ''}
                onChange={(e) => updateAnswer(currentProblem, e.target.value)}
                onFocus={() => { activeProblemRef.current = currentProblem }}
                onBlur={() => { activeProblemRef.current = null }}
                className="w-full px-4 py-3 rounded-xl bg-ledger-deep/60 focus:outline-none focus:ring-2 focus:ring-stamp-600/40 text-base"
                placeholder="Type your answer here..."
                autoFocus
              />

              <div className="flex flex-col-reverse sm:flex-row sm:justify-between pt-4 space-y-3 sm:space-y-0">
                <div className="flex space-x-3">
                  {currentProblem > 1 && (
                    <button
                      type="button"
                      onClick={() => goToProblem(Math.max(1, currentProblem - 1))}
                      className="btn-press px-5 py-2.5 rounded-full shadow-soft hover:shadow-soft-lg font-mono text-xs font-semibold uppercase tracking-wide bg-ledger text-ink-900 hover:bg-ledger-deep transition-colors"
                    >
                      Previous
                    </button>
                  )}
                </div>
                <div className="flex space-x-3">
                  {currentProblem < PROBLEMS.length ? (
                    <button
                      type="button"
                      onClick={() => goToProblem(Math.min(PROBLEMS.length, currentProblem + 1))}
                      className="btn-press px-6 py-2.5 rounded-full shadow-stamp-glow bg-stamp-600 hover:bg-stamp-700 text-ledger font-mono text-xs font-semibold uppercase tracking-wide transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-press px-8 py-2.5 rounded-full shadow-stamp-glow font-mono text-xs font-semibold uppercase tracking-wide bg-stamp-600 hover:bg-stamp-700 text-ledger transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit all answers'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-2xl shadow-soft bg-ledger p-4 mb-6">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-3">Jump to problem:</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {PROBLEMS.map((_, index) => (
              <button
                key={index + 1}
                onClick={() => goToProblem(index + 1)}
                className={`w-full aspect-square rounded-xl flex items-center justify-center font-mono text-sm font-medium transition-colors ${
                  currentProblem === index + 1
                    ? 'bg-stamp-600 text-ledger shadow-stamp-glow'
                    : answers[index + 1]
                      ? 'bg-stamp-100 text-stamp-700 shadow-soft hover:bg-stamp-100/70'
                      : 'bg-ledger-deep text-ink-700 hover:bg-ledger'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
