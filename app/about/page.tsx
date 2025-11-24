'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Letter Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-100"
        >
          <div className="text-right mb-8">
            <p className="text-gray-500">November 23, 2024</p>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Dear Canadian Students,
          </h1>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <div className="space-y-1">
              <div className="text-2xl font-medium text-red-600">You deserve more.</div>
            </div>
            
            <p>
              While students in other countries have access to world-class math competitions that challenge and inspire, Canadian students have been left behind. We're here to change that.
            </p>
            
            <p>
              The Canadian Math League was founded on a simple but powerful idea: <span className="font-medium">Canadian students deserve the same opportunities to excel in mathematics as their global peers.</span>
            </p>
            
            <p>
              Our mission is to build a world-class math competition ecosystem right here in Canada. We're creating competitions that don't just test what you've learned, but inspire you to push the boundaries of your mathematical understanding.
            </p>
            
            <p>
              <span className="font-medium">Why settle for less when you can compete with the best?</span> Our competitions are designed by mathematicians and educators who understand what it takes to develop true mathematical excellence.
            </p>
            
            <p>
              This is more than just about winning. It's about joining a community of passionate problem-solvers. It's about discovering the beauty and power of mathematics. It's about showing the world what Canadian students are truly capable of.
            </p>
            
            <p>
              The future of Canadian mathematics is in your hands. We're here to help you shape it.
            </p>
            
            <div className="mt-8">
              <p className="font-medium">Sincerely,</p>
              <p className="text-xl font-bold text-gray-900 mt-2 mb-8">The Canadian Math League Team</p>
              
              {/* Team Members */}
              <div className="flex flex-wrap justify-center gap-8 mt-8">
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
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}