'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FileText, Play, User, Users as Team, Swords, ClipboardList, Mail, Inbox } from 'lucide-react'

// Content components
const RegisteringContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Registering</h2>
    <div className="prose max-w-none text-gray-600 space-y-4">
      <p className="text-lg">
        Fill out the form. Our team will get back to you with further instructions and confirmation details.
      </p>
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-3">What happens next?</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">✓</div>
            <span>Submit your registration form</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">✓</div>
            <span>Receive confirmation email within 24-48 hours</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">✓</div>
            <span>Get access to preparation materials</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

const MailedContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Contests are mailed</h2>
    <p className="text-gray-600">
      Contest materials are shipped to the provided address. Please allow 5-7 business days for delivery.
    </p>
  </div>
)

const ReceivedContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Contests are received</h2>
    <p className="text-gray-600">
      Verify all materials upon receipt. Contact us immediately if anything is missing or damaged.
    </p>
  </div>
)

const IndividualRoundContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Individual Round</h2>
    <p className="text-gray-600">
      Students work independently on challenging problems. 30 minutes duration. No calculators allowed.
    </p>
  </div>
)

const TeamRoundContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Team Round</h2>
    <p className="text-gray-600">
      Collaborative problem-solving with your team. 45 minutes duration. Work together to solve complex challenges.
    </p>
  </div>
)

const HeadToHeadContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Head to Head</h2>
    <p className="text-gray-600">
      Fast-paced competition between top performers. 20 minutes of rapid-fire questions with bonus points available.
    </p>
  </div>
)

const timelineSections = [
  {
    id: 'pre-contest',
    title: 'Pre-Contest',
    events: [
      {
        id: 'registering',
        title: 'Registering',
        icon: <ClipboardList className="h-5 w-5" />,
        content: <RegisteringContent />
      },
      {
        id: 'mailed',
        title: 'Contests are mailed',
        icon: <Mail className="h-5 w-5" />,
        content: <MailedContent />
      },
      {
        id: 'received',
        title: 'Contests are received',
        icon: <Inbox className="h-5 w-5" />,
        content: <ReceivedContent />
      }
    ]
  },
  {
    id: 'contest-day',
    title: 'Contest - December 17th',
    events: [
      {
        id: 'individual',
        title: 'Individual Round',
        icon: <User className="h-5 w-5" />,
        content: <IndividualRoundContent />
      },
      {
        id: 'team',
        title: 'Team Round',
        icon: <Team className="h-5 w-5" />,
        content: <TeamRoundContent />
      },
      {
        id: 'head-to-head',
        title: 'Head to Head',
        icon: <Swords className="h-5 w-5" />,
        content: <HeadToHeadContent />
      }
    ]
  }
]

export default function AdministeringContestsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const renderContent = () => {
    if (!selectedEvent) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Select an event</h3>
          <p className="mt-1 text-gray-500">Click on any timeline event to view details</p>
        </div>
      )
    }

    switch(selectedEvent) {
      case 'pre-contest-registering':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registering</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form. Our team will get back to you with further instructions and confirmation details.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">✓</div>
                  <span>Submit your registration form</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">✓</div>
                  <span>Receive confirmation email within 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">✓</div>
                  <span>Get access to preparation materials</span>
                </li>
              </ul>
            </div>
          </div>
        )
      
      case 'pre-contest-mailed':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contests are mailed</h2>
            <p className="text-gray-600">
              Contest materials are shipped to the provided address. Please allow 5-7 business days for delivery.
            </p>
          </div>
        )
      
      case 'pre-contest-received':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contests are received</h2>
            <p className="text-gray-600">
              Verify all materials upon receipt. Contact us immediately if anything is missing or damaged.
            </p>
          </div>
        )
      
      case 'contest-day-individual':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Individual Round</h2>
            <p className="text-gray-600">
              Students work independently on challenging problems. 30 minutes duration. No calculators allowed.
            </p>
          </div>
        )
      
      case 'contest-day-team':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Round</h2>
            <p className="text-gray-600">
              Collaborative problem-solving with your team. 45 minutes duration. Work together to solve complex challenges.
            </p>
          </div>
        )
      
      case 'contest-day-head-to-head':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Head to Head</h2>
            <p className="text-gray-600">
              Fast-paced competition between top performers. 20 minutes of rapid-fire questions with bonus points available.
            </p>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Administering Contests</h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about organizing and participating in our math competitions
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <a
              href="/teacher-login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Teacher Login
            </a>
          </motion.div>
        </div>

        {/* New Kind of Contest Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">A new kind of contest.</h2>
          <div className="prose max-w-none text-gray-600 mb-6">
            <p className="text-lg">
              The Canadian Math League offers a unique contest experience that stands out from traditional competitions. 
              Our contests are designed to be accessible yet challenging, encouraging mathematical thinking and problem-solving 
              skills in a low-pressure environment. Unlike conventional tests, our format emphasizes collaborative learning 
              and celebrates progress, making math exciting for students at all skill levels. With flexible administration 
              options and comprehensive support materials, we make it easy for educators to bring the joy of mathematics 
              to their classrooms while meeting curriculum objectives.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href="/guide"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FileText className="mr-2 h-5 w-5 text-red-500" />
              View Guide
            </a>
            <a
              href="/video"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Play className="mr-2 h-5 w-5 text-red-600" />
              Watch Video
            </a>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Timeline</h2>
            
            <div className="relative">
              {/* Main Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300" aria-hidden="true"></div>
              
              <div className="space-y-12">
                {timelineSections.map((section, sectionIndex) => (
                  <div key={section.id} className="relative">
                    {/* Section Title */}
                    <div className="flex items-center mb-6">
                      <div className="w-4 h-4 rounded-full bg-red-500 mr-4 z-10 relative"></div>
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    
                    {/* Events */}
                    <div className="space-y-8 w-2/3">
                      {section.events.map((event, eventIndex) => {
                        const isSelected = selectedEvent === `${section.id}-${event.id}`
                        return (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * (sectionIndex + eventIndex) }}
                            className="relative"
                          >
                            {/* Event Dot - on the line */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 flex justify-center">
                              <div 
                                className={`w-3 h-3 rounded-full ${isSelected ? 'bg-red-600' : 'bg-gray-400'} transition-all`}
                              ></div>
                            </div>
                            
                            {/* Event Content */}
                            <button
                              onClick={() => setSelectedEvent(isSelected ? null : `${section.id}-${event.id}`)}
                              className={`w-full text-left pl-12 pr-4 py-3 rounded-lg transition-colors ${isSelected ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                            >
                              <div className="flex items-center">
                                <div className="p-1.5 rounded-full bg-white border border-gray-200 mr-3">
                                  {event.icon}
                                </div>
                                <span className="font-medium text-gray-900">{event.title}</span>
                              </div>
                            </button>
                            
                            {/* Connector Line */}
                            {eventIndex < section.events.length - 1 && (
                              <div 
                                className="absolute left-6 top-full h-8 w-0.5 bg-gray-300" 
                                style={{ top: '100%' }}
                                aria-hidden="true"
                              ></div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content Panel */}
          <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}