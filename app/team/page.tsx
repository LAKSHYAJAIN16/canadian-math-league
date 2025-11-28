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
    position: 'Founder & Lead Organizer',
    image: '/team/lakshya-jain.jpg',
  },
  {
    id: 2,
    name: 'Eric Chen',
    position: 'Head Problem Setter',
    image: '/team/eric-chen.jpg',
  },
  {
    id: 3,
    name: 'Gautam Korrepati',
    position: 'Problem Setter & Technical Lead',
    image: '/team/gautam-korrepati.jpg',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-xl text-gray-600">Meet the people behind Canadian Math League</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100">
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-red-600">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}