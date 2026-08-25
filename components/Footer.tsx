'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Only rendered by app/(marketing)/layout.tsx — see Navbar.tsx for why
 * this no longer self-hides based on pathname.
 */
const Footer = () => {
  return (
    <footer className="bg-ink-900 border-t-4 border-stamp-600 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Canadian Math League" width={26} height={26} className="h-6 w-6" />
            <span className="font-sans text-sm text-ledger">
              Canadian Math League
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/" className="font-mono text-xs uppercase tracking-wide text-ink-300 hover:text-stamp-500 transition-colors">
              Home
            </Link>
            <Link href="/about" className="font-mono text-xs uppercase tracking-wide text-ink-300 hover:text-stamp-500 transition-colors">
              About
            </Link>
            <Link href="/format" className="font-mono text-xs uppercase tracking-wide text-ink-300 hover:text-stamp-500 transition-colors">
              Format
            </Link>
            <Link href="/resources" className="font-mono text-xs uppercase tracking-wide text-ink-300 hover:text-stamp-500 transition-colors">
              Resources
            </Link>
            <Link href="/contact" className="font-mono text-xs uppercase tracking-wide text-ink-300 hover:text-stamp-500 transition-colors">
              Contact
            </Link>
          </div>

          <p className="font-mono text-[0.6875rem] text-ink-300 whitespace-nowrap">
            © {new Date().getFullYear()} CML. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
