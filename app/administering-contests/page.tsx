'use client'

import { motion } from 'framer-motion'
import { ClipboardList, Settings, Users, Clock, Calendar, Award, FileText, Mail, UserCheck } from 'lucide-react'

type Section = {
  title: string
  description: string
  icon: any
  items: string[]
}

const sections: Section[] = [
  {
    title: 'Registration Process',
    description: 'Steps to register for the competition',
    icon: ClipboardList,
    items: [
      'Complete the online registration form before the deadline',
      'Pay the registration fee (if applicable)',
      'Receive confirmation email with contest details',
      'Download and review the contest rules and guidelines',
      'Confirm team members and their information'
    ]
  },
  {
    title: 'Contest Rules',
    description: 'Important rules and guidelines',
    icon: Settings,
    items: [
      'No calculators or electronic devices allowed',
      'All work must be shown for full credit',
      'Use only standard writing instruments (pens or pencils)',
      'No outside assistance is permitted',
      'All answers must be in the provided answer booklet',
      'Time limits are strictly enforced'
    ]
  },
  {
    title: 'Team Composition',
    description: 'Guidelines for team formation',
    icon: Users,
    items: [
      'Teams consist of 3-6 students',
      'All team members must be from the same school',
      'Each team must have an adult supervisor/coach',
      'Schools may register multiple teams',
      'Substitutions may be allowed with prior notice'
    ]
  },
  {
    title: 'Schedule',
    description: 'Important dates and times',
    icon: Calendar,
    items: [
      'Registration opens: September 1st',
      'Registration deadline: November 1st',
      'Competition day: November 15th',
      'Awards ceremony: November 22nd',
      'Results published: November 25th'
    ]
  },
  {
    title: 'Scoring',
    description: 'How the competition is scored',
    icon: Award,
    items: [
      'Each correct answer: 1 point',
      'No penalty for incorrect answers',
      'Team score is the sum of individual scores',
      'Tie-breakers: number of perfect scores, then time submitted',
      'Top 3 teams receive awards'
    ]
  },
  {
    title: 'Preparation',
    description: 'How to prepare for the competition',
    icon: FileText,
    items: [
      'Review past competition problems',
      'Practice with sample questions',
      'Attend practice sessions (if available)',
      'Review mathematical concepts from the syllabus',
      'Ensure all team members understand the format'
    ]
  },
  {
    title: 'Day of Competition',
    description: 'What to expect on competition day',
    icon: Clock,
    items: [
      'Arrive 30 minutes before start time',
      'Bring student ID and registration confirmation',
      'No electronic devices allowed in the testing area',
      'Follow all proctor instructions',
      'Raise your hand if you have any questions'
    ]
  },
  {
    title: 'After the Competition',
    description: 'Next steps',
    icon: Mail,
    items: [
      'Unofficial results will be posted on the website',
      'Official results will be emailed within one week',
      'Certificates will be mailed to schools',
      'Winners will be announced at the awards ceremony',
      'Feedback and score reports available upon request'
    ]
  },
  {
    title: 'Supervisor Responsibilities',
    description: 'Guidelines for team supervisors',
    icon: UserCheck,
    items: [
      'Ensure all team members are registered',
      'Collect and submit all required forms',
      'Supervise students during the competition',
      'Report any issues to the competition staff',
      'Ensure all rules are followed'
    ]
  }
]

export default function AdministeringContestsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Administering Contests</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about organizing and participating in our math competitions
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * index,
                type: 'spring',
                stiffness: 100,
                damping: 15
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 mr-4">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6 text-lg">Need more information?</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </div>
  )
}
