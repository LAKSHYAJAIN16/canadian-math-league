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
              className="h-5 w-5 text-ink-500"
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
            className="block w-full pl-10 pr-3 py-2.5 border-2 border-ink-900 bg-ledger leading-5 placeholder-ink-500 focus:outline-none focus:border-stamp-600 focus:ring-2 focus:ring-stamp-600/30 sm:text-sm"
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
          className="btn-press inline-flex items-center px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-ledger bg-stamp-600 hover:bg-stamp-700"
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
          Request physical copies
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="font-sans text-3xl text-ink-900">Student certificates</h1>
        <p className="mt-2 text-lg text-ink-700">
          View and download certificates for your students
        </p>
      </div>

      <div className="border-2 border-ink-900 bg-ledger overflow-hidden">
        <table className="min-w-full divide-y divide-ink-900">
          <thead className="bg-ledger-deep">
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-mono text-[0.625rem] font-semibold text-ink-700 uppercase tracking-wider">
                Certificate ID
              </th>
              <th scope="col" className="px-6 py-3 text-left font-mono text-[0.625rem] font-semibold text-ink-700 uppercase tracking-wider">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3 text-left font-mono text-[0.625rem] font-semibold text-ink-700 uppercase tracking-wider">
                Competition
              </th>
              <th scope="col" className="px-6 py-3 text-left font-mono text-[0.625rem] font-semibold text-ink-700 uppercase tracking-wider">
                Date Issued
              </th>
              <th scope="col" className="px-6 py-3 text-left font-mono text-[0.625rem] font-semibold text-ink-700 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-ledger divide-y divide-ink-900">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((cert) => (
                <tr key={cert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-ink-900">
                    {cert.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-700">
                    {cert.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-700">
                    {cert.competition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-700">
                    {cert.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 inline-flex font-mono text-[0.625rem] leading-5 font-semibold uppercase tracking-wide border-2 ${
                      cert.status === 'Available'
                        ? 'border-stamp-600 bg-stamp-100 text-stamp-700'
                        : 'border-ink-900 bg-ledger-deep text-ink-700'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {cert.downloadUrl ? (
                      <a
                        href={cert.downloadUrl}
                        className="text-stamp-600 hover:text-stamp-700 font-semibold"
                        download
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-ink-500">Not available</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-ink-700">
                  No certificates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-2 border-ink-900 bg-ledger-deep p-6">
        <h3 className="font-sans text-lg text-ink-900">Need help with certificates?</h3>
        <p className="mt-2 text-ink-700">
          If you&apos;re missing a certificate or need assistance, please contact{' '}
          <a href="mailto:certificates@canadianmathleague.com" className="text-stamp-600 font-semibold underline">
            certificates@canadianmathleague.com
          </a>
        </p>
      </div>
    </div>
  );
}