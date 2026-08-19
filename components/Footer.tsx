'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Only rendered by app/(marketing)/layout.tsx — see Navbar.tsx for why
 * this no longer self-hides based on pathname.
 */
const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Image
              src="/logo.png"
              alt="Canadian Math League"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-semibold text-gray-900">Canadian Math League</span>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 mb-4 md:mb-0">
            <Link href="/" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
              About
            </Link>
            <Link href="/format" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
              Format
            </Link>
            <Link href="/resources" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
              Resources
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
              Contact
            </Link>
          </div>
          
          <p className="text-xs text-gray-500 whitespace-nowrap">
            © {new Date().getFullYear()} Canadian Math League. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer