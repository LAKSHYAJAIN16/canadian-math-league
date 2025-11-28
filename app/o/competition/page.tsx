'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { doc, setDoc, getDoc, collection, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/config'
import { ChevronLeft, ChevronRight, Users, Maximize2 } from 'lucide-react'

interface UserData {
    memberId: string
    teamId: string
    name: string
}

interface TeamMember {
    id: string
    name: string
    isOnline?: boolean
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

interface RoundTimer {
    minutes: number
    seconds: number
}

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    userAnswer?: number;
}

export default function CompetitionPage() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [roundTimeLeft, setRoundTimeLeft] = useState<RoundTimer>({ minutes: 2, seconds: 0 })
    const [rulesTimeLeft, setRulesTimeLeft] = useState(10) // 10 seconds for rules
    const [isTeamVisible, setIsTeamVisible] = useState(true)
    const [isCompetitionStarted, setIsCompetitionStarted] = useState(false)
    const [showRules, setShowRules] = useState(false)
    const [testStarted, setTestStarted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState<Question[]>([])
    const [testCompleted, setTestCompleted] = useState(false)
    const [testInitialized, setTestInitialized] = useState(false)
    const [testEndTime, setTestEndTime] = useState<number | null>(null)
    const [isUpdatingAnswer, setIsUpdatingAnswer] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [teamHost, setTeamHost] = useState<{id: string; name: string} | null>(null)
    const router = useRouter()
    const targetDate = useMemo(() => new Date().getTime() + 10000, [])
    const rulesEndTime = useMemo(() => new Date().getTime() + 10000 + 3000, []) // 3 seconds for rules

    // Sample questions
    const sampleQuestions: Question[] = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            question: `What is the value of x in the equation 2x + 3 = ${i + 7}?`,
            options: [
                `${i + 2}`,
                `${i + 1.5}`,
                `${(i + 7) / 2}`,
                `${(i + 7 - 3) / 2}`
            ],
            correctAnswer: 3
        }))
        , []); // Empty dependency array ensures this only runs once

    // Initialize questions when test starts
    useEffect(() => {
        if (testStarted && questions.length === 0) {
            setQuestions(sampleQuestions);
        }
    }, [testStarted, questions.length, sampleQuestions]);

    // Fullscreen logic
    const requestFullscreen = async () => {
        try {
            const element = document.documentElement;
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if ((element as any).webkitRequestFullscreen) {
                await (element as any).webkitRequestFullscreen();
            } else if ((element as any).msRequestFullscreen) {
                await (element as any).msRequestFullscreen();
            }
            setIsFullscreen(true);
        } catch (error) {
            console.error('Error attempting to enable fullscreen:', error);
        }
    };

    // Key detection for warning
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control' || e.key === 'Alt') {
                setShowWarning(true);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setShowWarning(false);
                }, 20000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timeoutId);
        };
    }, []);

    // Fullscreen change handler
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const difference = targetDate - now

            if (difference <= 0) {
                if (!isCompetitionStarted) {    // <--- FIXED
                    setIsCompetitionStarted(true)
                    setShowRules(true)
                }
                return { days: 0, hours: 0, minutes: 0, seconds: 0 }
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            }
        }

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft()
            setTimeLeft(newTimeLeft)
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate, isCompetitionStarted])

    useEffect(() => {
        if (showRules && !testInitialized) {
            setRulesTimeLeft(3)
        }
    }, [showRules, testInitialized])

    // Rules timer (10 seconds)
    useEffect(() => {
        if (!showRules) return

        let timer: NodeJS.Timeout

        const updateRulesTimer = () => {
            const now = new Date().getTime()
            const difference = rulesEndTime - now

            if (difference <= 0) {
                setShowRules(false)
                clearInterval(timer) // Clear the interval when done

                // Only initialize test if not already initialized
                if (!testInitialized) {
                    setTestStarted(true)
                    setTestInitialized(true)
                    setTestEndTime(new Date().getTime() + 30 * 1000) // 30 seconds
                }
                return
            }

            setRulesTimeLeft(Math.ceil(difference / 1000))
        }

        // Initial call to set the time immediately
        updateRulesTimer()

        // Set up the interval
        timer = setInterval(updateRulesTimer, 100)

        // Clean up the interval when component unmounts or showRules changes
        return () => {
            clearInterval(timer)
        }
    }, [showRules, testInitialized])

    // Test timer
    useEffect(() => {
        if (!testEndTime) return;

        const updateTestTimer = () => {
            const now = new Date().getTime();
            const difference = testEndTime - now;

            if (difference <= 0) {
                if (!testCompleted) {
                    handleTestSubmission();
                }
                
                // Check if current user is the team host and redirect
                if (teamHost?.id === userData?.memberId) {
                    router.push('/o/team-competition');
                }
                
                return;
            }

            setRoundTimeLeft({
                minutes: Math.floor(difference / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            });
        };

        const timer = setInterval(updateTestTimer, 1000);
        updateTestTimer();

        return () => {
            clearInterval(timer);
        };
    }, [testEndTime, testCompleted, teamHost, userData?.memberId, router]);

    const updateAnswerInFirestore = async (questionNumber: number, answer: string) => {
        if (!userData) return;

        setIsUpdatingAnswer(true);
        try {
            const userDocRef = doc(db, 'competition', userData.memberId);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                let individualRound = data.individual_round || {};

                // If individual_round doesn't exist, initialize it with empty answers
                if (Object.keys(individualRound).length === 0) {
                    individualRound = Array.from({ length: 20 }, (_, i) => i + 1)
                        .reduce((acc, num) => ({ ...acc, [num]: "" }), {});
                }

                // Update the specific answer
                individualRound[questionNumber] = answer;

                // Update the document
                await updateDoc(userDocRef, { individual_round: individualRound });
            }
        } catch (error) {
            console.error('Error updating answer:', error);
        } finally {
            setIsUpdatingAnswer(false);
        }
    };

    const handleAnswerSelection = async (questionIndex: number, answerIndex: number) => {
        if (isUpdatingAnswer) return;

        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];

        // If clicking the same answer again, clear it
        if (currentQuestion.userAnswer === answerIndex) {
            currentQuestion.userAnswer = undefined;
            setQuestions(updatedQuestions);
            await updateAnswerInFirestore(questionIndex + 1, "");
            return;
        }

        // Otherwise, set the new answer
        currentQuestion.userAnswer = answerIndex;
        setQuestions(updatedQuestions);

        // Convert answer index to letter (0 -> 'A', 1 -> 'B', etc.)
        const answerLetter = String.fromCharCode(65 + answerIndex);
        await updateAnswerInFirestore(questionIndex + 1, answerLetter);
    };

    const handleTestSubmission = async () => {
        if (!userData) return;

        try {
            // Prepare the answers in the required format
            const answers = questions.reduce((acc, q, index) => {
                if (q.userAnswer !== undefined) {
                    const answerLetter = String.fromCharCode(65 + q.userAnswer);
                    return { ...acc, [index + 1]: answerLetter };
                }
                return acc;
            }, {} as Record<number, string>);

            // Call the validate_results API
            const response = await fetch('/api/validate_results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userData.memberId,
                    answers
                })
            });

            if (!response.ok) {
                throw new Error('Failed to validate answers');
            }

            // Set submitted state
            setIsSubmitted(true);
            setTestCompleted(true);

        } catch (error) {
            console.error('Error submitting test:', error);
            alert(error instanceof Error ? error.message : 'Failed to submit your answers. Please try again.');
        }
    };

    // Determine team host
    useEffect(() => {
        const findTeamHost = async () => {
            if (!userData?.teamId) return;

            try {
                const teamsRef = collection(db, 'teams');
                const querySnapshot = await getDocs(teamsRef);
                
                for (const doc of querySnapshot.docs) {
                    const data = doc.data();
                    if (data.teams && Array.isArray(data.teams)) {
                        const team = data.teams.find((t: any) => t.id === userData.teamId);
                        if (team && team.members && team.members.length > 0) {
                            // First member is the host
                            const host = team.members[0];
                            setTeamHost({
                                id: host.id,
                                name: host.name
                            });
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error('Error finding team host:', error);
            }
        };

        findTeamHost();
    }, [userData?.teamId]);

    // Handle user logout on tab close
    useEffect(() => {
        const handleBeforeUnload = async () => {
            if (userData?.memberId) {
                const docRef = doc(db, 'competition', userData.memberId)
                await setDoc(docRef, { loggedIn: false }, { merge: true })
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            if (userData?.memberId) {
                const docRef = doc(db, 'competition', userData.memberId)
                setDoc(docRef, { loggedIn: false }, { merge: true })
            }
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [userData?.memberId])

    // Set up real-time listeners for team member status
    useEffect(() => {
        if (!userData?.memberId) return

        const updateTeamMemberStatus = async (members: TeamMember[]) => {
            const updatedMembers = await Promise.all(members.map(async (member) => {
                const memberDocRef = doc(db, 'competition', member.id)
                const unsubscribe = onSnapshot(memberDocRef, (doc) => {
                    setTeamMembers(prevMembers =>
                        prevMembers.map(m =>
                            m.id === member.id
                                ? { ...m, isOnline: doc.exists() ? doc.data()?.loggedIn === true : false }
                                : m
                        )
                    )
                })
                return () => unsubscribe()
            }))

            return () => {
                updatedMembers.forEach(unsubscribe => unsubscribe())
            }
        }

        updateTeamMemberStatus(teamMembers)
    }, [userData?.memberId, teamMembers.length])

    // Check authentication and fetch user data
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const auth = localStorage.getItem('studentAuth')
                if (!auth) {
                    router.push('/join')
                    return
                }

                const parsedAuth = JSON.parse(auth)
                setUserData(parsedAuth)

                // Update user's online status
                const userDocRef = doc(db, 'competition', parsedAuth.memberId)
                await setDoc(userDocRef, {
                    name: parsedAuth.name,
                    userId: parsedAuth.memberId,
                    teamId: parsedAuth.teamId,
                    loggedIn: true,
                    lastLogin: new Date().toISOString()
                }, { merge: true })

                // Fetch team members
                const teamsRef = collection(db, 'teams')
                const querySnapshot = await getDocs(teamsRef)
                let members: TeamMember[] = []

                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    if (data.teams && Array.isArray(data.teams)) {
                        data.teams.forEach(team => {
                            if (team.id === parsedAuth.teamId && team.members) {
                                members = team.members
                                    .filter((member: any) => member.id !== parsedAuth.memberId)
                                    .map((member: any) => ({
                                        id: member.id,
                                        name: member.name,
                                        isOnline: false
                                    }))
                            }
                        })
                    }
                })

                setTeamMembers(members)

            } catch (error) {
                console.error('Error:', error)
                router.push('/join')
            }
        }

        checkAuth()
    }, [router])

    if (!isFullscreen) {
        return (
            <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4 text-center">
                <div className="max-w-md">
                    <h1 className="text-3xl font-bold mb-6">Fullscreen Required</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        For the best competition experience, please enable fullscreen mode.
                        This helps prevent accidental navigation and ensures you can focus on the competition.
                    </p>
                    <button
                        onClick={requestFullscreen}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                    >
                        <Maximize2 className="mr-2" size={20} />
                        Enter Fullscreen
                    </button>
                    <p className="mt-4 text-sm text-gray-500">
                        You'll need to allow fullscreen in your browser when prompted.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            {showWarning && (
                <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 text-center z-50">
                    <p className="text-xl font-medium">I have my eye on you...</p>
                    <p className="text-md">You need to try better than just ChatGPT and Cluely. Reminder: Attempts to cheat will result in immediate disqualification.</p>
                </div>
            )}

            {/* Team sidebar toggle button - fixed position */}
            <button
                onClick={() => setIsTeamVisible(!isTeamVisible)}
                className="fixed left-0 top-1/2 -translate-y-1/2 bg-white border-r border-t border-b border-gray-200 rounded-r-lg p-2 shadow-md z-10 hover:bg-gray-50 transition-colors"
            >
                {isTeamVisible ? <ChevronLeft size={24} /> : <Users size={24} />}
            </button>

            {/* Team sidebar */}
            <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-20 ${isTeamVisible ? 'w-80' : 'w-0 opacity-0 invisible'}`}
            >
                <div className="p-6 h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Your Team</h2>
                        <button
                            onClick={() => setIsTeamVisible(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <span className="text-sm text-gray-500 font-mono block mb-4">
                        {teamMembers.filter(m => m.isOnline).length + 1}/{teamMembers.length + 1} participants ready
                    </span>

                    <div className="space-y-3">
                        {teamMembers.length > 0 ? (
                            teamMembers.map((member) => (
                                <div key={member.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">{member.name}</div>
                                            <div className={`text-sm ${member.isOnline ? 'text-green-700' : 'text-gray-500'}`}>
                                                {member.isOnline ? "Ready" : "Offline"}
                                            </div>
                                        </div>
                                        <div
                                            className={`h-3 w-3 rounded-full ${member.isOnline ? 'bg-green-700' : 'bg-gray-300'}`}
                                            title={member.isOnline ? 'Online' : 'Offline'}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No other team members found</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className={`flex-1 flex flex-col items-center p-4 overflow-y-auto transition-all duration-300 ${isTeamVisible ? 'md:ml-80' : ''}`}
            >
                {!isCompetitionStarted ? (
                    // Initial countdown screen
                    <div className="max-w-3xl w-full mt-[22%] bg-white rounded-xl shadow-sm p-8 text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-2">
                            Welcome, {userData?.name || 'Participant'}!
                        </h1>
                        <p className="text-2xl text-gray-600 mb-8">
                            The competition starts in:
                        </p>
                        <div className="grid grid-cols-4 gap-1 mb-8">
                            <div className="px-1">
                                <div className="text-5xl font-bold text-gray-900 font-mono leading-none">
                                    {timeLeft.days.toString().padStart(2, '0')}
                                </div>
                                <div className="text-gray-500 font-mono text-xs">Days</div>
                            </div>
                            <div className="px-1">
                                <div className="text-5xl font-bold text-gray-900 font-mono leading-none">
                                    {timeLeft.hours.toString().padStart(2, '0')}
                                </div>
                                <div className="text-gray-500 font-mono text-xs">Hours</div>
                            </div>
                            <div className="px-1">
                                <div className="text-5xl font-bold text-gray-900 font-mono leading-none">
                                    {timeLeft.minutes.toString().padStart(2, '0')}
                                </div>
                                <div className="text-gray-500 font-mono text-xs">Minutes</div>
                            </div>
                            <div className="px-1">
                                <div className="text-5xl font-bold text-gray-900 font-mono leading-none">
                                    {timeLeft.seconds.toString().padStart(2, '0')}
                                </div>
                                <div className="text-gray-500 font-mono text-xs">Seconds</div>
                            </div>
                        </div>
                    </div>
                ) : showRules ? (
                    // Rules screen (shows for 10 seconds after countdown)
                    <div className="w-full max-w-4xl mt-[5%]">
                        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
                            Round 1 : Individual
                        </h1>
                        <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Round 1 Rules</h2>
                            <ul className="text-left space-y-4 text-gray-700 text-lg">
                                <li className="flex items-start">
                                    <span className="text-black mr-3">•</span>
                                    <span>There are 20 multiple choice questions and 45 minutes to answer them.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-3">•</span>
                                    <span>Each correct answer is worth 1 point, there are no penalties for incorrect answers.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-3">•</span>
                                    <span>No calculators or external aids are allowed</span>
                                </li>
                            </ul>
                            <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400">
                                <p className="text-red-700">
                                    <span className="font-semibold">On Cheating:</span> We are recording every participant's keystrokes to recognize any cheating that might be taking place. Please do not close this window. Any cheating will result in immediate disqualification of the entire team.
                                </p>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-lg text-gray-600 mb-4">Test will begin in:</p>
                                <div className="text-3xl font-mono font-bold text-gray-800">
                                    {rulesTimeLeft.toString().padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : testCompleted ? (
                    <div className="w-full max-w-4xl mx-auto p-8 text-center">
                        <div className="mt-[20%] bg-white rounded-xl shadow-sm p-8">
                            <h1 className="text-5xl font-bold text-green-600 mb-4">
                                Test Submitted Successfully!
                            </h1>
                            <p className="text-xl text-gray-700 mb-2">
                                Waiting for the next round...
                            </p>
                            <div className="text-5xl font-bold text-black">
                                {String(roundTimeLeft.minutes).padStart(2, '0')}:
                                {String(roundTimeLeft.seconds).padStart(2, '0')}
                            </div>
                            <br />
                            <br />
                            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                                <p className="text-lg text-blue-800">
                                    <span className="font-semibold">Note:</span> The next round is team-based and will only load on one team member's screen.
                                </p>
                                {teamHost ? (
                                    teamHost.id === userData?.memberId ? (
                                        <p className="mt-2 text-green-700 font-semibold">
                                            You are the team host! The next round will load on your screen.
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-blue-700">
                                            Team Host: <span className="font-bold">{teamHost.name}</span>
                                        </p>
                                    )
                                ) : (
                                    <p className="mt-2 text-blue-700">
                                        Determining team host...
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-6xl mx-auto p-6 flex flex-col h-[calc(100vh-8rem)]">
                        {/* Question Numbers Navigation with Timer */}
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
                                                className={`
                                                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                                    ${currentQuestionIndex === index
                                                        ? 'bg-blue-600 text-white'
                                                        : q.userAnswer !== undefined
                                                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                                                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                                                    }
                                                    transition-colors duration-200
                                                `}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col md:flex-row gap-8">
                            {/* Question Panel */}
                            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                                </div>

                                <div className="prose max-w-none">
                                    <p className="text-lg">{questions[currentQuestionIndex]?.question}</p>
                                </div>

                                <div className="mt-auto pt-6">
                                    <div className="flex justify-between border-t border-gray-200 pt-4">
                                        <button
                                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                            disabled={currentQuestionIndex === 0}
                                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (currentQuestionIndex < questions.length - 1) {
                                                    setCurrentQuestionIndex(prev => prev + 1);
                                                } else {
                                                    handleTestSubmission();
                                                }
                                            }}
                                            className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            {currentQuestionIndex === questions.length - 1 ? 'Submit Test' : 'Next'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Options Panel */}
                            <div className="w-full md:w-1/2">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                                    <h3 className="text-xl font-semibold mb-6">Select your answer:</h3>
                                    <div className="space-y-4">
                                        {questions[currentQuestionIndex]?.options?.map((option, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleAnswerSelection(currentQuestionIndex, index)}
                                                disabled={isUpdatingAnswer}
                                                className={`
                                                    p-4 border rounded-lg transition-colors
                                                    ${questions[currentQuestionIndex]?.userAnswer === index
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : isUpdatingAnswer
                                                            ? 'border-gray-100 bg-gray-50 cursor-not-allowed'
                                                            : 'border-gray-200 hover:border-blue-300 cursor-pointer'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center">
                                                    <div className={`
                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3
                                                        ${questions[currentQuestionIndex]?.userAnswer === index
                                                            ? 'bg-blue-100 text-blue-700 border-blue-500'
                                                            : 'border-gray-300 text-gray-600'
                                                        }
                                                    `}>
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