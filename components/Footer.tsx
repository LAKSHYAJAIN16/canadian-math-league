'use client'

import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo and Description */}
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-3">
              <Image 
                src="/logo.png" 
                alt="Canadian Math League" 
                width={32} 
                height={32} 
                className="h-8 w-8"
              />
              <span className="font-medium text-gray-900 text-lg">Canadian Math League</span>
            </div>
            <p className="text-gray-500 text-sm">
              Inspiring mathematical excellence across Canada through competitive mathematics.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-500">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm">info@canadianmathleague.ca</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Canadian Math League. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer