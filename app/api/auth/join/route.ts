import { NextResponse } from 'next/server'
import { z } from 'zod'
import { adminAuth, adminDb } from '@/lib/firebase/admin'
import { verifyBearerIdToken } from '@/lib/server/auth'

const bodySchema = z.object({ joinCode: z.string().trim().min(4).max(32) })

/**
 * Replaces the old client-side flow where /join scanned every `teams`
 * document in the browser looking for a matching member id. The client now
 * signs in anonymously first (so we have a real, revocable Firebase Auth
 * user), then calls this route with that user's ID token. We look the join
 * code up ourselves via the Admin SDK and — if it matches — tag the caller's
 * uid with custom claims proving which team/member they are. Firestore rules
 * and every grading route trust those claims, never a client-supplied id.
 */
export async function POST(request: Request) {
  const decoded = await verifyBearerIdToken(request)
  if (!decoded) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 })
  }
  if (decoded.firebase?.sign_in_provider !== 'anonymous') {
    return NextResponse.json({ error: 'Expected an anonymous session.' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter a valid join code.' }, { status: 400 })
  }

  const joinCode = parsed.data.joinCode.toUpperCase()
  const membersQuery = await adminDb()
    .collectionGroup('members')
    .where('joinCode', '==', joinCode)
    .limit(1)
    .get()

  if (membersQuery.empty) {
    return NextResponse.json({ error: 'Invalid join code. Please check and try again.' }, { status: 404 })
  }

  const memberDoc = membersQuery.docs[0]
  const member = memberDoc.data()
  const teamRef = memberDoc.ref.parent.parent
  const teamSnap = await teamRef?.get()

  if (!teamRef || !teamSnap?.exists) {
    return NextResponse.json({ error: 'Team not found for this join code.' }, { status: 404 })
  }
  const team = teamSnap.data()!

  await adminAuth().setCustomUserClaims(decoded.uid, {
    role: 'student',
    schoolId: member.schoolId,
    teamId: teamRef.id,
    memberId: memberDoc.id,
    groupId: team.groupId ?? null,
  })

  return NextResponse.json({ success: true, name: member.name as string, teamId: teamRef.id })
}
