'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Season2025Page = () => {
  const [activeTab, setActiveTab] = useState('Brackets')
  const [showAnimation, setShowAnimation] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setShowAnimation(true)
  }, [])
  const animationComplete = useRef(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const tabs = ['Brackets', 'Schedule', 'Leaderboard', 'Statistics']

  useEffect(() => {
    // Set target date to December 12, 2025 (first day of season)
    const targetDate = new Date('2025-12-12T00:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Hide animation after it completes
  useEffect(() => {
    if (animationComplete.current) return;
    
    const timer = setTimeout(() => {
      setShowAnimation(false)
      animationComplete.current = true
    }, 3000) // Total animation duration

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white relative">
      {isClient && (
      <AnimatePresence>
        {showAnimation && (
          <motion.div 
            className="fixed inset-0 bg-gradient-to-br from-red-900 via-black to-red-900 z-50 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background elements */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-red-600/20"
                initial={{
                  width: Math.random() * 100 + 100,
                  height: Math.random() * 100 + 100,
                  x: 0,
                  y: 0,
                  opacity: 0
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.3, 0],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
            
            <motion.div
              className="relative z-10 text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.1, 1],
                opacity: [0, 1, 1, 0.8],
                y: [100, -20, 0]
              }}
              exit={{ 
                scale: 1.2,
                opacity: 0,
                transition: { duration: 0.5 }
              }}
              transition={{ 
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.h1 
                  className="text-7xl md:text-9xl font-extrabold text-red-500 tracking-tight"
                  style={{
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
                    WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  2025
                </motion.h1>
                <motion.div 
                  className="text-3xl md:text-5xl font-bold text-red-300 mt-6 tracking-widest"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, -20],
                    textShadow: ['0 0 5px rgba(239, 68, 68, 0)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 15px rgba(239, 68, 68, 0.8)']
                  }}
                  transition={{ 
                    duration: 2.5,
                    times: [0, 0.2, 0.8, 1],
                    delay: 0.3
                  }}
                >
                  SEASON
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: '12rem' }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-8 left-0 right-0 text-center text-red-300/50 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 1.5 }}
            >
              Canadian Math League
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-2 tracking-tight transform -rotate-2">
              2025 Season
            </h1>
            <div className="h-1 w-32 bg-red-500 mx-auto rounded-full mb-4 shadow-lg"></div>
          </div>
          {/* Countdown Timer */}
          <div className="flex justify-center space-x-6 text-center">
            <div className="min-w-[60px]">
              <div className="text-2xl font-mono text-gray-800">{timeLeft.days}</div>
              <div className="text-xs font-mono text-gray-500">days</div>
            </div>
            <div className="min-w-[60px]">
              <div className="text-2xl font-mono text-gray-800">{timeLeft.hours}</div>
              <div className="text-xs font-mono text-gray-500">hours</div>
            </div>
            <div className="min-w-[60px]">
              <div className="text-2xl font-mono text-gray-800">{timeLeft.minutes}</div>
              <div className="text-xs font-mono text-gray-500">minutes</div>
            </div>
            <div className="min-w-[60px]">
              <div className="text-2xl font-mono text-gray-800">{timeLeft.seconds}</div>
              <div className="text-xs font-mono text-gray-500">seconds</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Until Season Starts</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex justify-center space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'Brackets' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Tournament Brackets</h2>
              
              <div className="overflow-x-auto">
                <div className="min-w-[1000px] relative">
                  <div className="grid grid-cols-[2fr_1fr_3fr_1fr_4fr_1fr_3fr_1fr_2fr] gap-0 items-center">
                    
                    {/* Western Conference Groups */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-red-600 text-center mb-2">Western Groups</h3>
                      
                      {/* Group A */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group A</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Western Tech<sup className="ml-0.5 text-[0.7em] font-bold">1</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Vancouver College<sup className="ml-0.5 text-[0.7em] font-bold">8</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            St. George's<sup className="ml-0.5 text-[0.7em] font-bold">13</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            West Point Grey<sup className="ml-0.5 text-[0.7em] font-bold">16</sup>
                          </div>
                        </div>
                      </div>

                      {/* Group B */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group B</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            York House<sup className="ml-0.5 text-[0.7em] font-bold">4</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Crofton House<sup className="ml-0.5 text-[0.7em] font-bold">5</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            St. John's<sup className="ml-0.5 text-[0.7em] font-bold">12</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Little Flower<sup className="ml-0.5 text-[0.7em] font-bold">9</sup>
                          </div>
                        </div>
                      </div>

                      {/* Group C */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group C</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            St. Michaels<sup className="ml-0.5 text-[0.7em] font-bold">3</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Upper Canada<sup className="ml-0.5 text-[0.7em] font-bold">6</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Havergal<sup className="ml-0.5 text-[0.7em] font-bold">11</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Branksome<sup className="ml-0.5 text-[0.7em] font-bold">14</sup>
                          </div>
                        </div>
                      </div>

                      {/* Group D */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group D</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            UCC<sup className="ml-0.5 text-[0.7em] font-bold">2</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Crescent<sup className="ml-0.5 text-[0.7em] font-bold">7</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TFS<sup className="ml-0.5 text-[0.7em] font-bold">10</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            UTS<sup className="ml-0.5 text-[0.7em] font-bold">15</sup>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bracket from Western Groups to Western Conference */}
                    <div className="flex justify-center items-stretch h-full">
                      <svg className="w-12 h-full" viewBox="0 0 48 400" preserveAspectRatio="none">
                        {/* Lines from each group to center */}
                        <path d="M 0 60 L 24 60 L 24 200 L 48 200" stroke="#dc2626" strokeWidth="2" fill="none"/>
                        <path d="M 0 140 L 24 140 L 24 200" stroke="#dc2626" strokeWidth="2" fill="none"/>
                        <path d="M 0 260 L 24 260 L 24 200" stroke="#dc2626" strokeWidth="2" fill="none"/>
                        <path d="M 0 340 L 24 340 L 24 200" stroke="#dc2626" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>

                    {/* Western Conference */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-blue-800 mb-1 font-serif italic">Western Championships</h3>
                        <div className="border-t border-blue-300 pt-2 mt-2">
                          <div className="text-xs text-blue-600 font-semibold italic font-serif">Vancouver, BC</div>
                          <div className="text-xs text-blue-600 mt-0.5 italic font-serif">December 14, 2025</div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow from Western Conference to Championship */}
                    <div className="flex justify-center">
                      <svg className="w-8 h-4 -mx-2" viewBox="0 0 32 16">
                        <path d="M 0 8 L 24 8 M 20 4 L 24 8 L 20 12" stroke="#dc2626" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>

                    {/* Championship */}
                    <div className="text-center">
                      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-center mb-1">
                          <img src="/logo.png" alt="CML Logo" className="h-20 w-20" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1 font-serif italic">Canadian Championship</h3>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="text-xs text-gray-600 font-semibold italic font-serif">Toronto, ON</div>
                          <div className="text-xs text-gray-600 mt-0.5 italic font-serif">December 16, 2025</div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow from Ontario Conference to Championship */}
                    <div className="flex justify-center">
                      <svg className="w-8 h-4 -mx-2" viewBox="0 0 32 16">
                        <path d="M 8 8 L 32 8 M 12 4 L 8 8 L 12 12" stroke="#dc2626" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>

                    {/* Ontario Conference */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-green-800 mb-1 font-serif italic">Ontario Championships</h3>
                        <div className="border-t border-green-300 pt-2 mt-2">
                          <div className="text-xs text-green-600 font-semibold italic font-serif">Toronto, ON</div>
                          <div className="text-xs text-green-600 mt-0.5 italic font-serif">December 15, 2025</div>
                        </div>
                      </div>
                    </div>

                    {/* Bracket from Ontario Conference to Ontario Groups */}
                    <div className="flex justify-center items-stretch h-full">
                      <svg className="w-12 h-full" viewBox="0 0 48 400" preserveAspectRatio="none">
                        {/* Lines from center to each group (mirrored) */}
                        <path d="M 0 200 L 24 200 L 24 60 L 48 60" stroke="#dc2626" strokeWidth="2" fill="none"/>
                        <path d="M 24 200 L 24 140 L 48 140" stroke="#dc2626" strokeWidth="2" fill="none"/>
                        <path d="M 24 200 L 24 260 L 48 260" stroke="#dc2626" strokeWidth="2" fill="none"/>
                        <path d="M 24 200 L 24 340 L 48 340" stroke="#dc2626" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>

                    {/* Ontario Conference Groups */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-red-600 text-center mb-2">Ontario Groups</h3>
                      
                      {/* Group E */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group E</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Bayview<sup className="ml-0.5 text-[0.7em] font-bold">1</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Marc Garneau<sup className="ml-0.5 text-[0.7em] font-bold">8</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            A.Y. Jackson<sup className="ml-0.5 text-[0.7em] font-bold">13</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Woburn<sup className="ml-0.5 text-[0.7em] font-bold">16</sup>
                          </div>
                        </div>
                      </div>

                      {/* Group F */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group F</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Richmond Hill<sup className="ml-0.5 text-[0.7em] font-bold">4</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Unionville<sup className="ml-0.5 text-[0.7em] font-bold">5</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Pierre Elliott<sup className="ml-0.5 text-[0.7em] font-bold">12</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Bur Oak<sup className="ml-0.5 text-[0.7em] font-bold">9</sup>
                          </div>
                        </div>
                      </div>

                      {/* Group G */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group G</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Earl Haig<sup className="ml-0.5 text-[0.7em] font-bold">3</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Northview<sup className="ml-0.5 text-[0.7em] font-bold">6</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            William Lyon<sup className="ml-0.5 text-[0.7em] font-bold">11</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Abbey Park<sup className="ml-0.5 text-[0.7em] font-bold">14</sup>
                          </div>
                        </div>
                      </div>

                      {/* Group H */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group H</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            White Oaks<sup className="ml-0.5 text-[0.7em] font-bold">2</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Waterloo<sup className="ml-0.5 text-[0.7em] font-bold">7</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            Centennial<sup className="ml-0.5 text-[0.7em] font-bold">10</sup>
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            John Fraser<sup className="ml-0.5 text-[0.7em] font-bold">15</sup>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Leaderboard' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Leaderboard</h2>
              <p className="text-gray-600 text-left py-2">Season hasn't started yet! Check back when it does!</p>
            </div>
          )}

          {activeTab === 'Statistics' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Statistics</h2>
              <p className="text-gray-600 text-left py-2">Season hasn't started yet! Check back when it does!</p>
            </div>
          )}

          {activeTab === 'Schedule' && (
            <div className="flex">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Group Stage</h2>
                <div className="flex space-x-6 mb-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Day 1</h3>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">DEC 2025</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Day 2</h3>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">13</div>
                      <div className="text-sm text-gray-600">DEC 2025</div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Regional Stage</h2>
                <div className="flex space-x-6 mb-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Western Championships</h3>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">14</div>
                      <div className="text-sm text-gray-600">DEC 2025</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Ontario Championships</h3>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">15</div>
                      <div className="text-sm text-gray-600">DEC 2025</div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">National Championships</h2>
                <div className="flex space-x-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Canadian Championship</h3>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">16</div>
                      <div className="text-sm text-gray-600">DEC 2025</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-px bg-gray-300 mx-8"></div>
              
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-600 text-lg">Detailed Schedule coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Season2025Page
