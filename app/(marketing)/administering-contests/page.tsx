'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FileText, User, Users as Team, Swords, ClipboardList, Settings, Clock } from 'lucide-react'

const IndividualRoundContent = () => (
  <div className="space-y-6 w-full">
    <h2 className="font-sans text-2xl text-ink-900">Individual Round</h2>

    {/* Requirements Section */}
    <div className="border-2 border-stamp-600 bg-stamp-100 p-4">
      <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-700 mb-3">Details</h3>
      <div className="flex flex-wrap gap-6 text-sm text-ink-700">
        <span className="flex items-center">
          <Clock className="h-4 w-4 text-stamp-600 mr-1.5 flex-shrink-0" />
          45 minutes
        </span>
        <span className="flex items-center">
          <FileText className="h-4 w-4 text-stamp-600 mr-1.5 flex-shrink-0" />
          20 questions
        </span>
        <span className="flex items-center">
          <svg className="h-4 w-4 text-stamp-600 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          No calculator
        </span>
        <span className="flex items-center">
          <svg className="h-4 w-4 text-stamp-600 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          One person
        </span>
      </div>
    </div>

    <p className="text-ink-700">
      After the timer hits zero, a new screen will open up on each contestant&apos;s screen with the rules for the individual round
    </p>
    <div>
      <img src="/pages/rules_ind.png" width={600} className="ml-auto mr-auto mb-0 mt-0 border-2 border-ink-900" alt="Teacher login page" />
      <p className="text-center text-xs mt-1 text-ink-500">The rules that are on each contestant&apos;s screen.</p>
    </div>
    <p className="text-ink-700">
      We advise going through the rules with all of the participants, but they&apos;re pretty self-explanatory.
    </p>
    <p className="text-ink-700">
      Eventually, the rules page will also close and the contest interface will open.
    </p>
    <div>
      <img src="/pages/indiv.png" width={600} className="ml-auto mr-auto mb-0 mt-0 border-2 border-ink-900" alt="Teacher login page" />
      <p className="text-center text-xs mt-1 text-ink-500">The contest interface for the individual round.</p>
    </div>
    <p className="text-ink-700">
      There will be a submit button on the last question, but if the user fails to submit, the test will auto-submit once the timer hits zero.
    </p>
    <p className="text-ink-700">
      The user will then be redirected to the pages for the subsequent rounds.
    </p>

    {/* FAQ Section */}
    <div className="border-2 border-stamp-600 bg-stamp-100 p-6 mt-8">
      <h3 className="font-sans text-xl text-ink-900 mb-4">Frequently Asked Questions</h3>
      <div className="space-y-4">
        <div className="border-2 border-ink-900 bg-ledger">
          <details className="group">
            <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-ledger-deep">
              <h4 className="font-sans text-ink-900">If a student disconnects during the contest, will they lose their progress?</h4>
              <svg className="w-5 h-5 text-stamp-600 transform group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="p-4 pt-2 text-ink-700 border-t border-ledger-line">
              <p>No. If a student gets disconnected during the contest, they can simply log back in using their unique code. The system will save their progress, and they can continue from where they left off. The timer will continue running during the disconnection, so we recommend ensuring a stable internet connection before starting.</p>
            </div>
          </details>
        </div>

        <div className="border-2 border-ink-900 bg-ledger">
          <details className="group">
            <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-ledger-deep">
              <h4 className="font-sans text-ink-900">What if our internet goes out?</h4>
              <svg className="w-5 h-5 text-stamp-600 transform group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="p-4 pt-2 text-ink-700 border-t border-ledger-line">
              <p>If your internet connection is lost, don&apos;t worry! The system automatically saves all progress. Once your internet is restored, students can log back in and continue from where they left off. Please note that the contest timer will continue running during the internet outage, so we strongly recommend having a backup internet connection available if possible.</p>
            </div>
          </details>
        </div>

        <div className="border-2 border-ink-900 bg-ledger">
          <details className="group">
            <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-ledger-deep">
              <h4 className="font-sans text-ink-900">The questions aren&apos;t loading</h4>
              <svg className="w-5 h-5 text-stamp-600 transform group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="p-4 pt-2 text-ink-700 border-t border-ledger-line space-y-2">
              <p className="pt-2">Please contact support immediately at <a href="mailto:support@canadianmathleague.com" className="text-stamp-600 hover:underline">support@canadianmathleague.com</a> with details about the issue.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
)

