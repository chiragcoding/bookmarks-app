'use client'

import { createBookmark } from '@/app/actions/bookmarks'
import { useActionState, useRef } from 'react'

export function AddBookmarkForm() {
  const [state, formAction, pending] = useActionState(createBookmark, null)
  const formRef = useRef<HTMLFormElement>(null)

  // Reset form on success
  if (state?.success && formRef.current) {
    formRef.current.reset()
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <h2 className="mb-4 text-sm font-medium text-zinc-900">Add a bookmark</h2>

      {state?.error && (
        <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <input
            name="title"
            type="text"
            placeholder="Title"
            required
            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          {state?.fieldErrors?.title && (
            <p className="mt-1 text-xs text-red-600">{state.fieldErrors.title[0]}</p>
          )}
        </div>

        <div>
          <input
            name="url"
            type="url"
            placeholder="https://example.com"
            required
            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          {state?.fieldErrors?.url && (
            <p className="mt-1 text-xs text-red-600">{state.fieldErrors.url[0]}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-zinc-600">
            <input
              name="is_public"
              type="checkbox"
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
            />
            Public (visible on your profile)
          </label>

          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {pending ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  )
}
