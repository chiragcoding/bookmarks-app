import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <main className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Bookmarks
        </h1>
        <p className="mt-4 max-w-md text-lg text-zinc-600">
          Save, organize, and share your favorite links. Your own tiny linktree meets pocket.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  )
}
