'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { GroupTeamRef } from '@/types/firestore'

export interface GroupTeamStatus extends GroupTeamRef {
  online: boolean
}

/** Other teams in the same group, with live presence — reads groups/{groupId}. */
export function useGroupTeams(groupId: string | null, ownTeamId: string | null) {
  const [teams, setTeams] = useState<GroupTeamStatus[]>([])
  // Full roster in stored order, own team included — lets a round derive a
  // stable pairing (e.g. Head to Head matchups) from position alone, with
  // no separate "matchups" doc to keep in sync.
  const [allTeams, setAllTeams] = useState<GroupTeamRef[]>([])
  const [groupName, setGroupName] = useState('')
  const [conference, setConference] = useState('')

  useEffect(() => {
    if (!groupId) return

    let unsubscribers: Array<() => void> = []

    getDoc(doc(db, 'groups', groupId)).then((groupSnap) => {
      const group = groupSnap.data() as
        | { name?: string; conference?: string; teams?: GroupTeamRef[] }
        | undefined
      if (!group) return

      setGroupName(group.name ?? '')
      setConference(group.conference ?? '')
      setAllTeams(group.teams ?? [])

      const otherTeams = (group.teams ?? []).filter((team) => team.teamId !== ownTeamId)
      setTeams(otherTeams.map((team) => ({ ...team, online: false })))

      unsubscribers = otherTeams.map((team) =>
        onSnapshot(doc(db, 'groups', groupId, 'teamState', team.teamId), (snap) => {
          setTeams((prev) =>
            prev.map((t) =>
              t.teamId === team.teamId ? { ...t, online: snap.data()?.online === true } : t
            )
          )
        })
      )
    })

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
  }, [groupId, ownTeamId])

  return { teams, allTeams, groupName, conference }
}
