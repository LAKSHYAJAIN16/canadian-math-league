'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen bg-grid-blueprint flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-paper rounded-3xl shadow-soft p-8"
        >
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-redpen-600 shadow-red-glow">
            <CheckCircleIcon className="h-9 w-9 text-white" aria-hidden="true" />
          </div>
          <span className="stamp-label mt-5 inline-block">Registered</span>
          <h1 className="mt-2 text-2xl font-bold text-graphite-900">
            Registration successful!
          </h1>
          <p className="mt-3 text-graphite-600">
            Thank you for registering with the Canadian Math League. We&apos;ve received your submission and will be in touch soon.
          </p>
          <Link
            href="/"
            className="btn-press rounded-full mt-6 w-full flex justify-center items-center gap-2 py-3.5 text-sm font-semibold text-white bg-redpen-600 shadow-red-glow hover:bg-redpen-700"
          >
            Return to Home
          </Link>
          <p className="mt-4 text-sm text-graphite-600">
            Need help?{' '}
            <Link href="/contact" className="font-semibold text-redpen-600 hover:text-redpen-700">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
