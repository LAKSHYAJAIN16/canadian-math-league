import type { Metadata } from 'next'
import { Alike } from 'next/font/google'
import './globals.css'

const alike = Alike({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['serif'],
  preload: true,
  adjustFontFallback: true,
  variable: '--font-sans',
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
      <body className={`${alike.variable} font-sans antialiased`}>
        {/*
          THESIS: Friendly, approachable math tournament — warm and inviting
          for teenagers, not corporate or severe.
          OWN-WORLD: Soft rounded cards (2xl/3xl radii), gentle drop shadows,
          pill buttons, red/white Canadian palette, serif display type
          (Alike — the original pre-redesign font), small line icons,
          generous whitespace, gentle motion.
          STORY: A visitor feels welcomed into a national student math
          tournament — exciting, not intimidating — and registers their team.
          FIRST VIEWPORT: white hero, CMS partnership logo, warm red accent
          headline, soft rounded CTA pills, friendly supporting copy.
          FORM: user-directed pivot after two rejected directions; user chose
          "Friendly & approachable" from a 4-option prompt.
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, DESIGN.md, and every shipping
          raster carrying its provenance.
        */}
        {children}
      </body>
    </html>
  )
}
