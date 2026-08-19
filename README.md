# Canadian Math League

The marketing site and competition platform for the Canadian Math League — a
free, team-based high-school math tournament run in three stages (Group
Stage → Regionals → Nationals). Built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, and Firebase.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Firebase Authentication** — real accounts for admins (email/password),
  teachers (passwordless email-link), and students (anonymous auth tagged
  with server-verified custom claims)
- **Firestore** — see `firestore.rules` for the schema and access model
- **Firebase Admin SDK** — all privileged reads/writes (grading, roster
  creation, session management) happen server-side in Route Handlers, never
  trusting anything the client sends about its own identity

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up a Firebase project

You need a Firebase project with **Firestore**, **Authentication**, and the
**Email link** + **Anonymous** sign-in providers enabled (Firebase Console →
Authentication → Sign-in method).

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_FIREBASE_*` — from Firebase Console → Project Settings →
  General → Your apps → Web app. These are safe to expose to the browser;
  real access control lives in `firestore.rules` and the server-side auth
  checks in `lib/server/auth.ts`, not in keeping this config secret.
- `GOOGLE_APPLICATION_CREDENTIALS` — path to a service-account JSON key
  (Firebase Console → Project Settings → Service Accounts → Generate new
  private key). **Never commit this file or paste its contents anywhere** —
  `.gitignore` already excludes `*serviceAccount*.json` and `secrets/`.
  On Vercel, base64-encode the same file and set
  `FIREBASE_SERVICE_ACCOUNT_BASE64` instead (see `.env.example` for the
  one-liner).

Deploy the security rules (requires the [Firebase CLI](https://firebase.google.com/docs/cli), `firebase login`, and `firebase use <project-id>`):

```bash
firebase deploy --only firestore:rules
```

### 3. Create your first admin account

Admin accounts aren't self-service (there's no public admin sign-up page —
that's the point). Create one via the Firebase Console (Authentication → Add
user) and then set the custom claim with a one-off script using the Admin
SDK, e.g.:

```ts
// scripts/make-admin.ts (run once with `npx tsx scripts/make-admin.ts <uid>`)
import { adminAuth } from '../lib/firebase/admin'
await adminAuth().setCustomUserClaims(process.argv[2], { role: 'admin' })
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the platform fits together

- **Public marketing pages** live under `app/(marketing)/` (a route group —
  doesn't affect URLs) and share `<Navbar>`/`<Footer>` via
  `app/(marketing)/layout.tsx`. Season dates, prize amounts, and round
  schedules are centralized in `lib/content/season.ts` — edit dates there,
  not per-page.
- **Registration**: `/register` → `POST /api/registrations` (public,
  zod-validated) creates a `registrations/{id}` doc. An admin reviews and
  approves it from `/admin`, which provisions the teacher's Firebase Auth
  account, creates `schools/{id}`, `teams/{id}`, and `members/{id}` docs
  (with generated join codes), and sets the teacher's `role`/`schoolId`
  custom claims — see `app/api/admin/registrations/[id]/approve/route.ts`.
- **Teacher portal** (`/platform/*`): passwordless sign-in
  (`/platform/login`), gated by `app/platform/(protected)/layout.tsx`, which
  verifies the session server-side before rendering anything.
- **Student competition** (`/join`, `/o/*`): a join code exchanges for an
  anonymous Firebase Auth session tagged with `teamId`/`memberId`/`groupId`
  custom claims (`/api/auth/join`). Round answers are written directly to
  Firestore (scoped to the owning team by `firestore.rules`); grading
  happens server-side in `/api/rounds/*/submit`, which derives identity from
  the verified session — never from anything the client claims about itself.
- **Sessions**: every role ends up with an httpOnly session cookie
  (`/api/auth/session`), verified server-side via
  `lib/server/auth.ts#getSessionClaims`. `middleware.ts` only does a cheap
  cookie-presence redirect for UX — the Admin SDK can't run on the Edge
  runtime, so the real verification happens in each protected page/route.

## Content that needs a real answer before launch

A few things were placeholders in the original codebase and are marked
`TODO(content owner)` in place:

- `lib/content/season.ts` — Regionals/Nationals dates had drifted across
  different pages before this rework; confirm the real dates.
- `lib/server/answer-keys/*.ts` — the group-stage answer keys match the
  *sample* questions currently in `app/o/*`. Replace both together with the
  real question sets before the competition runs.
- `/about/sponsors` is intentionally honest that there are no sponsors yet.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build (also runs typecheck + lint)
npm run start    # run a production build
npm run lint     # lint only
npx tsc --noEmit # typecheck only
```

## Deployment

Deploys to [Vercel](https://vercel.com) out of the box. Set the same
environment variables from `.env.local` in the Vercel project's dashboard
(use `FIREBASE_SERVICE_ACCOUNT_BASE64` there, not
`GOOGLE_APPLICATION_CREDENTIALS`).
