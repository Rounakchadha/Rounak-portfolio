import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'  // ← This line is crucial!
import { profile } from '@/data/profile'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${profile.name} - ${profile.role}`,
  description: profile.summary,
  keywords: 'Full-Stack Developer, Software Engineer, React, Next.js, Web Development',
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rounakchadha.com', // TODO: Update with actual domain
    title: `${profile.name} - ${profile.role}`,
    description: profile.summary,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: '/og-image.png', // TODO: Generate OG image
        width: 1200,
        height: 630,
        alt: profile.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} - ${profile.role}`,
    description: profile.summary,
    creator: '@rounakchadha', // TODO: Update with actual Twitter handle
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
