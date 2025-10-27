'use client'

import { motion } from 'framer-motion'
import { Award, Users, Globe, BookOpen } from 'lucide-react'

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in mathematical education and competition.',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'We welcome students from all backgrounds and skill levels to participate.',
    },
    {
      icon: Globe,
      title: 'National Reach',
      description: 'Connecting students across all provinces and territories of Canada.',
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'Fostering a love for mathematics through engaging competitions and resources.',
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
            About Canadian Math League
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Established in 1999, the Canadian Math League has been at the forefront of 
            mathematical education and competition in Canada for over two decades.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
              To inspire and nurture mathematical talent across Canada by providing challenging, 
              engaging, and accessible mathematics competitions that develop problem-solving skills, 
              critical thinking, and a lifelong appreciation for mathematics.
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* History Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 1999 by a group of passionate mathematics educators, 
                  the Canadian Math League began as a small regional competition 
                  with just 50 participating students.
                </p>
                <p>
                  Over the years, we have grown to become Canada's premier mathematics 
                  competition organization, now serving over 10,000 students annually 
                  across all provinces and territories.
                </p>
                <p>
                  Our competitions have helped launch the careers of numerous mathematicians, 
                  engineers, and scientists who continue to make significant contributions 
                  to their fields.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">1999</div>
                    <div className="text-gray-600">Founded with 50 students</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">2005</div>
                    <div className="text-gray-600">Expanded to all provinces</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">2015</div>
                    <div className="text-gray-600">Launched online platform</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">2024</div>
                    <div className="text-gray-600">10,000+ active participants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default AboutPage
