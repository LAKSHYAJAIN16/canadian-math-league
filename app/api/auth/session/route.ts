import { NextResponse } from 'next/server'
import { z } from 'zod'
import { adminAuth } from '@/lib/firebase/admin'
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS } from '@/lib/server/auth'

const bodySchema = z.object({ idToken: z.string().min(1) })

/**
 * Exchanges a fresh Firebase ID token (however the client obtained it —
 * password sign-in, email-link sign-in, or anonymous sign-in + /api/auth/join)
 * for an httpOnly session cookie. This is the one place session cookies are
 * minted; every protected page/route reads the cookie via
 * lib/server/auth.ts#getSessionClaims instead of trusting anything the
 * client sends directly.
 */
export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
  }

  try {
    const decoded = await adminAuth().verifyIdToken(parsed.data.idToken, true)
    const sessionCookie = await adminAuth().createSessionCookie(parsed.data.idToken, {
      expiresIn: SESSION_MAX_AGE_MS,
    })

    const response = NextResponse.json({ success: true, role: decoded.role ?? null })
    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_MS / 1000,
    })
    return response
  } catch (error) {
    console.error('Failed to create session cookie:', error)
    return NextResponse.json({ error: 'Invalid or expired sign-in. Please try again.' }, { status: 401 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(SESSION_COOKIE_NAME)
  return response
}
