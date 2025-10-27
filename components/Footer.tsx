'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calculator, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-primary-500" />
              <span className="font-bold text-xl">Canadian Math League</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Inspiring mathematical excellence across Canada through competitive mathematics, 
              fostering problem-solving skills and mathematical thinking in students nationwide.
            </p>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-primary-600 p-2 rounded-full cursor-pointer"
              >
                <Mail className="h-5 w-5" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-secondary-600 p-2 rounded-full cursor-pointer"
              >
                <Phone className="h-5 w-5" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-green-600 p-2 rounded-full cursor-pointer"
              >
                <MapPin className="h-5 w-5" />
              </motion.div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Competitions', 'Resources', 'Results', 'News'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@canadianmathleague.ca
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Toronto, ON, Canada
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Canadian Math League. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
