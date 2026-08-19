import type { Metadata } from 'next'
import { Alike } from 'next/font/google'
import './globals.css'

const alike = Alike({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['serif'],
  preload: true,
  adjustFontFallback: true
})

export const metadata: Metadata = {
  title: 'Canadian Math League',
  description: 'Inspiring mathematical excellence across Canada through competitive mathematics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={alike.className}>
        {children}
      </body>
    </html>
  )
}
