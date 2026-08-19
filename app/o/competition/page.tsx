'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { collection, doc, getDocs, query, orderBy, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useStudentSession } from '@/lib/client/useStudentSession'
import { useRoundTiming } from '@/lib/client/useRoundTiming'
import { setTeamPresence } from '@/lib/client/teamPresence'
import { ChevronLeft, ChevronRight, Users, Maximize2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Question {
  id: number
  question: string
  options: string[]
  userAnswer?: number
}

interface TeamMate {
  id: string
  name: string
}

function useCountdown(targetMs: number | null) {
  const [msLeft, setMsLeft] = useState(() => (targetMs ? targetMs - Date.now() : 0))

  useEffect(() => {
    if (!targetMs) return
    const timer = setInterval(() => setMsLeft(targetMs - Date.now()), 1000)
    return () => clearInterval(timer)
  }, [targetMs])

  return Math.max(0, msLeft)
}

export default function CompetitionPage() {
  const router = useRouter()
  const { session, loading: sessionLoading } = useStudentSession()
  const timing = useRoundTiming('canadian_open')

  const [teammates, setTeammates] = useState<TeamMate[]>([])
  const [teamHost, setTeamHost] = useState<TeamMate | null>(null)
  const [isTeamVisible, setIsTeamVisible] = useState(true)
  const [showRules, setShowRules] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isUpdatingAnswer, setIsUpdatingAnswer] = useState(false)

  const sampleQuestions: Question[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        question: `What is the value of x in the equation 2x + 3 = ${i + 7}?`,
        options: [`${i + 2}`, `${i + 1.5}`, `${(i + 7) / 2}`, `${(i + 7 - 3) / 2}`],
      })),
    []
  )

  const roundStartMs = timing?.startMs ?? null
  const roundEndMs = timing?.endMs ?? null
  const msToStart = useCountdown(roundStartMs)
  const msToEnd = useCountdown(roundEndMs)
  const isCompetitionStarted = roundStartMs !== null && msToStart <= 0

  const timeLeft = {
    days: Math.floor(msToStart / (1000 * 60 * 60 * 24)),
    hours: Math.floor((msToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((msToStart % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((msToStart % (1000 * 60)) / 1000),
  }
  const roundTimeLeft = {
    minutes: Math.floor(msToEnd / (1000 * 60)),
    seconds: Math.floor((msToEnd % (1000 * 60)) / 1000),
  }

  useEffect(() => {
    if (isCompetitionStarted && !testStarted) {
      setShowRules(true)
      setQuestions(sampleQuestions)
      const timer = setTimeout(() => {
        setShowRules(false)
        setTestStarted(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isCompetitionStarted, testStarted, sampleQuestions])

  const requestFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } catch (error) {
      console.error('Error attempting to enable fullscreen:', error)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.key === 'Alt') {
        setShowWarning(true)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => setShowWarning(false), 20000)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleTestSubmission = useCallback(async () => {
    if (!session || testCompleted) return
    setTestCompleted(true)

    const answers = questions.reduce((acc, q, index) => {
      if (q.userAnswer !== undefined) {
        acc[index + 1] = String.fromCharCode(65 + q.userAnswer)
      }
      return acc
    }, {} as Record<number, string>)

    try {
      await fetch('/api/rounds/canadian-open/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
    } catch (error) {
      console.error('Error submitting test:', error)
    }
  }, [session, testCompleted, questions])

  useEffect(() => {
    if (testStarted && !testCompleted && roundEndMs !== null && msToEnd <= 0) {
      handleTestSubmission()
    }
  }, [testStarted, testCompleted, roundEndMs, msToEnd, handleTestSubmission])

  useEffect(() => {
    if (testCompleted && teamHost?.id === session?.memberId) {
      router.push('/o/team-competition')
    }
  }, [testCompleted, teamHost, session, router])

  // Load teammates + host once we know who we are.
  useEffect(() => {
    if (!session) return

    const loadTeam = async () => {
      const membersSnap = await getDocs(
        query(
          collection(db, 'schools', session.schoolId, 'teams', session.teamId, 'members'),
          orderBy('createdAt', 'asc')
        )
      )
      const members = membersSnap.docs.map((d) => ({ id: d.id, name: d.data().name as string }))
      setTeammates(members.filter((m) => m.id !== session.memberId))
      if (members.length > 0) setTeamHost(members[0])
    }

    loadTeam().catch((error) => console.error('Error loading team:', error))
  }, [session])

  // Presence: mark the team online while this tab is open.
  useEffect(() => {
    if (!session?.groupId) return
    setTeamPresence(session.groupId, session.teamId, true).catch(() => {})
    const handleBeforeUnload = () => setTeamPresence(session.groupId!, session.teamId, false)
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      setTeamPresence(session.groupId!, session.teamId, false).catch(() => {})
    }
  }, [session])

  const handleAnswerSelection = (questionIndex: number, answerIndex: number) => {
    if (isUpdatingAnswer) return
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex ? { ...q, userAnswer: q.userAnswer === answerIndex ? undefined : answerIndex } : q
      )
    )
  }

  if (sessionLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-6">Fullscreen Required</h1>
          <p className="text-lg text-gray-700 mb-8">
            For the best competition experience, please enable fullscreen mode. This helps
            prevent accidental navigation and ensures you can focus on the competition.
          </p>
          <button
            onClick={requestFullscreen}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <Maximize2 className="mr-2" size={20} />
            Enter Fullscreen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {showWarning && (
        <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 text-center z-50">
          <p className="text-xl font-medium">I have my eye on you...</p>
          <p className="text-md">
            Attempts to cheat will result in immediate disqualification.
          </p>
        </div>
      )}

      <button
        onClick={() => setIsTeamVisible(!isTeamVisible)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-white border-r border-t border-b border-gray-200 rounded-r-lg p-2 shadow-md z-10 hover:bg-gray-50 transition-colors"
      >
        {isTeamVisible ? <ChevronLeft size={24} /> : <Users size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-20 ${
          isTeamVisible ? 'w-80' : 'w-0 opacity-0 invisible'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Team</h2>
            <button onClick={() => setIsTeamVisible(false)} className="text-gray-400 hover:text-gray-600">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="space-y-3">
            {teammates.length > 0 ? (
              teammates.map((mate) => (
                <div key={mate.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="font-medium">{mate.name}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No other team members found</p>
            )}
          </div>
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col items-center p-4 overflow-y-auto transition-all duration-300 ${
          isTeamVisible ? 'md:ml-80' : ''
        }`}
      >
        {!isCompetitionStarted ? (
          <div className="max-w-3xl w-full mt-[22%] bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-2">Welcome, {session.name}!</h1>
            <p className="text-2xl text-gray-600 mb-8">The competition starts in:</p>
            <div className="grid grid-cols-4 gap-1 mb-8">
              {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
                <div className="px-1" key={unit}>
                  <div className="text-5xl font-bold text-gray-900 font-mono leading-none">
                    {timeLeft[unit].toString().padStart(2, '0')}
                  </div>
                  <div className="text-gray-500 font-mono text-xs">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        ) : showRules ? (
          <div className="w-full max-w-4xl mt-[5%]">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Round 1 : Individual</h1>
            <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Round 1 Rules</h2>
              <ul className="text-left space-y-4 text-gray-700 text-lg">
                <li>There are 20 multiple choice questions and 45 minutes to answer them.</li>
                <li>Each correct answer is worth 1 point, there are no penalties for incorrect answers.</li>
                <li>No calculators or external aids are allowed.</li>
              </ul>
              <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400">
                <p className="text-red-700">
                  <span className="font-semibold">On Cheating:</span> Any cheating will result in
                  immediate disqualification of the entire team.
                </p>
              </div>
            </div>
          </div>
        ) : testCompleted ? (
          <div className="w-full max-w-4xl mx-auto p-8 text-center">
            <div className="mt-[20%] bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-5xl font-bold text-green-600 mb-4">Test Submitted Successfully!</h1>
              <p className="text-xl text-gray-700 mb-2">Waiting for the next round...</p>
              <div className="text-5xl font-bold text-black">
                {String(roundTimeLeft.minutes).padStart(2, '0')}:{String(roundTimeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-200">
                <p className="text-lg text-blue-800">
                  <span className="font-semibold">Note:</span> The next round is team-based and will
                  only load on one team member&apos;s screen.
                </p>
                {teamHost ? (
                  teamHost.id === session.memberId ? (
                    <p className="mt-2 text-green-700 font-semibold">
                      You are the team host! The next round will load on your screen.
                    </p>
                  ) : (
                    <p className="mt-2 text-blue-700">
                      Team Host: <span className="font-bold">{teamHost.name}</span>
                    </p>
                  )
                ) : (
                  <p className="mt-2 text-blue-700">Determining team host...</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto p-6 flex flex-col h-[calc(100vh-8rem)]">
            <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-black whitespace-nowrap mr-4">
                  {String(roundTimeLeft.minutes).padStart(2, '0')}:{String(roundTimeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    {questions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                          currentQuestionIndex === index
                            ? 'bg-blue-600 text-white'
                            : q.userAnswer !== undefined
                              ? 'bg-green-100 text-green-700 border-2 border-green-300'
                              : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <p className="text-lg">{questions[currentQuestionIndex]?.question}</p>

                <div className="mt-auto pt-6">
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        if (currentQuestionIndex < questions.length - 1) {
                          setCurrentQuestionIndex((prev) => prev + 1)
                        } else {
                          handleTestSubmission()
                        }
                      }}
                      className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Submit Test' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                  <h3 className="text-xl font-semibold mb-6">Select your answer:</h3>
                  <div className="space-y-4">
                    {questions[currentQuestionIndex]?.options?.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleAnswerSelection(currentQuestionIndex, index)}
                        className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                          questions[currentQuestionIndex]?.userAnswer === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                              questions[currentQuestionIndex]?.userAnswer === index
                                ? 'bg-blue-100 text-blue-700 border-blue-500'
                                : 'border-gray-300 text-gray-600'
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
