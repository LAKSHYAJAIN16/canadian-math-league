'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Season2025Page = () => {
  const [activeTab, setActiveTab] = useState('Brackets')
  const [showAnimation, setShowAnimation] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [location, setLocation] = useState<{
    city?: string;
    region?: string;
    country_name?: string;
    timezone?: string;
    isOntario?: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Format time in a specific timezone
  const formatTime = (time: string, fromTZ: string, toTZ: string) => {
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    // Create date in the source timezone
    const date = new Date();
    date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours, minutes, 0, 0);
    
    // Convert to target timezone
    return date.toLocaleTimeString('en-US', {
      timeZone: toTZ,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Helper to render time based on user's location
  const renderTime = (estTime: string) => {
    // Default to EST if there's an error or still loading
    const isOntario = isLoading || error || location.region === 'Ontario';
    const primaryTime = isOntario ? estTime : formatTime(estTime, 'America/Toronto', 'America/Vancouver');
    const secondaryTime = isOntario ? formatTime(estTime, 'America/Toronto', 'America/Vancouver') : estTime;
    const primaryTZ = isOntario ? 'EST' : 'PST';
    const secondaryTZ = isOntario ? 'PST' : 'EST';
    
    return (
      <>
        <div className="font-semibold text-gray-800">{primaryTime} ({primaryTZ})</div>
        <div className="text-sm text-gray-500">{secondaryTime} ({secondaryTZ})</div>
      </>
    );
  };

  const fetchLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      const isOntario = data.region === 'Ontario';
      setLocation({
        city: data.city,
        region: data.region,
        country_name: data.country_name,
        timezone: data.timezone,
        isOntario
      });
      setIsOntario(isOntario);
    } catch (err) {
      console.error('Error fetching location:', err);
      setError('Could not determine your location');
      setIsOntario(true); // Default to Ontario/EST if location fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    setShowAnimation(true);
    fetchLocation();
  }, [])
  const animationComplete = useRef(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const tabs = ['Brackets', 'Schedule', 'Leaderboard', 'Statistics', 'Qualifying']
  
  const [isOntario, setIsOntario] = useState(false);
  
  // Set timezone based on location
  useEffect(() => {
    if (location.region === 'Ontario') {
      setIsOntario(true);
    } else if (location.region) {
      setIsOntario(false);
    }
  }, [location]);

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

              {/* Skip Animation Button */}
              <motion.button
                onClick={() => {
                  setShowAnimation(false);
                  animationComplete.current = true;
                }}
                className="absolute top-6 right-6 z-50 px-4 py-2 bg-gray-500 text-white rounded-full text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              >
                Skip Animation
              </motion.button>

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
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === tab
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
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group B */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group B</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group C */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group C</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group D */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group D</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bracket from Western Groups to Western Conference */}
                    <div className="flex justify-center items-stretch h-full">
                      <svg className="w-12 h-full" viewBox="0 0 48 400" preserveAspectRatio="none">
                        {/* Lines from each group to center */}
                        <path d="M 0 60 L 24 60 L 24 200 L 48 200" stroke="#dc2626" strokeWidth="2" fill="none" />
                        <path d="M 0 140 L 24 140 L 24 200" stroke="#dc2626" strokeWidth="2" fill="none" />
                        <path d="M 0 260 L 24 260 L 24 200" stroke="#dc2626" strokeWidth="2" fill="none" />
                        <path d="M 0 340 L 24 340 L 24 200" stroke="#dc2626" strokeWidth="2" fill="none" />
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
                        <path d="M 0 8 L 24 8 M 20 4 L 24 8 L 20 12" stroke="#dc2626" strokeWidth="2" fill="none" />
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
                        <path d="M 8 8 L 32 8 M 12 4 L 8 8 L 12 12" stroke="#dc2626" strokeWidth="2" fill="none" />
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
                        <path d="M 0 200 L 24 200 L 24 60 L 48 60" stroke="#dc2626" strokeWidth="2" fill="none" />
                        <path d="M 24 200 L 24 140 L 48 140" stroke="#dc2626" strokeWidth="2" fill="none" />
                        <path d="M 24 200 L 24 260 L 48 260" stroke="#dc2626" strokeWidth="2" fill="none" />
                        <path d="M 24 200 L 24 340 L 48 340" stroke="#dc2626" strokeWidth="2" fill="none" />
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
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group F */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group F</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group G */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group G</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group H */}
                      <div className="bg-gray-50 p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group H</h4>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-white p-1 rounded text-xs text-center">
                            TBA*
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

          {activeTab === 'Qualifying' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Qualifying</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Regional Qualification</h3>
                  <p className="text-gray-600 mb-4">
                    The top teams will qualify for the Regional Stage through the following process:
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg mb-4 border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800 mb-2">12 teams, 6 from each region</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><span className="font-medium">4 Group Champions</span> - Top team from each group</li>
                      <li><span className="font-medium">2 Wildcards</span> - Next best performing teams across all groups</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">National Qualification</h3>
                  <p className="text-gray-600 mb-4">
                    The top teams will qualify for the National Stage through the following process:
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg mb-4 border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800 mb-2">6 teams, 3 from each region</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><span className="font-medium">The top 3 teams at each regional tournament will qualify for the national championships.</span></li>
                      <li><span className="font-medium">There will be other awards too, but this is the only way to qualify for the national championships.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
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
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-5">Group Stage</h2>
                  <div className="flex">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm w-28 text-center">
                      <div className="text-3xl font-bold text-gray-800 mb-1">17</div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">DEC 2025</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-5">Regional Stage</h2>
                  <div className="flex space-x-6">
                    <div>
                      <h3 className="text-base font-semibold text-gray-700 mb-3">Western Championships</h3>
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm w-28 text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-1">20</div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">JAN 2026</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-700 mb-3">Ontario Championships</h3>
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm w-28 text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-1">20</div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">JAN 2026</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-5">National Championships</h2>
                  <div className="flex">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm w-28 text-center">
                      <div className="text-3xl font-bold text-gray-800 mb-1">TBD</div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">MAR 2026</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-px bg-gray-300 mx-8"></div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Group Stage Schedule</h2>
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                      {renderTime('11:00 AM')}
                    </div>
                    <div className="text-gray-600 mt-1">Individual Round</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                      {renderTime('12:00 PM')}
                    </div>
                    <div className="text-gray-600 mt-1">Team Round (Power 5)</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                      {renderTime('1:00 PM')}
                    </div>
                    <div className="text-gray-600 mt-1">Team Rush</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                      {renderTime('2:00 PM')}
                    </div>
                    <div className="text-gray-600 mt-1">Final Round</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  * Times shown in EST / PST (3-hour time difference)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Season2025Page
