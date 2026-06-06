'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, null)

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-zinc-900 p-12">
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
          <span className="text-lg font-bold text-white">Bookmarks</span>
        </div>
        <div>
          <blockquote className="text-lg text-zinc-300 leading-relaxed">
            &ldquo;Claim your @handle and build a public collection of your favorite links.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <svg className="h-5 w-5 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            <span className="font-bold text-zinc-900">Bookmarks</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-900">Create an account</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Start saving and sharing your bookmarks
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-700">
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="handle" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Handle
              </label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-zinc-300 bg-zinc-50 px-3.5 text-sm text-zinc-500">
                  @
                </span>
                <input
                  id="handle"
                  name="handle"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-r-lg border border-zinc-300 px-3.5 py-2.5 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                  placeholder="yourhandle"
                />
              </div>
              {state?.fieldErrors?.handle && (
                <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.handle[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                placeholder="you@example.com"
              />
              {state?.fieldErrors?.email && (
                <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                placeholder="At least 6 characters"
              />
              {state?.fieldErrors?.password && (
                <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {pending ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-zinc-900 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
