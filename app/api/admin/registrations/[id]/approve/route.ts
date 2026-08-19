import { NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { adminAuth, adminDb } from '@/lib/firebase/admin'
import { requireRole } from '@/lib/server/auth'

const JOIN_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O/1/I/L — easy to read aloud

function generateJoinCode(): string {
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += JOIN_CODE_ALPHABET[Math.floor(Math.random() * JOIN_CODE_ALPHABET.length)]
  }
  return code
}

/**
 * Turns a pending registration into a real school + teams + members, and
 * provisions the teacher's Firebase Auth account with the `teacher` role
 * claim. This is the only place teacher accounts get created — teachers
 * never self-register, so a random email can never grant itself dashboard
 * access (see app/platform/login and firestore.rules).
 */
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const claims = await requireRole('admin')
  if (!claims) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const registrationRef = adminDb().collection('registrations').doc(params.id)
  const registrationSnap = await registrationRef.get()
  if (!registrationSnap.exists) {
    return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
  }

  const registration = registrationSnap.data() as {
    schoolName: string
    province: string
    teacherName: string
    teacherEmail: string
    teacherPhone: string
    status: string
    teams: Array<{ index: number; members: Array<{ name: string; email: string }> }>
  }

  if (registration.status === 'approved') {
    return NextResponse.json({ error: 'This registration was already approved.' }, { status: 409 })
  }

  let teacherUid: string
  try {
    const existing = await adminAuth().getUserByEmail(registration.teacherEmail)
    teacherUid = existing.uid
  } catch {
    const created = await adminAuth().createUser({
      email: registration.teacherEmail,
      displayName: registration.teacherName,
      emailVerified: false,
    })
    teacherUid = created.uid
  }

  const schoolRef = adminDb().collection('schools').doc()
  const batch = adminDb().batch()

  batch.set(schoolRef, {
    schoolName: registration.schoolName,
    province: registration.province,
    teacherName: registration.teacherName,
    teacherEmail: registration.teacherEmail,
    teacherPhone: registration.teacherPhone,
    teacherUid,
    registrationId: registrationRef.id,
    createdAt: FieldValue.serverTimestamp(),
  })

  const multipleTeams = registration.teams.length > 1
  for (const team of registration.teams) {
    const teamRef = schoolRef.collection('teams').doc()
    batch.set(teamRef, {
      schoolId: schoolRef.id,
      name: multipleTeams ? `${registration.schoolName} ${team.index}` : registration.schoolName,
      conference: null,
      groupId: null,
      createdAt: FieldValue.serverTimestamp(),
    })

    for (const member of team.members) {
      if (!member.name || !member.email) continue
      const memberRef = teamRef.collection('members').doc()
      batch.set(memberRef, {
        teamId: teamRef.id,
        schoolId: schoolRef.id,
        name: member.name,
        email: member.email,
        joinCode: generateJoinCode(),
        createdAt: FieldValue.serverTimestamp(),
      })
    }
  }

  batch.update(registrationRef, { status: 'approved', schoolId: schoolRef.id })
  await batch.commit()

  await adminAuth().setCustomUserClaims(teacherUid, { role: 'teacher', schoolId: schoolRef.id })

  return NextResponse.json({ success: true, schoolId: schoolRef.id })
}
