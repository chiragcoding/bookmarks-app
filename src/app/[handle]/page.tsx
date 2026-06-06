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
      <div className="mx-auto max-w-2xl px-4 py-16">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900">@{profile.handle}</h1>
          <p className="mt-1 text-sm text-zinc-500">Public bookmarks</p>
        </header>

        {bookmarks && bookmarks.length > 0 ? (
          <ul className="space-y-3">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id}>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-sm font-medium text-zinc-900">{bookmark.title}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">{bookmark.url}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center">
            <p className="text-sm text-zinc-500">No public bookmarks yet.</p>
          </div>
        )}

        <footer className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-700 hover:underline"
          >
            Built with Bookmarks
          </Link>
        </footer>
      </div>
    </div>
  )
}
