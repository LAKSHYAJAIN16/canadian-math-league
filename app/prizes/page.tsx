// app/prizes/page.tsx
export default function PrizesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Prizes</h1>
          <p className="mt-3 text-xl text-gray-500">Earn points through competition to unlock these amazing prizes</p>
        </div>

        {/* Grand Prize - Team Award */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">🏆 Team Grand Prize</h2>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="h-48 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                    <span className="text-6xl">🏆</span>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      10,000 Points
                    </span>
                  </div>
                </div>
                <div className="md:ml-8 md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900">Champions Trophy</h3>
                  <p className="mt-2 text-lg text-gray-600">The ultimate team achievement. Awarded to the top-performing team in the competition.</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900">Prize Includes:</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Large engraved team trophy</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Team name engraved on perpetual plaque</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Feature on our website and social media</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Redeem with 10,000 points
                    </button>
                    <p className="mt-2 text-sm text-gray-500">Available to top team only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Medals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">🥇 Individual Medals</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Gold Medal */}
            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-yellow-400">
              <div className="p-6">
                <div className="flex items-center justify-center h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4">
                  <span className="text-5xl">🥇</span>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900">Gold Medal</h3>
                <p className="mt-1 text-center text-yellow-600 font-medium">5,000 Points</p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24K gold-plated medal</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Certificate of Excellence</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exclusive winner badge</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700">
                    Redeem 5,000 points
                  </button>
                </div>
              </div>
            </div>

            {/* Silver Medal */}
            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-gray-300">
              <div className="p-6">
                <div className="flex items-center justify-center h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-500 mb-4">
                  <span className="text-5xl">🥈</span>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900">Silver Medal</h3>
                <p className="mt-1 text-center text-gray-500 font-medium">3,000 Points</p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sterling silver medal</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Certificate of Achievement</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Special recognition</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">
                    Redeem 3,000 points
                  </button>
                </div>
              </div>
            </div>

            {/* Bronze Medal */}
            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-amber-700">
              <div className="p-6">
                <div className="flex items-center justify-center h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-800 mb-4">
                  <span className="text-5xl">🥉</span>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900">Bronze Medal</h3>
                <p className="mt-1 text-center text-amber-700 font-medium">1,500 Points</p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-amber-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bronze alloy medal</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-amber-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Certificate of Merit</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-amber-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Recognition in results</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700">
                    Redeem 1,500 points
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points Info */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Earn Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">💯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Perfect Score</p>
                  <p className="text-sm text-gray-500">+500 points</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Correct Answer</p>
                  <p className="text-sm text-gray-500">+100 points</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600">🏆</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Top 10 Finish</p>
                  <p className="text-sm text-gray-500">+1,000 points</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Points are awarded after each competition. Check your dashboard to track your progress!</p>
          </div>
        </div>
      </div>
    </div>
  );
}