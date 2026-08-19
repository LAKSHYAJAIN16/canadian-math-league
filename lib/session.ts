/**
 * Session cookie constants shared between middleware.ts (Edge runtime) and
 * lib/server/auth.ts (Node runtime, uses the Admin SDK). Kept in their own
 * dependency-free module so middleware.ts never pulls in firebase-admin —
 * that package uses Node-only APIs that don't exist on the Edge runtime and
 * will fail the build if imported there, even transitively.
 */
export const SESSION_COOKIE_NAME = 'cml_session'
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 5 // 5 days
