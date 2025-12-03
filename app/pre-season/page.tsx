// app/pre-season/page.tsx
'use client'

import Emmanuel from '../emmauel.jpg'
const problemSets = [
  {
    id: 1,
    title: 'Individual Round',
    pdfUrl: '/p-sets/individual.pdf',
    description: 'Test your individual problem-solving skills with this set of challenging problems. This round focuses on individual performance and covers a variety of mathematical concepts.'
  },
  {
    id: 2,
    title: 'Team Rounds',
    pdfUrl: '/p-sets/team-round.pdf',
    description: 'Collaborate with your team to solve these challenging problems. The team round emphasizes cooperation and strategic problem-solving.'
  },
  {
    id: 3,
    title: 'Capture the Problem',
    pdfUrl: '/p-sets/capture_the_problem.pdf',
    description: 'A strategic battle of speed and accuracy. This unique format challenges teams to solve and claim problems before their opponents.'
  },
]

export default function PreSeasonPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pre-Season 2025</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Practice with problem sets from different competition formats.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Group Stage</h2>
                <div className="mt-2 h-1 w-20 bg-red-600 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {problemSets.map((set) => (
                  <div key={set.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 p-6 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{set.title}</h2>
                    <p className="text-gray-700 mb-4 flex-grow">{set.description}</p>
                    <div className="mt-auto">
                      <a
                        href={set.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}