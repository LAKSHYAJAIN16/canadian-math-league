import { Trophy, Award, Medal, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { PRIZE_TIERS } from '@/lib/content/season'

export default function PrizesPage() {
  const icons = [Trophy, Award, Medal]

  return (
    <div className="min-h-screen bg-paper">
      <section className="bg-grid-blueprint py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="stamp-label border-white text-white">Awards</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">Prizes</h1>
          <p className="mt-4 text-lg text-blueprint-100">
            Cash prizes, scholarships, and national recognition for the top teams at Nationals.
          </p>
        </div>
      </section>

      <section className="py-20 bg-grid-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-px bg-graphite-900 border-2 border-graphite-900 rounded-xl mb-16">
            {PRIZE_TIERS.map((tier, index) => {
              const Icon = icons[index] ?? Medal
              return (
                <div key={tier.title} className="bg-paper p-8 text-center">
                  <div className="mx-auto flex items-center justify-center h-14 w-14 border-2 border-graphite-900 rounded-xl mb-4">
                    <Icon className="h-6 w-6 text-redpen-600" />
                  </div>
                  <h2 className="text-sm font-bold text-graphite-600 uppercase tracking-wide mb-1">{tier.title}</h2>
                  <p className="text-4xl font-extrabold text-blueprint-800 mb-2">{tier.amount}</p>
                  <p className="text-graphite-600 text-sm">{tier.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-blueprint-900 border-2 border-graphite-900 rounded-xl p-8 mb-16">
            <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-4">Every finalist also receives</h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {['Medals for every team member', 'Certificates of achievement', 'National recognition on our site'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-blueprint-100">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <p className="text-graphite-600 mb-4">
              Prizes are awarded at the National Championship. See the full{' '}
              <Link href="/format" className="text-redpen-600 font-semibold hover:text-redpen-700">
                tournament format
              </Link>{' '}
              for how teams qualify.
            </p>
            <Link
              href="/register"
              className="btn-press rounded-lg inline-flex items-center justify-center gap-2 bg-redpen-600 text-white px-8 py-4 text-sm font-bold tracking-wider uppercase shadow-stamp hover:bg-redpen-700"
            >
              Register your team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
