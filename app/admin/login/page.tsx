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
    <div className="min-h-screen bg-ledger flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl shadow-soft-lg bg-ledger py-8 px-6">
        <h1 className="text-center font-sans text-2xl text-ink-900 mb-6">Admin sign in</h1>

        {error && (
          <div className="mb-4 rounded-xl bg-stamp-100 p-3">
            <p className="font-mono text-sm text-stamp-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full px-4 py-2.5 bg-ledger-deep/60 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-stamp-600/40"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full px-4 py-2.5 bg-ledger-deep/60 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-stamp-600/40"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-press w-full flex justify-center items-center py-3.5 px-4 rounded-full shadow-stamp-glow font-mono text-sm font-semibold uppercase tracking-wide text-ledger bg-stamp-600 hover:bg-stamp-700 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
