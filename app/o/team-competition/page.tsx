'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/config';
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
                
                if (!teamId) {
                    router.push('/join');
                    return;
                }

                // Fetch all teams to find our team
                const teamsSnapshot = await getDocs(collection(db, 'teams'));
                
                let schoolName = '';
                let teamNumber = 1;
                let isOnlyOne = true;
                let teamFound = false;

                // Search through all team documents
                for (const doc of teamsSnapshot.docs) {
                    const data = doc.data();
                    console.log(data);
                    console.log(teamId);
                    if (data.teams && Array.isArray(data.teams)) {
                        // Find our team in the teams array
                        const teamIndex = data.teams.findIndex((t: any) => t.id === teamId);
                        console.log(teamIndex);
                        if (teamIndex !== -1) {
                            schoolName = data.schoolName || 'Our School';
                            // If there's more than one team, add the team number
                            if (data.teams.length > 1) {
                                teamNumber = teamIndex + 1;
                                isOnlyOne = false;
                            }
                            teamFound = true;
                            break;
                        }
                    }
                }

                if (!teamFound) {
                    throw new Error('Team not found');
                }

                // Set the team name based on the logic
                const displayName = isOnlyOne == false
                    ? `${schoolName} ${teamNumber}`
                    : schoolName;
                
                setTeamName(displayName);
                setLoading(false);
                
                // Set up welcome screen countdown (3 seconds)
                setShowWelcome(true);
                
                const welcomeTimer = setTimeout(() => {
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
                }, 3000);
                
                return () => clearTimeout(welcomeTimer);


            } catch (error) {
                console.error('Error initializing team competition:', error);
                setLoading(false);
                // Show error but don't redirect to allow debugging
                setTeamName('Team Not Found');
            }
        };

        fetchTeamData();
    }, [router]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">Loading Team Competition...</h2>
                    <p className="text-gray-600 mt-2">Preparing your team's workspace</p>
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
                            The team competition will begin in 10 seconds
                        </p>
                        <div className="flex flex-col items-center">
                            <div className="text-6xl font-mono font-bold text-black flex items-baseline">
                                <div className="flex flex-col items-center mx-2">
                                    <span>{Math.floor(timeLeft / 60).toString().padStart(2, '0')}</span>
                                    <span className="text-sm text-gray-500 mt-1">minutes</span>
                                </div>
                                <span>:</span>
                                <div className="flex flex-col items-center mx-2">
                                    <span>{(timeLeft % 60).toString().padStart(2, '0')}</span>
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
