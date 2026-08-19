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
        <div className="min-h-screen bg-grid-blueprint flex flex-col justify-center py-12 px-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center mb-2">
                    <img src="/logo.png" alt="Canadian Math League" className="h-24 w-auto" />
                </div>
                <span className="stamp-label border-white text-white block w-fit mx-auto mb-3">Admit One</span>
                <h1 className="text-center text-2xl font-bold text-white">
                    Join Competition
                </h1>
                <p className="mt-2 text-center text-sm text-blueprint-200">
                    Enter the join code your teacher gave you.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="bg-paper border-2 border-graphite-900 rounded-xl py-8 px-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="joinCode" className="block text-xs font-bold uppercase tracking-wide text-graphite-700 mb-2">
                                Join Code
                            </label>
                            <input
                                id="joinCode"
                                name="joinCode"
                                type="text"
                                required
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                className="block w-full px-4 py-3 border-2 border-graphite-900 rounded-xl text-lg tracking-[0.3em] text-center uppercase placeholder:tracking-normal placeholder:text-graphite-400 focus:outline-none focus:border-redpen-600 bg-paper"
                                placeholder="ABCD12"
                                autoComplete="off"
                            />
                        </div>

                        {error && (
                            <div className="border-2 border-redpen-600 bg-redpen-100 p-3">
                                <p className="text-sm font-medium text-redpen-700">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`btn-press rounded-lg w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-bold uppercase tracking-wider text-white bg-redpen-600 shadow-stamp hover:bg-redpen-700 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Joining...' : 'Join Competition'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
