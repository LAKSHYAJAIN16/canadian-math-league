import { Trophy, Award, Medal, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { PRIZE_TIERS } from '@/lib/content/season'

export default function PrizesPage() {
  const icons = [Trophy, Award, Medal]

  return (
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger border-b-4 border-ink-900 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans text-4xl md:text-5xl text-ink-900">Prizes</h1>
          <p className="mt-4 text-lg text-ink-700">
            Cash prizes, scholarships, and national recognition for the top teams at Nationals.
          </p>
        </div>
      </section>

      <section className="py-20 bg-ledger">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-px bg-ink-900 border border-ink-900 mb-16">
            {PRIZE_TIERS.map((tier, index) => {
              const Icon = icons[index] ?? Medal
              return (
                <div key={tier.title} className="bg-ledger p-8 text-center">
                  <Icon className="h-6 w-6 text-ink-700 mx-auto mb-4" />
                  <h2 className="font-mono text-xs uppercase tracking-wide text-ink-700 mb-2">{tier.title}</h2>
                  <p className="font-mono text-4xl font-semibold text-stamp-600 mb-2">{tier.amount}</p>
                  <p className="text-ink-700 text-sm">{tier.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-ink-900 p-8 mb-16">
            <h2 className="font-mono text-xs font-semibold text-ledger uppercase tracking-wide mb-4">Every finalist also receives</h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {['Medals for every team member', 'Certificates of achievement', 'National recognition on our site'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink-300">
                  <CheckCircle2 className="h-5 w-5 text-stamp-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <p className="text-ink-700 mb-4">
              Prizes are awarded at the National Championship. See the full{' '}
              <Link href="/format" className="text-stamp-600 font-semibold hover:text-stamp-700">
                tournament format
              </Link>{' '}
              for how teams qualify.
            </p>
            <Link
              href="/register"
              className="btn-press inline-flex items-center justify-center gap-2 bg-stamp-600 text-ledger px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide hover:bg-stamp-700"
            >
              Register your team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
