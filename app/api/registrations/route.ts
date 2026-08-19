import { NextResponse } from 'next/server'
import { z } from 'zod'
import { FieldValue } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { PROVINCES } from '@/lib/content/provinces'

const memberSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Enter a valid email'),
})

const teamSchema = z.object({
  index: z.number().int().min(1),
  members: z.array(memberSchema).min(1).max(6),
})

const registrationSchema = z.object({
  schoolName: z.string().trim().min(1).max(200),
  province: z.enum(PROVINCES),
  teacherName: z.string().trim().min(1).max(120),
  teacherEmail: z.string().trim().email(),
  teacherPhone: z.string().trim().min(7).max(20),
  teams: z.array(teamSchema).min(1).max(3),
})

/**
 * Public school-registration submission. Replaces the old client-side
 * `submitForm` that wrote straight to Firestore from the browser. Validated
 * server-side and written via the Admin SDK so the client never needs write
 * access to this collection at all (see firestore.rules).
 */
export async function POST(request: Request) {
  const parsed = registrationSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form for errors.', issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const hasAnyMember = parsed.data.teams.some((team) =>
    team.members.some((member) => member.name && member.email)
  )
  if (!hasAnyMember) {
    return NextResponse.json({ error: 'Add at least one team member.' }, { status: 400 })
  }

  const docRef = await adminDb().collection('registrations').add({
    ...parsed.data,
    status: 'pending',
    submittedAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ success: true, id: docRef.id })
}
