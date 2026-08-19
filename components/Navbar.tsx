'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

/**
 * Only rendered by app/(marketing)/layout.tsx — pages that shouldn't show
 * it (platform, admin, /join, /o/*) simply live outside that route group
 * instead of this component guessing by pathname.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navItems = [
    { href: '/', label: 'Home' },
    {
      label: 'About',
      subItems: [
        { href: '/about', label: 'Mission' },
        { href: '/format', label: 'Format' },
        { href: '/team', label: 'Team' },
        { href: '/about/sponsors', label: 'Sponsors' },
        { href: '/contact', label: 'Contact Us' },
      ],
    },
    { href: '/2025-season', label: '2025 Season', highlight: true },
    {
      label: 'Pre-Season',
      subItems: [
        { href: '/pre-season', label: 'Sample Problem Sets' },
        { href: '/pre-season/other-resources', label: 'Other Resources' },
      ],
    },
    { href: '/community', label: 'Community' },
  ]

  return (
    <nav className="bg-paper/90 backdrop-blur-sm sticky top-0 z-50 border-b border-paper-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Canadian Math League" width={40} height={40} className="h-9 w-9" />
              <span className="hidden sm:block text-sm font-extrabold text-graphite-900">
                Math League
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href || item.label} className="relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group relative inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-graphite-700 hover:text-redpen-600 transition-colors"
                  >
                    {item.label}
                    {item.highlight && <span className="stamp-label">New</span>}
                    <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-redpen-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                  </Link>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-graphite-700 hover:text-redpen-600 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className={`absolute left-0 mt-2 w-52 bg-paper rounded-2xl shadow-soft-lg py-2 z-50 ${openDropdown === item.label ? 'block' : 'hidden'}`}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block mx-2 px-3 py-2 rounded-xl text-sm font-medium text-graphite-700 hover:bg-redpen-50 hover:text-redpen-600"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/administering-contests"
              className="px-3 py-2 text-sm font-semibold text-graphite-700 hover:text-redpen-600 transition-colors"
            >
              Teacher Portal
            </Link>
            <Link
              href="/register"
              className="btn-press rounded-full ml-3 bg-redpen-600 text-white px-5 py-2.5 text-sm font-semibold shadow-red-glow hover:bg-redpen-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-graphite-900 focus:outline-none">
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
            className="md:hidden bg-paper border-t border-paper-line"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <div key={item.href || item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-graphite-700 hover:text-redpen-600 hover:bg-redpen-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                      {item.highlight && <span className="stamp-label">New</span>}
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="w-full flex justify-between items-center px-3 py-2.5 rounded-xl text-sm font-semibold text-graphite-700"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`pl-4 ${openDropdown === item.label ? 'block' : 'hidden'}`}>
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-3 py-2 rounded-lg text-sm text-graphite-600 hover:text-redpen-600 hover:bg-redpen-50"
                            onClick={() => {
                              setIsOpen(false)
                              setOpenDropdown(null)
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/register"
                className="btn-press rounded-full block text-center bg-redpen-600 text-white px-3 py-3 text-sm font-semibold shadow-red-glow"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
