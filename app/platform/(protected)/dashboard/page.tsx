import { redirect } from 'next/navigation'
import { getSessionClaims } from '@/lib/server/auth'
import { getSchoolWithTeams } from '@/lib/server/school'
import { getGroupStageStartMs } from '@/lib/server/schedule'
import { CountdownTimer } from './CountdownTimer'
import { TeamsEditor } from './TeamsEditor'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const claims = await getSessionClaims()
  if (!claims?.schoolId) redirect('/platform/login')

  const [school, groupStageStartMs] = await Promise.all([
    getSchoolWithTeams(claims.schoolId),
    getGroupStageStartMs(),
  ])

  if (!school) {
    return (
      <div className="rounded-xl bg-stamp-100 p-4">
        <p className="font-mono text-sm text-stamp-700">Team data not found.</p>
      </div>
    )
  }

  const totalStudents = school.teams.reduce((total, team) => total + team.members.length, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sans text-2xl text-ink-900">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-700">Welcome back, {school.schoolName}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl shadow-soft bg-ledger p-6">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-4">School information</h2>
          <div className="space-y-2">
            <p className="text-sm text-ink-700">
              <span className="font-semibold text-ink-900">School:</span> {school.schoolName}
            </p>
            <p className="text-sm text-ink-700">
              <span className="font-semibold text-ink-900">Email:</span> {school.teacherEmail}
            </p>
          </div>
        </div>

        <div className="rounded-2xl shadow-soft bg-ledger p-6">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-4">Teams summary</h2>
          <div className="space-y-2">
            <p className="text-sm text-ink-700">
              <span className="font-semibold text-ink-900">Total teams:</span> {school.teams.length}
            </p>
            <p className="text-sm text-ink-700">
              <span className="font-semibold text-ink-900">Total students:</span> {totalStudents}
            </p>
          </div>
        </div>

        <CountdownTimer targetMs={groupStageStartMs} />
      </div>

      <TeamsEditor teams={school.teams} />
    </div>
  )
}
