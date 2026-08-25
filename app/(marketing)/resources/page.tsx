import { Download, FileText, HelpCircle, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const problemSets = [
  { title: 'Individual Round', pdfUrl: '/p-sets/individual.pdf', description: 'Individual problem-solving practice covering a variety of topics.' },
  { title: 'Team Rounds', pdfUrl: '/p-sets/team-round.pdf', description: 'Collaborative practice problems for your whole team.' },
  { title: 'Capture the Problem', pdfUrl: '/p-sets/capture_the_problem.pdf', description: 'Practice problems for the speed-and-accuracy grid format.' },
]

const links = [
  { icon: HelpCircle, title: 'How it works', description: 'The three-stage tournament structure, explained.', href: '/how-it-works' },
  { icon: FileText, title: 'Tournament format', description: 'Every round, in every stage, in detail.', href: '/format' },
  { icon: MessageSquare, title: 'Community', description: 'Connect with other competitors and coaches.', href: '/community' },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger border-b-4 border-ink-900 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans text-4xl md:text-5xl text-ink-900">Resources</h1>
          <p className="text-lg text-ink-700 mt-4">
            Sample problem sets and everything else you need to get ready for the Group Stage.
          </p>
        </div>
      </section>

      <section className="py-20 bg-ledger">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-sans text-2xl text-ink-900 mb-8">Sample problem sets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-900 border border-ink-900">
              {problemSets.map((set) => (
                <div key={set.title} className="bg-ledger p-6 flex flex-col">
                  <h3 className="font-sans text-lg text-ink-900 mb-2">{set.title}</h3>
                  <p className="text-ink-700 text-sm mb-6 flex-grow">{set.description}</p>
                  <a
                    href={set.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center justify-center gap-2 bg-stamp-600 text-ledger py-2.5 font-mono text-xs font-semibold uppercase tracking-wide hover:bg-stamp-700"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-500 mt-4">
              Looking for more? See the full{' '}
              <Link href="/pre-season" className="text-stamp-600 font-semibold hover:text-stamp-700">
                Pre-Season page
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl text-ink-900 mb-8">Everything else</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-900 border border-ink-900">
              {links.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="bg-ledger hover:bg-ink-900 group transition-colors p-6 block"
                >
                  <item.icon className="h-6 w-6 text-stamp-600 group-hover:text-stamp-500 mb-4" />
                  <h3 className="font-sans text-lg text-ink-900 group-hover:text-ledger mb-2">{item.title}</h3>
                  <p className="text-ink-700 group-hover:text-ink-300 text-sm">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
