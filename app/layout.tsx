import type { Metadata } from 'next'
import { Alike } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const alike = Alike({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alike',
  fallback: ['serif']
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
      <body className={`${alike.className} font-sans`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
