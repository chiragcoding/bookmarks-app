'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900">Create an account</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Start saving and sharing your bookmarks
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="handle" className="block text-sm font-medium text-zinc-700">
              Handle
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-sm text-zinc-500">
                @
              </span>
              <input
                id="handle"
                name="handle"
                type="text"
                required
                className="block w-full rounded-r-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                placeholder="yourhandle"
              />
            </div>
            {state?.fieldErrors?.handle && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.handle[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              placeholder="you@example.com"
            />
            {state?.fieldErrors?.email && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              placeholder="At least 6 characters"
            />
            {state?.fieldErrors?.password && (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {pending ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-zinc-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
