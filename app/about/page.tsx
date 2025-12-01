'use client';

import { motion } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Lakshya Jain',
    position: 'Organizer',
    image: '/team/lakshya-jain.jpg',
  },
  {
    id: 2,
    name: 'Eric Chen',
    position: 'Problem Setter',
    image: '/team/eric-chen.jpg',
  },
  {
    id: 3,
    name: 'Gautam Korrepati',
    position: 'Problem Setter',
    image: '/team/gautam-korrepati.jpg',
  },
];

const CompetitionLogo = ({ src, alt, isCanadian = false, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <motion.div
        className={`h-full min-h-[30px] rounded-lg flex flex-col items-center justify-center p-3 bg-white shadow-sm hover:shadow-md transition-all duration-200 border ${isCanadian ? 'border-red-100 hover:border-red-200' : 'border-blue-100 hover:border-blue-200'
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
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <span className={`font-bold ${isCanadian ? 'text-red-700' : 'text-blue-700'} text-sm text-center hidden`}>
              {alt}
            </span>
          </div>
        ) : (
          <span className={`font-bold ${isCanadian ? 'text-red-700' : 'text-blue-700'} text-sm text-center`}>
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
    <div className="min-h-screen bg-white">
      {/* Letter Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100"
        >
          <div className="text-right mb-6">
            <p className="text-gray-500">November 23, 2024</p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Dear Canadian Students,
          </h1>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <div className="space-y-1">
              <div className="text-2xl font-medium text-red-600">You deserve more.</div>

              <br />
              <p>
                While students in other countries have access to plently of math competitions that challenge and inspire, Canadian students have been left behind. We're here to change that.
              </p>
              <div className="my-6 scale-90">
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  {/* US Competitions */}
                  <div className="flex-1 p-10 border-2 border-blue-100 rounded-xl bg-gradient-to-b from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-2xl font-bold text-blue-800">United States</h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-5 py-2.5 rounded-full">
                        15+ Competitions
                      </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                      {usCompetitions.map((comp) => (
                        <CompetitionLogo
                          key={comp.id}
                          src={comp.logo}
                          alt={comp.name}
                          url={comp.url}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Canadian Competitions */}
                  <div className="flex-1 p-10 border-2 border-red-100 rounded-xl bg-gradient-to-b from-red-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-3xl font-bold text-red-800">Canada</h3>
                      <span className="bg-red-100 text-red-800 text-sm font-semibold px-5 py-2.5 rounded-full">
                        3-4 Competitions
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {canadianCompetitions.map((comp) => (
                        <CompetitionLogo
                          key={comp.id}
                          src={comp.logo}
                          alt={comp.name}
                          isCanadian
                          url={comp.url}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p>
              We're building the competitive ecosystem Canada has been missing: rigorous <b>team based</b> contests designed by passionate problem-solvers, accessible to students across provinces. Our goal is not just to catch up, but to set a new benchmark for math contests around the world.
            </p>

            <p>
              This is more than just about winning. It's about joining a community of passionate problem-solvers. It's about discovering the beauty and power of mathematics. It's about showing the world what Canadian students are truly capable of.
            </p>

            <p>
              The future of Canadian mathematics is in your hands. We're here to help you shape it.
            </p>

            <div className="mt-8">
              <p className="font-medium">Sincerely,</p>
              <p className="text-xl font-bold text-gray-900 mt-2 mb-6">The Canadian Math League Team</p>

              {/* Team Members */}
              {/* <div className="flex flex-wrap justify-center gap-6 mt-8">
                {teamMembers.map((member) => {
                  const initials = member.name.split(' ').map(n => n[0]).join('');
                  return (
                    <motion.div
                      key={member.id}
                      className="relative group w-16 h-16 mx-auto"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-700 font-bold text-xl">{initials}</span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white shadow-md rounded-lg p-2 min-w-max z-10">
                        <div className="font-semibold text-sm text-gray-800 whitespace-nowrap">{member.name}</div>
                        <div className="text-xs text-gray-600">{member.position}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div> */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}