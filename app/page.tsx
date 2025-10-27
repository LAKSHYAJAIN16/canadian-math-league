'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, BookOpen, Target } from 'lucide-react'
import { EquationHeading, MathBackground, MathSymbol, EquationDivider } from '../components/MathComponents'

const HomePage = () => {
  const features = [
    {
      icon: Trophy,
      title: 'National Competitions',
      description: 'Participate in prestigious mathematics competitions across Canada',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with like-minded students and mathematics enthusiasts',
    },
    {
      icon: BookOpen,
      title: 'Resources',
      description: 'Access comprehensive study materials and practice problems',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Develop problem-solving skills and mathematical reasoning',
    },
  ]

  const stats = [
    { number: '10,000+', label: 'Students' },
    { number: '500+', label: 'Schools' },
    { number: '13', label: 'Provinces' },
    { number: '25+', label: 'Years' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-red-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-base text-red-600 font-medium mb-4"
            >
              Powered by CMS
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <EquationHeading level={1} className="text-4xl md:text-6xl">
                A Math Contest Like No Other
              </EquationHeading>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Inspiring mathematical excellence across Canada through competitive mathematics, 
              fostering problem-solving skills and mathematical thinking in students nationwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
              >
                Join Competition
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-50 transition-colors duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Floating Math Symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['π', '∑', '∫', '∞', '√', '∆'].map((symbol, index) => (
            <motion.div
              key={symbol}
              className="absolute text-4xl text-red-200 font-math font-bold"
              initial={{ 
                opacity: 0.3
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${10 + index * 15}%`,
                top: `${20 + index * 10}%`,
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-12 bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Proudly Supported By</h3>
            <p className="text-gray-600">Our valued partners and sponsors</p>
          </motion.div>
          
          {/* Rolling Sponsors */}
          <div className="relative">
            <div className="flex animate-scroll space-x-12 items-center">
              {/* First set of sponsors */}
              <div className="flex space-x-12 items-center min-w-full">
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-10 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-6 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 w-auto" />
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-12 items-center min-w-full">
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-10 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-6 w-auto" />
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-20 w-40 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 font-math">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EquationDivider symbol="∴" />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <EquationHeading level={2} className="text-3xl md:text-4xl mb-4">
              Why Choose Canada's Premier Math Competition?
            </EquationHeading>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support for students passionate about mathematics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EquationHeading level={2} className="text-3xl md:text-4xl text-white mb-4">
              Ready to Challenge Yourself?
            </EquationHeading>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students across Canada in our next mathematics competition
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
