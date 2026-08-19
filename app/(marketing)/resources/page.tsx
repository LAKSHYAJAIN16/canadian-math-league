'use client'

import { motion } from 'framer-motion'
import { BookOpen, Download, Video, FileText, Calculator, Users } from 'lucide-react'

const ResourcesPage = () => {
  const resources = [
    {
      icon: FileText,
      title: 'Practice Problems',
      description: 'Comprehensive collection of past competition problems with detailed solutions',
      items: ['2023 Competition Archive', '2022 Competition Archive', '2021 Competition Archive'],
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video explanations of complex mathematical concepts',
      items: ['Algebra Fundamentals', 'Geometry Proofs', 'Number Theory Basics'],
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: BookOpen,
      title: 'Study Guides',
      description: 'Structured learning materials organized by topic and difficulty level',
      items: ['Competition Preparation Guide', 'Problem-Solving Strategies', 'Mathematical Olympiad Handbook'],
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Calculator,
      title: 'Online Tools',
      description: 'Interactive calculators and problem generators for practice',
      items: ['Equation Solver', 'Graph Plotter', 'Prime Number Generator'],
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  const topics = [
    'Algebra & Polynomials',
    'Geometry & Trigonometry',
    'Number Theory',
    'Combinatorics',
    'Probability & Statistics',
    'Calculus Basics',
    'Logic & Proofs',
    'Mathematical Modeling',
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
            Learning Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive collection of study materials, practice problems, 
            and educational resources to excel in mathematics competitions.
          </p>
        </motion.div>

        {/* Resource Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${resource.color}`}>
                  <resource.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <Download className="h-4 w-4 mr-2 text-primary-600" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                >
                  Access Resources
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Topics Covered */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Topics Covered
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-lg text-center cursor-pointer"
              >
                <span className="text-gray-800 font-medium">{topic}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Study Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Study Tips for Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Practice Regularly</h3>
                <p className="text-primary-100">
                  Dedicate time daily to solving problems and reviewing concepts
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Understand Concepts</h3>
                <p className="text-primary-100">
                  Focus on understanding the underlying principles, not just memorizing
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Join Study Groups</h3>
                <p className="text-primary-100">
                  Collaborate with peers to discuss problems and share strategies
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mentorship Program
              </h3>
              <p className="text-gray-600 mb-4">
                Connect with experienced mathematicians and past competition winners for personalized guidance.
              </p>
              <button className="text-primary-600 font-medium hover:text-primary-700">
                Learn More →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Live Workshops
              </h3>
              <p className="text-gray-600 mb-4">
                Join our weekly online workshops covering advanced topics and problem-solving techniques.
              </p>
              <button className="text-primary-600 font-medium hover:text-primary-700">
                View Schedule →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Digital Library
              </h3>
              <p className="text-gray-600 mb-4">
                Access our extensive collection of mathematics books, journals, and research papers.
              </p>
              <button className="text-primary-600 font-medium hover:text-primary-700">
                Browse Library →
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ResourcesPage
