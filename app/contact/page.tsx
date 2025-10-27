'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'info@canadianmathleague.ca',
      description: 'Send us an email for general inquiries',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Call us during business hours',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Mathematics Ave, Toronto, ON M5V 3A8',
      description: 'Visit our headquarters',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon-Fri: 9:00 AM - 5:00 PM EST',
      description: 'Our office hours',
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our competitions or need assistance? 
            We're here to help you on your mathematical journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <info.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-gray-700 font-medium mb-1">{info.details}</p>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl"
            >
              <h3 className="font-bold text-gray-900 mb-3">Quick Response Times</h3>
              <p className="text-gray-700 mb-2">
                • General inquiries: Within 24 hours
              </p>
              <p className="text-gray-700 mb-2">
                • Competition questions: Within 12 hours
              </p>
              <p className="text-gray-700">
                • Technical support: Within 6 hours
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="john.doe@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200">
                  <option>General Inquiry</option>
                  <option>Competition Registration</option>
                  <option>Technical Support</option>
                  <option>Partnership Opportunities</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
              >
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I register for a competition?
                </h3>
                <p className="text-gray-600">
                  Visit our competitions page and click on the competition you're interested in. 
                  Follow the registration instructions provided.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What grade levels can participate?
                </h3>
                <p className="text-gray-600">
                  We offer competitions for students in grades 6-12, with different 
                  categories based on grade level and skill.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are there participation fees?
                </h3>
                <p className="text-gray-600">
                  Most of our competitions have a small registration fee to cover 
                  administrative costs. Scholarships are available for students in need.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How are competitions conducted?
                </h3>
                <p className="text-gray-600">
                  Competitions are held both online and in-person at various locations 
                  across Canada. Check each competition's details for specific format.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  When are results announced?
                </h3>
                <p className="text-gray-600">
                  Results are typically announced within 2-3 weeks after the competition date. 
                  Participants will be notified via email.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can teachers register their entire class?
                </h3>
                <p className="text-gray-600">
                  Yes! We offer group registration options for teachers and schools. 
                  Contact us for bulk registration assistance.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ContactPage
