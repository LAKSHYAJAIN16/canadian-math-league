'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Award, ArrowRight, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { SEASON_STAGES, REGISTRATION_DEADLINES } from '@/lib/content/season'
import { StageBar } from '@/components/ui/StageBar'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="relative bg-grid-blueprint overflow-hidden py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-blueprint-200">Canadian Math League</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            How the <span className="text-white">competition</span> works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blueprint-100 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            A three-stage tournament that brings together the brightest mathematical minds from across Canada.
            Here&apos;s how you can participate and progress through each stage.
          </motion.p>
        </div>
      </section>

      {/* Competition Stages */}
      <section className="py-24 bg-grid-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-16">
            <StageBar
              icon={Users}
              title="Group Stage"
              date={SEASON_STAGES.groupStage.displayDate}
              stat="200+"
              statLabel="Participants"
              heightPx={180}
              gradient="from-blueprint-600 to-blueprint-400"
            />
            <StageBar
              icon={Trophy}
              title="Regionals"
              date={SEASON_STAGES.regionals.displayDate}
              stat="12"
              statLabel="Teams"
              heightPx={220}
              gradient="from-blueprint-700 to-blueprint-500"
              delay={0.15}
            />
            <StageBar
              icon={Award}
              title="Nationals"
              date={SEASON_STAGES.nationals.displayDate}
              stat="6"
              statLabel="Finalists"
              heightPx={260}
              gradient="from-blueprint-900 to-blueprint-700"
              delay={0.3}
            />
          </div>

          {/* Stage Details */}
          <div className="grid md:grid-cols-3 gap-px bg-graphite-900 border-2 border-graphite-900 rounded-xl mt-24">
            {[
              {
                icon: Users,
                title: 'Group Stage',
                description:
                  'The competition begins with the Group Stage, where schools from across Canada compete in their local regions. Teams of 4-6 students work together to solve challenging math problems.',
                date: SEASON_STAGES.groupStage.displayDate,
                location: 'Online',
                duration: '2 hours',
                prizes: 'Top teams advance to Regionals',
                tags: ['Free', 'Online'],
              },
              {
                icon: Trophy,
                title: 'Regionals',
                description:
                  'Top-performing teams from the Group Stage advance to Regionals, where they compete against other top teams in their province. The competition intensifies with more complex problems and team-based challenges.',
                date: SEASON_STAGES.regionals.displayDate,
                location: 'Toronto & Vancouver',
                duration: '3 hours',
                prizes: 'Trophies & National Qualification',
                tags: ['Top 10% from Group Stage'],
              },
              {
                icon: Award,
                title: 'Nationals',
                description:
                  'The top teams from each region compete in the National Finals. This is the ultimate test of mathematical ability, teamwork, and problem-solving skills. The winning team is crowned Canadian Math League Champions.',
                date: SEASON_STAGES.nationals.displayDate,
                location: 'Toronto',
                duration: '4 hours',
                prizes: 'Scholarships & National Recognition',
                tags: ['All Expenses Paid'],
              },
            ].map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-paper p-6"
              >
                <div className="w-11 h-11 border-2 border-graphite-900 rounded-xl flex items-center justify-center mb-4">
                  <stage.icon className="h-5 w-5 text-redpen-600" />
                </div>
                <h3 className="text-lg font-bold text-graphite-900 uppercase tracking-wide mb-2">{stage.title}</h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {stage.tags.map((tag) => (
                    <span key={tag} className="stamp-label border-graphite-400 text-graphite-600 !rotate-0">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-graphite-600 text-sm mb-4">{stage.description}</p>

                <div className="space-y-2 text-sm text-graphite-600 border-t border-paper-line pt-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-redpen-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-graphite-900">Date:</span> {stage.date}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-redpen-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      <span className="font-semibold text-graphite-900">Location:</span> {stage.location}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-redpen-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-graphite-900">Duration:</span> {stage.duration}
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="font-semibold text-graphite-900">Prizes:</span> {stage.prizes}
                  </div>
                </div>

                <Link href="/register" className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-redpen-600 hover:text-redpen-700 group">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-graphite-900 mb-4">Ready to compete?</h3>
            <p className="text-graphite-600 mb-6 max-w-xl mx-auto">
              Join hundreds of students across Canada in this mathematical tournament. Test your skills, meet like-minded peers, and compete for national recognition.
            </p>
            <Link
              href="/register"
              className="btn-press rounded-lg inline-flex items-center justify-center gap-2 bg-redpen-600 text-white px-8 py-4 text-sm font-bold tracking-wider uppercase shadow-stamp hover:bg-redpen-700"
            >
              Register your team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-graphite-500">Registration closes {REGISTRATION_DEADLINES.final}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
