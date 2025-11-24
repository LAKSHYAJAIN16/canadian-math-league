'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, BookOpen, Target, Calendar, Award, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const HomePage = () => {
  const stats = [
    { number: '10,000+', label: 'Students' },
    { number: '500+', label: 'Schools' },
    { number: '13', label: 'Provinces' },
    { number: '25+', label: 'Years' },
  ]

  const features = [
    {
      icon: Trophy,
      title: 'National Competitions',
      description: 'Participate in prestigious mathematics competitions across Canada',
    },
    {
      icon: Users,
      title: 'Thriving Community',
      description: 'Connect with like-minded students and mathematics enthusiasts',
    },
    {
      icon: BookOpen,
      title: 'Premium Resources',
      description: 'Access comprehensive study materials and practice problems',
    },
  ]

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
              <p className="text-xs font-medium text-gray-500 mb-1">In partnership with</p>
              <img 
                src="https://www2.cms.math.ca/Events/Winter20/wp-content/uploads/2018/08/Wordmark-Bilingual-Colour.png" 
                alt="Canadian Mathematical Society" 
                className="h-10 w-auto object-contain"
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Canada's Premier <span className="text-red-600">Math Tournament</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Join thousands of students across Canada in our prestigious math competitions.
              Develop problem-solving skills, compete with top talent, and achieve mathematical excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="/2025-season" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsors Ticker */}
      <section className="py-6 bg-white border-t border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Proudly Supported By</p>
          </div>
          
          <div className="relative w-full overflow-hidden">
            <div className="flex w-[200%] animate-marquee whitespace-nowrap">
              {[
                { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' },
                { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
                { name: 'Apple', logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png' },
                { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
                { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
              ].map((sponsor, index) => (
                <div key={index} className="inline-flex items-center mx-8 h-12">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' },
                { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
                { name: 'Apple', logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png' },
                { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
                { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
              ].map((sponsor, index) => (
                <div key={`dup-${index}`} className="inline-flex items-center mx-8 h-12">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: flex;
            align-items: center;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 20s;
            }
          }
        `}</style>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-red-600">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Canadian Math League?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the best in mathematical competition and education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Test Your Skills?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join students from across Canada in our upcoming competitions and take your mathematical abilities to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Register Now
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage