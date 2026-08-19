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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">School Registrations</h1>
          <LogoutButton
            redirectTo="/admin/login"
            className="text-sm text-gray-500 hover:text-red-600"
          />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500 mb-4">Total submissions: {registrations.length}</p>

          {registrations.length === 0 ? (
            <p className="text-gray-500">No submissions found</p>
          ) : (
            <div className="space-y-6">
              {registrations.map((registration) => (
                <div key={registration.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">School: {registration.schoolName}</h3>
                      <p>Province: {registration.province}</p>
                      <p>Teacher: {registration.teacherName}</p>
                      <p>Email: {registration.teacherEmail}</p>
                      <p>Phone: {registration.teacherPhone}</p>
                      <p className="mt-1">
                        Status:{' '}
                        <span
                          className={`font-medium ${
                            registration.status === 'approved' ? 'text-green-700' : 'text-amber-700'
                          }`}
                        >
                          {registration.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Teams:</h4>
                      {registration.teams.map((team) => (
                        <div key={team.index} className="mt-2 pl-4 border-l-2 border-gray-200">
                          <p className="font-medium">Team {team.index}</p>
                          <ul className="list-disc pl-5">
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
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-500">
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
