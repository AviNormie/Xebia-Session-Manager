## Xebia Session Manager

Template project for a simple session manager using:
- Next.js App Router
- Supabase Auth (SSR) with `@supabase/supabase-js` + `@supabase/ssr`
- Prisma ORM configured for Supabase Postgres (pooling + direct URL)
- Vercel Analytics

## Setup

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

- **Important**: Replace `[YOUR_DB_PASSWORD]` in `DATABASE_URL` and `DIRECT_URL` with your Supabase DB password.

### Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Auth flows

- **Email + password**
  - Create an account via `/login` → **Create account** (auto signs in right after sign up when possible)
  - Next time, sign in with the same email/password
- **Google OAuth**
  - `/login` → **Continue with Google**
  - Redirects through `/auth/callback`, which exchanges the auth code for a session
- **Protected route**
  - `/account` redirects to `/login` if signed out

## Prisma

Schema: `prisma/schema.prisma`

Generate client:

```bash
npx prisma generate
```

Run migrations (after setting DB password):

```bash
npx prisma migrate dev
```

## Notes

- **Supabase redirect URLs (important for deploy)**: in Supabase Dashboard → Authentication → URL Configuration, set:
  - Site URL: your deployed URL (e.g. `https://your-app.vercel.app`)
  - Redirect URLs: include `https://your-app.vercel.app/auth/callback`
- This project pins Prisma to v6 because Prisma v7+ changed datasource URL handling.

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import into Vercel.
3. Set environment variables in Vercel (same keys as `.env.example`).
4. In Supabase, add your Vercel URL to allowed redirect URLs (see Notes above).
