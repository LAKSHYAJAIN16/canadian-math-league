'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEASON_STAGES, formatDateBadge } from '@/lib/content/season'

const groupStageBadge = formatDateBadge(SEASON_STAGES.groupStage.date)
const regionalsBadge = formatDateBadge(SEASON_STAGES.regionals.date)
const nationalsBadge = formatDateBadge(SEASON_STAGES.nationals.date)

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
        <div className="font-semibold text-graphite-700">{primaryTime} ({primaryTZ})</div>
        <div className="text-sm text-graphite-600">{secondaryTime} ({secondaryTZ})</div>
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
    // Season starts at the Group Stage (see lib/content/season.ts)
    const targetDate = new Date(`${SEASON_STAGES.groupStage.date}T00:00:00`).getTime()

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
    <div className="min-h-screen bg-paper relative">
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
                  className="absolute rounded-full bg-redpen-600/20"
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
                className="absolute top-6 right-6 z-50 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full text-sm font-medium transition-colors"
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
                    className="text-7xl md:text-9xl font-extrabold text-redpen-600 tracking-tight"
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
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-redpen-500 to-transparent"
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
            <h1 className="text-5xl md:text-6xl font-bold text-redpen-600 mb-2 tracking-tight transform -rotate-2">
              2025 Season
            </h1>
            <div className="h-1 w-32 bg-redpen-600 mx-auto rounded-full mb-4 shadow-lg"></div>
          </div>
          {/* Countdown Timer */}
          <div className="flex justify-center space-x-6 text-center">
            <div className="min-w-[60px]">
              <div className="text-2xl text-graphite-700">{timeLeft.days}</div>
              <div className="text-xs text-graphite-600">days</div>
            </div>
            <div className="min-w-[60px]">
              <div className="text-2xl text-graphite-700">{timeLeft.hours}</div>
              <div className="text-xs text-graphite-600">hours</div>
            </div>
            <div className="min-w-[60px]">
              <div className="text-2xl text-graphite-700">{timeLeft.minutes}</div>
              <div className="text-xs text-graphite-600">minutes</div>
            </div>
            <div className="min-w-[60px]">
              <div className="text-2xl text-graphite-700">{timeLeft.seconds}</div>
              <div className="text-xs text-graphite-600">seconds</div>
            </div>
          </div>
          <p className="text-sm text-graphite-600 mt-3">Until Season Starts</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex justify-center space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === tab
                  ? 'bg-redpen-600 text-white shadow-lg'
                  : 'bg-paper-ink text-graphite-700 hover:bg-paper-line hover:shadow-md'
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
              <h2 className="text-2xl font-semibold text-graphite-900 mb-8">Tournament Brackets</h2>

              <div className="overflow-x-auto">
                <div className="min-w-[1000px] relative">
                  <div className="grid grid-cols-[2fr_1fr_3fr_1fr_4fr_1fr_3fr_1fr_2fr] gap-0 items-center">

                    {/* Western Conference Groups */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-redpen-600 text-center mb-2">Western Groups</h3>

                      {/* Group A */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group A</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group B */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group B</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group C */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group C</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group D */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group D</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
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
                      <div className="bg-redpen-50 rounded-3xl p-6 shadow-soft">
                        <h3 className="text-xl font-bold text-graphite-900 mb-1">Western Championships</h3>
                        <div className="border-t border-redpen-200 pt-2 mt-2">
                          <div className="text-xs text-redpen-700 font-semibold">Vancouver, BC</div>
                          <div className="text-xs text-redpen-700 mt-0.5">{SEASON_STAGES.regionals.displayDate}</div>
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
                      <div className="bg-paper rounded-3xl p-6 shadow-soft-lg">
                        <div className="flex justify-center mb-1">
                          <img src="/logo.png" alt="CML Logo" className="h-20 w-20" />
                        </div>
                        <h3 className="text-xl font-bold text-graphite-900 mb-1">Canadian Championship</h3>
                        <div className="border-t border-paper-line pt-2 mt-2">
                          <div className="text-xs text-graphite-600 font-semibold">{SEASON_STAGES.nationals.location}</div>
                          <div className="text-xs text-graphite-600 mt-0.5">{SEASON_STAGES.nationals.displayDate}</div>
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
                      <div className="bg-redpen-50 rounded-3xl p-6 shadow-soft">
                        <h3 className="text-xl font-bold text-graphite-900 mb-1">Ontario Championships</h3>
                        <div className="border-t border-redpen-200 pt-2 mt-2">
                          <div className="text-xs text-redpen-700 font-semibold">Toronto, ON</div>
                          <div className="text-xs text-redpen-700 mt-0.5">{SEASON_STAGES.regionals.displayDate}</div>
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
                      <h3 className="text-sm font-semibold text-redpen-600 text-center mb-2">Ontario Groups</h3>

                      {/* Group E */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group E</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group F */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group F</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group G */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group G</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                        </div>
                      </div>

                      {/* Group H */}
                      <div className="bg-paper p-2 rounded border">
                        <h4 className="text-xs font-bold text-center mb-1">Group H</h4>
                        <div className="space-y-0.5">
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
                            TBA*
                          </div>
                          <div className="bg-paper p-1 rounded text-xs text-center">
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
              <h2 className="text-2xl font-semibold text-graphite-900 mb-2">Leaderboard</h2>
              <p className="text-graphite-600 text-left py-2">Season hasn&apos;t started yet! Check back when it does!</p>
            </div>
          )}

          {activeTab === 'Qualifying' && (
            <div>
              <h2 className="text-2xl font-semibold text-graphite-900 mb-4">Qualifying</h2>
              <div className="space-y-6">
                <div className="bg-paper p-6 rounded-lg shadow-sm border border-paper-line">
                  <h3 className="text-xl font-semibold text-graphite-700 mb-3">Regional Qualification</h3>
                  <p className="text-graphite-600 mb-4">
                    The top teams will qualify for the Regional Stage through the following process:
                  </p>
                  <div className="bg-redpen-50 p-4 rounded-2xl mb-4">
                    <h4 className="font-semibold text-redpen-700 mb-2">12 teams, 6 from each region</h4>
                    <ul className="list-disc list-inside space-y-2 text-graphite-700">
                      <li><span className="font-medium">4 Group Champions</span> - Top team from each group</li>
                      <li><span className="font-medium">2 Wildcards</span> - Next best performing teams across all groups</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-paper p-6 rounded-lg shadow-sm border border-paper-line">
                  <h3 className="text-xl font-semibold text-graphite-700 mb-3">National Qualification</h3>
                  <p className="text-graphite-600 mb-4">
                    The top teams will qualify for the National Stage through the following process:
                  </p>
                  <div className="bg-redpen-50 p-4 rounded-2xl mb-4">
                    <h4 className="font-semibold text-redpen-700 mb-2">6 teams, 3 from each region</h4>
                    <ul className="list-disc list-inside space-y-2 text-graphite-700">
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
              <h2 className="text-2xl font-semibold text-graphite-900 mb-2">Statistics</h2>
              <p className="text-graphite-600 text-left py-2">Season hasn&apos;t started yet! Check back when it does!</p>
            </div>
          )}

          {activeTab === 'Schedule' && (
            <div className="flex">
              <div className="flex-1">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-graphite-700 mb-5">Group Stage</h2>
                  <div className="flex">
                    <div className="bg-paper border-2 border-paper-line rounded-lg p-4 shadow-sm w-28 text-center">
                      <div className="text-3xl font-bold text-graphite-700 mb-1">{groupStageBadge.day}</div>
                      <div className="text-xs font-medium text-graphite-600 uppercase tracking-wider">{groupStageBadge.monthYear}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-graphite-700 mb-5">Regional Stage</h2>
                  <div className="flex space-x-6">
                    <div>
                      <h3 className="text-base font-semibold text-graphite-700 mb-3">Western Championships</h3>
                      <div className="bg-paper border-2 border-paper-line rounded-lg p-4 shadow-sm w-28 text-center">
                        <div className="text-3xl font-bold text-graphite-700 mb-1">{regionalsBadge.day}</div>
                        <div className="text-xs font-medium text-graphite-600 uppercase tracking-wider">{regionalsBadge.monthYear}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-graphite-700 mb-3">Ontario Championships</h3>
                      <div className="bg-paper border-2 border-paper-line rounded-lg p-4 shadow-sm w-28 text-center">
                        <div className="text-3xl font-bold text-graphite-700 mb-1">{regionalsBadge.day}</div>
                        <div className="text-xs font-medium text-graphite-600 uppercase tracking-wider">{regionalsBadge.monthYear}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-graphite-700 mb-5">National Championships</h2>
                  <div className="flex">
                    <div className="bg-paper border-2 border-paper-line rounded-lg p-4 shadow-sm w-28 text-center">
                      <div className="text-3xl font-bold text-graphite-700 mb-1">{nationalsBadge.day}</div>
                      <div className="text-xs font-medium text-graphite-600 uppercase tracking-wider">{nationalsBadge.monthYear}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-px bg-graphite-300 mx-8"></div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-graphite-700 mb-6">Group Stage Schedule</h2>
                <div className="space-y-6">
                  <div className="bg-paper p-4 rounded-lg shadow-sm border border-paper-line">
                    <div className="flex justify-between items-center">
                      {renderTime('11:00 AM')}
                    </div>
                    <div className="text-graphite-600 mt-1">Individual Round</div>
                  </div>
                  <div className="bg-paper p-4 rounded-lg shadow-sm border border-paper-line">
                    <div className="flex justify-between items-center">
                      {renderTime('12:00 PM')}
                    </div>
                    <div className="text-graphite-600 mt-1">Team Round (Power 5)</div>
                  </div>
                  <div className="bg-paper p-4 rounded-lg shadow-sm border border-paper-line">
                    <div className="flex justify-between items-center">
                      {renderTime('1:00 PM')}
                    </div>
                    <div className="text-graphite-600 mt-1">Team Rush</div>
                  </div>
                  <div className="bg-paper p-4 rounded-lg shadow-sm border border-paper-line">
                    <div className="flex justify-between items-center">
                      {renderTime('2:00 PM')}
                    </div>
                    <div className="text-graphite-600 mt-1">Final Round</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-graphite-600">
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
