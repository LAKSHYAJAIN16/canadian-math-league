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
      <div className="border-2 border-stamp-600 bg-stamp-100 p-4">
        <p className="font-mono text-sm text-stamp-700">Team data not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="font-sans text-2xl text-ink-900">Student join codes</h1>
        <p className="text-sm text-ink-700 mt-1">
          Share each student&apos;s code with them — they&apos;ll enter it at{' '}
          <span className="font-mono">/join</span> to access the competition.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {school.teams.flatMap((team) =>
          team.members.map((member) => (
            <div
              key={member.id}
              className="border-2 border-ink-900 bg-ledger p-4"
            >
              <div className="flex items-center justify-between mb-2 p-2 bg-ledger-deep">
                <span className="font-mono text-ink-900 text-lg font-bold tracking-wide select-all">
                  {member.joinCode}
                </span>
                <CopyCodeButton code={member.joinCode} />
              </div>
              <div className="text-ink-700 p-2">{member.name}</div>
            </div>
          ))
        )}
      </div>

      <div className="border-2 border-ink-900 bg-ledger-deep p-6">
        <h3 className="font-sans text-lg text-ink-900 mb-3">Confused?</h3>
        <p className="text-ink-700">
          We understand. It&apos;s a lot to take in. Click{' '}
          <a href="/administering-contests" className="text-stamp-600 font-semibold hover:text-stamp-700">
            here
          </a>{' '}
          to learn more.
        </p>
      </div>
    </div>
  )
}
