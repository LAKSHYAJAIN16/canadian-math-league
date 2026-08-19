"use client"
import { motion } from 'framer-motion';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="bg-grid-blueprint py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Join our community</h1>
          <p className="text-lg text-blueprint-100 mt-4">
            Connect with fellow math enthusiasts, share resources, and talk problem-solving with competitors from across Canada.
          </p>
        </div>
      </section>

      <section className="py-20 bg-grid-paper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Discord Section */}
            <div className="bg-paper border-2 border-graphite-900 rounded-xl p-8">
              <span className="stamp-label text-redpen-600 border-redpen-600">Chat</span>
              <h2 className="text-xl font-bold text-graphite-900 mt-3 mb-3">Join our Discord</h2>
              <p className="text-graphite-700 mb-5">
                Our official Discord server is the best place to chat in real-time, get updates, ask questions, and connect with competitors from across Canada.
              </p>
              <a
                href="https://discord.gg/V2nECyHn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press rounded-lg inline-flex items-center gap-2 bg-redpen-600 text-white text-xs font-bold uppercase tracking-wide px-5 py-3 shadow-stamp-sm hover:bg-redpen-700"
              >
                Join the Discord
              </a>
            </div>

            {/* Volunteering Section */}
            <div className="bg-paper border-2 border-graphite-900 rounded-xl p-8">
              <span className="stamp-label text-redpen-600 border-redpen-600">Get Involved</span>
              <h2 className="text-xl font-bold text-graphite-900 mt-3 mb-3">Volunteer with us</h2>
              <p className="text-graphite-700 mb-4">
                Passionate about math education? Join our team of dedicated volunteers and help us inspire the next generation of mathematical thinkers across Canada.
              </p>
              <p className="text-graphite-700 mb-2">As a volunteer, you can help with:</p>
              <ul className="list-disc pl-6 mb-5 space-y-1.5 text-graphite-700">
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
                className="btn-press rounded-lg inline-flex items-center gap-2 bg-blueprint-800 text-white text-xs font-bold uppercase tracking-wide px-5 py-3 shadow-stamp-sm hover:bg-blueprint-900"
              >
                Volunteer Now
              </a>
            </div>

            {/* Contact Section */}
            <div className="bg-blueprint-900 border-2 border-graphite-900 rounded-xl p-8">
              <h2 className="text-xl font-bold text-white mb-3">Get in touch</h2>
              <p className="text-blueprint-100 mb-3">
                Have questions or want to learn more about our programs? We&apos;d love to hear from you.
              </p>
              <p className="text-blueprint-100">
                Email us at{' '}
                <a href="mailto:support@canadianmathleague.ca" className="text-white underline hover:text-white">
                  support@canadianmathleague.ca
                </a>{' '}
                or use our{' '}
                <a href="/contact" className="text-white underline hover:text-white">
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
