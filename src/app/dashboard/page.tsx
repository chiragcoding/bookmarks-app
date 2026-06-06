import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BookmarkList } from '@/components/bookmark-list'
import { AddBookmarkForm } from '@/components/add-bookmark-form'
import { LogoutButton } from '@/components/logout-button'

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

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">My Bookmarks</h1>
            {profile?.handle && (
              <p className="text-sm text-zinc-500">
                Public profile:{' '}
                <a
                  href={`/${profile.handle}`}
                  className="font-medium text-zinc-700 hover:underline"
                >
                  @{profile.handle}
                </a>
              </p>
            )}
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <AddBookmarkForm />

        <div className="mt-8">
          {bookmarks && bookmarks.length > 0 ? (
            <BookmarkList bookmarks={bookmarks} />
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center">
              <p className="text-sm text-zinc-500">
                No bookmarks yet. Add your first one above.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
