'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, setDoc } from 'firebase/firestore'
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

  const updateAnswer = useCallback(
    async (questionId: number, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }))
      if (!session?.groupId) return

      const answersRef = doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'team_rush')
      const snap = await getDoc(answersRef)
      const current = (snap.data()?.answers as Record<string, string>) ?? {}
      await setDoc(
        answersRef,
        { roundId: 'team_rush', answers: { ...current, [questionId]: value } },
        { merge: true }
      )
    },
    [session]
  )

  const handleSubmit = useCallback(async () => {
    if (hasSubmitted) return
    setHasSubmitted(true)
    try {
      await fetch('/api/rounds/team-rush/submit', { method: 'POST' })
    } catch (error) {
      console.error('Error submitting Team Rush answers:', error)
    }
    router.push('/o/capture-the-problem')
  }, [hasSubmitted, router])

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
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blueprint-700 mx-auto mb-4" />
          <p className="text-lg text-graphite-700">Loading your team information...</p>
        </div>
      </div>
    )
  }

  const rulesEndMs = timing.startMs + RULES_DISPLAY_MS
  const beforeStart = now < timing.startMs
  const showingRules = !beforeStart && now < rulesEndMs

  if (beforeStart) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-paper rounded-xl shadow-md overflow-hidden p-8 text-center">
          <h1 className="text-5xl font-bold text-graphite-900 mb-2">Welcome, {teamName}!</h1>
          <h2 className="text-3xl font-semibold text-graphite-700 mb-10">{groupName || 'Your Group'}</h2>
          <div className="text-8xl font-bold text-black mb-12">{formatTime(timing.startMs - now)}</div>

          <div className="flex items-center justify-center mb-4">
            <Users className="h-5 w-5 text-graphite-600 mr-2" />
            <h3 className="text-lg font-medium text-graphite-700">Teams in your group</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {otherTeams.map((team) => (
              <div key={team.teamId} className="bg-paper p-6 rounded-xl border border-paper-line shadow-sm">
                <div className="flex items-center space-x-3">
                  <span className={`inline-block w-3 h-3 rounded-full ${team.online ? 'bg-blueprint-500' : 'bg-redpen-600'}`} />
                  <p className="text-lg font-medium text-graphite-700">{team.name}</p>
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
        <h1 className="text-4xl font-bold text-graphite-900 text-center mb-8">Round 2 : Team Rush</h1>
        <div className="bg-paper rounded-xl shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-graphite-900 mb-6">Team Challenge Rules</h2>
          <ul className="text-left space-y-4 text-graphite-700 text-lg">
            <li>Your team will be presented with 10 questions that require numerical answers.</li>
            <li>Work together with your team to solve all questions within the time limit.</li>
            <li>Answers are saved automatically as your team types.</li>
          </ul>
          <div className="mt-8 p-4 bg-redpen-50 rounded-2xl">
            <p className="text-redpen-700">
              <span className="font-semibold">On Cheating:</span> Any form of cheating will result
              in immediate disqualification of the entire team.
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-graphite-600 mb-4">The round will begin in:</p>
            <div className="text-3xl font-bold text-graphite-700">{formatTime(rulesEndMs - now)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-graphite-900">Team Rush</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-black text-white px-4 py-2 rounded-lg text-xl">
              {formatTime(timing.endMs - now)}
            </div>
            <button
              onClick={handleSubmit}
              disabled={hasSubmitted}
              className={`font-medium py-2 px-6 rounded-md text-lg transition-colors ${
                hasSubmitted
                  ? 'bg-graphite-400 cursor-not-allowed text-white'
                  : 'bg-redpen-600 hover:bg-redpen-700 text-white'
              }`}
            >
              {hasSubmitted ? 'Submitted!' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="bg-paper rounded-xl shadow-sm p-6">
          <h3 className="text-2xl font-semibold mb-6 text-graphite-700">Questions</h3>
          <div className="space-y-6">
            {QUESTIONS.map((question) => (
              <div key={question.id} className="py-4 border-b last:border-b-0">
                <div className="flex">
                  <span className="font-bold text-lg mr-3 text-graphite-700">{question.id}.</span>
                  <p className="text-lg text-graphite-700 whitespace-pre-line">{question.text}</p>
                </div>
                <div className="mt-3 ml-4">
                  <input
                    type="text"
                    value={answers[question.id] ?? ''}
                    onChange={(e) => updateAnswer(question.id, e.target.value)}
                    disabled={hasSubmitted}
                    className="w-full px-3 py-2 border border-graphite-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
