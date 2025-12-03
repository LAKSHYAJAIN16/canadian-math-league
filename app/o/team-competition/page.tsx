'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where, Firestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db as firestoreDb } from '@/lib/config';

// Assert that db is not undefined
const db = firestoreDb as Firestore;
import { Loader2, Users, Clock, Award } from 'lucide-react';

export default function TeamCompetitionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showRules, setShowRules] = useState(false);
    const [rulesTimeLeft, setRulesTimeLeft] = useState(10); // 10 seconds for rules
    const [teamName, setTeamName] = useState('');
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [roundNumber, setRoundNumber] = useState(1);
    const [teamScore, setTeamScore] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [welcomeTimeLeft, setWelcomeTimeLeft] = useState(120); // 2 minutes for welcome screen
    const [otherTeams, setOtherTeams] = useState<Array<{ id: string, name: string, schoolName: string, isOnline: boolean }>>([]);
    const [currentGroupId, setCurrentGroupId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [conference, setConference] = useState('');

    // Function to update team login status
    const updateTeamLoginStatus = async (isLoggedIn: boolean) => {
        try {
            const auth = localStorage.getItem('studentAuth');
            if (!auth) return;

            const { teamId } = JSON.parse(auth);
            const cleanTeamId = teamId.replace('team-', '');

            // Find our group
            const groupsSnapshot = await getDocs(collection(db, 'groups'));
            for (const groupDoc of groupsSnapshot.docs) {
                const groupData = groupDoc.data();
                if (groupData.schools?.includes(cleanTeamId)) {
                    // Update the logged status for this team
                    await updateDoc(doc(db, 'groups', groupDoc.id), {
                        [`logged.${cleanTeamId}`]: isLoggedIn
                    });
                    break;
                }
            }
        } catch (error) {
            console.error('Error updating login status:', error);
        }
    };

    // Initialize component and fetch team data
    useEffect(() => {
        const fetchTeamData = async () => {
            // Get user data from localStorage
            const auth = localStorage.getItem('studentAuth');

            if (!auth) {
                router.push('/join');
                return;
            }

            try {
                const { teamId } = JSON.parse(auth);
                const cleanTeamId = teamId.replace('team-', ''); // Remove 'team-' prefix if present

                if (!teamId) {
                    router.push('/join');
                    return;
                }

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

                // Set up welcome screen countdown (2 minutes)
                setShowWelcome(true);
                const welcomeEndTime = Date.now() + (120 * 1000);

                const updateWelcomeTimer = () => {
                    const now = Date.now();
                    const remaining = Math.ceil((welcomeEndTime - now) / 1000);

                    if (remaining <= 0) {
                        setWelcomeTimeLeft(0);
                        setShowWelcome(false);
                        setShowRules(true);

                        // Start rules timer after welcome screen
                        const rulesEndTime = Date.now() + (10 * 1000);
                        const updateRulesTimer = () => {
                            const now = Date.now();
                            const remaining = Math.ceil((rulesEndTime - now) / 1000);

                            if (remaining <= 0) {
                                clearInterval(rulesTimer);
                                setShowRules(false);
                            } else {
                                setRulesTimeLeft(remaining);
                            }
                        };

                        const rulesTimer = setInterval(updateRulesTimer, 1000);
                        updateRulesTimer();

                        return () => clearInterval(rulesTimer);
                    } else {
                        setWelcomeTimeLeft(remaining);
                    }
                };

                const welcomeTimer = setInterval(updateWelcomeTimer, 1000);
                updateWelcomeTimer();

                // Cleanup function for the component
                return () => {
                    clearInterval(welcomeTimer);
                    if (unsubscribe) unsubscribe();
                };


            } catch (error) {
                console.error('Error initializing team competition:', error);
                setLoading(false);
                // Show error but don't redirect to allow debugging
                setTeamName('Team Not Found');
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
            <div className="min-h-screen p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome, {teamName}!</h1>
                    </div>

                    <div className="mb-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-semibold text-gray-800">Group A (Ontario)</h2>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <div className="text-8xl font-mono font-bold text-black mb-1">
                            {Math.floor(welcomeTimeLeft / 60)}:{(welcomeTimeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="font-mono text-gray-600">minutes {"     "} seconds</div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {otherTeams.map((team) => (
                            <div key={team.id} className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center space-x-3">
                                    <span className={`inline-block w-3 h-3 rounded-full ${team.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <div>
                                        <p className="text-lg font-medium text-gray-800">{team.name}</p>
                                        <p className="text-sm text-gray-500">{team.schoolName}</p>
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
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Team Competition</h1>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Users className="h-4 w-4 mr-1" />
                            {teamName}
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                            <Clock className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="font-mono font-medium text-blue-800">
                                {formatTime(timeLeft)}
                            </span>
                        </div>

                        <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                            <Award className="h-5 w-5 text-green-600 mr-2" />
                            <span className="font-medium text-green-800">
                                {teamScore} points
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            {showWelcome ? (
                <div className="fixed inset-0 bg-white flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            Welcome, {teamName}!
                        </h1>
                        <p className="text-2xl text-gray-600 mb-8">
                            The team competition will begin in:
                        </p>
                        <div className="flex flex-col items-center">
                            <div className="text-6xl font-mono font-bold text-black flex items-baseline">
                                <div className="flex flex-col items-center mx-2">
                                    <span>{Math.floor(welcomeTimeLeft / 60).toString().padStart(2, '0')}</span>
                                    <span className="text-sm text-gray-500 mt-1">minutes</span>
                                </div>
                                <span>:</span>
                                <div className="flex flex-col items-center mx-2">
                                    <span>{(welcomeTimeLeft % 60).toString().padStart(2, '0')}</span>
                                    <span className="text-sm text-gray-500 mt-1">seconds</span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-8 text-gray-500">
                            Get ready to collaborate with your teammates!
                        </p>
                    </div>
                </div>
            ) : showRules ? (
                <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
                    <div className="text-center max-w-4xl px-8">
                        <div className="text-5xl font-bold text-gray-900 mb-12">
                            Round {roundNumber} : Complete 5
                        </div>

                        <div className="text-2xl text-gray-700 mb-12 text-left space-y-6 max-w-2xl mx-auto">
                            <p>• Your team will be presented with 5 questions simultaneously</p>
                            <p>• All questions require numerical answers</p>
                            <p>• Work together to solve all 5 questions</p>
                            <p>• The first team to answer all questions correctly advances</p>
                            <p>• You'll have 2 minutes to complete the round</p>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center">
                        <div className="bg-black text-white text-6xl font-mono font-bold px-8 py-4 rounded-lg">
                            {rulesTimeLeft}
                        </div>
                        <div className="text-xl text-gray-600 mt-4">
                            The round will begin in {rulesTimeLeft} seconds...
                        </div>
                    </div>
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Round {roundNumber} - Team Challenge
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Work together with your team to solve these challenging problems!
                            </p>

                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 max-w-2xl mx-auto">
                                <h3 className="text-xl font-semibold text-blue-800 mb-4">Round In Progress</h3>
                                <p className="text-blue-700">
                                    Work together with your team to solve the problems!
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            )}

            {/* Team Chat/Controls Section (to be implemented) */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Team Controls</h3>
                    <p className="text-gray-600">Team collaboration features will appear here.</p>
                </div>
            </div>
        </div>
    );
}
