'use client';

import { motion } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  position: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Lakshya Jain', position: 'Founder & Lead Organizer' },
  { id: 2, name: 'Eric Chen', position: 'Head Problem Setter' },
  { id: 3, name: 'Gautam Korrepati', position: 'Problem Setter & Technical Lead' },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="bg-grid-blueprint py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-graphite-900">Our Team</h1>
          <p className="text-lg text-graphite-600 mt-4">Meet the people behind the Canadian Math League.</p>
        </div>
      </section>

      <section className="py-20 bg-grid-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-paper rounded-3xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all p-8 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-5 rounded-2xl bg-redpen-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-graphite-900">{member.name}</h3>
                <p className="text-redpen-600 text-sm mt-1">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
