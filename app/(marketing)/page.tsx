'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, BookOpen, Target, Calendar, Award, Clock, CheckCircle, MessageCircle, Medal } from 'lucide-react'
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

        {/* Season strip */}
        <div className="relative border-t border-redpen-100 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="stamp-label">Group Stage</span>
            <p className="text-sm text-graphite-600">
              {SEASON_STAGES.groupStage.displayDate} &middot; {SEASON_STAGES.groupStage.location} &middot; Free
            </p>
          </div>
        </div>
      </section>

      {/* Become a Sponsor */}
      <section className="py-4 bg-paper border-b border-paper-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <p className="text-sm font-medium text-graphite-600">
            Interested in supporting Canadian math education?
          </p>
          <Link
            href="/about/sponsors"
            className="text-sm font-semibold text-redpen-600 hover:text-redpen-700 transition-colors"
          >
            Become a sponsor &rarr;
          </Link>
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
                statLabel="Particpants"
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
          </div>

          {/* Stage Details */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: Users,
                title: 'Group Stage',
                description: 'Go up against schools near you for a spot at regionals.',
                stats: '200+ Participants',
                tags: ['Free', 'Online'],
              },
              {
                icon: Trophy,
                title: 'Regionals',
                description: 'Compete against the best in your region for a spot at nationals.',
                stats: '12 Teams',
                tags: ['Toronto', 'Vancouver'],
              },
              {
                icon: Award,
                title: 'Nationals',
                description: "The ultimate challenge with Canada's top math teams.",
                stats: '6 Finalists',
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
                <p className="text-graphite-600 mb-3">{stage.description}</p>
                <p className="text-xs font-bold text-blueprint-700 uppercase tracking-wide">{stage.stats}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced Section */}
      <section className="py-16 bg-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-graphite-900 mb-4"
            >
              How it <span className="text-redpen-600">works</span>
            </motion.div>
            <motion.p
              className="text-lg text-graphite-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Your path onto the tournament bracket, in three steps.
            </motion.p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-3 mb-12">
            {[
              { id: 'register', label: 'Register', icon: Users },
              { id: 'prepare', label: 'Prepare', icon: BookOpen },
              { id: 'compete', label: 'Compete', icon: Trophy }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                  tab.id === 'register'
                    ? 'bg-redpen-600 text-white shadow-red-glow'
                    : 'bg-redpen-50 text-graphite-700 hover:bg-redpen-100'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Register Tab Content */}
          <div className="bg-paper rounded-3xl shadow-soft mb-12">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-redpen-600 flex items-center justify-center flex-shrink-0">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-graphite-900">Register Your Team</h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="stamp-label">Free</span>
                    <span className="stamp-label">Online</span>
                    <span className="text-sm text-graphite-500">Registration open</span>
                  </div>
                </div>
              </div>

              <p className="text-graphite-700 mb-6">Join the competition by registering your school team through our simple online process.</p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Team Formation",
                    description: "Create a team of 4-6 students from the same school",
                    icon: Users,
                    details: [
                      "4-6 students per team",
                      "All members must attend the same school",
                      "No registration fee required",
                      "Open to all high school students"
                    ]
                  },
                  {
                    title: "Registration Process",
                    description: "Simple steps to get your team registered",
                    icon: CheckCircle,
                    details: [
                      "Fill out the online registration form",
                      "Designate a team captain",
                      "Provide school verification",
                      "Receive confirmation email"
                    ]
                  }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="p-6 bg-redpen-50/60 rounded-2xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-white rounded-xl shadow-soft">
                        <item.icon className="h-5 w-5 text-redpen-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-graphite-900">{item.title}</h3>
                        <p className="text-graphite-600 text-sm mt-1">{item.description}</p>
                        <ul className="mt-3 space-y-2">
                          {item.details.map((detail, j) => (
                            <li key={j} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-redpen-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-graphite-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-redpen-50 rounded-2xl">
                <h3 className="text-sm font-bold text-redpen-700 uppercase tracking-wide mb-3">Important Dates</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-redpen-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-graphite-700"><span className="font-semibold text-graphite-900">Early Registration:</span> {REGISTRATION_DEADLINES.early}</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-redpen-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-graphite-700"><span className="font-semibold text-graphite-900">Final Registration Deadline:</span> {REGISTRATION_DEADLINES.final}</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-redpen-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-graphite-700"><span className="font-semibold text-graphite-900">Competition Day:</span> {SEASON_STAGES.groupStage.displayDate}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/register"
                  className="btn-press rounded-full inline-flex items-center justify-center gap-2 bg-redpen-600 text-white px-8 py-4 text-sm font-semibold shadow-red-glow hover:bg-redpen-700"
                >
                  Register your team now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
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
                  <h3 className="text-sm font-bold text-graphite-600 uppercase tracking-wide mb-1">{tier.title}</h3>
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
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-redpen-600 hover:text-redpen-700 transition-colors"
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
            <div className="flex items-center justify-center gap-3 mb-3">
              <Calendar className="h-6 w-6 text-redpen-600" />
              <span className="text-xs tracking-[0.2em] uppercase text-graphite-600">2025&ndash;26 Season</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-graphite-900"
            >
              The competition timeline
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

          <div className="mt-12 text-center">
            <p className="text-graphite-600 mb-5">Don&apos;t miss your chance to compete with the best young mathematicians in Canada.</p>
            <Link
              href="/register"
              className="btn-press rounded-full inline-flex items-center justify-center gap-2 bg-redpen-600 text-white px-8 py-4 text-sm font-semibold shadow-red-glow hover:bg-redpen-700"
            >
              Register now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block relative"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-graphite-900 mb-6">
                Community is everything.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-graphite-600 max-w-2xl mx-auto"
            >
              Join a network of passionate math enthusiasts and grow together
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Study Groups',
                description: 'Connect with peers, form study groups, and tackle challenging problems together in a supportive environment.'
              },
              {
                icon: MessageCircle,
                title: 'Discussion Forums',
                description: 'Engage in meaningful discussions, ask questions, and share insights with our active community.'
              },
              {
                icon: Users,
                title: 'Mentorship',
                description: 'Learn from experienced competitors and alumni who can guide you on your mathematical journey.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-paper p-8 rounded-3xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-redpen-50 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-redpen-600" />
                </div>
                <h3 className="text-lg font-bold text-graphite-900 mb-2">{feature.title}</h3>
                <p className="text-graphite-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/community"
              className="btn-press rounded-full inline-flex items-center justify-center gap-2 bg-redpen-600 text-white px-8 py-4 text-sm font-semibold shadow-red-glow hover:bg-redpen-700"
            >
              Join our community
              <Users className="h-4 w-4" />
            </Link>
          </motion.div>
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