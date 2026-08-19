'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'What is the Canadian Math League?',
    answer: 'A free, team-based math tournament for Canadian high school students, run in partnership with the Canadian Mathematical Society. Schools compete through an online Group Stage, in-person Regional Championships, and a National final.',
  },
  {
    question: 'Who can participate?',
    answer: 'Any high school student in Canada, as part of a school team of 4–6 students. There is no individual registration path — a teacher registers the team.',
  },
  {
    question: 'When does the competition take place?',
    answer: 'The Group Stage runs online. Regionals and Nationals follow in person. See the 2025 Season page for exact dates.',
  },
  {
    question: 'How do I register?',
    answer: 'A teacher registers their school and up to 3 teams through the Register page. An admin reviews the submission, then the teacher gets dashboard access and each student gets a join code.',
  },
  {
    question: 'What is the competition format?',
    answer: 'The Group Stage has four rounds: an AMC-style individual round (Canadian Open), a collaborative numeric round (Team Rush), a speed-and-accuracy grid round (Capture the Problem), and short Head-to-Head matchups. See the Format page for the full breakdown.',
  },
  {
    question: 'Are there any prizes?',
    answer: 'Yes — cash prizes for the top teams at Nationals, plus medals and certificates for finalists. See the Prizes page for details.',
  },
  {
    question: 'How can I prepare for the competition?',
    answer: 'Sample problem sets for every Group Stage round are available on the Resources and Pre-Season pages.',
  },
  {
    question: 'Is there a cost to enter?',
    answer: 'No — the Group Stage is completely free to enter for every team.',
  },
]

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-paper">
      <section className="bg-grid-blueprint py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Frequently asked questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-blueprint-100 mt-4"
          >
            Find answers to common questions about the Canadian Math League.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-grid-paper px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto space-y-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
              }}
              className="bg-paper border-2 border-graphite-900 rounded-xl"
            >
              <button className="w-full px-6 py-5 text-left focus:outline-none group" onClick={() => toggleFAQ(index)} aria-expanded={openIndex === index}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-bold text-graphite-900 group-hover:text-redpen-600 transition-colors">{faq.question}</h2>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-graphite-400 group-hover:text-redpen-600 transition-colors flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto', transition: { opacity: { duration: 0.3 }, height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } },
                      collapsed: { opacity: 0, height: 0, transition: { opacity: { duration: 0.2 }, height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-graphite-600 border-t border-paper-line">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 text-center">
          <p className="text-graphite-600 mb-6 text-lg">Still have questions?</p>
          <Link
            href="/contact"
            className="btn-press rounded-lg inline-flex items-center gap-2 bg-redpen-600 text-white px-8 py-4 text-sm font-bold tracking-wider uppercase shadow-stamp hover:bg-redpen-700"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default FAQPage
