'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Only rendered by app/(marketing)/layout.tsx — see Navbar.tsx for why
 * this no longer self-hides based on pathname.
 */
const Footer = () => {
  return (
    <footer className="bg-graphite-900 border-t-4 border-redpen-600 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Canadian Math League" width={28} height={28} className="h-7 w-7" />
            <span className="text-sm font-bold text-white">
              Canadian Math League
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/" className="text-sm font-medium text-graphite-300 hover:text-redpen-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-graphite-300 hover:text-redpen-400 transition-colors">
              About
            </Link>
            <Link href="/format" className="text-sm font-medium text-graphite-300 hover:text-redpen-400 transition-colors">
              Format
            </Link>
            <Link href="/resources" className="text-sm font-medium text-graphite-300 hover:text-redpen-400 transition-colors">
              Resources
            </Link>
            <Link href="/contact" className="text-sm font-medium text-graphite-300 hover:text-redpen-400 transition-colors">
              Contact
            </Link>
          </div>

          <p className="text-xs text-graphite-400 whitespace-nowrap">
            © {new Date().getFullYear()} CML. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
