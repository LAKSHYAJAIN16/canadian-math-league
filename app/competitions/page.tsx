'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Trophy, ArrowRight } from 'lucide-react'

const CompetitionsPage = () => {
  const competitions = [
    {
      title: 'Junior Math Challenge',
      grade: 'Grades 6-8',
      date: 'March 15, 2024',
      duration: '90 minutes',
      participants: '2,500+',
      description: 'An engaging introduction to competitive mathematics for middle school students.',
      status: 'Registration Open',
      color: 'bg-green-100 text-green-800',
    },
    {
      title: 'Senior Math Olympics',
      grade: 'Grades 9-12',
      date: 'April 20, 2024',
      duration: '3 hours',
      participants: '5,000+',
      description: 'Our flagship competition featuring challenging problems across all areas of mathematics.',
      status: 'Registration Open',
      color: 'bg-green-100 text-green-800',
    },
    {
      title: 'Team Mathematics Championship',
      grade: 'Grades 9-12',
      date: 'May 25, 2024',
      duration: '4 hours',
      participants: '1,200+ teams',
      description: 'Collaborative problem-solving competition emphasizing teamwork and communication.',
      status: 'Coming Soon',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      title: 'Advanced Problem Solving',
      grade: 'Grades 10-12',
      date: 'June 10, 2024',
      duration: '2 hours',
      participants: '800+',
      description: 'Elite competition featuring university-level mathematics problems.',
      status: 'Coming Soon',
      color: 'bg-yellow-100 text-yellow-800',
    },
  ]

  const categories = [
    {
      title: 'Algebra',
      description: 'Linear and quadratic equations, polynomials, and algebraic manipulation',
      icon: '𝑥²',
    },
    {
      title: 'Geometry',
      description: 'Euclidean geometry, coordinate geometry, and geometric proofs',
      icon: '△',
    },
    {
      title: 'Number Theory',
      description: 'Prime numbers, divisibility, modular arithmetic, and Diophantine equations',
      icon: '∞',
    },
    {
      title: 'Combinatorics',
      description: 'Counting principles, probability, and discrete mathematics',
      icon: 'C(n,r)',
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mathematics Competitions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Challenge yourself with our diverse range of mathematics competitions 
            designed for students of all levels across Canada.
          </p>
        </motion.div>

        {/* Competitions Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Upcoming Competitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competitions.map((comp, index) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{comp.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${comp.color}`}>
                    {comp.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{comp.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Users className="h-4 w-4 mr-2 text-primary-600" />
                    <span className="font-medium">{comp.grade}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                    <span>{comp.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-primary-600" />
                    <span>{comp.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Trophy className="h-4 w-4 mr-2 text-primary-600" />
                    <span>{comp.participants} expected</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Competition Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Competition Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Registration CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Compete?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students across Canada in our next mathematics competition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              View Past Results
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default CompetitionsPage
