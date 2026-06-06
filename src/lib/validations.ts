import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
  handle: z
    .string()
    .min(3, 'Handle must be at least 3 characters')
    .max(30, 'Handle must be at most 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Handle can only contain letters, numbers, and underscores'
    ),
})

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const bookmarkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  url: z.string().url('Please enter a valid URL'),
  is_public: z.boolean().default(false),
})

export const handleSchema = z
  .string()
  .min(3, 'Handle must be at least 3 characters')
  .max(30, 'Handle must be at most 30 characters')
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Handle can only contain letters, numbers, and underscores'
  )

export type SignUpInput = z.infer<typeof signUpSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type BookmarkInput = z.infer<typeof bookmarkSchema>
