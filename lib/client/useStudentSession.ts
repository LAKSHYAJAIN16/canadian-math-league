'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/client'

export interface StudentSession {
  uid: string
  schoolId: string
  teamId: string
  memberId: string
  groupId: string | null
  name: string
}

/**
 * Replaces the old `JSON.parse(localStorage.getItem('studentAuth'))`
 * pattern. Identity now comes from a verified Firebase Auth session and its
 * server-set custom claims (see /api/auth/join), not an unverified blob the
 * client could edit in devtools.
 */
export function useStudentSession(): { session: StudentSession | null; loading: boolean } {
  const router = useRouter()
  const [session, setSession] = useState<StudentSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        router.push('/join')
        return
      }

      const tokenResult = await user.getIdTokenResult()
      const claims = tokenResult.claims as Record<string, unknown>
      const { role, schoolId, teamId, memberId, groupId } = claims as {
        role?: string
        schoolId?: string
        teamId?: string
        memberId?: string
        groupId?: string | null
      }

      if (role !== 'student' || !schoolId || !teamId || !memberId) {
        router.push('/join')
        return
      }

      const memberSnap = await getDoc(
        doc(db, 'schools', schoolId, 'teams', teamId, 'members', memberId)
      )
      const name = (memberSnap.data()?.name as string | undefined) ?? 'Participant'

      setSession({ uid: user.uid, schoolId, teamId, memberId, groupId: groupId ?? null, name })
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  return { session, loading }
}
