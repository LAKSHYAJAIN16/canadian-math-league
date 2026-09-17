# Canadian Math League

> Marketing site + competition platform for a free, team-based high-school math tournament I run.

Three stages — Group Stage, Regionals, Nationals. Beyond the marketing pages, the real work is the registration → approval → competition pipeline: schools register, I approve them, teachers manage rosters, students compete in timed rounds, everything graded server-side. Roles (admin/teacher/student) are enforced via server-verified Firebase custom claims, never trusted from the client.

- Public registration form → admin approval → auto-provisioned teacher/school/team records + join codes
- Teacher portal (`/platform/*`) with passwordless email-link sign-in
- Student join-code flow into timed rounds: capture-the-problem, individual, team, head-to-head
- Grading and roster creation run server-side in Route Handlers via the Admin SDK

Stack: Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, Firebase (Auth + Firestore).

## Setup

```bash
npm install
```

Need a Firebase project with Firestore, Auth, and Email Link + Anonymous sign-in enabled. Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_FIREBASE_*` — from Project Settings → Your apps (safe to expose; real access control is in `firestore.rules` / `lib/server/auth.ts`)
- `GOOGLE_APPLICATION_CREDENTIALS` — path to a service-account JSON key (don't commit it; on Vercel use base64-encoded `FIREBASE_SERVICE_ACCOUNT_BASE64` instead)

Deploy security rules:

```bash
firebase deploy --only firestore:rules
```

Create the first admin manually (Console → Authentication → Add user), then:

```ts
// npx tsx scripts/make-admin.ts <uid>
await adminAuth().setCustomUserClaims(process.argv[2], { role: 'admin' })
```

```bash
npm run dev
```

## Layout

- `app/(marketing)/` — public pages; season dates and prizes centralized in `lib/content/season.ts`
- `/register` → `/api/registrations` → admin approves at `/admin` (`app/api/admin/registrations/[id]/approve/route.ts`)
- `app/platform/(protected)/layout.tsx` — server-verified gate for the teacher portal
- `/api/auth/join` exchanges a join code for an anonymous session; `/api/rounds/*/submit` grades server-side
- Every role gets an httpOnly session cookie verified in `lib/server/auth.ts`; `middleware.ts` only does a cheap presence check since the Admin SDK can't run on Edge

## Not launch-ready yet

- `lib/content/season.ts` — double-check Regionals/Nationals dates
- `lib/server/answer-keys/*.ts` — still match the sample questions in `app/o/*`, needs swapping with the real sets
- `/about/sponsors` — no sponsors yet

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build (typechecks + lints)
npm run start    # run production build
npm run lint     # lint only
npx tsc --noEmit # typecheck only
```

## Deployment

Vercel, out of the box — same env vars, but `FIREBASE_SERVICE_ACCOUNT_BASE64` instead of `GOOGLE_APPLICATION_CREDENTIALS`.
