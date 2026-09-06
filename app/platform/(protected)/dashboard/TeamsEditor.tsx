'use client'

import { useState } from 'react'
import type { SchoolTeam, SchoolMember } from '@/lib/server/school'

export function TeamsEditor({ teams }: { teams: SchoolTeam[] }) {
  const [localTeams, setLocalTeams] = useState(teams)
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [editingMembers, setEditingMembers] = useState<SchoolMember[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const startEditing = (team: SchoolTeam) => {
    setEditingTeamId(team.id)
    setEditingMembers(team.members.map((member) => ({ ...member })))
    setError('')
  }

  const cancelEditing = () => {
    setEditingTeamId(null)
    setEditingMembers([])
  }

  const handleMemberChange = (index: number, field: 'name' | 'email', value: string) => {
    setEditingMembers((prev) =>
      prev.map((member, i) => (i === index ? { ...member, [field]: value } : member))
    )
  }

  const saveTeamChanges = async (teamId: string) => {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(`/api/teacher/teams/${teamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: editingMembers }),
      })
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        throw new Error(result.error ?? 'Failed to update team')
      }

      setLocalTeams((prev) =>
        prev.map((team) => (team.id === teamId ? { ...team, members: editingMembers } : team))
      )
      setEditingTeamId(null)
      setEditingMembers([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-sans text-xl text-ink-900">Your teams</h2>
      {localTeams.map((team, teamIndex) => {
        const isEditing = editingTeamId === team.id
        const members = isEditing ? editingMembers : team.members

        return (
          <div key={team.id} className="rounded-2xl shadow-soft bg-ledger p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-sans text-lg text-ink-900">Team {teamIndex + 1}</h3>
              {isEditing ? (
                <div className="space-x-2">
                  <button
                    onClick={cancelEditing}
                    className="btn-press px-4 py-1.5 rounded-full shadow-soft hover:shadow-soft-lg font-mono text-xs font-semibold uppercase tracking-wide text-ink-900 bg-ledger hover:bg-ledger-deep"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveTeamChanges(team.id)}
                    disabled={isSaving}
                    className="btn-press px-4 py-1.5 rounded-full shadow-stamp-glow font-mono text-xs font-semibold uppercase tracking-wide text-ledger bg-stamp-600 hover:bg-stamp-700 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEditing(team)}
                  className="btn-press inline-flex items-center px-4 py-1.5 rounded-full shadow-stamp-glow font-mono text-xs font-semibold uppercase tracking-wide text-ledger bg-stamp-600 hover:bg-stamp-700"
                >
                  Edit team
                </button>
              )}
            </div>

            {error && isEditing && <p className="font-mono text-xs text-stamp-600 mb-3">{error}</p>}

            <div className="space-y-3">
              {members.map((member, memberIndex) => (
                <div key={member.id} className="p-4 rounded-xl bg-ledger-deep">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[0.625rem] font-semibold uppercase tracking-wide text-ink-700 mb-1">
                        Member {memberIndex + 1} name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(memberIndex, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-ledger focus:outline-none focus:ring-2 focus:ring-stamp-600/40 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-semibold text-ink-900">{member.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-mono text-[0.625rem] font-semibold uppercase tracking-wide text-ink-700 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(memberIndex, 'email', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-ledger focus:outline-none focus:ring-2 focus:ring-stamp-600/40 text-sm"
                        />
                      ) : (
                        <p className="text-sm text-ink-700">{member.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
