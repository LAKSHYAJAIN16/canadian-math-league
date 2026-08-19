import 'server-only'

import { cookies } from 'next/headers'
import type { DecodedIdToken } from 'firebase-admin/auth'
import { adminAuth } from '@/lib/firebase/admin'
import { SESSION_COOKIE_NAME } from '@/lib/session'

export { SESSION_COOKIE_NAME } from '@/lib/session'
export { SESSION_MAX_AGE_MS } from '@/lib/session'

export type Role = 'admin' | 'teacher' | 'student'

export interface SessionClaims extends DecodedIdToken {
  role?: Role
  schoolId?: string
  teamId?: string
  memberId?: string
  groupId?: string | null
}

/**
 * Reads and verifies the session cookie for the current request.
 * This — not middleware — is the real authorization boundary: it runs on
 * the Node.js runtime (Server Components / Route Handlers), where the
 * Admin SDK is available. `checkRevoked: true` means a logged-out/deleted
 * user's old cookie stops working immediately instead of at expiry.
 */
export async function getSessionClaims(): Promise<SessionClaims | null> {
  const cookie = cookies().get(SESSION_COOKIE_NAME)?.value
  if (!cookie) return null
  try {
    return (await adminAuth().verifySessionCookie(cookie, true)) as SessionClaims
  } catch {
    return null
  }
}

export async function requireRole(role: Role): Promise<SessionClaims | null> {
  const claims = await getSessionClaims()
  if (!claims || claims.role !== role) return null
  return claims
}

/**
 * For endpoints (like /api/auth/join) called *before* a session cookie
 * exists yet — the client passes a fresh Firebase ID token instead.
 */
export async function verifyBearerIdToken(request: Request): Promise<DecodedIdToken | null> {
  const header = request.headers.get('authorization') ?? ''
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  try {
    return await adminAuth().verifyIdToken(token)
  } catch {
    return null
  }
}
