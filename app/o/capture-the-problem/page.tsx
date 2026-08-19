'use client'

import { useEffect, useState, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
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

  const handleSubmit = useCallback(
    async (event?: React.FormEvent) => {
      event?.preventDefault()
      if (hasSubmitted) return
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/rounds/capture-the-problem/submit', { method: 'POST' })
        const data = await response.json()
        setResult({ correctAnswers: data.correctCount ?? data.correctAnswers ?? 0, totalQuestions: data.totalQuestions ?? PROBLEMS.length })
        setHasSubmitted(true)
      } catch (error) {
        console.error('Error submitting answers:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [hasSubmitted]
  )

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
          <Loader2 className="h-12 w-12 text-redpen-600 animate-spin mx-auto mb-4" />
          <p className="text-graphite-600">Loading competition...</p>
        </div>
      </div>
    )
  }

  const rulesEndMs = timing.startMs + RULES_DISPLAY_MS
  const beforeStart = now < timing.startMs
  const showingRules = !beforeStart && now < rulesEndMs

  if (beforeStart) {
    return (
      <div className="min-h-screen bg-paper p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-paper rounded-xl shadow-sm p-6 md:p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-graphite-900 mb-4 md:mb-6">
            Welcome to Capture the Problem
          </h1>
          <div className="bg-paper-ink inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-graphite-600 mr-2" />
            <span className="text-sm md:text-base">Starting in {formatTime(timing.startMs - now)}</span>
          </div>
          <div className="bg-redpen-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-redpen-700 mb-2">{teamName}</h2>
            <p className="text-redpen-700">{groupName}</p>
            {conference && <p className="text-redpen-600 text-sm">{conference} Conference</p>}
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Users className="h-5 w-5 text-graphite-600 mr-2" />
              <h3 className="text-lg font-medium text-graphite-700">Teams in your group</h3>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {otherTeams.length > 0 ? (
                otherTeams.map((team) => (
                  <div
                    key={team.teamId}
                    className={`flex items-center p-3 rounded-lg border ${
                      team.online ? 'border-redpen-200 bg-redpen-50' : 'border-paper-line bg-paper'
                    }`}
                  >
                    <div className={`h-2.5 w-2.5 rounded-full mr-3 ${team.online ? 'bg-redpen-500' : 'bg-graphite-300'}`} />
                    <div className="flex-1 text-left">
                      <span className="font-medium text-graphite-900">{team.name}</span>
                      <span className="text-graphite-600 text-sm ml-2">({team.schoolName})</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-graphite-600 py-4">No other teams in your group yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showingRules) {
    return (
      <div className="max-w-4xl mx-auto bg-paper rounded-xl shadow-sm p-6 md:p-8 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-graphite-900">Competition Rules</h1>
          <div className="bg-redpen-100 text-redpen-700 px-4 py-2 rounded-full text-sm font-medium">{teamName}</div>
        </div>

        <div className="bg-paper-ink inline-flex items-center px-4 md:px-6 py-2 rounded-full mb-6">
          <Clock className="h-4 w-4 md:h-5 md:w-5 text-graphite-600 mr-2" />
          <span className="text-sm md:text-base">Starting in {formatTime(rulesEndMs - now)}</span>
        </div>

        <div className="bg-paper p-6 rounded-lg border border-paper-line">
          <h3 className="text-lg font-semibold text-graphite-900 mb-4">How it works:</h3>
          <ul className="space-y-3 text-graphite-700">
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
      <div className="max-w-2xl mx-auto mt-20 bg-paper rounded-xl shadow-sm p-8 text-center">
        <CheckCircle className="h-16 w-16 text-redpen-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-graphite-900 mb-2">Submitted!</h1>
        {result && (
          <p className="text-lg text-graphite-700">
            Your team got {result.correctAnswers} out of {result.totalQuestions} correct.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-paper rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-paper-line bg-paper flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-3 sm:mb-0">
              <h1 className="text-xl font-bold text-graphite-900">Capture the Problem</h1>
              <span className="ml-3 px-3 py-1 bg-redpen-100 text-redpen-700 text-xs font-medium rounded-full">
                {conference}
              </span>
            </div>
            <div className="bg-paper-ink px-4 py-2 rounded-lg text-base sm:text-lg flex items-center">
              <Clock className="h-4 w-4 text-graphite-600 mr-2 flex-shrink-0" />
              <span>{formatTime(timing.endMs - now)}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-graphite-700">
                  Problem {currentProblem} of {PROBLEMS.length}
                </span>
                <span className="text-sm text-graphite-600">
                  {Object.keys(answers).length}/{PROBLEMS.length} answered
                </span>
              </div>
              <div className="w-full bg-paper-line rounded-full h-2">
                <div
                  className="bg-redpen-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(answers).length / PROBLEMS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-paper p-6 rounded-lg mb-6 border border-paper-line">
              <h3 className="text-xl font-medium text-graphite-900 mb-4">Problem {currentProblem}</h3>
              <div className="text-lg text-graphite-700">{PROBLEMS[currentProblem - 1]?.text}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={answers[currentProblem] ?? ''}
                onChange={(e) => {
                  const value = e.target.value
                  setAnswers((prev) => {
                    const updated = { ...prev, [currentProblem]: value }
                    if (session.groupId) {
                      setDoc(
                        doc(db, 'groups', session.groupId, 'teamState', session.teamId, 'private', 'capture_the_problem'),
                        { roundId: 'capture_the_problem', answers: updated },
                        { merge: true }
                      ).catch(() => {})
                    }
                    return updated
                  })
                }}
                className="w-full px-4 py-3 border border-graphite-300 rounded-lg focus:ring-2 focus:ring-redpen-500 focus:border-redpen-500 text-base"
                placeholder="Type your answer here..."
                autoFocus
              />

              <div className="flex flex-col-reverse sm:flex-row sm:justify-between pt-4 space-y-3 sm:space-y-0">
                <div className="flex space-x-3">
                  {currentProblem > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentProblem((p) => Math.max(1, p - 1))}
                      className="px-5 py-2.5 border border-graphite-300 rounded-lg text-graphite-700 hover:bg-paper transition-colors"
                    >
                      Previous
                    </button>
                  )}
                </div>
                <div className="flex space-x-3">
                  {currentProblem < PROBLEMS.length ? (
                    <button
                      type="button"
                      onClick={() => setCurrentProblem((p) => Math.min(PROBLEMS.length, p + 1))}
                      className="px-6 py-2.5 bg-redpen-600 hover:bg-redpen-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-2.5 font-medium rounded-lg bg-redpen-600 hover:bg-redpen-700 text-white transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit All Answers'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-paper rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-sm font-medium text-graphite-700 mb-3">Jump to problem:</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {PROBLEMS.map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentProblem(index + 1)}
                className={`w-full aspect-square flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  currentProblem === index + 1
                    ? 'bg-redpen-600 text-white'
                    : answers[index + 1]
                      ? 'bg-redpen-100 text-redpen-700 hover:bg-redpen-200'
                      : 'bg-paper-ink text-graphite-700 hover:bg-paper-line'
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
