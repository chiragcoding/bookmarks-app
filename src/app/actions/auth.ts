'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signUpSchema, loginSchema } from '@/lib/validations'

export type AuthState = {
  error?: string
  fieldErrors?: Record<string, string[]>
} | null

export async function signup(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    handle: formData.get('handle') as string,
  }

  const result = signUpSchema.safeParse(rawData)
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors }
  }

  const supabase = await createClient()

  // Check if handle is already taken
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('handle', result.data.handle)
    .single()

  if (existingProfile) {
    return { fieldErrors: { handle: ['This handle is already taken'] } }
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        handle: result.data.handle,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/signup/confirm')
}

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = loginSchema.safeParse(rawData)
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return { error: 'Invalid email or password' }
  }

  redirect('/dashboard')
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
