'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

// Always session-dependent, never useful to prerender statically — and
// prerendering would execute Firebase client init at build time, which
// needs real env vars that CI/local builds may not have configured yet.
export const dynamic = 'force-dynamic';

export default function JoinPage() {
    const [joinCode, setJoinCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const joinWithCode = async (code: string) => {
        setIsLoading(true);
        setError('');

        try {
            // A real, revocable Firebase Auth identity for the student — the
            // server (not this page) decides which team/member that identity
            // maps to, via /api/auth/join.
            const credential = auth.currentUser ?? (await signInAnonymously(auth)).user;
            const idToken = await credential.getIdToken();

            const joinResponse = await fetch('/api/auth/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({ joinCode: code.trim() }),
            });
            const joinResult = await joinResponse.json();

            if (!joinResponse.ok) {
                setError(joinResult.error ?? 'Invalid join code. Please check and try again.');
                return;
            }

            // Custom claims just changed server-side — force a token refresh
            // so the session cookie we mint next actually carries them.
            const freshIdToken = await credential.getIdToken(true);
            const sessionResponse = await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken: freshIdToken }),
            });

            if (!sessionResponse.ok) {
                setError('Could not start your session. Please try again.');
                return;
            }

            router.push('/o/competition');
        } catch (err) {
            console.error('Error joining team:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-submit if a code is provided in the URL, e.g. /join?code=AB12CD
    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            setJoinCode(code);
            joinWithCode(code);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        joinWithCode(joinCode);
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
