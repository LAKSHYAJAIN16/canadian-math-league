'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Only rendered by app/(marketing)/layout.tsx — see Navbar.tsx for why
 * this no longer self-hides based on pathname.
 */
const Footer = () => {
  return (
    <footer className="bg-blueprint-900 border-t-2 border-redpen-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Canadian Math League" width={28} height={28} className="h-7 w-7" />
            <span className="text-xs font-bold tracking-[0.15em] text-paper uppercase">
              Canadian Math League
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/" className="text-xs tracking-wide uppercase text-blueprint-200 hover:text-redpen-500 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-xs tracking-wide uppercase text-blueprint-200 hover:text-redpen-500 transition-colors">
              About
            </Link>
            <Link href="/format" className="text-xs tracking-wide uppercase text-blueprint-200 hover:text-redpen-500 transition-colors">
              Format
            </Link>
            <Link href="/resources" className="text-xs tracking-wide uppercase text-blueprint-200 hover:text-redpen-500 transition-colors">
              Resources
            </Link>
            <Link href="/contact" className="text-xs tracking-wide uppercase text-blueprint-200 hover:text-redpen-500 transition-colors">
              Contact
            </Link>
          </div>

          <p className="text-[11px] text-blueprint-300 whitespace-nowrap">
            © {new Date().getFullYear()} CML. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
