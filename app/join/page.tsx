'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/config';

export default function JoinPage() {
    const [joinCode, setJoinCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const memberId = `member-${joinCode.trim()}`;
            console.log('Searching for member:', memberId);

            // First, get all team documents
            const teamsRef = collection(db, 'teams');
            const querySnapshot = await getDocs(teamsRef);

            // Find the team and member that match
            let foundTeam = null;
            let foundMember = null;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.teams && Array.isArray(data.teams)) {
                    data.teams.forEach(team => {
                        if (team.members && Array.isArray(team.members)) {
                            const member = team.members.find(m => m.id === memberId);
                            if (member) {
                                foundTeam = doc;
                                foundMember = member;
                            }
                        }
                    });
                }
            });

            if (!foundTeam || !foundMember) {
                setError('Invalid join code. Please check and try again.');
                setIsLoading(false);
                return;
            }

            // Store member ID in localStorage for session management
            localStorage.setItem('studentAuth', JSON.stringify({
                memberId,
                teamId: foundTeam.id
            }));

            // Redirect to student dashboard
            router.push('/student/dashboard');

        } catch (error) {
            console.error('Error joining team:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img
                        src="/logo.png"
                        alt="Canadian Math League"
                        className="h-48 w-auto"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Join Competition
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your join code to access the competition
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="joinCode" className="block text-sm font-medium text-gray-700">
                                Join Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="joinCode"
                                    name="joinCode"
                                    type="text"
                                    required
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your join code"
                                    autoComplete="off"
                                    autoCapitalize="characters"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? 'Joining...' : 'Join Competition'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}