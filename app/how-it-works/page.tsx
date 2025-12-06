'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Award, BookOpen, ArrowRight, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center mb-4"
            >
              <p className="text-xs font-medium text-gray-500 mb-1">Canadian Math League</p>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              How the <span className="text-red-600">Competition</span> Works
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              A three-stage competition that brings together the brightest mathematical minds from across Canada.
              Here's how you can participate and progress through each stage.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Competition Stages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-16">
            {/* Group Stage */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0, transformOrigin: 'bottom' }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-t from-red-300 to-red-200 rounded-t-lg shadow-md relative group hover:shadow-lg transition-all"
              style={{ height: '180px' }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-lg p-2">
                <Users className="h-6 w-6 text-red-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-center text-sm">Group Stage</h3>
                <p className="text-xs font-medium text-red-600 mt-0.5">Dec 17, 2025</p>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm font-medium text-red-600">200+</p>
                <p className="text-xs text-gray-500">Participants</p>
              </div>
            </motion.div>

            {/* Regionals */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0, transformOrigin: 'bottom' }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg shadow-md relative group hover:shadow-lg transition-all"
              style={{ height: '220px' }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-lg p-2">
                <Trophy className="h-6 w-6 text-red-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-center text-sm">Regionals</h3>
                <p className="text-xs font-medium text-red-600 mt-0.5">Feb 15, 2026</p>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm font-medium text-red-600">12</p>
                <p className="text-xs text-gray-500">Teams</p>
              </div>
            </motion.div>

            {/* Nationals */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0, transformOrigin: 'bottom' }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg shadow-md relative group hover:shadow-lg transition-all"
              style={{ height: '260px' }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-lg p-2">
                <Award className="h-6 w-6 text-red-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-center text-sm">Nationals</h3>
                <p className="text-xs font-medium text-red-600 mt-0.5">Feb 21, 2026</p>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm font-medium text-red-600">6</p>
                <p className="text-xs text-gray-500">Finalists</p>
              </div>
            </motion.div>
          </div>

          {/* Stage Details */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Users,
                title: 'Group Stage',
                description: 'The competition begins with the Group Stage, where schools from across Canada compete in their local regions. Teams of 4-6 students work together to solve challenging math problems.',
                date: 'December 17, 2025',
                location: 'Online',
                duration: '2 hours',
                requirements: 'Open to all high school students',
                prizes: 'Top teams advance to Regionals',
                color: 'from-red-300 to-red-200',
                tags: [
                  { text: 'Free', bg: 'bg-green-100', textColor: 'text-green-800' },
                  { text: 'Online', bg: 'bg-blue-100', textColor: 'text-blue-800' }
                ]
              },
              {
                icon: Trophy,
                title: 'Regionals',
                description: 'Top-performing teams from the Group Stage advance to Regionals, where they compete against other top teams in their province. The competition intensifies with more complex problems and team-based challenges.',
                date: 'February 15, 2026',
                location: 'Major Cities',
                duration: '3 hours',
                requirements: 'Top 10% from Group Stage',
                prizes: 'Trophies & National Qualification',
                color: 'from-red-400 to-red-300',
                locations: ['Toronto', 'Vancouver', 'Montreal', 'Calgary']
              },
              {
                icon: Award,
                title: 'Nationals',
                description: 'The top teams from each region compete in the National Finals. This is the ultimate test of mathematical ability, teamwork, and problem-solving skills. The winning team is crowned Canadian Math League Champions.',
                date: 'February 21, 2026',
                location: 'Toronto',
                duration: '4 hours',
                requirements: 'Top 2 teams per region',
                prizes: 'Scholarships & National Recognition',
                color: 'from-red-500 to-red-400',
                tags: [
                  { text: 'All Expenses Paid', bg: 'bg-purple-100', textColor: 'text-purple-800' }
                ]
              }
            ].map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stage.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stage.title}</h3>
                
                {stage.tags && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {stage.tags.map((tag, i) => (
                      <span key={i} className={`${tag.bg} ${tag.textColor} text-xs px-2 py-1 rounded-full font-medium`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-gray-600 mb-4">{stage.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Date:</span> {stage.date}
                  </div>
                  <div className="flex items-start">
                    <svg className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">Location:</span> {stage.locations ? (
                      <div className="flex flex-wrap gap-1 ml-1">
                        {stage.locations.map((loc, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                            {loc}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="ml-1">{stage.location}</span>
                    )}
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Duration:</span> {stage.duration}
                  </div>
                  <div className="pt-2">
                    <span className="font-medium">Prizes:</span> {stage.prizes}
                  </div>
                </div>
                
                <Link 
                  href="/register" 
                  className="mt-4 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 group"
                >
                  Learn more about {stage.title.toLowerCase()}
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Compete?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of students across Canada in this exciting mathematical journey.
              Test your skills, meet like-minded peers, and compete for national recognition.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-3 md:text-lg md:px-8 transition-colors"
            >
              Register Your Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="mt-3 text-sm text-gray-500">Registration closes December 10, 2025</p>
          </div>
        </div>
      </section>
    </div>
  )
}
