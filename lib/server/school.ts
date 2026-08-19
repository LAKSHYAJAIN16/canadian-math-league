import 'server-only'

import { adminDb } from '@/lib/firebase/admin'

export interface SchoolMember {
  id: string
  name: string
  email: string
  joinCode: string
}

export interface SchoolTeam {
  id: string
  name: string
  conference: string | null
  members: SchoolMember[]
}

export interface SchoolWithTeams {
  schoolName: string
  teacherName: string
  teacherEmail: string
  province: string
  teams: SchoolTeam[]
}

/** Fetches a school plus its teams and members in one shot, for teacher-facing pages. */
export async function getSchoolWithTeams(schoolId: string): Promise<SchoolWithTeams | null> {
  const schoolSnap = await adminDb().collection('schools').doc(schoolId).get()
  if (!schoolSnap.exists) return null
  const school = schoolSnap.data()!

  const teamsSnap = await adminDb()
    .collection('schools')
    .doc(schoolId)
    .collection('teams')
    .get()

  const teams: SchoolTeam[] = await Promise.all(
    teamsSnap.docs.map(async (teamDoc) => {
      const membersSnap = await teamDoc.ref.collection('members').get()
      return {
        id: teamDoc.id,
        name: teamDoc.data().name,
        conference: teamDoc.data().conference ?? null,
        members: membersSnap.docs.map((memberDoc) => ({
          id: memberDoc.id,
          name: memberDoc.data().name,
          email: memberDoc.data().email,
          joinCode: memberDoc.data().joinCode,
        })),
      }
    })
  )

  return {
    schoolName: school.schoolName,
    teacherName: school.teacherName,
    teacherEmail: school.teacherEmail,
    province: school.province,
    teams,
  }
}
