import { Trophy, Award, Users, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SponsorsPage() {
  const sponsorshipLevels = [
    {
      name: 'Platinum',
      amount: '$5,000+',
      benefits: [
        'Logo placement on all marketing materials',
        'Featured on homepage',
        'Speaking opportunity at events',
        'Full-page ad in competition booklet',
        'Recognition in all press releases'
      ]
    },
    {
      name: 'Gold',
      amount: '$2,500 - $4,999',
      benefits: [
        'Logo on website and competition materials',
        'Half-page ad in competition booklet',
        'Social media recognition',
        'Booth space at events'
      ]
    },
    {
      name: 'Silver',
      amount: '$1,000 - $2,499',
      benefits: [
        'Logo on website',
        'Quarter-page ad in competition booklet',
        'Social media mention'
      ]
    },
    {
      name: 'Bronze',
      amount: '$250 - $999',
      benefits: [
        'Name listed on website',
        'Recognition in competition booklet'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Sponsors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are grateful for the generous support of our sponsors who help make the Canadian Math League possible.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">Current Sponsors</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-500 italic">
              Our sponsor showcase is coming soon. Interested in becoming our first sponsor?
            </p>
            <Link 
              href="/contact" 
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">Sponsorship Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipLevels.map((level, index) => (
              <div key={level.name} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className={`p-6 ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-300' : 
                  index === 1 ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' : 
                  index === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-200' : 
                  'bg-gradient-to-r from-amber-700 to-amber-600'}`}>
                  <h3 className="text-2xl font-bold text-center text-white">{level.name}</h3>
                  <p className="text-center text-white font-medium mt-1">{level.amount}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {level.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">Why Sponsor Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Reach Talented Students</h3>
                  <p className="text-gray-600 mt-1">Connect with high-achieving students across Canada who are passionate about mathematics.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Support Education</h3>
                  <p className="text-gray-600 mt-1">Your contribution helps us provide quality math education and opportunities to students nationwide.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Trophy className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Brand Visibility</h3>
                  <p className="text-gray-600 mt-1">Gain exposure to our network of students, parents, educators, and academic institutions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Community Impact</h3>
                  <p className="text-gray-600 mt-1">Be part of a community that values academic excellence and intellectual growth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Us About Sponsorship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
