'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Show only logo on dashboard page
  if (pathname === '/platform/dashboard') {
    return null;
  }
  if (pathname === '/platform/login') {
    return null;
  }
  if(pathname === "/platform/student-details") {
    return null;
  }
   if(pathname === "/platform/faq") {
    return null;
  }
   if(pathname === "/platform/certificates") {
    return null;
  }
  if(pathname=="/join") {
    return null;
  }
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/format', label: 'Format' },
    { href: '/2025-season', label: '2025 Season' },
    { href: '/about', label: 'About' },
    { 
      label: 'Pre-Season',
      subItems: [
        { href: '/pre-season', label: 'Sample Problem Sets' },
        { href: '/pre-season/other-resources', label: 'Other Resources' },
      ]
    },
    { href: '/community', label: 'Community' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Canadian Math League"
                width={56}
                height={56}
                className="h-14 w-14"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href || item.label} className="relative group">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-black-600 hover:text-red-800 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button className="text-black-600 hover:text-red-800 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                      {item.label}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/register'}
              className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Register
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <div key={item.href || item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        item.label === '2025 Season'
                          ? 'text-red-600 hover:text-red-800 font-semibold bg-red-50'
                          : 'text-gray-900 hover:text-gray-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                      {item.label === '2025 Season' && <span className="ml-1.5 text-xs">🔥</span>}
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-base font-medium text-gray-900">
                        {item.label}
                      </div>
                      <div className="pl-4">
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button className="w-full text-left bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors duration-200" onClick={() => window.location.href = '/register'}>
                Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
