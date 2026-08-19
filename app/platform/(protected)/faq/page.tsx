'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How do I add a new student?',
    answer: 'Go to the Student Details page and click on the "Add Student" button.'
  },
  {
    question: 'How can I view student results?',
    answer: 'Navigate to the Results page to view and analyze student performance.'
  },
  {
    question: 'How do I download certificates?',
    answer: 'Certificates can be downloaded from the Certificates page once they are available.'
  },
  {
    question: 'How do I update my account information?',
    answer: 'Account settings can be updated in the Dashboard under Account Settings.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-graphite-900">Frequently Asked Questions</h1>
        <p className="mt-2 text-lg text-graphite-600">
          Find answers to common questions about using the platform
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-paper-line rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left bg-paper hover:bg-paper-ink focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-graphite-900">{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-graphite-600 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-paper border-t border-paper-line">
                <p className="text-graphite-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-blueprint-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-blueprint-800">Still need help?</h3>
        <p className="mt-2 text-redpen-700">
          Contact our support team at{' '}
          <a href="mailto:support@canadianmathleague.com" className="text-blueprint-700 underline">
            support@canadianmathleague.com
          </a>{' '}
          for further assistance.
        </p>
      </div>
    </div>
  );
}