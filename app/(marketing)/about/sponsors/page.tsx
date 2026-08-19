import { Trophy, Award, Users, Mail, MapPin, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-paper">
      <section className="bg-grid-blueprint py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-graphite-900">Our Sponsors</h1>
          <p className="text-lg text-graphite-600 mt-4">
            We are grateful for the generous support of our sponsors who help make the Canadian Math League possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-grid-paper">
        <div className="mb-20">
          <h2 className="text-xl font-bold text-graphite-900 text-center mb-8">Current Sponsors</h2>
          <div className="bg-paper rounded-3xl shadow-soft p-8 text-center max-w-xl mx-auto">
            <p className="text-graphite-600 italic">
              Our sponsor showcase is coming soon. Interested in becoming our first sponsor?
            </p>
            <Link
              href="/contact"
              className="btn-press rounded-full mt-6 inline-flex items-center gap-2 bg-redpen-600 text-white px-6 py-3 text-sm font-semibold shadow-red-glow hover:bg-redpen-700"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-graphite-900 text-center mb-8">Sponsorship Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipLevels.map((level, index) => {
              const tierShade = ['bg-redpen-700', 'bg-redpen-600', 'bg-redpen-500', 'bg-redpen-400'][index] ?? 'bg-redpen-500'
              return (
                <div key={level.name} className="bg-paper rounded-3xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all overflow-hidden">
                  <div className={`p-6 ${tierShade}`}>
                    <h3 className="text-2xl font-bold text-center text-white">{level.name}</h3>
                    <p className="text-center text-white/90 font-medium mt-1">{level.amount}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {level.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-redpen-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-graphite-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-paper rounded-3xl shadow-soft p-8 md:p-10 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-graphite-900 text-center mb-8">Why Sponsor Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-redpen-50 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-6 w-6 text-redpen-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-graphite-900">Reach Talented Students</h3>
                  <p className="text-graphite-600 mt-1">Connect with high-achieving students across Canada who are passionate about mathematics.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-redpen-50 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Award className="h-6 w-6 text-redpen-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-graphite-900">Support Education</h3>
                  <p className="text-graphite-600 mt-1">Your contribution helps us provide quality math education and opportunities to students nationwide.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-redpen-50 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Trophy className="h-6 w-6 text-redpen-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-graphite-900">Brand Visibility</h3>
                  <p className="text-graphite-600 mt-1">Gain exposure to our network of students, parents, educators, and academic institutions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-redpen-50 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-redpen-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-graphite-900">Community Impact</h3>
                  <p className="text-graphite-600 mt-1">Be part of a community that values academic excellence and intellectual growth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="btn-press rounded-full inline-flex items-center gap-2 bg-redpen-600 text-white px-8 py-4 text-sm font-semibold shadow-red-glow hover:bg-redpen-700"
            >
              <Mail className="h-4 w-4" />
              Contact Us About Sponsorship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
