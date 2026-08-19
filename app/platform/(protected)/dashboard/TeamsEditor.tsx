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
      <h2 className="text-xl font-semibold text-graphite-900">Your Teams</h2>
      {localTeams.map((team, teamIndex) => {
        const isEditing = editingTeamId === team.id
        const members = isEditing ? editingMembers : team.members

        return (
          <div key={team.id} className="bg-paper p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-graphite-900">Team {teamIndex + 1}</h3>
              {isEditing ? (
                <div className="space-x-2">
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1.5 border border-graphite-300 rounded-md text-xs font-medium text-graphite-700 bg-paper hover:bg-paper"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveTeamChanges(team.id)}
                    disabled={isSaving}
                    className="px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blueprint-800 hover:bg-blueprint-900 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEditing(team)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blueprint-800 hover:bg-blueprint-900"
                >
                  Edit Team
                </button>
              )}
            </div>

            {error && isEditing && <p className="text-sm text-redpen-600 mb-3">{error}</p>}

            <div className="space-y-3">
              {members.map((member, memberIndex) => (
                <div key={member.id} className="p-4 bg-paper rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-graphite-600 mb-1">
                        Member {memberIndex + 1} Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(memberIndex, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-graphite-300 rounded-md shadow-sm focus:outline-none focus:ring-blueprint-600 focus:border-blueprint-600 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-graphite-900">{member.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-graphite-600 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(memberIndex, 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-graphite-300 rounded-md shadow-sm focus:outline-none focus:ring-blueprint-600 focus:border-blueprint-600 text-sm"
                        />
                      ) : (
                        <p className="text-sm text-graphite-600">{member.email}</p>
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
