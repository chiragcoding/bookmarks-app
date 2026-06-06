# Bookmarks

A personal bookmarks app — save, organize, and share your favorite links. Think linktree meets pocket.

## Features

- **Email + password auth** via Supabase (with email confirmation)
- **Welcome email** sent via Resend on sign-up
- **CRUD bookmarks** — add, edit, delete with public/private toggle
- **Public profiles** — claim a `@handle`, share your public bookmarks at `/<handle>`
- **Privacy by default** — RLS enforces that users can only access their own data
- **Dashboard** — protected route showing all your bookmarks

## Stack

- Next.js 16 (App Router, Server Actions, Turbopack)
- Supabase (Auth + Postgres + RLS)
- Resend (transactional email)
- Tailwind CSS v4
- TypeScript

## Getting started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd bookmarks-app
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. In Auth > URL Configuration, set the Site URL to `http://localhost:3000` (and your production URL later)
4. Add `http://localhost:3000/auth/callback` to Redirect URLs

### 3. Set up Resend

1. Create an account at [resend.com](https://resend.com)
2. Get your API key from the dashboard

### 4. Environment variables

Copy the example and fill in your keys:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_your_key
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add the environment variables above
4. Update Supabase Redirect URLs to include your Vercel domain

## Database schema

See `supabase/schema.sql` for the full schema including:
- `profiles` table (user handle, linked to auth.users)
- `bookmarks` table (title, url, is_public, user_id)
- Row Level Security policies
- Auto-create profile trigger on sign-up

## AI agent notes

- **What went wrong:** The agent initially used `middleware.ts` which is deprecated in Next.js 16. The build warned that middleware should be renamed to `proxy.ts`. Also, the Resend client was instantiated at module level which crashed the build without an API key present. Both were caught by running `next build` and reading the error output.
- **What I'd improve with more time:** Add tag-based organization for bookmarks, drag-and-drop reordering on the public profile, and a search/filter feature on the dashboard.
