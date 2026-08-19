'use client'

/**
 * Firebase client SDK — safe to import from Client Components only.
 * Never import this from a Route Handler, Server Component, or `lib/server/*`.
 * For privileged server-side access use `lib/firebase/admin.ts` instead.
 */

import { type FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const

// A warning, not a thrown error: this module gets imported (and executed)
// during `next build`'s static prerendering of every page that references
// it, even pages that only use Firebase after a user interaction. Throwing
// here would break the build itself whenever env vars aren't set yet (e.g.
// in CI before secrets are configured). Real misconfiguration still surfaces
// loudly the moment auth/db is actually used, via Firebase's own errors.
if (typeof window !== 'undefined') {
  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      console.warn(
        `[firebase] Missing ${key}. Copy .env.example to .env.local and fill in your Firebase web app config.`
      )
    }
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth: Auth = getAuth(firebaseApp)
export const db: Firestore = getFirestore(firebaseApp)
