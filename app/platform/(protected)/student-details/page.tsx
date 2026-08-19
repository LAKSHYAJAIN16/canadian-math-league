import { redirect } from 'next/navigation'
import { getSessionClaims } from '@/lib/server/auth'
import { getSchoolWithTeams } from '@/lib/server/school'
import { CopyCodeButton } from './CopyCodeButton'

export const dynamic = 'force-dynamic'

export default async function StudentDetailsPage() {
  const claims = await getSessionClaims()
  if (!claims?.schoolId) redirect('/platform/login')

  const school = await getSchoolWithTeams(claims.schoolId)
  if (!school) {
    return (
      <div className="bg-redpen-100 border-l-4 border-redpen-500 p-4">
        <p className="text-sm text-redpen-700">Team data not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-graphite-900">Student Join Codes</h1>
        <p className="text-sm text-graphite-600 mt-1">
          Share each student&apos;s code with them — they&apos;ll enter it at{' '}
          <span className="font-mono">/join</span> to access the competition.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {school.teams.flatMap((team) =>
          team.members.map((member) => (
            <div
              key={member.id}
              className="bg-paper p-4 rounded-lg shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex items-center justify-between mb-2 p-2 hover:bg-paper rounded">
                <span className="text-black text-lg font-extrabold select-all">
                  {member.joinCode}
                </span>
                <CopyCodeButton code={member.joinCode} />
              </div>
              <div className="text-graphite-700 p-2">{member.name}</div>
            </div>
          ))
        )}
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-300">
        <h3 className="text-lg font-medium text-yellow-800 mb-3">Confused?</h3>
        <p>
          We understand. It&apos;s a lot to take in. Click{' '}
          <a href="/administering-contests" className="text-blueprint-700">
            here
          </a>{' '}
          to learn more.
        </p>
      </div>
    </div>
  )
}
