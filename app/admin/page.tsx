import { redirect } from 'next/navigation'
import { adminDb } from '@/lib/firebase/admin'
import { getSessionClaims } from '@/lib/server/auth'
import { ApproveButton } from './ApproveButton'
import { LogoutButton } from '@/components/LogoutButton'

export const dynamic = 'force-dynamic'

interface RegistrationRow {
  id: string
  schoolName: string
  province: string
  teacherName: string
  teacherEmail: string
  teacherPhone: string
  status: 'pending' | 'approved'
  teams: Array<{ index: number; members: Array<{ name: string; email: string }> }>
  submittedAt: string
}

export default async function AdminPage() {
  // Real authorization boundary: verified server-side via the Admin SDK,
  // not a URL query-string key. See lib/server/auth.ts.
  const claims = await getSessionClaims()
  if (!claims || claims.role !== 'admin') {
    redirect('/admin/login')
  }

  const snapshot = await adminDb().collection('registrations').orderBy('submittedAt', 'desc').get()
  const registrations: RegistrationRow[] = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      schoolName: data.schoolName,
      province: data.province,
      teacherName: data.teacherName,
      teacherEmail: data.teacherEmail,
      teacherPhone: data.teacherPhone,
      status: data.status,
      teams: data.teams ?? [],
      submittedAt: data.submittedAt?.toDate?.().toString() ?? 'Unknown',
    }
  })

  return (
    <div className="min-h-screen bg-ledger p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-sans text-2xl text-ink-900">School registrations</h1>
          <LogoutButton
            redirectTo="/admin/login"
            className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 hover:text-stamp-600"
          />
        </div>

        <div className="border-2 border-ink-900 bg-ledger p-6">
          <p className="font-mono text-sm text-ink-700 mb-4">Total submissions: {registrations.length}</p>

          {registrations.length === 0 ? (
            <p className="font-mono text-sm text-ink-700">No submissions found</p>
          ) : (
            <div className="space-y-6">
              {registrations.map((registration) => (
                <div key={registration.id} className="border-2 border-ink-900 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-ink-900">School: {registration.schoolName}</h3>
                      <p className="text-ink-700">Province: {registration.province}</p>
                      <p className="text-ink-700">Teacher: {registration.teacherName}</p>
                      <p className="text-ink-700">Email: {registration.teacherEmail}</p>
                      <p className="text-ink-700">Phone: {registration.teacherPhone}</p>
                      <p className="mt-1">
                        Status:{' '}
                        <span
                          className={`font-mono text-xs font-semibold uppercase tracking-wide ${
                            registration.status === 'approved' ? 'text-ink-900' : 'text-stamp-600'
                          }`}
                        >
                          {registration.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-900">Teams:</h4>
                      {registration.teams.map((team) => (
                        <div key={team.index} className="mt-2 pl-4 border-l-2 border-ink-900">
                          <p className="font-semibold text-ink-900">Team {team.index}</p>
                          <ul className="list-disc pl-5 text-ink-700">
                            {team.members.map((member, i) => (
                              <li key={i}>
                                {member.name} : {member.email}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-ink-900 flex justify-between items-center">
                    <div className="font-mono text-xs text-ink-500">
                      Submitted: {new Date(registration.submittedAt).toLocaleString()}
                    </div>
                    {registration.status === 'pending' && (
                      <ApproveButton registrationId={registration.id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
