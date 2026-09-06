// app/pre-season/other-resources/page.tsx
'use client'

const resources = [
  {
    name: 'Canadian Open Mathematics Challenge (COMC)',
    description: 'The Canadian Open Mathematics Challenge is Canada\'s premier national mathematics competition that is open to any student with an interest in and grasp of high school math.',
    link: 'https://www.cms.math.ca/competitions/comc/',
    type: 'Competition'
  },
  {
    name: 'Art of Problem Solving',
    description: 'Comprehensive resources including online classes, textbooks, and a vibrant community for math enthusiasts.',
    link: 'https://artofproblemsolving.com/',
    type: 'Learning Platform'
  },
  {
    name: 'Brilliant.org',
    description: 'Interactive problem-solving courses and challenges in math and science.',
    link: 'https://brilliant.org/',
    type: 'Learning Platform'
  },
  {
    name: 'Canadian Mathematical Society',
    description: 'Information about Canadian math competitions, publications, and resources.',
    link: 'https://www.cms.math.ca/',
    type: 'Organization'
  },
  {
    name: 'Khan Academy',
    description: 'Free online courses, lessons, and practice in math and other subjects.',
    link: 'https://www.khanacademy.org/',
    type: 'Learning Platform'
  },
  {
    name: 'International Mathematical Olympiad',
    description: 'The World Championship Mathematics Competition for High School students.',
    link: 'https://www.imo-official.org/',
    type: 'Competition'
  }
]

export default function OtherResources() {
  return (
    <div className="min-h-screen bg-ledger py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-sans text-4xl text-ink-900 mb-4">Other Resources</h1>
          <p className="text-lg text-ink-700">
            A curated list of valuable math resources and competitions to enhance your learning journey.
          </p>
        </div>

        <div className="rounded-2xl shadow-soft divide-y divide-ledger-line overflow-hidden">
          {resources.map((resource, index) => (
            <div key={index} className="bg-ledger">
              <div className="px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-sans text-lg text-ink-900">{resource.name}</h3>
                  <span className="flex-shrink-0 font-mono text-[0.625rem] font-semibold uppercase tracking-wide rounded-full bg-ledger-deep text-ink-700 px-2 py-0.5">
                    {resource.type}
                  </span>
                </div>
                <p className="mt-2 text-ink-700">{resource.description}</p>
                <div className="mt-4">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stamp-600 hover:text-stamp-700 font-mono text-xs font-semibold uppercase tracking-wide inline-flex items-center"
                  >
                    Visit Resource
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-stamp-100 p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-stamp-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-stamp-700">
                Have a resource to suggest? Contact us to recommend additional math resources for our community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}