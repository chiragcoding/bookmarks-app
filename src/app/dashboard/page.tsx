import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BookmarkList } from '@/components/bookmark-list'
import { AddBookmarkForm } from '@/components/add-bookmark-form'
import { LogoutButton } from '@/components/logout-button'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('handle')
    .eq('id', user.id)
    .single()

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const publicCount = bookmarks?.filter(b => b.is_public).length ?? 0
  const privateCount = bookmarks?.filter(b => !b.is_public).length ?? 0

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <svg className="h-5 w-5 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              <span className="font-bold text-zinc-900">Bookmarks</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {profile?.handle && (
              <a
                href={`/${profile.handle}`}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                @{profile.handle}
              </a>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Total bookmarks</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{bookmarks?.length ?? 0}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Public</p>
            <p className="mt-1 text-2xl font-bold text-green-600">{publicCount}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Private</p>
            <p className="mt-1 text-2xl font-bold text-zinc-600">{privateCount}</p>
          </div>
        </div>

        {/* Add form */}
        <AddBookmarkForm />

        {/* Bookmarks list */}
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-semibold text-zinc-900 uppercase tracking-wider">Your bookmarks</h2>
          {bookmarks && bookmarks.length > 0 ? (
            <BookmarkList bookmarks={bookmarks} />
          ) : (
            <div className="rounded-xl border-2 border-dashed border-zinc-200 p-12 text-center">
              <svg className="mx-auto h-10 w-10 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              <p className="mt-3 text-sm font-medium text-zinc-900">No bookmarks yet</p>
              <p className="mt-1 text-sm text-zinc-500">Add your first bookmark above to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
