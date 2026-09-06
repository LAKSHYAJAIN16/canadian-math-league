'use client'

import { useState, useEffect } from 'react'
import { SEASON_STAGES, formatDateBadge } from '@/lib/content/season'

const groupStageBadge = formatDateBadge(SEASON_STAGES.groupStage.date)
const regionalsBadge = formatDateBadge(SEASON_STAGES.regionals.date)
const nationalsBadge = formatDateBadge(SEASON_STAGES.nationals.date)

const Season2025Page = () => {
  const [activeTab, setActiveTab] = useState('Brackets')
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
        <div className="font-mono font-semibold text-ink-900">{primaryTime} ({primaryTZ})</div>
        <div className="font-mono text-sm text-ink-700">{secondaryTime} ({secondaryTZ})</div>
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
    fetchLocation();
  }, [])
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

  return (
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="font-sans text-4xl md:text-5xl text-ink-900">2025 Season</h1>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-3 text-center mt-6">
              {([
                ['days', timeLeft.days],
                ['hours', timeLeft.hours],
                ['minutes', timeLeft.minutes],
                ['seconds', timeLeft.seconds],
              ] as const).map(([label, value]) => (
                <div key={label} className="rounded-2xl shadow-soft bg-ledger px-4 py-3 min-w-[68px]">
                  <div className="scoreboard-digit font-mono text-2xl text-ink-900">{value}</div>
                  <div className="font-mono text-[0.625rem] uppercase tracking-wide text-ink-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-700 mt-3">Until Season Starts</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="mb-12">
          <nav className="flex justify-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn-press rounded-full px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wide transition-colors ${activeTab === tab
                  ? 'shadow-stamp-glow bg-stamp-600 text-ledger'
                  : 'shadow-soft hover:shadow-soft-lg bg-ledger text-ink-900 hover:bg-ledger-deep'
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
              <h2 className="font-sans text-2xl text-ink-900 mb-8 text-center">Tournament Brackets</h2>

              <div className="overflow-x-auto">
                <div className="min-w-[1000px] relative">
                  <div className="grid grid-cols-[2fr_1fr_3fr_1fr_4fr_1fr_3fr_1fr_2fr] gap-0 items-center">

                    {/* Western Conference Groups */}
                    <div className="space-y-1">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-600 text-center mb-2">Western Groups</h3>

                      {['A', 'B', 'C', 'D'].map((letter) => (
                        <div key={letter} className="bg-ledger rounded-2xl shadow-soft p-2">
                          <h4 className="font-mono text-xs font-semibold text-ink-900 text-center mb-1">Group {letter}</h4>
                          <div className="space-y-0.5">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="bg-ledger-deep border border-ledger-line p-1 font-mono text-xs text-ink-500 text-center">
                                TBA*
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bracket from Western Groups to Western Conference */}
                    <div className="flex justify-center items-stretch h-full">
                      <svg className="w-12 h-full" viewBox="0 0 48 400" preserveAspectRatio="none">
                        <path d="M 0 60 L 24 60 L 24 200 L 48 200" stroke="#211C15" strokeWidth="2" fill="none" />
                        <path d="M 0 140 L 24 140 L 24 200" stroke="#211C15" strokeWidth="2" fill="none" />
                        <path d="M 0 260 L 24 260 L 24 200" stroke="#211C15" strokeWidth="2" fill="none" />
                        <path d="M 0 340 L 24 340 L 24 200" stroke="#211C15" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    {/* Western Conference */}
                    <div className="text-center">
                      <div className="rounded-2xl shadow-soft bg-ledger p-6">
                        <h3 className="font-sans text-xl text-ink-900 mb-1">Western Championships</h3>
                        <div className="border-t border-ledger-line pt-2 mt-2">
                          <div className="font-mono text-xs text-stamp-600 font-semibold">Vancouver, BC</div>
                          <div className="font-mono text-xs text-ink-700 mt-0.5">{SEASON_STAGES.regionals.displayDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow from Western Conference to Championship */}
                    <div className="flex justify-center">
                      <svg className="w-8 h-4 -mx-2" viewBox="0 0 32 16">
                        <path d="M 0 8 L 24 8 M 20 4 L 24 8 L 20 12" stroke="#211C15" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    {/* Championship */}
                    <div className="text-center">
                      <div className="rounded-2xl shadow-soft-lg bg-ledger p-6">
                        <div className="flex justify-center mb-1">
                          <img src="/logo.png" alt="CML Logo" className="h-20 w-20" />
                        </div>
                        <h3 className="font-sans text-xl text-ink-900 mb-1">Canadian Championship</h3>
                        <div className="border-t border-ledger-line pt-2 mt-2">
                          <div className="font-mono text-xs text-ink-900 font-semibold">{SEASON_STAGES.nationals.location}</div>
                          <div className="font-mono text-xs text-ink-700 mt-0.5">{SEASON_STAGES.nationals.displayDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow from Ontario Conference to Championship */}
                    <div className="flex justify-center">
                      <svg className="w-8 h-4 -mx-2" viewBox="0 0 32 16">
                        <path d="M 8 8 L 32 8 M 12 4 L 8 8 L 12 12" stroke="#211C15" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    {/* Ontario Conference */}
                    <div className="text-center">
                      <div className="rounded-2xl shadow-soft bg-ledger p-6">
                        <h3 className="font-sans text-xl text-ink-900 mb-1">Ontario Championships</h3>
                        <div className="border-t border-ledger-line pt-2 mt-2">
                          <div className="font-mono text-xs text-stamp-600 font-semibold">Toronto, ON</div>
                          <div className="font-mono text-xs text-ink-700 mt-0.5">{SEASON_STAGES.regionals.displayDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bracket from Ontario Conference to Ontario Groups */}
                    <div className="flex justify-center items-stretch h-full">
                      <svg className="w-12 h-full" viewBox="0 0 48 400" preserveAspectRatio="none">
                        <path d="M 0 200 L 24 200 L 24 60 L 48 60" stroke="#211C15" strokeWidth="2" fill="none" />
                        <path d="M 24 200 L 24 140 L 48 140" stroke="#211C15" strokeWidth="2" fill="none" />
                        <path d="M 24 200 L 24 260 L 48 260" stroke="#211C15" strokeWidth="2" fill="none" />
                        <path d="M 24 200 L 24 340 L 48 340" stroke="#211C15" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    {/* Ontario Conference Groups */}
                    <div className="space-y-1">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-600 text-center mb-2">Ontario Groups</h3>

                      {['E', 'F', 'G', 'H'].map((letter) => (
                        <div key={letter} className="bg-ledger rounded-2xl shadow-soft p-2">
                          <h4 className="font-mono text-xs font-semibold text-ink-900 text-center mb-1">Group {letter}</h4>
                          <div className="space-y-0.5">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="bg-ledger-deep border border-ledger-line p-1 font-mono text-xs text-ink-500 text-center">
                                TBA*
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Leaderboard' && (
            <div className="rounded-3xl shadow-soft bg-ledger p-10 text-center">
              <h2 className="font-sans text-2xl text-ink-900 mb-2">Leaderboard</h2>
              <p className="text-ink-700">Season hasn&apos;t started yet! Check back when it does!</p>
            </div>
          )}

          {activeTab === 'Qualifying' && (
            <div className="space-y-6">
              <div className="rounded-3xl shadow-soft bg-ledger p-6">
                <h3 className="font-sans text-xl text-ink-900 mb-3">Regional Qualification</h3>
                <p className="text-ink-700 mb-4">
                  The top teams will qualify for the Regional Stage through the following process:
                </p>
                <div className="rounded-2xl bg-stamp-100 p-4">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-700 mb-2">12 teams, 6 from each region</h4>
                  <ul className="list-disc list-inside space-y-2 text-ink-700">
                    <li><span className="font-medium text-ink-900">4 Group Champions</span> - Top team from each group</li>
                    <li><span className="font-medium text-ink-900">2 Wildcards</span> - Next best performing teams across all groups</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl shadow-soft bg-ledger p-6">
                <h3 className="font-sans text-xl text-ink-900 mb-3">National Qualification</h3>
                <p className="text-ink-700 mb-4">
                  The top teams will qualify for the National Stage through the following process:
                </p>
                <div className="rounded-2xl bg-stamp-100 p-4">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-700 mb-2">6 teams, 3 from each region</h4>
                  <ul className="list-disc list-inside space-y-2 text-ink-700">
                    <li><span className="font-medium text-ink-900">The top 3 teams at each regional tournament will qualify for the national championships.</span></li>
                    <li><span className="font-medium text-ink-900">There will be other awards too, but this is the only way to qualify for the national championships.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Statistics' && (
            <div className="rounded-3xl shadow-soft bg-ledger p-10 text-center">
              <h2 className="font-sans text-2xl text-ink-900 mb-2">Statistics</h2>
              <p className="text-ink-700">Season hasn&apos;t started yet! Check back when it does!</p>
            </div>
          )}

          {activeTab === 'Schedule' && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="mb-10">
                  <h2 className="font-sans text-2xl text-ink-900 mb-5">Group Stage</h2>
                  <div className="flex">
                    <div className="rounded-2xl shadow-soft bg-ledger p-4 w-28 text-center">
                      <div className="font-mono text-3xl text-ink-900 mb-1">{groupStageBadge.day}</div>
                      <div className="font-mono text-[0.625rem] text-ink-700 uppercase tracking-wide">{groupStageBadge.monthYear}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="font-sans text-2xl text-ink-900 mb-5">Regional Stage</h2>
                  <div className="flex space-x-6">
                    <div>
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-3">Western Championships</h3>
                      <div className="rounded-2xl shadow-soft bg-ledger p-4 w-28 text-center">
                        <div className="font-mono text-3xl text-ink-900 mb-1">{regionalsBadge.day}</div>
                        <div className="font-mono text-[0.625rem] text-ink-700 uppercase tracking-wide">{regionalsBadge.monthYear}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-3">Ontario Championships</h3>
                      <div className="rounded-2xl shadow-soft bg-ledger p-4 w-28 text-center">
                        <div className="font-mono text-3xl text-ink-900 mb-1">{regionalsBadge.day}</div>
                        <div className="font-mono text-[0.625rem] text-ink-700 uppercase tracking-wide">{regionalsBadge.monthYear}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-sans text-2xl text-ink-900 mb-5">National Championships</h2>
                  <div className="flex">
                    <div className="rounded-2xl shadow-soft bg-ledger p-4 w-28 text-center">
                      <div className="font-mono text-3xl text-ink-900 mb-1">{nationalsBadge.day}</div>
                      <div className="font-mono text-[0.625rem] text-ink-700 uppercase tracking-wide">{nationalsBadge.monthYear}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px md:w-px md:h-auto bg-ledger-line md:mx-4"></div>

              <div className="flex-1">
                <h2 className="font-sans text-2xl text-ink-900 mb-6">Group Stage Schedule</h2>
                <div className="rounded-2xl shadow-soft divide-y divide-ledger-line overflow-hidden">
                  {[
                    ['11:00 AM', 'Individual Round'],
                    ['12:00 PM', 'Team Round (Power 5)'],
                    ['1:00 PM', 'Team Rush'],
                    ['2:00 PM', 'Final Round'],
                  ].map(([time, title]) => (
                    <div key={title} className="bg-ledger p-4">
                      <div className="flex justify-between items-center">
                        {renderTime(time)}
                      </div>
                      <div className="text-ink-700 mt-1">{title}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-ink-500">
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
