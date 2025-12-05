'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Clock, Calendar, Award, ChevronRight, MapPin, Grid3x3Icon, Fingerprint } from 'lucide-react'
import { useState } from 'react'
import { FaTeamspeak } from 'react-icons/fa6'
type TabType = 'group' | 'regional' | 'national'

interface Championship {
  title: string;
  location: string;
  details?: string[];
}

interface CompetitionBase {
  title: string;
  description: string;
  icon: any;
  color?: 'red' | 'green';
  details?: string[];
  rounds?: Round[];
  championships?: Championship[];
}

interface GroupCompetition extends CompetitionBase {
  rounds: Round[];
}

interface OtherCompetition extends CompetitionBase {
  // No rounds for other competition types
}

type Competition = (GroupCompetition | OtherCompetition) & {
  rounds?: Round[];
};

interface Round {
  title: string;
  description: string;
  details: string[];
  icon: any;
}

const FormatPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('group')

  const competitions: Record<TabType, Competition> = {
    group: {
      title: "Group Stage",
      icon: Users,
      date: 'December 17, 2025',
      duration: '1 hour 30 minutes (90 minutes)',
      description: "The initial phase featuring four distinct competitions",
      details: [
        "16 teams per conference (Western & Ontario)",
        "4 groups of 4 teams each per conference",
        "Completely free to participate",
        "Fully online competition",
      ],
      rounds: [
        {
          title: "Canadian Open",
          description: "Individual multiple-choice competition inspired by AMC (American Mathematics Competitions)",
          icon: Award,
          details: [
            "20 multiple-choice questions",
            "45 minute time limit",
            "Each question is worth 10 points",
            "No penalty for incorrect answers"
          ]
        },
        {
          title: "Team Rush",
          description: "Team competition that requires collaborative problem solving and teamwork!",
          icon: Clock,
          details: [
            "10 problems to solve as a team",
            "30 minute time limit",
            "Each question is worth 30 points!"
          ]
        },
        {
          title: "Capture the Problem",
          description: "A strategic battle of speed and accuracy where every problem is a territory to conquer!",
          icon: Grid3x3Icon,
          details: [
            "Each group of teams gets 50 challenging problems arranged in a grid",
            "Teams 'capture' a problem when they solve it - nobody else can solve it!",
            'Teams get points for capturing problems!',
            "20 minute time limit",
            "500 points up for grabs!"
          ]
        },
        {
          title: "Head to Head Matchups ",
          description: "Team vs Team matchups, collaborative problem-solving!",
          icon: FaTeamspeak,
          details: [
            "Two teams get a set of 5 problems.",
            "Teams have to answer them in 2 minutes.",
            "Team with the most points wins.",
            "300 points up for grabs!"
          ]
        }
      ]
    } as GroupCompetition,
    regional: {
      title: "Regional Championships",
      icon: MapPin,
      color: "green" as const,
      description: "In-person competition featuring individual and team events",
      rounds: [
        {
          title: "Individual Round",
          description: "AIME-style individual competition with numerical answers",
          icon: Fingerprint,
          details: [
            "15 challenging problems",
            "1 hour time limit",
            "AIME-style format with numerical answers only",
            "Tiebreaker round (points not added to total score)",
            "Focus on problem-solving under time pressure"
          ]
        },
        {
          title: "Guts Round",
          description: "Fast-paced team problem solving inspired by HMMT",
          icon: Users,
          details: [
            "35 total problems divided into 7 sets of 5",
            "45 minute time limit",
            "Teams work on one set at a time"
          ]
        },
        {
          title: "Power Guts",
          description: "Advanced proof-based team challenge",
          icon: Award,
          details: [
            "8 proof-based problems total",
            "2 problems for each of 4 subject areas",
            "30 minute time limit",
            "Full solutions with proofs required"
          ]
        },
        {
          title: "MathRoyale",
          description: "Head-to-head buzzer round",
          icon: Clock,
          details: [
            "Buzzer round, live and fully timed",
            "Tests both speed and accuracy",
            "Similar to MathCounts Countdown or Quiz Bowls"
          ]
        }
      ],
      championships: [
        {
          title: "Ontario Championship",
          location: "Toronto, ON"
        },
        {
          title: "Western Championship",
          location: "Vancouver, BC"
        }
      ]
    } as unknown as Competition,
    national: {
      title: "National Championships",
      icon: Trophy,
      description: "Details coming soon!"
    }
  }

  const currentCompetition = competitions[activeTab]

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600">
              Tournament Format
            </h1>
            <div className="h-1 w-64 bg-red-500 rounded-full my-2"></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {Object.entries(competitions).map(([key, comp]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as TabType)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === key
                  ? activeTab === 'regional'
                    ? 'bg-green-700 text-white'
                    : 'bg-red-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-red-50'
                }`}
            >
              {comp.title}
            </button>
          ))}
        </div>

        {/* Current Competition Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className={`${activeTab === 'regional' ? 'bg-green-600' : 'bg-red-600'} p-6 text-white`}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {currentCompetition.title}
                </h2>
                <div className="mt-4 md:mt-0 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                  {activeTab === 'group' ? 'Online' : activeTab === 'regional' ? 'Single Elimination' : 'Championship'}
                </div>
              </div>

              {/* Competition Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-white/80" />
                  <span className="text-white/90">
                    {activeTab === 'group'
                      ? 'Dec 17, 2025'
                      : activeTab === 'regional'
                        ? 'Jan 18-19, 2026'
                        : 'TBD'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-white/80" />
                  <span className="text-white/90">
                    {activeTab === 'group'
                      ? '32 Teams (16 per conference)'
                      : activeTab === 'regional'
                        ? '12 Teams (6 per conference)'
                        : '6 Finalist Teams'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-white/80" />
                  <span className="text-white/90">
                    {activeTab === 'group'
                      ? 'Free to Participate'
                      : activeTab === 'regional'
                        ? 'Qualification Required'
                        : 'Invitation Only'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">{currentCompetition.description}</p>

            {/* Key Details Section */}
            {currentCompetition.details && currentCompetition.details.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-red-500 rounded-full mr-2"></span>
                  Key Details
                </h3>
                <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                  {currentCompetition.details?.map((detail: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'regional' && currentCompetition.championships && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Regional Championships</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {currentCompetition.championships.map((championship: Championship, index: number) => (
                    <motion.div
                      key={championship.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{championship.title}</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        {championship.location}
                      </div>
                      {championship.details && championship.details.length > 0 && (
                        <div className="space-y-2">
                          {championship.details.map((detail: string, i: number) => (
                            <div key={i} className="flex items-start">
                              <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Rounds Section */}
            {activeTab === 'group' && 'rounds' in currentCompetition && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-red-500 rounded-full mr-2"></span>
                  Rounds
                </h3>
                <div className="space-y-6">
                  {currentCompetition.rounds?.map((round, index) => (
                    <motion.div
                      key={round.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-white/20 p-3 rounded-xl">
                          {typeof round.icon === 'function' ?
                            <round.icon className="h-5 w-5 text-red-600" /> :
                            <round.icon className="h-5 w-5 text-red-600" />
                          }
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {round.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{round.description}</p>
                      <ul className="space-y-2">
                        {round.details.map((detail, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Regional Rounds Section */}
            {activeTab === 'regional' && 'rounds' in currentCompetition && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-green-500 rounded-full mr-2"></span>
                  Competition Rounds
                </h3>
                <div className="space-y-6">
                  {currentCompetition.rounds?.map((round, index) => (
                    <motion.div
                      key={round.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-white/20 p-3 rounded-xl">
                          {typeof round.icon === 'function' ?
                            <round.icon className="h-5 w-5 text-green-600" /> :
                            <round.icon className="h-5 w-5 text-green-600" />
                          }
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {round.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{round.description}</p>
                      <ul className="space-y-2">
                        {round.details.map((detail, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <ChevronRight className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
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