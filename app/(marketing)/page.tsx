'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, Calendar, Award, CheckCircle, Medal } from 'lucide-react'
import Link from 'next/link'
import { SEASON_STAGES, PRIZE_TIERS, REGISTRATION_DEADLINES } from '@/lib/content/season'
import { StageBar } from '@/components/ui/StageBar'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <section className="relative bg-grid-blueprint overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 mb-6"
            >
              <p className="text-xs font-semibold text-graphite-600 tracking-wide">In partnership with</p>
              <img
                src="https://www2.cms.math.ca/Events/Winter20/wp-content/uploads/2018/08/Wordmark-Bilingual-Colour.png"
                alt="Canadian Mathematical Society"
                width={200}
                height={36}
                decoding="async"
                className="h-9 w-auto object-contain"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-graphite-900 leading-[1.05] mb-3"
            >
              Canada&apos;s premier{' '}
              <span className="text-redpen-600">math tournament</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-graphite-600 max-w-2xl mx-auto leading-relaxed"
            >
              A free, team-based tournament for high schools across Canada — an online
              Group Stage, in-person Regional Championships, and a National final.
              Four round formats. One school team. Zero entry fee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Link
                href="/register"
                className="btn-press rounded-full inline-flex items-center gap-2 bg-redpen-600 text-white px-8 py-4 text-base font-semibold shadow-red-glow hover:bg-redpen-700"
              >
                Register your team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/format"
                className="btn-press rounded-full inline-flex items-center gap-2 bg-white text-redpen-600 border-2 border-redpen-100 px-8 py-4 text-base font-semibold hover:border-redpen-300 hover:bg-redpen-50"
              >
                See the format
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tournament Structure Section */}
      <section className="py-24 bg-grid-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-graphite-900"
            >
              Three stages. One champion.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-graphite-600 max-w-2xl mx-auto mt-4"
            >
              A progressive tournament with three distinct levels of achievement.
            </motion.p>
          </div>

          {/* Bar Chart Visualization */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-center gap-6 md:gap-10 h-[300px] mb-16">
              <StageBar
                icon={Users}
                title="Group Stage"
                date={SEASON_STAGES.groupStage.displayDate}
                stat="200+"
                statLabel="Participants"
                heightPx={180}
                gradient="from-redpen-600 to-redpen-400"
              />
              <StageBar
                icon={Trophy}
                title="Regionals"
                date={SEASON_STAGES.regionals.displayDate}
                stat="12"
                statLabel="Teams"
                heightPx={220}
                gradient="from-redpen-700 to-redpen-500"
                delay={0.15}
              />
              <StageBar
                icon={Award}
                title="Nationals"
                date={SEASON_STAGES.nationals.displayDate}
                stat="6"
                statLabel="Finalists"
                heightPx={260}
                gradient="from-redpen-900 to-redpen-700"
                delay={0.3}
              />
            </div>
          </div>

          {/* Stage Details */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
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
            ].map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-paper rounded-3xl shadow-soft p-6 hover:shadow-soft-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-redpen-50 rounded-2xl flex items-center justify-center mb-4">
                  <stage.icon className="h-6 w-6 text-redpen-600" />
                </div>
                <h3 className="text-lg font-bold text-graphite-900">{stage.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {stage.tags.map((tag) => (
                    <span key={tag} className="stamp-label">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-graphite-600">{stage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced Section */}
      <section className="py-16 bg-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-graphite-900 mb-4"
            >
              How it <span className="text-redpen-600">works</span>
            </motion.h2>
            <motion.p
              className="text-lg text-graphite-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Free, online, and open to every high school in Canada.
            </motion.p>
          </div>

          <div className="bg-paper rounded-3xl shadow-soft p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="stamp-label">Free</span>
              <span className="stamp-label">Online</span>
              <span className="text-sm text-graphite-400">Registration open</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Team formation",
                  icon: Users,
                  details: [
                    "5 students per team, from the same school",
                    "No registration fee",
                    "Open to all high school students"
                  ]
                },
                {
                  title: "Registration process",
                  icon: CheckCircle,
                  details: [
                    "Fill out the online registration form",
                    "Designate a team captain",
                    "Receive a confirmation email once approved"
                  ]
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-redpen-50 rounded-xl">
                      <item.icon className="h-5 w-5 text-redpen-600" />
                    </div>
                    <h3 className="text-base font-bold text-graphite-900">{item.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {item.details.map((detail, j) => (
                      <li key={j} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-redpen-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-graphite-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-graphite-900 mb-4"
            >
              Win real prizes.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-graphite-600 max-w-2xl mx-auto"
            >
              Compete for cash prizes, scholarships, and national recognition.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRIZE_TIERS.map((tier, index) => {
              const icon = [Trophy, Award, Medal][index] ?? Medal
              const Icon = icon
              return (
                <motion.div
                  key={tier.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-paper rounded-3xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all p-8 text-center"
                >
                  <div className="mx-auto flex items-center justify-center h-16 w-16 bg-redpen-50 rounded-2xl mb-4">
                    <Icon className="h-7 w-7 text-redpen-600" />
                  </div>
                  <h3 className="text-sm font-bold text-graphite-600 mb-1">{tier.title}</h3>
                  <p className="text-4xl font-extrabold text-redpen-600 mb-2">{tier.amount}</p>
                  <p className="text-graphite-600 text-sm">{tier.description}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-graphite-600 mb-4">Additional prizes include medals, certificates, and exclusive opportunities.</p>
            <Link
              href="/prizes"
              className="inline-flex items-center gap-2 text-sm font-bold text-redpen-600 hover:text-redpen-700 transition-colors"
            >
              View all prizes and awards
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Competition Timeline — scoreboard rhythm break */}
      <section className="py-24 bg-grid-blueprint-dense">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 text-3xl md:text-5xl font-bold text-graphite-900"
            >
              <Calendar className="h-8 w-8 md:h-10 md:w-10 text-redpen-600" />
              The 2025&ndash;26 competition timeline
            </motion.h2>
          </div>

          <div className="bg-paper rounded-3xl shadow-soft divide-y divide-redpen-50 overflow-hidden">
            {[
              {
                date: REGISTRATION_DEADLINES.early,
                title: 'Early Registration',
                description: 'Register your team ahead of the final deadline'
              },
              {
                date: REGISTRATION_DEADLINES.final,
                title: 'Final Registration Deadline',
                description: 'Last day to register your team for the Group Stage'
              },
              {
                date: SEASON_STAGES.groupStage.displayDate,
                title: SEASON_STAGES.groupStage.title,
                description: SEASON_STAGES.groupStage.description
              },
              {
                date: SEASON_STAGES.regionals.displayDate,
                title: SEASON_STAGES.regionals.title,
                description: SEASON_STAGES.regionals.description
              },
              {
                date: SEASON_STAGES.nationals.displayDate,
                title: SEASON_STAGES.nationals.title,
                description: SEASON_STAGES.nationals.description
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index }}
                className="flex items-center gap-6 px-6 py-5"
              >
                <div className="scoreboard-digit flex-shrink-0 w-10 h-10 rounded-full bg-redpen-50 flex items-center justify-center text-base font-bold text-redpen-600">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <div className="font-bold text-graphite-900 text-sm">{item.title}</div>
                    <p className="text-graphite-600 text-sm mt-0.5">{item.description}</p>
                  </div>
                  <div className="text-sm text-redpen-600 font-semibold whitespace-nowrap">{item.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-redpen-600 text-white py-20 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full animate-float" />
        <div className="absolute -left-10 bottom-0 w-40 h-40 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to test your skills?</h2>
            <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
              Join students from across Canada on the bracket. Free to enter, open to every high school.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="btn-press rounded-full inline-flex items-center justify-center gap-2 bg-white text-redpen-600 px-8 py-4 text-sm font-semibold hover:bg-redpen-50"
              >
                Register now
              </Link>
              <Link
                href="/contact"
                className="btn-press rounded-full inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white px-8 py-4 text-sm font-semibold hover:bg-white hover:text-redpen-600"
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