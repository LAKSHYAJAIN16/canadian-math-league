'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useStudentSession } from '@/lib/client/useStudentSession'
import { useRoundTiming } from '@/lib/client/useRoundTiming'
import { useGroupTeams } from '@/lib/client/useGroupTeams'
import { setTeamPresence } from '@/lib/client/teamPresence'
import { Loader2, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

const RULES_DISPLAY_MS = 15_000

// TODO(content owner): sample questions — swap for the real Team Rush set (see lib/server/answer-keys/team-rush.ts).
const QUESTIONS = [
  {
    id: 1,
    text: `Emily Thorne is throwing a Memorial Day Party and is trying to figure out the seating
arrangement for all of her guests. If she seated 4 guests to a table, there would be 1 guest
left over; if she seated 5 to a table, there would be 3 left over; and if she seated 6 to a
table, there would again be 1 left over. If there are at least 100 but no more than 200 guests,
what is the greatest possible number of guests?`,
  },
  { id: 2, text: 'If cos(2°) − sin(4°) − cos(6°) + sin(8°) ... + sin(88°) = sec(θ) − tan(θ), what is θ?' },
  { id: 3, text: 'What is 2 to the power of 10?' },
  { id: 4, text: 'Find the area of a circle with radius 7. (Use π = 22/7)' },
  { id: 5, text: 'What is the least common multiple of 12 and 18?' },
  { id: 6, text: 'Solve for x: 3x - 7 = 14' },
  { id: 7, text: 'What is the sum of the interior angles of a hexagon?' },
  { id: 8, text: 'If a triangle has sides 5, 12, and 13, what is its area?' },
  { id: 9, text: 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?' },
  { id: 10, text: 'What is the value of 10! (10 factorial)?' },
]

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function TeamCompetitionPage() {
  const router = useRouter()
  const { session, loading: sessionLoading } = useStudentSession()
  const timing = useRoundTiming('team_rush')
  const { teams: otherTeams, groupName } = useGroupTeams(session?.groupId ?? null, session?.teamId ?? null)

  const [teamName, setTeamName] = useState('')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [now, setNow] = useState(Date.now())
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Tracks the question currently being typed into, so an incoming snapshot
  // from a teammate's edit never overwrites a keystroke that hasn't landed
  // in Firestore yet.
  const activeQuestionRef = useRef<number | null>(null)
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
    const answersRef = doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'team_rush')
    const unsubscribe = onSnapshot(answersRef, (snap) => {
      const remote = (snap.data()?.answers as Record<string, string>) ?? {}
      setAnswers((prev) => {
        const next: Record<number, string> = { ...prev, ...remote }
        const active = activeQuestionRef.current
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

    const answersRef = doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'team_rush')
    const update: Record<string, string> = { roundId: 'team_rush' }
    for (const id of ids) {
      update[`answers.${id}`] = pending[Number(id)]
    }
    await setDoc(answersRef, update, { merge: true }).catch(() => {})
  }, [session])

  const updateAnswer = useCallback(
    (questionId: number, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }))
      pendingRef.current[questionId] = value
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current)
      flushTimerRef.current = setTimeout(() => {
        flushPending()
      }, 500)
    },
    [flushPending]
  )

  const handleSubmit = useCallback(async () => {
    if (hasSubmitted) return
    setHasSubmitted(true)
    try {
      await flushPending()
      await fetch('/api/rounds/team-rush/submit', { method: 'POST' })
    } catch (error) {
      console.error('Error submitting Team Rush answers:', error)
    }
    router.push('/o/capture-the-problem')
  }, [hasSubmitted, flushPending, router])

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
          <Loader2 className="h-12 w-12 animate-spin text-stamp-600 mx-auto mb-4" />
          <p className="text-lg text-ink-700">Loading your team information...</p>
        </div>
      </div>
    )
  }

  const rulesEndMs = timing.startMs + RULES_DISPLAY_MS
  const beforeStart = now < timing.startMs
  const showingRules = !beforeStart && now < rulesEndMs

  if (beforeStart) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-ledger">
        <div className="w-full max-w-4xl border-2 border-ink-900 bg-ledger overflow-hidden p-8 text-center">
          <h1 className="font-sans text-5xl text-ink-900 mb-2">Welcome, {teamName}!</h1>
          <h2 className="font-sans text-3xl text-ink-700 mb-10">{groupName || 'Your Group'}</h2>
          <div className="scoreboard-digit font-sans text-8xl text-ink-900 mb-12">{formatTime(timing.startMs - now)}</div>

          <div className="flex items-center justify-center mb-4">
            <Users className="h-5 w-5 text-ink-700 mr-2" />
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700">Teams in your group</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {otherTeams.map((team) => (
              <div key={team.teamId} className="bg-ledger p-6 border-2 border-ink-900">
                <div className="flex items-center space-x-3">
                  <span className={`inline-block w-3 h-3 rounded-full ${team.online ? 'bg-stamp-500' : 'bg-ink-300'}`} />
                  <p className="text-lg font-medium text-ink-700">{team.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showingRules) {
    return (
      <div className="w-full max-w-4xl mt-[5%] mx-auto">
        <h1 className="font-sans text-4xl text-ink-900 text-center mb-8">Round 2: Team Rush</h1>
        <div className="border-2 border-ink-900 bg-ledger p-8 mt-8">
          <h2 className="font-sans text-2xl text-ink-900 mb-6">Team challenge rules</h2>
          <ul className="text-left space-y-4 text-ink-700 text-lg">
            <li>Your team will be presented with 10 questions that require numerical answers.</li>
            <li>Work together with your team to solve all questions within the time limit.</li>
            <li>Answers are saved automatically as your team types.</li>
          </ul>
          <div className="mt-8 p-4 border-2 border-stamp-600 bg-stamp-100">
            <p className="font-mono text-sm text-stamp-700">
              <span className="font-semibold">On cheating:</span> Any form of cheating will result
              in immediate disqualification of the entire team.
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-ink-700 mb-4">The round will begin in:</p>
            <div className="scoreboard-digit font-sans text-3xl text-ink-900">{formatTime(rulesEndMs - now)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ledger p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-sans text-3xl text-ink-900">Team Rush</h2>
          <div className="flex items-center space-x-4">
            <div className="scoreboard-digit bg-ink-900 text-ledger px-4 py-2 font-mono text-xl">
              {formatTime(timing.endMs - now)}
            </div>
            <button
              onClick={handleSubmit}
              disabled={hasSubmitted}
              className={`btn-press font-mono text-xs font-semibold uppercase tracking-wide py-2 px-6 transition-colors ${
                hasSubmitted
                  ? 'bg-ink-300 cursor-not-allowed text-ledger'
                  : 'bg-stamp-600 hover:bg-stamp-700 text-ledger'
              }`}
            >
              {hasSubmitted ? 'Submitted!' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="border-2 border-ink-900 bg-ledger p-6">
          <h3 className="font-sans text-2xl mb-6 text-ink-900">Questions</h3>
          <div className="space-y-6">
            {QUESTIONS.map((question) => (
              <div key={question.id} className="py-4 border-b-2 border-ink-900 last:border-b-0">
                <div className="flex">
                  <span className="font-mono font-bold text-lg mr-3 text-ink-700">{question.id}.</span>
                  <p className="text-lg text-ink-900 whitespace-pre-line">{question.text}</p>
                </div>
                <div className="mt-3 ml-4">
                  <input
                    type="text"
                    value={answers[question.id] ?? ''}
                    onChange={(e) => updateAnswer(question.id, e.target.value)}
                    onFocus={() => { activeQuestionRef.current = question.id }}
                    onBlur={() => { activeQuestionRef.current = null }}
                    disabled={hasSubmitted}
                    className="w-full px-3 py-2 border-2 border-ink-900 bg-ledger text-lg focus:outline-none focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30"
                    placeholder="Your answer"
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
