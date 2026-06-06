# Bookmarks

A personal bookmarks app — save, organize, and share your favorite links. Think linktree meets pocket.

**Live URL:** https://bookmarks-app-sage-two.vercel.app  
**GitHub:** https://github.com/chiragcoding/bookmarks-app

## Features

- **Email + password auth** via Supabase (with email confirmation)
- **Welcome email** sent via Resend on sign-up confirmation
- **CRUD bookmarks** — add, edit, delete with public/private toggle
- **Public profiles** — claim a `@handle`, share your public bookmarks at `/<handle>`
- **Privacy by default** — Row Level Security ensures users can only access their own data
- **Dashboard** — protected route showing all your bookmarks (logged-out users get redirected)

## Stack

- Next.js 16 (App Router, Server Actions, Turbopack)
- Supabase (Auth + Postgres + RLS)
- Resend (transactional email)
- Tailwind CSS v4
- TypeScript

## Running locally

```bash
git clone https://github.com/chiragcoding/bookmarks-app.git
cd bookmarks-app
npm install
```

Create a `.env.local` file (see `.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_your_key
```

Set up Supabase:
1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Set Site URL to `http://localhost:3000` in Auth → URL Configuration
4. Add `http://localhost:3000/auth/callback` to Redirect URLs

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where the AI agent got things wrong (and how I caught/fixed it)

1. **Middleware is deprecated in Next.js 16.** The agent created a `middleware.ts` file, but Next.js 16 renamed middleware to "proxy." The build threw a clear deprecation warning. I had the agent read the Next.js 16 docs at `node_modules/next/dist/docs/` and rewrite it as `proxy.ts` — same functionality, correct file convention.

2. **Resend client crashed the build.** The agent instantiated `new Resend(process.env.RESEND_API_KEY)` at the module top level in the route handler. During `next build`, the env var isn't available, so it threw "Missing API key." I caught this by running `npm run build` before deploying. Fixed it by lazily importing Resend inside the POST handler and adding a guard that skips gracefully when the key is missing.

3. **Supabase trigger failed on manual user creation.** The auto-create-profile trigger assumed `raw_user_meta_data->>'handle'` would always exist, but when creating a user manually from the Supabase dashboard (to bypass email rate limits), it was NULL and violated the NOT NULL constraint. I fixed the trigger with a `COALESCE` fallback that generates a handle from the user's UUID.

4. **Entire CLI wasn't on PATH in the editor terminal.** Git commits showed warnings that Entire hooks were skipping. I discovered Scoop's shims directory wasn't in the editor's PATH, so I ran Entire commands using the full path (`$env:USERPROFILE\scoop\shims\entire.exe`) and verified sessions were being tracked.

## What I'd improve with more time

- **Tag/folder organization** for bookmarks with drag-and-drop reordering
- **Search and filter** on the dashboard (by title, URL, or public/private)
- **Custom domain support** for public profiles
- **Import/export** bookmarks from browser or other services
- **Rate limiting** on the signup and login endpoints

## Agent sessions

Recorded with Entire CLI. Sessions are stored on the `entire/checkpoints/v1` branch. Note: I used Kiro (AI IDE) which Entire doesn't have direct agent hooks for yet, so session capture is limited to git-level tracking rather than full prompt/response transcripts.
