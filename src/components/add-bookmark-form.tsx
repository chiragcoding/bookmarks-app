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
      className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-sm font-semibold text-zinc-900 uppercase tracking-wider">Add a bookmark</h2>

      {state?.error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="My favorite site"
              required
              className="block w-full rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            {state?.fieldErrors?.title && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.title[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-zinc-700 mb-1.5">
              URL
            </label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              required
              className="block w-full rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            {state?.fieldErrors?.url && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.url[0]}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2.5 text-sm text-zinc-600 cursor-pointer">
            <input
              name="is_public"
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
            />
            <span>Public <span className="text-zinc-400">(visible on your profile)</span></span>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 transition-colors"
          >
            {pending ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add bookmark
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
