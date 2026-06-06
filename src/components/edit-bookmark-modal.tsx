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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900">Edit bookmark</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {state?.error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={bookmark.id} />

          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Title
            </label>
            <input
              id="edit-title"
              name="title"
              type="text"
              defaultValue={bookmark.title}
              required
              className="block w-full rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            {state?.fieldErrors?.title && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.title[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="edit-url" className="block text-sm font-medium text-zinc-700 mb-1.5">
              URL
            </label>
            <input
              id="edit-url"
              name="url"
              type="url"
              defaultValue={bookmark.url}
              required
              className="block w-full rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            {state?.fieldErrors?.url && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.url[0]}</p>
            )}
          </div>

          <label className="flex items-center gap-2.5 text-sm text-zinc-600 cursor-pointer">
            <input
              name="is_public"
              type="checkbox"
              defaultChecked={bookmark.is_public}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
            />
            <span>Public <span className="text-zinc-400">(visible on your profile)</span></span>
          </label>

          <div className="flex justify-end gap-3 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 transition-colors"
            >
              {pending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
