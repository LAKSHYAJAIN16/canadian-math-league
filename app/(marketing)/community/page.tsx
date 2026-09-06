"use client"
import { motion } from 'framer-motion';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans text-4xl md:text-5xl text-ink-900">Join our community</h1>
          <p className="text-lg text-ink-700 mt-4">
            Connect with fellow math enthusiasts, share resources, and talk problem-solving with competitors from across Canada.
          </p>
        </div>
      </section>

      <section className="py-20 bg-ledger">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Discord Section */}
            <div className="bg-ledger rounded-2xl shadow-soft p-8">
              <h2 className="font-sans text-xl text-ink-900 mb-3">Join our Discord</h2>
              <p className="text-ink-700 mb-5">
                Our official Discord server is the best place to chat in real-time, get updates, ask questions, and connect with competitors from across Canada.
              </p>
              <a
                href="https://discord.gg/V2nECyHn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-full shadow-stamp-glow bg-stamp-600 text-ledger font-mono text-xs font-semibold uppercase tracking-wide px-6 py-3 hover:bg-stamp-700"
              >
                Join the Discord
              </a>
            </div>

            {/* Volunteering Section */}
            <div className="bg-ledger rounded-2xl shadow-soft p-8">
              <h2 className="font-sans text-xl text-ink-900 mb-3">Volunteer with us</h2>
              <p className="text-ink-700 mb-4">
                Passionate about math education? Join our team of dedicated volunteers and help us inspire the next generation of mathematical thinkers across Canada.
              </p>
              <p className="text-ink-700 mb-2">As a volunteer, you can help with:</p>
              <ul className="list-disc pl-6 mb-5 space-y-1.5 text-ink-700">
                <li>Organizing and supervising competitions</li>
                <li>Mentoring students</li>
                <li>Grading and problem development</li>
                <li>Event planning and coordination</li>
                <li>Community outreach and promotion</li>
              </ul>
              <a
                href="https://forms.gle/gJHJ6ZPJZpf3hZwC7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-full shadow-soft hover:shadow-soft-lg bg-ledger text-ink-900 font-mono text-xs font-semibold uppercase tracking-wide px-6 py-3 hover:bg-ledger-deep"
              >
                Volunteer Now
              </a>
            </div>

            {/* Contact Section */}
            <div className="bg-ink-900 rounded-2xl shadow-soft p-8">
              <h2 className="font-sans text-xl text-ledger mb-3">Get in touch</h2>
              <p className="text-ink-300 mb-3">
                Have questions or want to learn more about our programs? We&apos;d love to hear from you.
              </p>
              <p className="text-ink-300">
                Email us at{' '}
                <a href="mailto:support@canadianmathleague.ca" className="text-ledger underline hover:text-stamp-500">
                  support@canadianmathleague.ca
                </a>{' '}
                or use our{' '}
                <a href="/contact" className="text-ledger underline hover:text-stamp-500">
                  contact form
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
