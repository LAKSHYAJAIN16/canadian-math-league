// app/pre-season/page.tsx
'use client'

import Image from 'next/image'
import Emmanuel from '../emmauel.jpg'
const problemSets = [
  {
    id: 1,
    title: 'Week 1',
    pdfUrl: '/problem-sets/week1-algebra-fundamentals.pdf',
    solutionsUrl: '/solutions/week1-solutions.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'This week\'s problem set focuses on fundamental algebraic concepts including solving linear equations, working with polynomials, and understanding inequalities. Perfect for beginners looking to strengthen their algebra skills.'
  },
  {
    id: 2,
    title: 'Week 2',
    pdfUrl: '/problem-sets/week2-number-theory.pdf',
    solutionsUrl: '/solutions/week2-solutions.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Dive into the fascinating world of number theory with problems on prime numbers, modular arithmetic, and divisibility rules. This set will challenge your understanding of integers and their properties.'
  },
  {
    id: 3,
    title: 'Week 3',
    pdfUrl: '/problem-sets/week3-geometry-basics.pdf',
    solutionsUrl: '/solutions/week3-solutions.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Explore the foundations of geometry with problems involving triangles, circles, and angle relationships. This set is designed to build your geometric intuition and problem-solving skills.'
  },
  {
    id: 4,
    title: 'Week 4',
    pdfUrl: '/problem-sets/week4-combinatorics.pdf',
    solutionsUrl: '/solutions/week4-solutions.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Challenge yourself with combinatorial problems involving counting techniques, permutations, combinations, and the pigeonhole principle. These problems will sharpen your logical thinking and problem-solving abilities.'
  },
]

export default function PreSeasonPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pre-Season 2025</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Prepare for the upcoming season with our problem sets.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Our Problem Sets</h2>
                    <div className="prose prose-blue max-w-none text-gray-700 space-y-4">
                      <p>
                        The Canadian Math League is extremely grateful to Emmanuel Sackeyfio for creating these problem sets to help students prepare for mathematical challenges. These problems are designed to develop problem-solving skills and mathematical thinking.
                      </p>
                      <p>
                        We've carefully selected problems from various mathematical areas including algebra, number theory, geometry, and combinatorics. These problems are designed to be engaging and thought-provoking, while also helping students understand the format of the questions for the tournament.
                      </p>
                      <p>
                        Solutions are available for all of the problem sets. We encourage students to attempt the problems before checking the solutions to maximize learning.
                      </p>
                      <p className="font-medium text-blue-800">
                        Thank you, Emmanuel!
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex flex-col items-center">
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-300 shadow-lg">
                      <Image
                        src={Emmanuel}
                        alt="Dr. Emmanuel Sackeyfio"
                        width={224}
                        height={224}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-lg font-semibold text-gray-900">Emmanuel Sackeyfio</p>
                      <p className="text-sm text-gray-600">MSc candidate, University of Torontos</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {problemSets.map((set) => (
                  <article key={set.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 p-6">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{set.title}</h2>
                      <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={set.imageUrl}
                          alt={`Sample problem from ${set.title}`}
                          width={800}
                          height={450}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{set.description}</p>
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                      <a
                        href={set.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Problem Set (PDF)
                      </a>
                      <a
                        href={set.solutionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Solutions (PDF)
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}