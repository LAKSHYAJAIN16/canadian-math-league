'use client'

import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'

/** Marks a team online/offline in its group — see groups/{groupId}/teamState/{teamId} in firestore.rules. */
export function setTeamPresence(groupId: string, teamId: string, online: boolean) {
  return setDoc(
    doc(db, 'groups', groupId, 'teamState', teamId),
    { online, lastSeenAt: serverTimestamp() },
    { merge: true }
  )
}
