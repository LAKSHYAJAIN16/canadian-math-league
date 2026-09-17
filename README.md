# Canadian Math League

This is the marketing site and competition platform for the Canadian Math League — a free, team-based high-school math tournament I run in three stages: Group Stage, then Regionals, then Nationals. Built with Next.js 14 (App Router), TypeScript, Tailwind, and Firebase.

## What it actually does

Beyond the marketing pages explaining the format and prizes, the real work is the registration → approval → competition pipeline:

- A school registers through a public, zod-validated form. That creates a pending registration doc, and once I (or another admin) approve it from `/admin`, it provisions the teacher's account, creates the school/team/member records, and generates join codes.
- Teachers get a portal (`/platform/*`) with passwordless email-link sign-in to manage their roster and pull student join codes.
- Students use a join code to get an anonymous Firebase session and drop straight into a fullscreen, timed round — there are a few formats: capture-the-problem, individual competition, team competition, and head-to-head. Everything gets graded server-side.

I was pretty deliberate about not trusting the client for anything that matters. Admins, teachers, and students all get their role baked into server-verified Firebase custom claims, not something the client just asserts about itself. Grading, roster creation, session checks — all of that happens in Route Handlers using the Admin SDK.

Stack-wise it's Next.js 14, TypeScript, Tailwind, Framer Motion for the marketing bits, and Firebase (Auth + Firestore) for everything else — see `firestore.rules` if you want the actual data model and access rules.

## Getting it running

Install deps:

```bash
npm install
```

You'll need a Firebase project with Firestore, Authentication, and both the Email Link and Anonymous sign-in providers turned on. Copy `.env.example` to `.env.local` and fill in:

- The `NEXT_PUBLIC_FIREBASE_*` values from Project Settings → Your apps. These are fine to expose client-side — the real access control is in `firestore.rules` and `lib/server/auth.ts`, not in keeping this stuff secret.
- `GOOGLE_APPLICATION_CREDENTIALS`, pointing at a service-account JSON key (Project Settings → Service Accounts → Generate new private key). Don't commit this file or paste it anywhere — `.gitignore` already excludes `*serviceAccount*.json` and `secrets/`. On Vercel, base64-encode it instead and set `FIREBASE_SERVICE_ACCOUNT_BASE64` (see `.env.example` for the one-liner).

Deploy the security rules with the Firebase CLI (`firebase login`, `firebase use <project-id>`):

```bash
firebase deploy --only firestore:rules
```

There's no self-service admin sign-up on purpose — create the first admin manually via the Firebase Console (Authentication → Add user), then set their custom claim once with something like:

```ts
// scripts/make-admin.ts — run with `npx tsx scripts/make-admin.ts <uid>`
import { adminAuth } from '../lib/firebase/admin'
await adminAuth().setCustomUserClaims(process.argv[2], { role: 'admin' })
```

Then just:

```bash
npm run dev
```

and open `http://localhost:3000`.

## How it fits together

- Marketing pages live under `app/(marketing)/` (a route group, so it doesn't touch the URLs) and share a nav/footer via that folder's layout. Season dates and prize amounts are centralized in `lib/content/season.ts` — that's the one place to edit them, not scattered across pages.
- Registration flow: `/register` posts to `/api/registrations`, an admin approves from `/admin`, which is where the teacher account, school/team/member docs, and join codes actually get created (`app/api/admin/registrations/[id]/approve/route.ts` if you want to see the guts of it).
- Teacher portal sign-in is gated in `app/platform/(protected)/layout.tsx`, which verifies the session server-side before rendering anything.
- Student flow: a join code exchanges for an anonymous session tagged with team/member/group claims (`/api/auth/join`), round answers write to Firestore scoped to the owning team, and grading happens in `/api/rounds/*/submit` using the verified session — never anything the client says about itself.
- Every role gets an httpOnly session cookie, verified server-side in `lib/server/auth.ts`. `middleware.ts` only does a cheap cookie-presence check for redirect UX, since the Admin SDK can't run on the Edge runtime — the actual verification happens per protected route.

## Things that still need real answers before launch

A few spots are intentionally placeholder and marked `TODO(content owner)`:

- `lib/content/season.ts` — the Regionals/Nationals dates had drifted across pages before this rework, so double-check them before relying on this file.
- `lib/server/answer-keys/*.ts` — currently match the *sample* questions in `app/o/*`. Both need to be swapped for the real question sets together before the competition runs.
- `/about/sponsors` is honest that there aren't sponsors yet.

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build (also typechecks + lints)
npm run start    # run a production build
npm run lint     # lint only
npx tsc --noEmit # typecheck only
```

## Deployment

Runs on Vercel out of the box. Set the same env vars from `.env.local` in the Vercel dashboard — use `FIREBASE_SERVICE_ACCOUNT_BASE64` there instead of `GOOGLE_APPLICATION_CREDENTIALS`.
