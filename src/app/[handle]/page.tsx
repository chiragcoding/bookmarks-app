import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function PublicProfilePage(
  props: PageProps<'/[handle]'>
) {
  const { handle } = await props.params
  const supabase = await createClient()

  // Find the user by handle
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, handle')
    .eq('handle', handle)
    .single()

  if (!profile) {
    notFound()
  }

  // Get only public bookmarks for this user
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('id, title, url, created_at')
    .eq('user_id', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* Profile header */}
        <header className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900">
            <span className="text-xl font-bold text-white">
              {profile.handle[0].toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">@{profile.handle}</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {bookmarks?.length ?? 0} public bookmark{bookmarks?.length !== 1 ? 's' : ''}
          </p>
        </header>

        {/* Bookmarks */}
        {bookmarks && bookmarks.length > 0 ? (
          <ul className="space-y-3">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id}>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md hover:border-zinc-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                        {bookmark.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-zinc-500">{bookmark.url}</p>
                    </div>
                    <svg className="ml-3 h-4 w-4 shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-zinc-200 p-12 text-center">
            <p className="text-sm text-zinc-500">No public bookmarks yet.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            Built with Bookmarks
          </Link>
        </footer>
      </div>
    </div>
  )
}
