'use server'

import { createClient } from '@/lib/supabase/server'
import { bookmarkSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export type BookmarkState = {
  error?: string
  fieldErrors?: Record<string, string[]>
  success?: boolean
} | null

export async function createBookmark(
  _prevState: BookmarkState,
  formData: FormData
): Promise<BookmarkState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to create a bookmark' }
  }

  const rawData = {
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    is_public: formData.get('is_public') === 'on',
  }

  const result = bookmarkSchema.safeParse(rawData)
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors }
  }

  const { error } = await supabase.from('bookmarks').insert({
    user_id: user.id,
    title: result.data.title,
    url: result.data.url,
    is_public: result.data.is_public,
  })

  if (error) {
    return { error: 'Failed to create bookmark' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateBookmark(
  _prevState: BookmarkState,
  formData: FormData
): Promise<BookmarkState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to update a bookmark' }
  }

  const bookmarkId = formData.get('id') as string

  const rawData = {
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    is_public: formData.get('is_public') === 'on',
  }

  const result = bookmarkSchema.safeParse(rawData)
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors }
  }

  // RLS ensures users can only update their own bookmarks
  const { error } = await supabase
    .from('bookmarks')
    .update({
      title: result.data.title,
      url: result.data.url,
      is_public: result.data.is_public,
    })
    .eq('id', bookmarkId)
    .eq('user_id', user.id)

  if (error) {
    return { error: 'Failed to update bookmark' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteBookmark(bookmarkId: string): Promise<{ error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to delete a bookmark' }
  }

  // RLS ensures users can only delete their own bookmarks
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId)
    .eq('user_id', user.id)

  if (error) {
    return { error: 'Failed to delete bookmark' }
  }

  revalidatePath('/dashboard')
  return {}
}
