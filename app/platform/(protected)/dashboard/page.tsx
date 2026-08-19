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
      <div className="bg-redpen-50 rounded-2xl p-4">
        <p className="text-sm text-redpen-700">Team data not found.</p>
      </div>
    )
  }

  const totalStudents = school.teams.reduce((total, team) => total + team.members.length, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-graphite-900">Dashboard</h1>
        <p className="mt-1 text-sm text-graphite-600">Welcome back, {school.schoolName}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-paper p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-graphite-900 mb-4">School Information</h2>
          <div className="space-y-2">
            <p className="text-sm text-graphite-600">
              <span className="font-medium">School:</span> {school.schoolName}
            </p>
            <p className="text-sm text-graphite-600">
              <span className="font-medium">Email:</span> {school.teacherEmail}
            </p>
          </div>
        </div>

        <div className="bg-paper p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-graphite-900 mb-4">Teams Summary</h2>
          <div className="space-y-2">
            <p className="text-sm text-graphite-600">
              <span className="font-medium">Total Teams:</span> {school.teams.length}
            </p>
            <p className="text-sm text-graphite-600">
              <span className="font-medium">Total Students:</span> {totalStudents}
            </p>
          </div>
        </div>

        <CountdownTimer targetMs={groupStageStartMs} />
      </div>

      <TeamsEditor teams={school.teams} />
    </div>
  )
}
