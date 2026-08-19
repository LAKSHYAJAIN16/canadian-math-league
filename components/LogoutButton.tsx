'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

export function LogoutButton({ redirectTo, className }: { redirectTo: string; className?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/session', { method: 'DELETE' })
      await signOut(auth).catch(() => {})
    } finally {
      router.push(redirectTo)
      router.refresh()
    }
  }

  return (
    <button onClick={handleLogout} disabled={isLoading} className={className}>
      {isLoading ? 'Signing out...' : 'Logout'}
    </button>
  )
}
