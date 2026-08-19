'use client';

import { useState } from 'react';

// Mock data for certificates
const certificates : any[] = [];

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCertificates = certificates.filter(cert =>
    cert.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-graphite-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 rounded-xl leading-5 bg-redpen-50/60 placeholder-graphite-400 focus:outline-none focus:ring-2 focus:ring-redpen-400 sm:text-sm"
            placeholder="Search by student name or certificate ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            // TODO: Implement physical copy request logic
            alert('Physical copy request feature coming soon!');
          }}
          className="btn-press inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full text-white bg-redpen-600 shadow-red-glow hover:bg-redpen-700"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
              clipRule="evenodd"
            />
          </svg>
          Request Physical Copies
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-graphite-900">Student Certificates</h1>
        <p className="mt-2 text-lg text-graphite-600">
          View and download certificates for your students
        </p>
      </div>

      <div className="bg-paper shadow-soft overflow-hidden rounded-2xl">
        <table className="min-w-full divide-y divide-paper-line">
          <thead className="bg-paper">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-graphite-600 uppercase tracking-wider">
                Certificate ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-graphite-600 uppercase tracking-wider">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-graphite-600 uppercase tracking-wider">
                Competition
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-graphite-600 uppercase tracking-wider">
                Date Issued
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-graphite-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-paper divide-y divide-paper-line">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((cert) => (
                <tr key={cert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-graphite-900">
                    {cert.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-600">
                    {cert.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-600">
                    {cert.competition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-600">
                    {cert.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      cert.status === 'Available'
                        ? 'bg-redpen-50 text-redpen-700'
                        : 'bg-paper-ink text-graphite-600'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {cert.downloadUrl ? (
                      <a
                        href={cert.downloadUrl}
                        className="text-redpen-600 hover:text-redpen-700 font-semibold"
                        download
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-graphite-400">Not available</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-graphite-600">
                  No certificates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-redpen-50 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-graphite-900">Need help with certificates?</h3>
        <p className="mt-2 text-graphite-700">
          If you&apos;re missing a certificate or need assistance, please contact{' '}
          <a href="mailto:certificates@canadianmathleague.com" className="text-redpen-600 font-semibold underline">
            certificates@canadianmathleague.com
          </a>
        </p>
      </div>
    </div>
  );
}