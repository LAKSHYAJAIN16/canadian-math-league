'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/config';
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            if (db) {
                const q = query(
                    collection(db, 'teams'),
                    where('teacherEmail', '==', email.trim().toLowerCase()),
                    where('teacherPassword', '==', password.trim())
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError('Invalid email or password');
                    return;
                }

                const teamData = querySnapshot.docs[0].data();
                const teamId = querySnapshot.docs[0].id;

                localStorage.setItem('teacherAuth', JSON.stringify({
                    email: teamData.teacherEmail,
                    teamId,
                    schoolName: teamData.schoolName,
                    loggedIn: true
                }));

                router.push('/platform/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="p-8 md:p-12 flex items-center justify-center bg-gray-50 md:w-1/2">
                    <div className="w-full max-w-xs">
                        <Image
                            src="/logo.png"
                            alt="Canadian Math League"
                            width={400}
                            height={200}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>

                {/* Vertical Divider - Only show on medium screens and up */}
                <div className="hidden md:block border-l border-gray-200"></div>

                {/* Login Form Section */}
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                    <div className="sm:mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Teacher Login
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}