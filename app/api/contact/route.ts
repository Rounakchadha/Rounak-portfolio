import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Here you would typically send the email using a service like:
    // - SendGrid
    // - Nodemailer
    // - Resend
    // - AWS SES
    
    // For now, we'll just return a success response
    // In production, implement actual email sending logic

    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
