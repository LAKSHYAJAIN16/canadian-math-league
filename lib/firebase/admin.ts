import 'server-only'

/**
 * Firebase Admin SDK — server-only. Import this from Route Handlers or
 * Server Components. The `server-only` import above makes it a build error
 * to ever pull this into a Client Component bundle.
 *
 * Credentials come from Application Default Credentials, i.e. the
 * GOOGLE_APPLICATION_CREDENTIALS environment variable pointing at a
 * service-account JSON file on disk (see .env.example). The key file itself
 * is never read into the process by our code — the Admin SDK reads it
 * directly — and it must never be committed or pasted into chat.
 *
 * `adminAuth()`/`adminDb()` are functions, not top-level `const`s, so that
 * missing credentials only throw when a route actually tries to use them —
 * not at module-import time, which would otherwise break `next build`'s
 * static page-data collection (it imports every route module) whenever
 * env vars aren't set, e.g. in CI before secrets are configured.
 */

import { cert, getApps, initializeApp, type App } from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase-admin/auth'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

let cachedApp: App | null = null

function getAdminApp(): App {
  if (cachedApp) return cachedApp
  if (getApps().length) {
    cachedApp = getApps()[0]!
    return cachedApp
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  if (!projectId) {
    throw new Error('Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable.')
  }

  // Prefer an explicit base64-encoded service account (works well on Vercel,
  // where writing a file to disk for GOOGLE_APPLICATION_CREDENTIALS is awkward).
  const encodedKey = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
  if (encodedKey) {
    const serviceAccount = JSON.parse(Buffer.from(encodedKey, 'base64').toString('utf-8'))
    cachedApp = initializeApp({ credential: cert(serviceAccount), projectId })
    return cachedApp
  }

  // Local development: GOOGLE_APPLICATION_CREDENTIALS points at a JSON file on disk.
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    cachedApp = initializeApp({ projectId })
    return cachedApp
  }

  throw new Error(
    'No Firebase Admin credentials found. Set GOOGLE_APPLICATION_CREDENTIALS (local dev) or ' +
      'FIREBASE_SERVICE_ACCOUNT_BASE64 (Vercel) — see .env.example.'
  )
}

let cachedAuth: Auth | null = null
let cachedDb: Firestore | null = null

export function adminAuth(): Auth {
  if (!cachedAuth) cachedAuth = getAuth(getAdminApp())
  return cachedAuth
}

export function adminDb(): Firestore {
  if (!cachedDb) cachedDb = getFirestore(getAdminApp())
  return cachedDb
}
