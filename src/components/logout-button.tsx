'use client'

import { logout } from '@/app/actions/auth'

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Sign out
      </button>
    </form>
  )
}
