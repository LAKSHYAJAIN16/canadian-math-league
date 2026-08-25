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
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger border-b-4 border-ink-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans text-4xl md:text-5xl text-ink-900">Our Sponsors</h1>
          <p className="text-lg text-ink-700 mt-4">
            We are grateful for the generous support of our sponsors who help make the Canadian Math League possible.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-ledger">
        <div className="mb-20">
          <h2 className="font-sans text-xl text-ink-900 text-center mb-8">Current Sponsors</h2>
          <div className="border-2 border-ink-900 bg-ledger p-8 text-center max-w-xl mx-auto">
            <p className="text-ink-700 italic">
              Our sponsor showcase is coming soon. Interested in becoming our first sponsor?
            </p>
            <Link
              href="/contact"
              className="btn-press mt-6 inline-flex items-center gap-2 bg-stamp-600 text-ledger px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wide hover:bg-stamp-700"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="font-sans text-2xl md:text-3xl text-ink-900 text-center mb-8">Sponsorship Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900 border border-ink-900">
            {sponsorshipLevels.map((level) => (
              <div key={level.name} className="bg-ledger flex flex-col">
                <div className="p-6 border-b-2 border-ink-900">
                  <h3 className="font-sans text-2xl text-center text-ink-900">{level.name}</h3>
                  <p className="text-center text-stamp-600 font-mono text-xs font-semibold uppercase tracking-wide mt-1">{level.amount}</p>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {level.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-stamp-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-ink-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-ink-900 bg-ledger p-8 md:p-10 max-w-4xl mx-auto">
          <h2 className="font-sans text-2xl md:text-3xl text-ink-900 text-center mb-8">Why Sponsor Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <Users className="h-6 w-6 text-stamp-600 mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-sans text-lg text-ink-900">Reach Talented Students</h3>
                  <p className="text-ink-700 mt-1">Connect with high-achieving students across Canada who are passionate about mathematics.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="h-6 w-6 text-stamp-600 mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-sans text-lg text-ink-900">Support Education</h3>
                  <p className="text-ink-700 mt-1">Your contribution helps us provide quality math education and opportunities to students nationwide.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <Trophy className="h-6 w-6 text-stamp-600 mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-sans text-lg text-ink-900">Brand Visibility</h3>
                  <p className="text-ink-700 mt-1">Gain exposure to our network of students, parents, educators, and academic institutions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-stamp-600 mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-sans text-lg text-ink-900">Community Impact</h3>
                  <p className="text-ink-700 mt-1">Be part of a community that values academic excellence and intellectual growth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="btn-press inline-flex items-center gap-2 bg-stamp-600 text-ledger px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide hover:bg-stamp-700"
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
