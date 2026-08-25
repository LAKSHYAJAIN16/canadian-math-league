'use client'

import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'

const faqs = [
  {
    question: 'How do I register my school?',
    answer: 'Head to the Register page and submit your school’s info along with up to 3 teams of 4-6 students. An admin reviews it, then your teacher account and join codes are created.',
  },
  {
    question: 'Who can participate?',
    answer: 'Any high school student in Canada, on a team from the same school. The Group Stage is completely free — there is no registration fee.',
  },
  {
    question: 'Is there a cost to enter?',
    answer: 'No. The Group Stage is free to enter for every team. See the Format page for what happens at Regionals and Nationals.',
  },
  {
    question: 'How is the competition run?',
    answer: 'The Group Stage runs fully online. Regionals and Nationals are in-person, in Toronto and Vancouver. See the Format page for the full breakdown.',
  },
  {
    question: 'When are results announced?',
    answer: 'Results are shared with teachers through the dashboard shortly after each round is graded.',
  },
  {
    question: 'Can one teacher register multiple teams?',
    answer: 'Yes — the registration form supports up to 3 teams per school.',
  },
]

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger border-b-4 border-ink-900 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-4xl md:text-5xl text-ink-900"
          >
            Contact us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-ink-700 mt-4"
          >
            Have questions about the tournament? We&apos;re here to help.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-ledger px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-sans text-2xl text-ink-900 mb-6">Get in touch</h2>

              <div className="flex items-start gap-4 mb-8">
                <Mail className="h-5 w-5 text-stamp-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans text-lg text-ink-900 mb-1">Email</h3>
                  <a href="mailto:info@canadianmathleague.ca" className="text-stamp-600 font-medium hover:text-stamp-700">
                    info@canadianmathleague.ca
                  </a>
                  <p className="text-ink-700 text-sm mt-1">The fastest way to reach us for any question.</p>
                </div>
              </div>

              <div className="p-6 border-2 border-ink-900 bg-ledger">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-900 mb-3">Before you write in</h3>
                <p className="text-ink-700 text-sm">
                  Teachers: most account and roster questions are answered on the{' '}
                  <a href="/platform/faq" className="text-stamp-600 underline hover:text-stamp-700">
                    Teacher Portal FAQ
                  </a>
                  . Students: check with your teacher for your join code first.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-2 border-ink-900 bg-ledger p-8"
            >
              <h2 className="font-sans text-lg text-ink-900 mb-6">Send us a message</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-2.5 border-2 border-ink-900 bg-ledger text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30" placeholder="John" />
                  </div>
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-2.5 border-2 border-ink-900 bg-ledger text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-2.5 border-2 border-ink-900 bg-ledger text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30" placeholder="john.doe@email.com" />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-2.5 border-2 border-ink-900 bg-ledger text-ink-900 focus:outline-none focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30">
                    <option>General Inquiry</option>
                    <option>School Registration</option>
                    <option>Technical Support</option>
                    <option>Sponsorship</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">Message</label>
                  <textarea rows={5} className="w-full px-4 py-2.5 border-2 border-ink-900 bg-ledger text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30" placeholder="Tell us how we can help you..." />
                </div>

                <button
                  type="submit"
                  className="btn-press w-full inline-flex items-center justify-center gap-2 bg-stamp-600 text-ledger py-3.5 font-mono text-sm font-semibold uppercase tracking-wide hover:bg-stamp-700"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24">
            <h2 className="font-sans text-2xl md:text-3xl text-ink-900 mb-10 text-center">Frequently asked questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-900 border border-ink-900">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-ledger p-6">
                  <h3 className="font-sans text-ink-900 mb-2 text-sm">{faq.question}</h3>
                  <p className="text-ink-700 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
