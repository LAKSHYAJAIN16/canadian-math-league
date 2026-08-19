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
    <div className="min-h-screen bg-paper">
      <section className="bg-grid-blueprint py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-graphite-900">Resources</h1>
          <p className="text-lg text-graphite-600 mt-4">
            Sample problem sets and everything else you need to get ready for the Group Stage.
          </p>
        </div>
      </section>

      <section className="py-20 bg-grid-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="stamp-label">Practice</span>
            <h2 className="text-2xl font-bold text-graphite-900 mt-3 mb-8">Sample problem sets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {problemSets.map((set) => (
                <div key={set.title} className="bg-paper rounded-3xl shadow-soft p-6 flex flex-col">
                  <h3 className="font-bold text-graphite-900 mb-2">{set.title}</h3>
                  <p className="text-graphite-600 text-sm mb-6 flex-grow">{set.description}</p>
                  <a
                    href={set.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press rounded-full inline-flex items-center justify-center gap-2 bg-redpen-600 text-white py-2.5 text-sm font-semibold shadow-red-glow hover:bg-redpen-700"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
            <p className="text-sm text-graphite-500 mt-4">
              Looking for more? See the full{' '}
              <Link href="/pre-season" className="text-redpen-600 font-semibold hover:text-redpen-700">
                Pre-Season page
              </Link>
              .
            </p>
          </div>

          <div>
            <span className="stamp-label">Learn more</span>
            <h2 className="text-2xl font-bold text-graphite-900 mt-3 mb-8">Everything else</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {links.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="bg-paper rounded-3xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all p-6 block"
                >
                  <div className="w-12 h-12 bg-redpen-50 rounded-2xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-redpen-600" />
                  </div>
                  <h3 className="font-bold text-graphite-900 mb-2">{item.title}</h3>
                  <p className="text-graphite-600 text-sm">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
