'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen bg-ledger flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl shadow-soft-lg bg-ledger p-8"
        >
          <div
            className="exam-stamp mx-auto flex items-center justify-center h-16 w-16 border-2 border-stamp-600"
            style={{ ['--stamp-rotate' as string]: '-6deg' } as React.CSSProperties}
          >
            <CheckCircleIcon className="h-9 w-9 text-stamp-600" aria-hidden="true" />
          </div>
          <span className="mt-5 inline-block font-mono text-[0.625rem] font-semibold uppercase tracking-wide rounded-full bg-stamp-100 text-stamp-700 px-2 py-1">
            Registered
          </span>
          <h1 className="mt-2 font-sans text-2xl text-ink-900">
            Registration successful!
          </h1>
          <p className="mt-3 text-ink-700">
            Thank you for registering with the Canadian Math League. We&apos;ve received your submission and will be in touch soon.
          </p>
          <Link
            href="/"
            className="btn-press mt-6 w-full flex justify-center items-center gap-2 py-3.5 rounded-full shadow-stamp-glow font-mono text-sm font-semibold uppercase tracking-wide text-ledger bg-stamp-600 hover:bg-stamp-700"
          >
            Return to Home
          </Link>
          <p className="mt-4 text-sm text-ink-700">
            Need help?{' '}
            <Link href="/contact" className="font-semibold text-stamp-600 hover:text-stamp-700">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
