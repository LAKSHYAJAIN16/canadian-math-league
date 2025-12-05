'use client'

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, getDocs, collection, onSnapshot, DocumentData, DocumentReference, Firestore } from 'firebase/firestore';
import { db as firestoreDb } from '@/lib/config';

// Ensure db is properly typed
const db = firestoreDb as Firestore;
import { Loader2, Users, Clock, Award, CheckCircle, XCircle } from 'lucide-react';

export default function CaptureTheProblemPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showRules, setShowRules] = useState(false);
    const [showCompetition, setShowCompetition] = useState(false);
    const [welcomeTimeLeft, setWelcomeTimeLeft] = useState(0);
    const [rulesTimeLeft, setRulesTimeLeft] = useState(0);
    const [competitionTimeLeft, setCompetitionTimeLeft] = useState(0);
    const [teamName, setTeamName] = useState('');
    const [teamId, setTeamId] = useState('');
    const [currentGroupId, setCurrentGroupId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [conference, setConference] = useState('');
    const [otherTeams, setOtherTeams] = useState<Array<{ id: string, name: string, schoolName: string, isOnline: boolean }>>([]);
    const [isCompetitionActive, setIsCompetitionActive] = useState(false);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentProblem, setCurrentProblem] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState<number | null>(null);
    const [totalQuestions, setTotalQuestions] = useState(0);

    // Sample problems (replace with actual problems)
    const problems = [
        { id: 1, text: 'What is 2 + 2?' },
        { id: 2, text: 'What is the square root of 144?' },
        { id: 3, text: 'Solve for x: 3x + 5 = 20' },
        { id: 4, text: 'What is the area of a circle with radius 7?' },
        { id: 5, text: 'What is the sum of the first 10 natural numbers?' },
        { id: 6, text: 'What is the value of 5! (5 factorial)?' },
        { id: 7, text: 'What is the next number in the sequence: 2, 4, 8, 16, ...?' },
        { id: 8, text: 'What is the value of π (pi) to two decimal places?' },
        { id: 9, text: 'What is the square of 15?' },
        { id: 10, text: 'What is the sum of the interior angles of a triangle?' },
    ];
    
    // Update team login status in Firebase
    const updateTeamLoginStatus = useCallback(async (isLoggedIn: boolean) => {
        try {
            if (!currentGroupId || !teamId) return;
            
            const groupRef = doc(db, 'groups', currentGroupId);
            await updateDoc(groupRef, {
                [`logged.${teamId}`]: isLoggedIn,
                [`${teamId}_lastSeen`]: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating login status:', error);
        }
    }, [currentGroupId, teamId]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
                setTeamName(cleanTeamId);

                // Fetch group data
                const groupsSnapshot = await getDocs(collection(db, 'groups'));
                if (!groupsSnapshot.empty) {
                    const groupDoc = groupsSnapshot.docs[0];
                    const groupData = groupDoc.data();
                    setCurrentGroupId(groupDoc.id);
                    setGroupName(groupData.name || 'Default Group');
                    setConference(groupData.conference || '');
                    
                    // Set up real-time updates for other teams
                    const unsubscribe = onSnapshot(doc(db, 'groups', groupDoc.id), (doc) => {
                        const data = doc.data();
                        if (data) {
                            const teams = [];
                            for (const [teamId, teamData] of Object.entries(data)) {
                                if (teamId.startsWith('team-') && typeof teamData === 'object' && teamData !== null) {
                                    const typedData = teamData as { name: string; schoolName: string };
                                    teams.push({
                                        id: teamId,
                                        name: typedData.name || teamId,
                                        schoolName: typedData.schoolName || 'Unknown School',
                                        isOnline: data.logged?.[teamId] || false
                                    });
                                }
                            }
                            setOtherTeams(teams);
                        }
                    });

                    // Update login status
                    await updateTeamLoginStatus(true);
                    
                    return () => {
                        unsubscribe();
                        updateTeamLoginStatus(false);
                    };
                }

                setLoading(false);
                setShowWelcome(true);
                setShowRules(false);
                setShowCompetition(false);

            } catch (error) {
                console.error('Error initializing competition:', error);
                setLoading(false);
                setTeamName('Demo Team');
            }
        };

        fetchTeamData().catch(console.error);

        return () => {
            updateTeamLoginStatus(false).catch(console.error);
        };
    }, [updateTeamLoginStatus, router]);

    // Timer for welcome and rules
    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();

            if (showWelcome) {
                const welcomeRemaining = Math.ceil((new Date('December 4, 2025 19:30:00').getTime() - now) / 1000);
                setWelcomeTimeLeft(welcomeRemaining > 0 ? welcomeRemaining : 0);

                if (welcomeRemaining <= 0) {
                    setShowWelcome(false);
                    setShowRules(true);
                }
            }

            if (showRules) {
                const rulesRemaining = Math.ceil((new Date('December 4, 2025 19:35:00').getTime() - now) / 1000);
                setRulesTimeLeft(rulesRemaining > 0 ? rulesRemaining : 0);

                if (rulesRemaining <= 0) {
                    setShowRules(false);
                    setShowCompetition(true);
                    setIsCompetitionActive(true);
                }
            }

            if (showCompetition && isCompetitionActive) {
                const competitionRemaining = Math.ceil((new Date('December 4, 2025 20:00:00').getTime() - now) / 1000);
                setCompetitionTimeLeft(competitionRemaining > 0 ? competitionRemaining : 0);

                if (competitionRemaining <= 0) {
                    setIsCompetitionActive(false);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [showWelcome, showRules, showCompetition, isCompetitionActive]);

    // Handle answer submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (hasSubmitted) return;
        
        try {
            setIsSubmitting(true);
            
            // Submit answers to the API
            const response = await fetch('/api/validate_team_results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupId: currentGroupId,
                    teamId: teamId,
                    answers: answers
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit answers');
            }

            const result = await response.json();
            console.log('Answers submitted successfully!', result);
            
            // Update state with results
            setCorrectAnswers(result.correctAnswers);
            setTotalQuestions(result.totalQuestions);
            setHasSubmitted(true);
            
            // Disable the submit button
            const submitBtn = document.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.setAttribute('disabled', 'true');
                submitBtn.textContent = 'Submitted!';
                submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                submitBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
            }
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = '/o/competition';
            }, 2000);
            
        } catch (error) {
            console.error('Error submitting answers:', error);
            alert('Failed to submit answers. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading competition...</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading competition...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {showWelcome && (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Welcome to Capture the Problem</h1>
                    <div className="mb-6 md:mb-8">
                        <div className="bg-gray-100 inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
                            <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2" />
                            <span className="font-mono text-sm md:text-base">
                                Starting in {formatTime(welcomeTimeLeft)}
                            </span>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-2">{teamName}</h2>
                            <p className="text-blue-700">{groupName}</p>
                            {conference && <p className="text-blue-600 text-sm">{conference} Conference</p>}
                        </div>
                        
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center justify-center mb-3">
                                <Users className="h-5 w-5 text-gray-500 mr-2" />
                                <h3 className="text-lg font-medium text-gray-700">Teams in your group</h3>
                            </div>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {otherTeams.length > 0 ? (
                                    otherTeams.map((team) => (
                                        <div 
                                            key={team.id} 
                                            className={`flex items-center p-3 rounded-lg border ${team.isOnline ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                                        >
                                            <div className={`h-2.5 w-2.5 rounded-full mr-3 ${team.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <div className="flex-1 text-left">
                                                <span className="font-medium text-gray-900">{team.name}</span>
                                                <span className="text-gray-500 text-sm ml-2">({team.schoolName})</span>
                                            </div>
                                            {team.isOnline && (
                                                <span className="text-xs text-green-600 font-medium">Online</span>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 py-4">No other teams in your group yet</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showRules && (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Competition Rules</h1>
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                            {teamName}
                        </div>
                    </div>
                    
                    <div className="mb-8">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <span className="font-medium">Important:</span> The competition will start automatically when the timer reaches zero.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 inline-flex items-center px-4 md:px-6 py-2 rounded-full mb-6">
                            <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2" />
                            <span className="font-mono text-sm md:text-base">
                                Starting in {formatTime(rulesTimeLeft)}
                            </span>
                        </div>

                        <div className="prose max-w-none">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works:</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 mt-1">•</span>
                                        <span>You'll have <span className="font-medium">30 minutes</span> to solve <span className="font-medium">10 problems</span>.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 mt-1">•</span>
                                        <span>Each problem has a <span className="font-medium">unique solution</span> (numerical or word).</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 mt-1">•</span>
                                        <span>You can <span className="font-medium">navigate freely</span> between problems using the Previous/Next buttons.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 mt-1">•</span>
                                        <span>Your answers are saved automatically as you type.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 mt-1">•</span>
                                        <span>You can change your answers at any time before submitting.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 mt-1">•</span>
                                        <span>When you're done, click <span className="font-medium">Submit All Answers</span> to finalize your submission.</span>
                                    </li>
                                </ul>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Scoring:</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            <span>+1 point for each correct answer</span>
                                        </li>
                                        <li className="flex items-center">
                                            <XCircle className="h-5 w-5 text-gray-300 mr-2" />
                                            <span>0 points for incorrect or blank answers</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-blue-800 text-sm">
                                        <span className="font-medium">Note:</span> The competition will automatically submit all answers when time runs out. 
                                        Make sure to review your answers before the time limit is reached.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showCompetition && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center mb-3 sm:mb-0">
                                    <h1 className="text-xl font-bold text-gray-900">Capture the Problem</h1>
                                    <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        {conference}
                                    </span>
                                </div>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-base sm:text-lg flex items-center">
                                    <Clock className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                                    <span>{formatTime(competitionTimeLeft)}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Team: {teamName}</p>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        Problem {currentProblem} of {problems.length}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {Object.keys(answers).length}/{problems.length} answered
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                        style={{ width: `${(Object.keys(answers).length / problems.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                                <div className="prose max-w-none">
                                    <h3 className="text-xl font-medium text-gray-900 mb-4">
                                        Problem {currentProblem}
                                    </h3>
                                    <div className="text-lg text-gray-800">
                                        {problems[currentProblem - 1]?.text || 'No more problems'}
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label 
                                        htmlFor={`answer-${currentProblem}`} 
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Your Answer
                                    </label>
                                    <input
                                        type="text"
                                        id={`answer-${currentProblem}`}
                                        value={answers[currentProblem] || ''}
                                        onChange={(e) => 
                                            setAnswers(prev => ({
                                                ...prev, 
                                                [currentProblem]: e.target.value.trim()
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                                        placeholder="Type your answer here..."
                                        required
                                        autoFocus
                                        disabled={hasSubmitted}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Press Enter or click Next to save your answer
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse sm:flex-row sm:justify-between pt-4 space-y-3 sm:space-y-0">
                                    <div className="flex space-x-3">
                                        {currentProblem > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setCurrentProblem(prev => Math.max(1, prev - 1))}
                                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                disabled={isSubmitting || hasSubmitted}
                                            >
                                                Previous
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const nextProblem = currentProblem < problems.length ? currentProblem + 1 : currentProblem;
                                                setCurrentProblem(nextProblem);
                                            }}
                                            className={`px-5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                                                currentProblem < problems.length 
                                                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500' 
                                                    : 'border-transparent text-gray-400 cursor-not-allowed'
                                            }`}
                                            disabled={currentProblem >= problems.length || isSubmitting || hasSubmitted}
                                        >
                                            Skip
                                        </button>
                                    </div>
                                    
                                    <div className="flex space-x-3">
                                        {currentProblem < problems.length ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const nextProblem = currentProblem + 1;
                                                    setCurrentProblem(nextProblem);
                                                }}
                                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                disabled={!answers[currentProblem] || isSubmitting || hasSubmitted}
                                            >
                                                Save & Next
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className={`px-8 py-2.5 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                                                    hasSubmitted 
                                                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                                                        : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
                                                }`}
                                                disabled={isSubmitting || hasSubmitted}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center">
                                                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                                        Submitting...
                                                    </span>
                                                ) : hasSubmitted ? (
                                                    'Submitted!'
                                                ) : (
                                                    'Submit All Answers'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {hasSubmitted && correctAnswers !== null && (
                                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-green-800">
                                                    Submission successful! You got {correctAnswers} out of {totalQuestions} correct.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Problem navigation */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Jump to problem:</h3>
                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                            {problems.map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentProblem(index + 1)}
                                    className={`w-full aspect-square flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                                        currentProblem === index + 1
                                            ? 'bg-blue-600 text-white'
                                            : answers[index + 1]
                                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    disabled={isSubmitting || hasSubmitted}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
