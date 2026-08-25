'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Award, ArrowRight, Calendar, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import { SEASON_STAGES, REGISTRATION_DEADLINES } from '@/lib/content/season'

function BubbleNumeral({ n, filled }: { n: number; filled?: boolean }) {
  return (
    <span
      className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold ${
        filled ? 'border-stamp-600 bg-stamp-600 text-ledger' : 'border-ink-900 text-ink-900'
      }`}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}

export default function HowItWorksPage() {
  const overview = [
    { icon: Users, title: 'Group Stage', date: SEASON_STAGES.groupStage.displayDate },
    { icon: Trophy, title: 'Regionals', date: SEASON_STAGES.regionals.displayDate },
    { icon: Award, title: 'Nationals', date: SEASON_STAGES.nationals.displayDate },
  ]

  const stages = [
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
  ]

  return (
    <div className="min-h-screen bg-ledger">
      {/* Hero Section */}
      <section className="relative bg-ledger overflow-hidden border-b-4 border-ink-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-4xl md:text-6xl text-ink-900 leading-tight"
          >
            How the <span className="text-stamp-600">competition</span> works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-700 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            A three-stage tournament that brings together the brightest mathematical minds from across Canada.
            Here&apos;s how you can participate and progress through each stage.
          </motion.p>
        </div>
      </section>

      {/* Competition Stages */}
      <section className="py-20 bg-ledger-deep border-b border-ledger-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl md:text-4xl text-ink-900 mb-3">Three stages. One champion.</h2>
          <p className="text-ink-700 max-w-xl mb-12">A progressive tournament with three distinct levels of achievement.</p>

          <div className="grid md:grid-cols-3 gap-px bg-ink-900 border border-ink-900">
            {overview.map((stage, i) => (
              <div key={stage.title} className="bg-ledger p-6 flex items-center gap-3">
                <BubbleNumeral n={i + 1} filled={i === 0} />
                <div>
                  <stage.icon className="h-5 w-5 text-ink-700 mb-1" />
                  <h3 className="font-sans text-lg text-ink-900">{stage.title}</h3>
                  <p className="text-sm text-ink-700">{stage.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stage Details */}
      <section className="py-20 bg-ledger">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-ink-900 border border-ink-900">
            {stages.map((stage) => (
              <div key={stage.title} className="bg-ledger p-6 flex flex-col">
                <stage.icon className="h-6 w-6 text-stamp-600 mb-4" />
                <h3 className="font-sans text-lg text-ink-900 mb-2">{stage.title}</h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {stage.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[0.625rem] uppercase tracking-wide border border-ink-900 px-2 py-0.5 text-ink-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-ink-700 text-sm mb-4">{stage.description}</p>

                <div className="space-y-2 text-sm text-ink-700 border-t border-ledger-line pt-4 mt-auto">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-stamp-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-ink-900">Date:</span> {stage.date}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-stamp-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-ink-900">Location:</span> {stage.location}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-stamp-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-ink-900">Duration:</span> {stage.duration}
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="font-semibold text-ink-900">Prizes:</span> {stage.prizes}
                  </div>
                </div>

                <Link href="/register" className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-stamp-600 hover:text-stamp-700 group">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="font-sans text-2xl text-ink-900 mb-4">Ready to compete?</h3>
            <p className="text-ink-700 mb-6 max-w-xl mx-auto">
              Join hundreds of students across Canada in this mathematical tournament. Test your skills, meet like-minded peers, and compete for national recognition.
            </p>
            <Link
              href="/register"
              className="btn-press inline-flex items-center justify-center gap-2 bg-stamp-600 text-ledger px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide hover:bg-stamp-700"
            >
              Register your team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-ink-500">Registration closes {REGISTRATION_DEADLINES.final}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
