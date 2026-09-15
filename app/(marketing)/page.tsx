'use client'

/*
  THESIS: The homepage reads as the cover page of a real, official math
  competition booklet — a warm exam-paper ground and one institutional
  stamp-red, bound softly with rounded cards and diffuse shadow rather than
  hard black rule lines.
  OWN-WORLD: Warm exam-paper "ledger" ground, near-black ink, one
  institutional stamp-red reserved for official marks (seals, status
  stamps, the primary CTA, dollar figures). Alike stays the sitewide
  display serif; IBM Plex Mono carries numbers, codes, and tags, echoing
  typewritten exam forms. Structure comes from soft shadow-lifted rounded
  cards, not hard borders. Scantron-style bubble numerals mark real
  sequence (tournament stages, timeline) — never decorative section
  counters.
  STORY: A visitor understands this is a real, credible national math
  competition — not a marketing funnel — and registers their team via the
  stamped primary CTA.
  FIRST VIEWPORT: a CMS partnership credit line above the headline and a
  serif headline.
  FORM: "Softbound" — the exam-paper world on soft shadow and rounded
  corners, now the sitewide system (see DESIGN.md).
*/

import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, Calendar, Award, CheckCircle, Medal, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  SEASON_STAGES,
  PRIZE_TIERS,
  REGISTRATION_DEADLINES,
  isRegistrationOpen,
  getSeasonPhase,
} from '@/lib/content/season'

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

