'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

export const dynamic = 'force-dynamic'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
      const idToken = await credential.user.getIdToken()

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })
      const result = await response.json()

      if (!response.ok || result.role !== 'admin') {
        setError('This account does not have admin access.')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      console.error('Admin login error:', err)
      setError('Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-paper rounded-xl shadow-lg p-8">
        <h1 className="text-xl font-bold text-graphite-900 mb-6 text-center">Admin Sign In</h1>

        {error && (
          <div className="mb-4 bg-redpen-50 rounded-2xl p-3">
            <p className="text-sm text-redpen-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-graphite-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 border border-graphite-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueprint-600 focus:border-blueprint-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-graphite-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3 py-2 border border-graphite-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueprint-600 focus:border-blueprint-600"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-md text-sm font-medium text-white bg-redpen-600 hover:bg-redpen-700 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
