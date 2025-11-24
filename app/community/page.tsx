"use client"
import { motion } from 'framer-motion';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Join Our Community
          </h1>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Connect with fellow math enthusiasts, share resources, and participate in discussions about mathematics and problem-solving.
            </p>

            {/* Discord Section */}
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Discord</h2>
              <p className="mb-4">
                Our official Discord server is the best place to chat in real-time, get updates, ask questions, and connect with competitors from across Canada.
              </p>
              <a
                href="https://discord.gg/your-discord-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500 text-white font-medium px-5 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Join the Discord
              </a>
            </div>
            
            {/* Volunteering Section */}
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Volunteer With Us</h2>
              <p className="mb-4">
                Passionate about math education? Join our team of dedicated volunteers and help us inspire the next generation of mathematical thinkers across Canada.
              </p>
              <p className="mb-4">
                As a volunteer, you can help with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Organizing and supervising competitions</li>
                <li>Mentoring students</li>
                <li>Grading and problem development</li>
                <li>Event planning and coordination</li>
                <li>Community outreach and promotion</li>
              </ul>
              <a
                href="mailto:volunteer@canadianmathleague.ca"
                className="inline-block bg-green-500 text-white font-medium px-5 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Volunteer Now
              </a>
            </div>

            {/* Contact Section */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get In Touch</h2>
              <p className="mb-4">
                Have questions or want to learn more about our programs? We'd love to hear from you!
              </p>
              <p>
                Email us at <a href="mailto:info@canadianmathleague.ca" className="text-blue-600 hover:underline">info@canadianmathleague.ca</a> or use our contact form.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
