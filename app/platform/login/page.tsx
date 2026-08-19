'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

export const dynamic = 'force-dynamic'

const EMAIL_STORAGE_KEY = 'cml_teacher_login_email'

export default function TeacherLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [linkSent, setLinkSent] = useState(false)
  const [isCompletingSignIn, setIsCompletingSignIn] = useState(false)

  // If this page was opened via the emailed sign-in link, finish the flow.
  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) return

    const completeSignIn = async () => {
      setIsCompletingSignIn(true)
      setError('')

      let storedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY)
      if (!storedEmail) {
        storedEmail = window.prompt('Please confirm your email to finish signing in') ?? ''
      }
      if (!storedEmail) {
        setError('Email is required to complete sign-in.')
        setIsCompletingSignIn(false)
        return
      }

      try {
        const credential = await signInWithEmailLink(auth, storedEmail, window.location.href)
        const idToken = await credential.user.getIdToken()

        const response = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        })
        const result = await response.json()

        if (!response.ok || result.role !== 'teacher') {
          setError(
            "This email isn't linked to a school yet. Contact us if you believe this is a mistake."
          )
          setIsCompletingSignIn(false)
          return
        }

        window.localStorage.removeItem(EMAIL_STORAGE_KEY)
        router.push('/platform/dashboard')
        router.refresh()
      } catch (err) {
        console.error('Sign-in link error:', err)
        setError('This sign-in link is invalid or has expired. Request a new one below.')
        setIsCompletingSignIn(false)
      }
    }

    completeSignIn()
  }, [router])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await sendSignInLinkToEmail(auth, email.trim().toLowerCase(), {
        url: `${window.location.origin}/platform/login`,
        handleCodeInApp: true,
      })
      window.localStorage.setItem(EMAIL_STORAGE_KEY, email.trim().toLowerCase())
      setLinkSent(true)
    } catch (err) {
      console.error('Login error:', err)
      setError('Could not send sign-in link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isCompletingSignIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <p className="text-graphite-600">Signing you in...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-paper rounded-3xl shadow-soft-lg overflow-hidden flex flex-col md:flex-row">
        <div className="p-8 md:p-12 flex items-center justify-center bg-white md:w-1/2">
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

        <div className="hidden md:block border-l border-paper-line"></div>

        <div className="bg-white p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-center text-2xl font-bold text-graphite-900 mb-2">Teacher Sign In</h2>
          <p className="text-sm text-graphite-600 mb-6 text-center">
            Enter the email you registered with — we&apos;ll email you a sign-in link, no password
            needed.
          </p>

          {error && (
            <div className="mb-6 bg-redpen-50 rounded-xl p-4">
              <p className="text-sm text-redpen-700">{error}</p>
            </div>
          )}

          {linkSent ? (
            <div className="bg-redpen-50 rounded-xl p-4">
              <p className="text-sm text-redpen-700">
                Check your inbox — click the link we sent to <strong>{email}</strong> to finish
                signing in.
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-graphite-700 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-4 py-2.5 bg-redpen-50/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-redpen-400"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-press w-full flex justify-center py-3 px-4 rounded-full text-sm font-semibold text-white bg-redpen-600 shadow-red-glow hover:bg-redpen-700 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send sign-in link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