const HomePage = () => {
  const registrationOpen = isRegistrationOpen()
  const seasonPhase = getSeasonPhase()
  const seasonConcluded = seasonPhase === 'concluded'

  const stages: Array<{ icon: LucideIcon; title: string; description: string; tags: string[] }> = [
    {
      icon: Users,
      title: 'Group Stage',
      description: 'Go up against schools near you for a spot at regionals.',
      tags: ['Free', 'Online'],
    },
    {
      icon: Trophy,
      title: 'Regionals',
      description: 'Compete against the best in your region for a spot at nationals.',
      tags: ['Toronto', 'Vancouver'],
    },
    {
      icon: Award,
      title: 'Nationals',
      description: "The ultimate challenge with Canada's top math teams.",
      tags: ['Toronto'],
    },
  ]

  const timeline = [
    {
      date: REGISTRATION_DEADLINES.early,
      title: 'Early Registration',
      description: 'Register your team ahead of the final deadline',
    },
    {
      date: REGISTRATION_DEADLINES.final,
      title: 'Final Registration Deadline',
      description: 'Last day to register your team for the Group Stage',
    },
    {
      date: SEASON_STAGES.groupStage.displayDate,
      title: SEASON_STAGES.groupStage.title,
      description: SEASON_STAGES.groupStage.description,
    },
    {
      date: SEASON_STAGES.regionals.displayDate,
      title: SEASON_STAGES.regionals.title,
      description: SEASON_STAGES.regionals.description,
    },
    {
      date: SEASON_STAGES.nationals.displayDate,
      title: SEASON_STAGES.nationals.title,
      description: SEASON_STAGES.nationals.description,
    },
  ]

  return (
    <div className="min-h-screen bg-ledger">
      {/* Hero — cover page */}
      <section className="relative bg-ledger overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://www2.cms.math.ca/Events/Winter20/wp-content/uploads/2018/08/Wordmark-Bilingual-Colour.png"
                  alt="Canadian Mathematical Society"
                  width={72}
                  height={13}
                  decoding="async"
                  className="h-4 w-auto object-contain"
                />
                <span className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-500">
                  In partnership with the Canadian Mathematical Society
                </span>
              </div>
              <h1 className="font-sans text-4xl md:text-6xl text-ink-900 leading-[1.08] mb-5">
                Canada&apos;s premier math tournament.
              </h1>
              <p className="text-lg text-ink-700 max-w-xl leading-relaxed mb-8">
                A free, team-based tournament for high schools across Canada — an online
                Group Stage, in-person Regional Championships, and a National final. Four
                round formats. One school team. Zero entry fee.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <Link
                  href="/register"
                  className="btn-press inline-flex items-center gap-2 rounded-full shadow-stamp-glow bg-stamp-600 text-ledger px-6 py-3.5 text-sm font-mono font-semibold uppercase tracking-wide hover:bg-stamp-700"
                >
                  Register your team
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/format"
                  className="btn-press inline-flex items-center gap-2 rounded-full shadow-soft hover:shadow-soft-lg bg-ledger text-ink-900 px-6 py-3.5 text-sm font-mono font-semibold uppercase tracking-wide hover:bg-ledger-deep"
                >
                  See the format
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tournament structure */}
      <section className="py-20 bg-ledger-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-3xl md:text-4xl text-ink-900 mb-3"
          >
            Three stages. One champion.
          </motion.h2>
          <p className="text-ink-700 max-w-xl mb-12">
            A progressive tournament with three distinct levels of achievement.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-ledger rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BubbleNumeral n={i + 1} filled={i === 0} />
                  <stage.icon className="h-5 w-5 text-ink-700" />
                </div>
                <h3 className="font-sans text-lg text-ink-900 mb-2">{stage.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs uppercase tracking-wide rounded-full bg-ledger-deep px-2 py-0.5 text-ink-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink-700">{stage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-ledger">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-3xl md:text-4xl text-ink-900 mb-3"
          >
            How it works
          </motion.h2>
          <p className="text-ink-700 mb-10">Free, online, and open to every high school in Canada.</p>

          <div className="rounded-3xl shadow-soft p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-wide rounded-full bg-stamp-100 text-stamp-700 px-2 py-1">
                Free
              </span>
              <span className="font-mono text-xs uppercase tracking-wide rounded-full bg-stamp-100 text-stamp-700 px-2 py-1">
                Online
              </span>
              <span className="font-mono text-xs text-ink-500">
                {registrationOpen ? 'Registration open' : 'Registration opens for next season soon'}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-0 md:divide-x md:divide-ledger-line">
              {[
                {
                  title: 'Team formation',
                  icon: Users,
                  details: [
                    '5 students per team, from the same school',
                    'No registration fee',
                    'Open to all high school students',
                  ],
                },
                {
                  title: 'Registration process',
                  icon: CheckCircle,
                  details: [
                    'Fill out the online registration form',
                    'Designate a team captain',
                    'Receive a confirmation email once approved',
                  ],
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className={i === 1 ? 'md:pl-8' : ''}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="h-5 w-5 text-ink-700" />
                    <h3 className="font-sans text-base text-ink-900">{item.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {item.details.map((detail, j) => (
                      <li key={j} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-stamp-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-ink-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who's behind this */}
      <section className="py-12 bg-ledger">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl shadow-soft bg-ledger-deep/60 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-500 mb-1">Who&apos;s behind this</p>
              <p className="text-ink-700 text-sm max-w-md">
                Run in partnership with the Canadian Mathematical Society and organized by a small,
                named team — not an anonymous platform.
              </p>
            </div>
            <Link
              href="/team"
              className="btn-press inline-flex items-center gap-2 rounded-full shadow-soft hover:shadow-soft-lg bg-ledger text-ink-900 px-6 py-3 text-sm font-mono font-semibold uppercase tracking-wide hover:bg-ledger-deep flex-shrink-0"
            >
              Meet the organizers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-20 bg-ledger-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-3xl md:text-4xl text-ink-900 mb-3"
          >
            Win real prizes.
          </motion.h2>
          <p className="text-ink-700 mb-12">Compete for cash prizes, scholarships, and national recognition.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {PRIZE_TIERS.map((tier, index) => {
              const icon = [Trophy, Award, Medal][index] ?? Medal
              const Icon = icon
              return (
                <motion.div
                  key={tier.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-ledger rounded-2xl shadow-soft p-8 text-center"
                >
                  <Icon className="h-6 w-6 text-ink-700 mx-auto mb-4" />
                  <h3 className="font-mono text-xs uppercase tracking-wide text-ink-700 mb-2">{tier.title}</h3>
                  <p className="font-mono text-4xl font-semibold text-stamp-600 mb-2">{tier.amount}</p>
                  <p className="text-ink-700 text-sm">{tier.description}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-ink-700 mb-3">Additional prizes include medals, certificates, and exclusive opportunities.</p>
            <Link
              href="/prizes"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-stamp-600 hover:text-stamp-700"
            >
              View all prizes and awards
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-ledger">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="flex items-center gap-3 font-sans text-3xl md:text-4xl text-ink-900 mb-3">
              <Calendar className="h-7 w-7 text-stamp-600" />
              {seasonConcluded ? 'The 2025–26 season, in review' : 'The 2025–26 competition timeline'}
            </h2>
            {seasonConcluded && (
              <p className="font-mono text-xs uppercase tracking-wide text-ink-500">
                Season concluded &mdash; next season&apos;s dates will post here once they&apos;re set.
              </p>
            )}
          </motion.div>

          <div className="rounded-3xl shadow-soft divide-y divide-ledger-line">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * index }}
                className="flex items-center gap-5 px-5 py-4"
              >
                <BubbleNumeral n={index + 1} />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <div className="font-sans text-ink-900 text-sm">{item.title}</div>
                    <p className="text-ink-700 text-sm mt-0.5">{item.description}</p>
                  </div>
                  <div
                    className={`font-mono text-sm font-semibold whitespace-nowrap ${
                      seasonConcluded ? 'text-ink-500' : 'text-stamp-600'
                    }`}
                  >
                    {item.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-stamp-600 text-ledger py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-sans text-3xl md:text-5xl mb-6">Ready to test your skills?</h2>
            <p className="text-lg text-ledger/90 mb-10 max-w-xl mx-auto">
              Join students from across Canada on the bracket. Free to enter, open to every high school.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full shadow-soft-lg bg-ledger text-stamp-600 px-8 py-3.5 text-sm font-mono font-semibold uppercase tracking-wide hover:bg-ledger-deep"
              >
                Register now
              </Link>
              <Link
                href="/contact"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full border-2 border-ledger text-ledger px-8 py-3.5 text-sm font-mono font-semibold uppercase tracking-wide hover:bg-ledger hover:text-stamp-600"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
