'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Clock, Calendar, Award, ChevronRight, MapPin, Grid3x3Icon, Fingerprint } from 'lucide-react'
import { useState } from 'react'
import { FaTeamspeak } from 'react-icons/fa6'
import { SEASON_STAGES } from '@/lib/content/season'
type TabType = 'group' | 'regional' | 'national'

/** Covers both lucide-react icons and react-icons icons (e.g. FaTeamspeak). */
type IconComponent = React.ComponentType<{ className?: string }>

interface Championship {
  title: string
  location: string
  details?: string[]
}

interface Round {
  title: string
  description: string
  details: string[]
  icon: IconComponent
}

interface Competition {
  title: string
  description: string
  icon: IconComponent
  details?: string[]
  rounds?: Round[]
  championships?: Championship[]
}

const FormatPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('group')

  const competitions: Record<TabType, Competition> = {
    group: {
      title: 'Group Stage',
      icon: Users,
      description: 'The initial phase featuring four distinct competitions',
      details: [
        '16 teams per conference (Western & Ontario)',
        '4 groups of 4 teams each per conference',
        'Completely free to participate',
        'Fully online competition',
      ],
      rounds: [
        {
          title: 'Canadian Open',
          description: 'Individual multiple-choice competition inspired by AMC (American Mathematics Competitions)',
          icon: Award,
          details: [
            '20 multiple-choice questions',
            '45 minute time limit',
            'Each question is worth 10 points',
            'No penalty for incorrect answers',
          ],
        },
        {
          title: 'Team Rush',
          description: 'Team competition that requires collaborative problem solving and teamwork!',
          icon: Clock,
          details: ['10 problems to solve as a team', '30 minute time limit', 'Each question is worth 30 points!'],
        },
        {
          title: 'Capture the Problem',
          description: 'A strategic battle of speed and accuracy where every problem is a territory to conquer!',
          icon: Grid3x3Icon,
          details: [
            'Each group of teams gets 50 challenging problems arranged in a grid',
            "Teams 'capture' a problem when they solve it - nobody else can solve it!",
            'Teams get points for capturing problems!',
            '20 minute time limit',
            '500 points up for grabs!',
          ],
        },
        {
          title: 'Head to Head Matchups',
          description: 'Team vs Team matchups, collaborative problem-solving!',
          icon: FaTeamspeak,
          details: [
            'Two teams get a set of 5 problems.',
            'Teams have to answer them in 2 minutes.',
            'Team with the most points wins.',
            '300 points up for grabs!',
          ],
        },
      ],
    },
    regional: {
      title: 'Regional Championships',
      icon: MapPin,
      description: 'In-person competition featuring individual and team events',
      rounds: [
        {
          title: 'Individual Round',
          description: 'AIME-style individual competition with numerical answers',
          icon: Fingerprint,
          details: [
            '15 challenging problems',
            '1 hour time limit',
            'AIME-style format with numerical answers only',
            'Tiebreaker round (points not added to total score)',
            'Focus on problem-solving under time pressure',
          ],
        },
        {
          title: 'Guts Round',
          description: 'Fast-paced team problem solving inspired by HMMT',
          icon: Users,
          details: ['35 total problems divided into 7 sets of 5', '45 minute time limit', 'Teams work on one set at a time'],
        },
        {
          title: 'Power Guts',
          description: 'Advanced proof-based team challenge',
          icon: Award,
          details: [
            '8 proof-based problems total',
            '2 problems for each of 4 subject areas',
            '30 minute time limit',
            'Full solutions with proofs required',
          ],
        },
        {
          title: 'MathRoyale',
          description: 'Head-to-head buzzer round',
          icon: Clock,
          details: ['Buzzer round, live and fully timed', 'Tests both speed and accuracy', 'Similar to MathCounts Countdown or Quiz Bowls'],
        },
      ],
      championships: [
        { title: 'Ontario Championship', location: 'Toronto, ON' },
        { title: 'Western Championship', location: 'Vancouver, BC' },
      ],
    },
    national: {
      title: 'National Championships',
      icon: Trophy,
      description: 'Details coming soon!',
    },
  }

  const currentCompetition = competitions[activeTab]

  return (
    <div className="min-h-screen py-16 bg-grid-paper">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="stamp-label">Rulebook</span>
          <h1 className="text-4xl md:text-5xl font-bold text-graphite-900 mt-3">Tournament Format</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {Object.entries(competitions).map(([key, comp]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as TabType)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                activeTab === key ? 'bg-redpen-600 text-white shadow-red-glow' : 'bg-redpen-50 text-graphite-700 hover:bg-redpen-100'
              }`}
            >
              {comp.title}
            </button>
          ))}
        </div>

        {/* Current Competition Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-paper rounded-3xl shadow-soft overflow-hidden">
          <div className="bg-redpen-600 p-6 text-white">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold">{currentCompetition.title}</h2>
                <div className="mt-3 md:mt-0">
                  <span className="inline-flex items-center rounded-full px-3 py-1 bg-white/15 text-white text-xs font-semibold">
                    {activeTab === 'group' ? 'Online' : activeTab === 'regional' ? 'In-Person' : 'Championship'}
                  </span>
                </div>
              </div>

              {/* Competition Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-white/70 flex-shrink-0" />
                  <span className="text-sm text-white/90">
                    {activeTab === 'group'
                      ? SEASON_STAGES.groupStage.displayDate
                      : activeTab === 'regional'
                        ? SEASON_STAGES.regionals.displayDate
                        : SEASON_STAGES.nationals.displayDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-white/70 flex-shrink-0" />
                  <span className="text-sm text-white/90">
                    {activeTab === 'group' ? '32 Teams (16 per conference)' : activeTab === 'regional' ? '12 Teams (6 per conference)' : '6 Finalist Teams'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-white/70 flex-shrink-0" />
                  <span className="text-sm text-white/90">
                    {activeTab === 'group' ? 'Free to Participate' : activeTab === 'regional' ? 'Qualification Required' : 'Invitation Only'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-lg text-graphite-700 mb-8 leading-relaxed">{currentCompetition.description}</p>

            {/* Key Details Section */}
            {currentCompetition.details && currentCompetition.details.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-redpen-600" />
                  Key Details
                </h3>
                <div className="space-y-2 pl-4 border-l-2 border-paper-line">
                  {currentCompetition.details.map((detail, index) => (
                    <div key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-redpen-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-graphite-700">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'regional' && currentCompetition.championships && (
              <div className="mt-10">
                <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wide mb-6">Regional Championships</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentCompetition.championships.map((championship, index) => (
                    <motion.div
                      key={championship.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-redpen-50 rounded-2xl p-6"
                    >
                      <h4 className="font-bold text-graphite-900 mb-2">{championship.title}</h4>
                      <div className="flex items-center text-sm text-graphite-600">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        {championship.location}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Rounds Section */}
            {currentCompetition.rounds && (
              <div className="mt-10">
                <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-redpen-600" />
                  {activeTab === 'group' ? 'Rounds' : 'Competition Rounds'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentCompetition.rounds.map((round, index) => (
                    <motion.div
                      key={round.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-redpen-50/60 rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-soft">
                          <round.icon className="h-5 w-5 text-redpen-600" />
                        </div>
                        <h4 className="text-sm font-bold text-graphite-900">{round.title}</h4>
                      </div>
                      <p className="text-graphite-600 text-sm mb-3">{round.description}</p>
                      <ul className="space-y-1.5">
                        {round.details.map((detail, i) => (
                          <li key={i} className="flex items-start text-sm text-graphite-600">
                            <ChevronRight className="h-4 w-4 text-redpen-500 mt-0.5 mr-1.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FormatPage
