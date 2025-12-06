'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, BookOpen, Target, Calendar, Award, Clock, CheckCircle, MessageCircle, Medal } from 'lucide-react'
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
                href="/register" 
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

      {/* Tournament Structure Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Not a contest. A
              <span className="relative inline-block mx-2 group">
                <span className="absolute -inset-1 bg-red-100 rounded-full transform group-hover:scale-105 transition-transform duration-300"></span>
                <span className="relative text-red-600">tournament</span>
              </span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              A progressive competition with three distinct levels of achievement
            </motion.p>
          </div>

          {/* Bar Chart Visualization */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-center gap-4 md:gap-8 h-[300px] mb-12">
              {/* Group Stage */}
              <motion.div 
                initial={{ scaleY: 0, opacity: 0, transformOrigin: 'bottom' }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 max-w-xs bg-gradient-to-t from-red-300 to-red-200 rounded-t-lg shadow-md relative group hover:shadow-lg transition-all"
                style={{ height: '180px' }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-lg p-2">
                  <Users className="h-6 w-6 text-red-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-center text-sm">Group Stage</h3>
                  <p className="text-xs font-medium text-red-600 mt-0.5">Dec 17, 2025</p>
                  {/* <div className="flex gap-1.5 mt-1">
                    <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full font-medium">Free</span>
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full font-medium">Online</span>
                  </div> */}
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-sm font-medium text-red-600">200+</p>
                  <p className="text-xs text-gray-500">Particpants</p>
                </div>
              </motion.div>

              {/* Regionals */}
              <motion.div 
                initial={{ scaleY: 0, opacity: 0, transformOrigin: 'bottom' }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 max-w-xs bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg shadow-md relative group hover:shadow-lg transition-all"
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
                className="flex-1 max-w-xs bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg shadow-md relative group hover:shadow-lg transition-all"
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
          </div>

          {/* Stage Details */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: Users,
                title: 'Group Stage',
                description: 'Go up against schools near you for a spot at regionals.',
                stats: '200+ Participants',
                color: 'from-red-300 to-red-200'
              },
              {
                icon: Trophy,
                title: 'Regionals',
                description: 'Compete against the best in your region for a spot at nationals.',
                stats: '12 Teams',
                color: 'from-red-400 to-red-300'
              },
              {
                icon: Award,
                title: 'Nationals',
                description: 'The ultimate challenge with Canada\'s top math teams.',
                stats: '6 Finalists',
                color: 'from-red-500 to-red-400'
              }
            ].map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stage.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stage.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{stage.title}</h3>
                  {stage.title === 'Group Stage' && (
                    <div className="flex gap-2 mt-1">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">Free</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">Online</span>
                    </div>
                  )}
                  {stage.title === 'Regionals' && (
                      <div className="flex gap-2 mt-1">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">Toronto</span>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">Vancouver</span>
                      </div>
                  )}
                  {stage.title == "Nationals" && (
                    <div className="flex gap-2 mt-1">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">Toronto</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{stage.description}</p>
                <p className="text-sm font-medium text-gray-500">{stage.stats}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              How It <span className="text-red-600">Works</span>
            </motion.div>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Your journey to mathematical excellence in three simple steps
            </motion.p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { id: 'register', label: 'Register', icon: Users },
              { id: 'prepare', label: 'Prepare', icon: BookOpen },
              { id: 'compete', label: 'Compete', icon: Trophy }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  tab.id === 'register'
                    ? 'bg-red-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Register Tab Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-400 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Register Your Team</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">Free</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">Online</span>
                    <span className="text-sm text-gray-500">• Registration Open</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">Join the competition by registering your school team through our simple online process.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Team Formation",
                    description: "Create a team of 4-6 students from the same school",
                    icon: Users,
                    details: [
                      "4-6 students per team",
                      "All members must attend the same school",
                      "No registration fee required",
                      "Open to all high school students"
                    ]
                  },
                  {
                    title: "Registration Process",
                    description: "Simple steps to get your team registered",
                    icon: CheckCircle,
                    details: [
                      "Fill out the online registration form",
                      "Designate a team captain",
                      "Provide school verification",
                      "Receive confirmation email"
                    ]
                  }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <item.icon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <ul className="mt-3 space-y-2">
                          {item.details.map((detail, j) => (
                            <li key={j} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-100">
                <h3 className="font-medium text-red-800 mb-3">Important Dates</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><span className="font-medium">Early Registration:</span> Until November 15, 2025</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><span className="font-medium">Final Registration Deadline:</span> December 1, 2025</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><span className="font-medium">Competition Day:</span> December 17, 2025</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Register Your Team Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Win Amazing Prizes</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Compete for cash prizes, scholarships, and exclusive opportunities
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Champion',
                prize: '$5,000',
                description: 'Top performer in the senior division',
                color: 'from-yellow-400 to-yellow-200'
              },
              {
                icon: Award,
                title: 'Runner-Up',
                prize: '$2,500',
                description: 'Second place in the senior division',
                color: 'from-gray-300 to-gray-200'
              },
              {
                icon: Medal,
                title: 'Top Junior',
                prize: '$1,500',
                description: 'Top performer in the junior division',
                color: 'from-amber-500 to-amber-300'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-50 mb-4">
                    <item.icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${item.color} mb-2">{item.prize}</p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">Additional prizes include medals, certificates, and exclusive opportunities</p>
            <Link 
              href="/prizes" 
              className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              View all prizes and awards
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2025 Season Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full mb-3">2025 SEASON</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">Register Now for 2025</span>
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto mb-10"
            >
              Secure your spot in Canada's premier math competition. Limited spots available!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Register Now
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-1 bg-gradient-to-r from-red-600 to-red-400"></div>
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <Calendar className="h-10 w-10 text-red-600 mr-3" />
                <h3 className="text-3xl font-bold text-gray-900">Competition Timeline 2025</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    date: 'January 15, 2025',
                    title: 'Registration Opens',
                    description: 'Secure your spot for the preliminary round'
                  },
                  {
                    date: 'March 1, 2025',
                    title: 'Preliminary Round',
                    description: 'First stage of the competition'
                  },
                  {
                    date: 'March 20, 2025',
                    title: 'Results Announcement',
                    description: 'Top participants advance to semi-finals'
                  },
                  {
                    date: 'April 12, 2025',
                    title: 'Semi-Finals',
                    description: 'Second stage with advanced problems'
                  },
                  {
                    date: 'June 7, 2025',
                    title: 'National Finals',
                    description: 'Championship round with top competitors'
                  },
                  {
                    date: 'June 15, 2025',
                    title: 'Awards Ceremony',
                    description: 'Celebration of all participants and winners'
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold mr-5 mt-1">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                      <div className="text-red-600 font-medium">{item.date}</div>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 mb-4">Don't miss your chance to compete with the best young mathematicians in Canada</p>
                <Link 
                  href="/register" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 md:py-3 md:text-lg md:px-10 transition-colors"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block relative"
            >
              <div className="absolute -inset-4 bg-red-50 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <h2 className="relative text-5xl md:text-6xl font-extrabold text-gray-900 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
                Community is Everything
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Join a network of passionate math enthusiasts and grow together
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Study Groups',
                description: 'Connect with peers, form study groups, and tackle challenging problems together in a supportive environment.'
              },
              {
                icon: MessageCircle,
                title: 'Discussion Forums',
                description: 'Engage in meaningful discussions, ask questions, and share insights with our active community.'
              },
              {
                icon: Users,
                title: 'Mentorship',
                description: 'Learn from experienced competitors and alumni who can guide you on your mathematical journey.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/community" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Join Our Community
              <Users className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
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