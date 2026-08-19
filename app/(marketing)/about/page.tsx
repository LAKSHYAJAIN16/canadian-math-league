'use client';

import { motion } from 'framer-motion';

interface CompetitionLogoProps {
  src: string;
  alt: string;
  isCanadian?: boolean;
  url: string;
}

const CompetitionLogo = ({ src, alt, isCanadian = false, url }: CompetitionLogoProps) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <motion.div
        className={`h-full min-h-[30px] flex flex-col items-center justify-center p-3 bg-paper transition-all duration-200 border-2 ${isCanadian ? 'border-redpen-500' : 'border-graphite-300 hover:border-blueprint-600'
          }`}
        whileHover={{ y: -2, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        {src ? (
          <div className="h-14 w-full flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback instanceof HTMLElement) {
                  fallback.style.display = 'block';
                }
              }}
            />
            <span className={`font-bold ${isCanadian ? 'text-redpen-700' : 'text-blue-700'} text-sm text-center hidden`}>
              {alt}
            </span>
          </div>
        ) : (
          <span className={`font-bold ${isCanadian ? 'text-redpen-700' : 'text-blue-700'} text-sm text-center`}>
            {alt}
          </span>
        )}
      </motion.div>
    </a>
  );
};

export default function AboutPage() {
  // US Competitions with links
  const usCompetitions = [
    { id: 1, name: 'ARML', logo: 'https://www.arml.com/ARML/arml_2019/images/logo3.jpg', url: 'https://www.arml.com' },
    { id: 2, name: 'PUMaC', logo: 'https://images.squarespace-cdn.com/content/v1/570450471d07c094a39efaed/1489872743410-OCIZMLU7TAEPS1BAXH4P/PUMaC_logo_color.png', url: 'https://pumac.princeton.edu' },
    { id: 3, name: 'MAA', logo: '/maa.png', url: 'https://www.maa.org' },
    { id: 4, name: 'BMT', logo: 'https://berkeley.mt/assets/logo.svg', url: 'https://bmt.berkeley.edu' },
    { id: 5, name: 'Purple Comet', logo: 'https://purplecomet.org/assets/images/Purple_Comet_Logo_2013.jpg', url: 'https://purplecomet.org' },
    { id: 6, name: 'Mu Alpha Theta', logo: 'https://mualphatheta.org/sites/default/files/mat_full_logo_larger_words_500.png', url: 'https://mualphatheta.org' },
    { id: 7, name: 'HMMT', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsbrfzJelgAXWZ2787ZkfvdL8dBr1MZFSPlA&s', url: 'https://www.hmmt.co' },
    { id: 8, name: 'CMM', logo: 'https://static.wixstatic.com/media/006423_fe3da1d2eb624fe79561a2e93104d74a~mv2.gif', url: 'https://www.caltechmathmeet.org/' },
    { id: 9, name: 'CMIMC', logo: 'https://lh3.googleusercontent.com/sitesv/AAzXCkeOAtW9l-nNsmy44d6A9ZSd8P4v9UNPxO7UKU-J_hkmJDnW2SOtoZyiwfbcZN6szm27gwDr1WsBdg5M-tkLmfiyXU-vgz5GoSH9tsNIuLZbWGh9BsjLrCl8fWscNtYhUhBDLTbsBmBQayX44YvBSkIRkIQx2eEMXOurGG1j8F0De0IaMCsDPfqV=w16383', url: 'https://cmimc.math.cmu.edu' },
    { id: 10, name: 'Mathcounts', logo: '/mathcounts.png', url: 'https://www.mathcounts.org' },
    { id: 11, name: 'USAMTS', logo: '/usamts.jpg', url: 'https://www.usamts.org' },
    { id: 12, name: 'CHMMC', logo: 'http://chmmc.caltech.edu/images/banner.png', url: 'http://chmmc.caltech.edu/problems.html' },
    { id: 13, name: "SMT", logo: "https://sumo.stanford.edu/images/smtbanner.png", url: 'https://www.stanfordmathtournament.org/' }
  ];

  // Canadian Competitions with links
  const canadianCompetitions = [
    { id: 1, name: 'Waterloo', logo: "/waterloo.png", url: 'https://cemc.uwaterloo.ca/contests' },
    { id: 2, name: 'COMC', logo: "/comc.jpg", url: 'https://cms.math.ca/competitions/comc/' }
  ];

  return (
    <div className="min-h-screen bg-paper">
      <section className="bg-grid-blueprint py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="stamp-label border-white text-white">Our Mission</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">Dear Canadian students,</h1>
        </div>
      </section>

      {/* Letter Section */}
      <section className="py-16 bg-grid-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-paper border-2 border-graphite-900 rounded-xl p-6 md:p-10"
          >
            <div className="text-right mb-6">
              <p className="text-xs text-graphite-500">November 23, 2024</p>
            </div>

            <div className="space-y-6 text-lg text-graphite-700 leading-relaxed">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-redpen-600">You deserve more.</div>

                <p>
                  While students in other countries have access to plenty of math competitions that challenge and inspire, Canadian students have been left behind. We&apos;re here to change that.
                </p>

                <div className="my-8">
                  <div className="grid md:grid-cols-2 gap-px bg-graphite-900 border-2 border-graphite-900 rounded-xl">
                    {/* US Competitions */}
                    <div className="p-6 bg-paper">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-graphite-900">United States</h3>
                        <span className="stamp-label border-graphite-400 text-graphite-600 !rotate-0">15+ Competitions</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {usCompetitions.map((comp) => (
                          <CompetitionLogo key={comp.id} src={comp.logo} alt={comp.name} url={comp.url} />
                        ))}
                      </div>
                    </div>

                    {/* Canadian Competitions */}
                    <div className="p-6 bg-blueprint-50">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-redpen-700">Canada</h3>
                        <span className="stamp-label border-redpen-500 text-redpen-600 !rotate-0">3-4 Competitions</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {canadianCompetitions.map((comp) => (
                          <CompetitionLogo key={comp.id} src={comp.logo} alt={comp.name} isCanadian url={comp.url} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                We&apos;re building the competitive ecosystem Canada has been missing: rigorous <b>team based</b> contests designed by passionate problem-solvers, accessible to students across provinces. Our goal is not just to catch up, but to set a new benchmark for math contests around the world.
              </p>

              <p>
                This is more than just about winning. It&apos;s about joining a community of passionate problem-solvers. It&apos;s about discovering the beauty and power of mathematics. It&apos;s about showing the world what Canadian students are truly capable of.
              </p>

              <p>
                The future of Canadian mathematics is in your hands. We&apos;re here to help you shape it.
              </p>

              <div className="mt-8 pt-6 border-t border-paper-line">
                <p className="font-medium">Sincerely,</p>
                <p className="text-lg font-bold text-graphite-900 mt-2">The Canadian Math League Team</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}