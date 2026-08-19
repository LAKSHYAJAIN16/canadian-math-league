import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME } from '@/lib/session'

/**
 * Cheap, cookie-presence-only redirect for UX (skip rendering a protected
 * page just to bounce the user a moment later). This is NOT the real
 * authorization check — Next.js Middleware runs on the Edge runtime, which
 * can't run the Firebase Admin SDK, so it cannot cryptographically verify
 * the session cookie. The actual verification (`verifySessionCookie`)
 * happens server-side in each protected Server Component/Route Handler via
 * lib/server/auth.ts#getSessionClaims — that is the real boundary, backed
 * further by firestore.rules for any direct client SDK access.
 */
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME)

  const { pathname } = request.nextUrl
  const isProtectedAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isProtectedPlatformRoute =
    pathname.startsWith('/platform') && pathname !== '/platform/login'

  if ((isProtectedAdminRoute || isProtectedPlatformRoute) && !hasSession) {
    const loginUrl = new URL(isProtectedAdminRoute ? '/admin/login' : '/platform/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/platform/:path*'],
}
