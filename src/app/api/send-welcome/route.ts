import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email, handle } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('RESEND_API_KEY not set, skipping welcome email')
      return NextResponse.json({ success: true, skipped: true })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'Bookmarks <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Bookmarks!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #18181b;">Welcome to Bookmarks! 🔖</h1>
          <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
            Your account has been confirmed. You can now start saving and sharing your bookmarks.
          </p>
          ${handle ? `<p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
            Your public profile is available at <strong>/@${handle}</strong>
          </p>` : ''}
          <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
            Head to your dashboard to add your first bookmark.
          </p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
