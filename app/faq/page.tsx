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
    answer: 'The Canadian Math League is a prestigious mathematics competition that brings together students from across Canada to compete in challenging mathematical problem-solving.'
  },
  {
    question: 'Who can participate?',
    answer: 'The competition is open to all middle and high school students across Canada. We have different categories based on grade levels to ensure fair competition.'
  },
  {
    question: 'When does the competition take place?',
    answer: 'The competition typically runs during the academic year, with registration opening in the fall and the main contests taking place in the winter and spring terms.'
  },
  {
    question: 'How do I register?',
    answer: 'You can register through our registration page. Both individual and school registrations are accepted. Please check the registration page for specific deadlines and requirements.'
  },
  {
    question: 'What is the competition format?',
    answer: 'The competition consists of multiple rounds of problem-solving challenges. Each round includes a set of problems that test various mathematical concepts and problem-solving skills.'
  },
  {
    question: 'Are there any prizes?',
    answer: 'Yes, we offer various awards and recognitions for top performers, including medals, certificates, and scholarships. Please visit our prizes page for more details.'
  },
  {
    question: 'How can I prepare for the competition?',
    answer: 'We provide practice materials and past papers on our resources page. Regular practice and participation in math circles or clubs can also be very helpful.'
  },
  {
    question: 'Can I participate if my school is not registered?',
    answer: 'Yes, individual registrations are welcome. However, we encourage you to check with your school first as they might be interested in registering as well.'
  }
]

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about the Canadian Math League</p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto space-y-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                className="w-full px-6 py-5 text-left focus:outline-none group"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {faq.question}
                  </h2>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 group-hover:text-red-500 transition-colors"
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
                      open: { 
                        opacity: 1, 
                        height: 'auto',
                        transition: {
                          opacity: { duration: 0.3 },
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                        }
                      },
                      collapsed: { 
                        opacity: 0, 
                        height: 0,
                        transition: {
                          opacity: { duration: 0.2 },
                          height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                        }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6 text-lg">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default FAQPage
