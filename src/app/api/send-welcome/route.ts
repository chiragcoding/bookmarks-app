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
      subject: `You're in! Welcome to Bookmarks, @${handle || 'friend'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: #18181b; border-radius: 12px; padding: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
              </svg>
            </div>
          </div>
          
          <h1 style="color: #18181b; font-size: 24px; font-weight: 700; margin: 0 0 16px; text-align: center;">
            Welcome to Bookmarks! 🎉
          </h1>
          
          <p style="color: #3f3f46; font-size: 16px; line-height: 1.7; margin: 0 0 24px; text-align: center;">
            Your account is confirmed and ready to go. Start collecting and sharing your favorite links with the world.
          </p>

          <div style="background: #f4f4f5; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #52525b; font-size: 14px; margin: 0 0 8px;"><strong>Your details:</strong></p>
            ${handle ? `<p style="color: #3f3f46; font-size: 14px; margin: 0 0 4px;">📎 Handle: <strong>@${handle}</strong></p>` : ''}
            <p style="color: #3f3f46; font-size: 14px; margin: 0 0 4px;">📧 Email: ${email}</p>
            ${handle ? `<p style="color: #3f3f46; font-size: 14px; margin: 0;">🌐 Public profile: <strong>/${handle}</strong></p>` : ''}
          </div>

          <div style="text-align: center; margin-bottom: 32px;">
            <p style="color: #52525b; font-size: 14px; margin: 0 0 12px;"><strong>What you can do now:</strong></p>
            <p style="color: #71717a; font-size: 14px; margin: 0 0 6px;">✅ Add bookmarks to your dashboard</p>
            <p style="color: #71717a; font-size: 14px; margin: 0 0 6px;">✅ Toggle them public or private</p>
            <p style="color: #71717a; font-size: 14px; margin: 0;">✅ Share your public profile link with anyone</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0;" />
          
          <p style="color: #a1a1aa; font-size: 12px; text-align: center; margin: 0;">
            Built with Next.js, Supabase & Resend
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
