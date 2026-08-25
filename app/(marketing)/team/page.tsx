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
    <div className="min-h-screen bg-ledger">
      <section className="bg-ledger py-20 border-b-4 border-ink-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans text-4xl md:text-5xl text-ink-900">Our Team</h1>
          <p className="text-lg text-ink-700 mt-4">Meet the people behind the Canadian Math League.</p>
        </div>
      </section>

      <section className="py-20 bg-ledger">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-900 border border-ink-900">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-ledger p-8 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-5 border-2 border-ink-900 bg-stamp-600 flex items-center justify-center">
                  <span className="font-mono text-xl font-semibold text-ledger">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-sans text-lg text-ink-900">{member.name}</h3>
                <p className="font-mono text-xs uppercase tracking-wide text-stamp-600 mt-1">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
