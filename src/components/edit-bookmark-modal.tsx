'use client'

import { updateBookmark } from '@/app/actions/bookmarks'
import { useActionState } from 'react'
import type { Bookmark } from './bookmark-list'

export function EditBookmarkModal({
  bookmark,
  onClose,
}: {
  bookmark: Bookmark
  onClose: () => void
}) {
  const [state, formAction, pending] = useActionState(updateBookmark, null)

  // Close on success
  if (state?.success) {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">Edit bookmark</h2>

        {state?.error && (
          <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={bookmark.id} />

          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-zinc-700">
              Title
            </label>
            <input
              id="edit-title"
              name="title"
              type="text"
              defaultValue={bookmark.title}
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            {state?.fieldErrors?.title && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.title[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="edit-url" className="block text-sm font-medium text-zinc-700">
              URL
            </label>
            <input
              id="edit-url"
              name="url"
              type="url"
              defaultValue={bookmark.url}
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            {state?.fieldErrors?.url && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.url[0]}</p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-600">
            <input
              name="is_public"
              type="checkbox"
              defaultChecked={bookmark.is_public}
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
            />
            Public (visible on your profile)
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              {pending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
