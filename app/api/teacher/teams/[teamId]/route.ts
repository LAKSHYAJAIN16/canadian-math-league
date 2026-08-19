import { NextResponse } from 'next/server'
import { z } from 'zod'
import { adminDb } from '@/lib/firebase/admin'
import { requireRole } from '@/lib/server/auth'

const bodySchema = z.object({
  members: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().email(),
      })
    )
    .min(1)
    .max(6),
})

/**
 * Lets a teacher edit their own team's roster. Ownership is proven by the
 * `schoolId` claim on their session, not by anything the client asserts
 * about which team it's editing.
 */
export async function PATCH(request: Request, { params }: { params: { teamId: string } }) {
  const claims = await requireRole('teacher')
  if (!claims || !claims.schoolId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid roster data.' }, { status: 400 })
  }

  const teamRef = adminDb()
    .collection('schools')
    .doc(claims.schoolId)
    .collection('teams')
    .doc(params.teamId)

  const teamSnap = await teamRef.get()
  if (!teamSnap.exists) {
    return NextResponse.json({ error: 'Team not found.' }, { status: 404 })
  }

  const batch = adminDb().batch()
  for (const member of parsed.data.members) {
    const memberRef = teamRef.collection('members').doc(member.id)
    batch.update(memberRef, { name: member.name, email: member.email })
  }
  await batch.commit()

  return NextResponse.json({ success: true })
}
