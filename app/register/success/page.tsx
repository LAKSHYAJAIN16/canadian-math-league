'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Registration Successful!
          </h2>
          <p className="mt-2 text-gray-600">
            Thank you for registering with Canadian Math League. We've received your submission and will be in touch soon.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Return to Home
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Need help?{' '}
            <Link href="/contact" className="font-medium text-red-600 hover:text-red-500">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