const timelineSections = [
  {
    id: 'pre-contest',
    title: 'Pre-Contest',
    events: [
      { id: 'registering', title: 'Registering', icon: <ClipboardList className="h-5 w-5" /> },
    ]
  },
  {
    id: 'contest-day',
    title: 'Contest - December 17th',
    events: [
      { id: 'setup', title: 'Setup', icon: <Settings className="h-5 w-5" /> },
      { id: 'individual', title: 'Individual Round', icon: <User className="h-5 w-5" /> },
      { id: 'team', title: 'Team Round', icon: <Team className="h-5 w-5" /> },
      { id: 'head-to-head', title: 'Head to Head', icon: <Swords className="h-5 w-5" /> },
    ]
  }
]

export default function AdministeringContestsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>("pre-contest-registering")

  const renderContent = () => {
    if (!selectedEvent) {
      return (
        <div className="text-center py-12 w-full">
          <div className="mx-auto w-16 h-16 border-2 border-ink-900 bg-ledger rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-ink-700" />
          </div>
          <h3 className="font-sans text-lg text-ink-900">Select an event</h3>
          <p className="mt-1 text-ink-700">Click on any timeline event to view details</p>
        </div>
      )
    }

    switch (selectedEvent) {
      case 'contest-day-setup':
        return (
          <div className="p-6 text-ink-700 space-y-6 w-full">
            <h2 className="font-sans text-2xl text-ink-900">Setup</h2>

            {/* Requirements Section */}
            <div className="border-2 border-stamp-600 bg-stamp-100 p-4 mb-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-700 mb-3">Requirements</h3>
              <div className="flex flex-wrap gap-6 text-sm text-ink-700">
                <span className="flex items-center">
                  <svg className="h-4 w-4 text-stamp-600 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  1 Chromebook per participant
                </span>
                <span className="flex items-center">
                  <FileText className="h-4 w-4 text-stamp-600 mr-1.5 flex-shrink-0" />
                  Scrap paper
                </span>
                <span className="flex items-center">
                  <svg className="h-4 w-4 text-stamp-600 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Stable internet
                </span>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4">
              {/* Teacher Login Section */}
              <details className="group border-2 border-ink-900 bg-ledger" open>
                <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-ledger-deep">
                  <h3 className="font-sans text-lg text-ink-900">Teacher Login</h3>
                  <svg className="w-5 h-5 text-ink-700 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-6 space-y-6 border-t border-ledger-line">
                  <p>Before the contest, you should have received an email with your login details.</p>

                  <div className="border-2 border-stamp-600 bg-stamp-100 p-4">
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-700 mb-2">Can&apos;t find your login email?</h4>
                    <ol className="list-decimal list-inside space-y-1 text-ink-700 text-sm">
                      <li>Check your spam or junk folder</li>
                      <li>Search your inbox for emails from Canadian Math League</li>
                      <li>Wait a few hours and check again (emails may be delayed)</li>
                      <li>If you still can&apos;t find it, please contact <a href="mailto:support@canadianmathleague.com" className="text-stamp-600 hover:underline">support@canadianmathleague.com</a></li>
                    </ol>
                  </div>

                  <p>Login details will be used to sign you in so you can administer the contest and view your students&apos; results.</p>
                  <p>After obtaining your details, navigate <a href="/platform/login" target="_blank" className="text-stamp-600 hover:underline">here</a> and then after entering your details, sign in.</p>

                  <div className="space-y-4">
                    <div>
                      <img src="/pages/teacher_login.png" width={600} className="ml-auto mr-auto mb-0 mt-0 border-2 border-ink-900" alt="Teacher login page" />
                      <p className="text-center text-xs mt-1 text-ink-500">Enter your login details on the login page.</p>
                    </div>

                    <p>After logging in, you will be redirected to your contest dashboard. Here, you will be able to view your teams&apos; details and edit them if any change is required.</p>

                    <div>
                      <img src="/pages/teacher_dashboard.png" width={600} className="ml-auto mr-auto mb-0 mt-0 border-2 border-ink-900" alt="Teacher dashboard" />
                      <p className="text-center text-xs mt-1 text-ink-500">You will be able to edit your team details in the dashboard.</p>
                    </div>

                    <p>Once logged in, you will be able to access the results as well as request certificates after the contest.</p>
                  </div>
                </div>
              </details>

              {/* Student Setup Section */}
              <details className="group border-2 border-ink-900 bg-ledger">
                <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-ledger-deep">
                  <h3 className="font-sans text-lg text-ink-900">Student Setup</h3>
                  <svg className="w-5 h-5 text-ink-700 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-6 space-y-4 border-t border-ledger-line">
                  <p>Once logged in, you&apos;ll see a tab for <strong>Student Codes</strong>. These are the unique codes that students will use to access the contest on their computers.</p>

                  <div>
                    <img src="/pages/teacher_std.png" width={600} className="ml-auto mr-auto mb-0 mt-0 border-2 border-ink-900" alt="Student details" />
                    <p className="text-center text-xs mt-1 text-ink-500">You will be able to see the join codes for your participants.</p>
                  </div>
                  <div className="border-2 border-stamp-600 bg-stamp-100 p-4">
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-stamp-700 mb-2">How Students Get Their Codes</h4>
                    <ul className="list-disc list-inside space-y-1 text-ink-700 text-sm">
                      <li>Codes will be automatically emailed to each student before the contest.</li>
                      <li>If a student doesn&apos;t receive their code, you can find and share it with them directly from your dashboard.</li>
                      <li>If there is a student without a code or there are two codes that are identical <b>please contact us immediately</b></li>
                    </ul>
                  </div>

                  <p className="text-sm text-ink-700">
                    Once receiving their code, the student should go to {" "}
                    <span className="inline-flex items-center">
                      <a href="/join" className="text-stamp-600"> https://www.canadianmathleague.com/join</a>
                    </span>
                    {" "} and enter their code.
                  </p>
                  <div>
                    <img src="/pages/join.png" width={600} className="ml-auto mr-auto mb-0 mt-0 border-2 border-ink-900" alt="Student details" />
                    <p className="text-center text-xs mt-1 text-ink-500">The student should enter their code on the join page.</p>
                  </div>
                  <p className="text-sm text-ink-700">
                    After entering their code, they will be redirected to their competition portal.
                  </p>
                  <div>
                    <img src="/pages/student.png" width={600} className="ml-auto mr-auto mb-0 mt-0 border-2 border-ink-900" alt="Student details" />
                    <p className="text-center text-xs mt-1 text-ink-500">The student will be redirected to their student portal.</p>
                  </div>
                  <p>
                    After this, they should be all set! Make sure that every student is logged in before the competition starts.
                  </p>

                </div>
              </details>

              <div className="border-2 border-stamp-600 bg-stamp-100 p-6">
                <h3 className="font-sans text-lg text-ink-900 mb-4">Checklist</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 accent-stamp-600 mt-0.5" />
                    <span className="ml-3 text-ink-700">Understand Contest Requirements</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 accent-stamp-600 mt-0.5" />
                    <span className="ml-3 text-ink-700">Login and verify all dashboard details</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 accent-stamp-600 mt-0.5" />
                    <span className="ml-3 text-ink-700">Distribute unique student codes to each participant</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 accent-stamp-600 mt-0.5" />
                    <span className="ml-3 text-ink-700">Make sure each participant is logged in before the contest starts.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'pre-contest-registering':
        return (
          <div className="p-6 text-ink-700 w-full space-y-4">
            <h2 className="font-sans text-2xl text-ink-900">Registering</h2>
            <p>
              Fill out the registration form <a href="/register" target="_blank" className="text-stamp-600 hover:underline">here</a>. Our team will review your application and get back to you with further  details.
            </p>
            <p>
              You will receive a confirmation email within 48 hours. This email will contain your <b>login details</b>.
            </p>
            <p>
              These login details will be used to sign you in so you can deliver the contest.
            </p>
            <p>Once we confirm your registration, inform your students! The more time they have to prepare, the better they&apos;ll do!</p>
            <div className="border-2 border-stamp-600 bg-stamp-100 p-6 !mt-8">
              <h3 className="font-sans text-lg text-ink-900 mb-4">Checklist</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <input type="checkbox" className="h-5 w-5 accent-stamp-600 mt-0.5" />
                  <span className="ml-3 text-ink-700">Submit your registration form</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="h-5 w-5 accent-stamp-600 mt-0.5" />
                  <span className="ml-3 text-ink-700">Receive confirmation email with additional details in 24-48 hours</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'contest-day-individual':
        return (
          <div className="p-6 w-full">
            <IndividualRoundContent />
          </div>
        );

      case 'contest-day-team':
        return (
          <div className="p-6 w-full">
            <h2 className="font-sans text-2xl text-ink-900 mb-4">Team Round</h2>
            <p className="text-ink-700">
              Collaborative problem-solving with your team. 45 minutes duration. Work together to solve complex challenges.
            </p>
          </div>
        );

      case 'contest-day-head-to-head':
        return (
          <div className="p-6 w-full">
            <h2 className="font-sans text-2xl text-ink-900 mb-4">Head to Head</h2>
            <p className="text-ink-700">
              Fast-paced competition between top performers. 20 minutes of rapid-fire questions with bonus points available.
            </p>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger border-b-4 border-ink-900 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sans text-3xl md:text-5xl text-ink-900 mb-2">Administering Contests</h1>
            <p className="text-lg text-ink-700">
              Everything you need to know about organizing and participating in our math competitions.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <a
              href="/platform/login"
              className="btn-press inline-flex items-center gap-2 bg-stamp-600 text-ledger px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wide hover:bg-stamp-700"
            >
              Teacher Login
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-ledger">
        {/* New Kind of Contest Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="border-2 border-ink-900 bg-ledger p-8 mb-16"
        >
          <h2 className="font-sans text-xl text-ink-900 mb-4">A new kind of contest.</h2>
          <p className="text-lg text-ink-700">
            The Canadian Math League offers a unique contest experience that stands out from traditional competitions.
            Our contests are designed to be accessible yet challenging, encouraging mathematical thinking and problem-solving
            skills in a low-pressure environment. Unlike conventional tests, our format emphasizes collaborative learning
            and celebrates progress, making math exciting for students at all skill levels.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-4/12">
            <h2 className="font-sans text-2xl text-ink-900 mb-8">Timeline</h2>

            <div className="relative">
              {/* Main Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ledger-line" aria-hidden="true"></div>

              <div className="space-y-12">
                {timelineSections.map((section, sectionIndex) => (
                  <div key={section.id} className="relative">
                    {/* Section Title */}
                    <div className="flex items-center mb-6">
                      <div className="w-4 h-4 rounded-full bg-stamp-600 mr-4 z-10 relative"></div>
                      <h3 className="font-sans text-xl text-ink-900">{section.title}</h3>
                    </div>

                    {/* Events */}
                    <div className="space-y-8">
                      {section.events.map((event, eventIndex) => {
                        const isSelected = selectedEvent === `${section.id}-${event.id}`
                        return (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * (sectionIndex + eventIndex) }}
                            className="relative"
                          >
                            {/* Event Dot - on the line */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 flex justify-center">
                              <div
                                className={`w-3 h-3 rounded-full ${isSelected ? 'bg-stamp-600' : 'bg-ink-300'} transition-all`}
                              ></div>
                            </div>

                            {/* Event Content */}
                            <button
                              onClick={() => setSelectedEvent(isSelected ? null : `${section.id}-${event.id}`)}
                              className={`w-full text-left pl-12 pr-4 py-3 transition-colors ${isSelected ? 'bg-stamp-100' : 'hover:bg-ledger-deep'}`}
                            >
                              <div className="flex items-center">
                                <div className="p-1.5 rounded-full bg-ledger border-2 border-ink-900 mr-3 text-ink-900">
                                  {event.icon}
                                </div>
                                <span className="font-medium text-ink-900">{event.title}</span>
                              </div>
                            </button>

                            {/* Connector Line */}
                            {eventIndex < section.events.length - 1 && (
                              <div
                                className="absolute left-6 top-full h-8 w-0.5 bg-ledger-line"
                                style={{ top: '100%' }}
                                aria-hidden="true"
                              ></div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:w-10/12 mt-8 lg:mt-0">
            <div className="sticky top-8">
              <div className="border-2 border-ink-900 bg-ledger w-full">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
