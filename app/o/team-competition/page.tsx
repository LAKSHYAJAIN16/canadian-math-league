'use client'

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where, Firestore, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db as firestoreDb } from '@/lib/config';

// Assert that db is not undefined
const db = firestoreDb as Firestore;
import { Loader2, Users, Clock, Award } from 'lucide-react';

export default function TeamCompetitionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showRules, setShowRules] = useState(false);
    const [showCompetition, setShowCompetition] = useState(false);
    const [rulesTimeLeft, setRulesTimeLeft] = useState(0); // 10 seconds for rules
    const [teamName, setTeamName] = useState('');
    const [timeLeft, setTimeLeft] = useState(0); // 2 minutes in seconds
    const [roundNumber, setRoundNumber] = useState(1);
    const [teamScore, setTeamScore] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [welcomeTimeLeft, setWelcomeTimeLeft] = useState(0); // 30 seconds for welcome screen
    const [otherTeams, setOtherTeams] = useState<Array<{ id: string, name: string, schoolName: string, isOnline: boolean }>>([]);
    const [currentGroupId, setCurrentGroupId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [conference, setConference] = useState('');
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [teamId, setTeamId] = useState('');
    // Competition ends at December 5, 2025 8:00:00 PM EST (20:00:00)
    const COMPETITION_END_TIME = new Date('December 5, 2025 20:00:00 EST').getTime();
    const [competitionEndTime, setCompetitionEndTime] = useState<number>(COMPETITION_END_TIME);
    const [isCompetitionActive, setIsCompetitionActive] = useState(false);

    // Sample math questions
    const questions = [
        {
            id: 1, text: `Emily Thorne is throwing a Memorial Day Party to kick off the Summer in the Hamptons, and she
is trying to figure out the seating arrangment for all of her guests. Emily saw that if she seated
4 guests to a table, there would be 1 guest left over (how sad); if she seated 5 to a table, there
would be 3 guests left over; and if she seated 6 to a table, there would again be 1 guest left over.
If there are at least 100 but no more than 200 guests (because she’s rich and her house is 20000
square feet), what is the greatest possible number of guests?` },
        {
            id: 2, text: `If cos (2◦) − sin (4◦) − cos (6◦) + sin (8◦)
. . . + sin (88◦) = sec (θ) − tan (θ), what is the value of θ?` },
        { id: 3, text: "What is 2 to the power of 10?" },
        { id: 4, text: "Find the area of a circle with radius 7. (Use π = 22/7)" },
        { id: 5, text: "What is the least common multiple of 12 and 18?" },
        { id: 6, text: "Solve for x: 3x - 7 = 14" },
        { id: 7, text: "What is the sum of the interior angles of a hexagon?" },
        { id: 8, text: "If a triangle has sides 5, 12, and 13, what is its area?" },
        { id: 9, text: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?" },
        { id: 10, text: "What is the value of 10! (10 factorial)?" }
    ];

    // Function to update team login status
    const updateTeamAnswers = useCallback(async (questionId: number, answer: string) => {
        try {
            if (!currentGroupId) {
                console.error('No group ID found');
                return;
            }

            const groupRef = doc(db, 'groups', currentGroupId);
            const fieldName = `${teamId}_teamrush`;
            
            // Get current answers or initialize if not exists
            const groupDoc = await getDoc(groupRef);
            const currentAnswers = groupDoc.data()?.[fieldName] || Array(10).fill('');

            // Update the specific answer (questionId is 1-based)
            const updatedAnswers = [...currentAnswers];
            updatedAnswers[questionId - 1] = answer;

            // Update in Firebase
            await updateDoc(groupRef, {
                [fieldName]: updatedAnswers
            });

        } catch (error) {
            console.error('Error updating team answers:', error);
        }
    }, [currentGroupId, teamId]);

    const updateTeamLoginStatus = async (_isLoggedIn: boolean) => {
        try {
            // Skip login status updates in demo mode
        } catch (error) {
            console.error('Error updating login status:', error);
        }
    };

    // Initialize component and fetch team data
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                // Get team ID from localStorage if available, otherwise use a default
                const auth = localStorage.getItem('studentAuth');
                let cleanTeamId = 'demo-team';
                
                if (auth) {
                    const { teamId: authTeamId } = JSON.parse(auth);
                    cleanTeamId = authTeamId.replace('team-', '');
                }
                
                setTeamId(cleanTeamId);

                // 1. Fetch all groups
                const groupsSnapshot = await getDocs(collection(db, 'groups'));
                let ourGroupId = '';
                let ourSchoolId = '';
                let otherSchools: string[] = [];
                let teamFound = false;

                // 2. Find the group that contains our team ID
                for (const groupDoc of groupsSnapshot.docs) {
                    const groupData = groupDoc.data();
                    if (groupData.schools && Array.isArray(groupData.schools)) {
                        const schoolIndex = groupData.schools.findIndex((school: any) =>
                            school.includes(cleanTeamId)
                        );

                        if (schoolIndex !== -1) {
                            ourGroupId = groupDoc.id;
                            ourSchoolId = groupData.schools[schoolIndex];
                            otherSchools = groupData.schools.filter((s: string, i: number) => i !== schoolIndex);
                            const groupLetter = groupData.group || groupDoc.id;
                            const province = groupData.province
                                ? groupData.province.charAt(0).toUpperCase() + groupData.province.slice(1).toLowerCase()
                                : 'N/A';
                            setGroupName(`Group ${groupLetter} (${province})`);
                            setConference(groupData.conference || 'N/A');
                            teamFound = true;
                            break;
                        }
                    }
                }

                if (!teamFound) {
                    throw new Error('Team not found in any group');
                }

                // Save group ID to localStorage and state
                localStorage.setItem('currentGroupId', ourGroupId);

                // 3. Get our team's name
                let ourTeamName = '';
                const teamsSnapshot = await getDocs(collection(db, 'teams'));

                // Find our team in the teams collection
                for (const doc of teamsSnapshot.docs) {
                    const data = doc.data();
                    if (data.teams && Array.isArray(data.teams)) {
                        const teamIndex = data.teams.findIndex((t: any) => t.id === teamId);
                        if (teamIndex !== -1) {
                            ourTeamName = teamIndex === 0
                                ? data.schoolName
                                : `${data.schoolName} ${teamIndex + 1}`;
                            break;
                        }
                    }
                }

                setTeamName(ourTeamName);
                setLoading(false);

                // 4. Process other schools in the group
                const otherTeamsInfo = [];
                const allTeams = await getDocs(collection(db, 'teams'));

                for (const schoolId of otherSchools) {
                    const targetTeamId = `team-${schoolId}`;
                    let teamFound = false;

                    // Search through all team documents
                    for (const doc of allTeams.docs) {
                        const schoolData = doc.data();
                        if (schoolData.teams && Array.isArray(schoolData.teams)) {
                            const teamIndex = schoolData.teams.findIndex((t: any) => t.id === targetTeamId);

                            if (teamIndex !== -1) {
                                const teamName = teamIndex === 0
                                    ? schoolData.schoolName
                                    : `${schoolData.schoolName} ${teamIndex + 1}`;

                                otherTeamsInfo.push({
                                    id: targetTeamId,
                                    name: teamName,
                                    schoolName: schoolData.schoolName
                                });
                                teamFound = true;
                                break;
                            }
                        }
                    }

                    if (!teamFound) {
                        console.warn(`Could not find team with ID: ${targetTeamId}`);
                    }
                }

                // Set initial online status for other teams
                setOtherTeams(otherTeamsInfo.map(team => ({ ...team, isOnline: false })));
                setCurrentGroupId(ourGroupId);

                // Set up snapshot listener for group document
                const groupDocRef = doc(db, 'groups', ourGroupId);
                const unsubscribe = onSnapshot(groupDocRef, (doc) => {
                    const groupData = doc.data();
                    if (groupData?.logged) {
                        setOtherTeams(prevTeams =>
                            prevTeams.map(team => {
                                const teamId = team.id.replace('team-', '');
                                return {
                                    ...team,
                                    isOnline: groupData.logged[teamId] === true
                                };
                            })
                        );
                    }
                });

                // Update login status to true
                await updateTeamLoginStatus(true);

                // Set initial states
                setShowWelcome(true);
                setShowRules(false);
                setShowCompetition(false);

                return () => {
                    if (unsubscribe) unsubscribe();
                };


            } catch (error) {
                console.error('Error initializing team competition:', error);
                setLoading(false);
                setTeamName('Demo Team');
            }
        };

        let isMounted = true;

        fetchTeamData().catch(console.error);

        // Cleanup function to set login status to false when component unmounts
        return () => {
            isMounted = false;
            updateTeamLoginStatus(false).catch(console.error);
        };
    }, [router]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle competition timer
    useEffect(() => {
        if (showCompetition) {
            const updateCompetitionTime = () => {
                const now = Date.now();
                const timeLeft = Math.ceil((competitionEndTime - now) / 1000);
                setTimeLeft(timeLeft > 0 ? timeLeft : 0);
                
                if (timeLeft <= 0) {
                    setIsCompetitionActive(false);
                    // Automatically submit answers when time is up
                    if (Object.keys(answers).length > 0) {
                        // Submit answers logic here if needed
                    }
                } else {
                    setIsCompetitionActive(true);
                }
            };

            // Initial update
            updateCompetitionTime();
            
            // Set up interval for updates
            const timer = setInterval(updateCompetitionTime, 1000);
            return () => clearInterval(timer);
        }
    }, [showCompetition, competitionEndTime, answers]);

    // Single interval for welcome and rules timers
    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();

            // Welcome screen shows for 30 seconds before competition starts
            if (showWelcome) {
                const welcomeEndTime = COMPETITION_END_TIME - (10 * 60 * 1000); // 10 minutes before end
                const welcomeRemaining = Math.ceil((welcomeEndTime - now) / 1000);
                setWelcomeTimeLeft(welcomeRemaining > 0 ? welcomeRemaining : 0);

                if (welcomeRemaining <= 0) {
                    setShowWelcome(false);
                    setShowRules(true);
                }
            }

            // Rules screen shows for 30 seconds after welcome screen
            if (showRules) {
                const rulesEndTime = COMPETITION_END_TIME - (9.5 * 60 * 1000); // 9.5 minutes before end
                const rulesRemaining = Math.ceil((rulesEndTime - now) / 1000);
                setRulesTimeLeft(rulesRemaining > 0 ? rulesRemaining : 0);

                if (now >= rulesEndTime) {
                    setShowRules(false);
                    setShowCompetition(true);
                    setIsCompetitionActive(true);
                }
            }

        }, 1000);

        return () => clearInterval(timer);
    }, [showWelcome, showRules]);

    // Handle the 2-minute countdown timer
    useEffect(() => {
        if (!showWelcome && !showRules && !isTimerRunning) {
            setIsTimerRunning(true);
            const timer = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    if (prevTimeLeft <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTimeLeft - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [showWelcome, showRules, isTimerRunning]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-700">Loading your team information...</p>
                </div>
            </div>
        );
    }

    if (showWelcome) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome, {teamName}!</h1>
                    </div>

                    <div className="mb-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-semibold text-gray-800">{groupName || 'Group A (Ontario)'}</h2>
                        </div>
                    </div>

                    <div className="flex justify-center mb-12">
                        <div className="text-center">
                            <div className="flex items-baseline justify-center space-x-1">
                                <div className="flex flex-col items-center mx-4">
                                    <span className="text-8xl font-mono font-bold text-black">
                                        {Math.floor(welcomeTimeLeft / 60).toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-lg text-gray-600 mt-2">minutes</span>
                                </div>
                                <span className="text-8xl font-mono font-bold text-black">:</span>
                                <div className="flex flex-col items-center mx-4">
                                    <span className="text-8xl font-mono font-bold text-black">
                                        {(welcomeTimeLeft % 60).toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-lg text-gray-600 mt-2">seconds</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {otherTeams.map((team) => (
                            <div key={team.id} className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center space-x-3">
                                    <span className={`inline-block w-3 h-3 rounded-full ${team.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <div>
                                        <p className="text-lg font-medium text-gray-800">{team.name}</p>
                                        {/* <p className="text-sm text-gray-500">{team.schoolName}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {showWelcome ? (
                <div className="min-h-screen flex items-center justify-center p-6">
                    <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome, {teamName}!</h1>
                        </div>

                        <div className="mb-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-semibold text-gray-800">{groupName || 'Group A (Ontario)'}</h2>
                            </div>
                        </div>

                        <div className="flex justify-center mb-12">
                            <div className="text-center">
                                <div className="flex items-baseline justify-center space-x-1">
                                    <div className="flex flex-col items-center mx-4">
                                        <span className="text-8xl font-mono font-bold text-black">
                                            {Math.floor(welcomeTimeLeft / 60).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-lg text-gray-600 mt-2">minutes</span>
                                    </div>
                                    <span className="text-8xl font-mono font-bold text-black">:</span>
                                    <div className="flex flex-col items-center mx-4">
                                        <span className="text-8xl font-mono font-bold text-black">
                                            {(welcomeTimeLeft % 60).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-lg text-gray-600 mt-2">seconds</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {otherTeams.map((team) => (
                                <div key={team.id} className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center space-x-3">
                                        <span className={`inline-block w-3 h-3 rounded-full ${team.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">{team.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : showRules ? (
                <div className="w-full max-w-4xl mt-[5%] mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
                        Round {roundNumber} : Team Challenge
                    </h1>
                    <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Challenge Rules</h2>
                        <ul className="text-left space-y-4 text-gray-700 text-lg">
                            <li className="flex items-start">
                                <span className="text-black mr-3">•</span>
                                <span>Your team will be presented with 5 questions simultaneously that require numerical answers.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">•</span>
                                <span>Work together with your team to solve all 5 questions within the time limit.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">•</span>
                                <span>The first team to answer all questions correctly advances to the next round.</span>
                            </li>
                        </ul>
                        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400">
                            <p className="text-red-700">
                                <span className="font-semibold">On Cheating:</span> We are monitoring all team interactions. Any form of cheating will result in immediate disqualification of the entire team.
                            </p>
                        </div>
                        <div className="mt-8 text-center">
                            <p className="text-lg text-gray-600 mb-4">The round will begin in:</p>
                            <div className="text-3xl font-mono font-bold text-gray-800">
                                {rulesTimeLeft.toString().padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6 ">
                            <h2 className="text-3xl font-bold text-gray-900">Team Rush</h2>
                            <div className="flex items-center space-x-4">
                                <div className="bg-black text-white px-4 py-2 rounded-lg font-mono text-xl">
                                    {competitionEndTime ? formatTime(Math.max(0, Math.ceil((competitionEndTime - Date.now()) / 1000))) : '--:--'}
                                </div>
                                <button
                                    className="bg-red-500 hover:bg-red-800 text-white font-medium py-2 px-6 rounded-md text-lg transition-colors disabled:opacity-50"
                                    onClick={async () => {
                                        try {
                                            const response = await fetch('/api/validate_team_results', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    groupId: currentGroupId,
                                                    teamId: teamId
                                                })
                                            });

                                            if (!response.ok) {
                                                throw new Error('Failed to submit answers');
                                            }

                                            const result = await response.json();
                                            console.log('Answers submitted successfully!', result);
                                            
                                            // Disable the submit button after successful submission
                                            const submitBtn = document.querySelector('button[onClick]');
                                            if (submitBtn) {
                                                submitBtn.setAttribute('disabled', 'true');
                                                submitBtn.textContent = 'Submitted!';
                                                submitBtn.classList.remove('bg-red-500', 'hover:bg-red-800');
                                                submitBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
                                            }
                                            window.location.replace("/o/capture-the-problem");
                                        } catch (error) {
                                            console.error('Error submitting answers:', error);
                                            alert('Failed to submit answers. Please try again.');
                                        }
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Questions</h3>
                            <div className="space-y-6">
                                {questions.map((question) => (
                                    <div key={question.id} className="py-4 border-b last:border-b-0">
                                        <div className="w-full">
                                            <div className="flex">
                                                <span className="font-bold text-lg mr-3 text-gray-700">{question.id}.</span>
                                                <p className="text-lg text-gray-800">{question.text}</p>                                            </div>
                                            <div className="mt-3 ml-4">
                                                <input
                                                    type="number"
                                                    value={answers[question.id] || ''}
                                                    onChange={async (e) => {
                                                        const newValue = e.target.value;
                                                        setAnswers(prev => ({
                                                            ...prev,
                                                            [question.id]: newValue
                                                        }));
                                                        await updateTeamAnswers(question.id, newValue);
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Your answer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
