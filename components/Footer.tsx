'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()

  // Hide footer on dashboard page
  if (pathname === '/platform/dashboard') {
    return null;
  }
  if (pathname === '/platform/login') {
    return null;
  }
  if (pathname === "/platform/student-details") {
    return null;
  }
  if (pathname === "/platform/faq") {
    return null;
  }
  if (pathname === "/platform/certificates") {
    return null;
  }
  if (pathname == "/join") {
    return null;
  }
  if (pathname === "/o/competition") {
    return null;
  }
  if (pathname === "/o/team-competition") {
    return null;
  }
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="Canadian Math League"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="font-semibold text-gray-900 text-xl">Canadian Math League</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Empowering students across Canada through challenging math competitions and fostering a love for problem-solving.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Home</Link></li>
              <li><Link href="/prizes" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Prizes</Link></li>
              <li><Link href="/community" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Community</Link></li>
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-red-600 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <a href="mailto:info@canadianmathleague.ca" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  info@canadianmathleague.ca
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone:</p>
                <a href="tel:+15551234567" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Canadian Math League. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer