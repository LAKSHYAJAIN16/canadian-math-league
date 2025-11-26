'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, createTeamsFromSubmission } from '@/lib/config';

// Hardcoded admin key
const ADMIN_KEY = 'canadian-math-league-2023-secret-key';

interface TeamMember {
  name: string;
  email: string;
}

interface Team {
  id: number;
  members: TeamMember[];
}

interface FormSubmission {
  id: string;
  schoolName: string;
  province: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  teams: Team[];
  submittedAt: string;
}

export default function AdminPage() {
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingTeams, setCreatingTeams] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const key = searchParams.get('key');
    if (key === ADMIN_KEY) {
      setIsAuthorized(true);
      fetchSubmissions();
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, [searchParams]);

  const fetchSubmissions = async () => {
    if (!db) {
      setError('Database not initialized');
      setIsLoading(false);
      return;
    }

    try {
      const submissionsQuery = query(
        collection(db, 'form_submissions'),
        orderBy('submittedAt', 'desc')
      );
      const querySnapshot = await getDocs(submissionsQuery);
      
      const submissionsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          schoolName: data.schoolName,
          province: data.province,
          teacherName: data.teacherName,
          teacherEmail: data.teacherEmail,
          teacherPhone: data.teacherPhone,
          teams: data.teams || [],
          submittedAt: data.submittedAt?.toDate().toString() || new Date().toString(),
        };
      });

      setSubmissions(submissionsData);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeams = async (submissionId: string) => {
    setCreatingTeams(prev => ({ ...prev, [submissionId]: true }));
    try {
      const teamId = await createTeamsFromSubmission(submissionId);
      alert(`Teams created successfully! Team ID: ${teamId}`);
      await fetchSubmissions(); // Refresh the submissions list
    } catch (error) {
      console.error('Error creating teams:', error);
      alert(`Error creating teams: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setCreatingTeams(prev => ({ ...prev, [submissionId]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Invalid or missing admin key</p>
          <p className="text-sm text-gray-500 mt-2">
            Use: /admin/secret?key=canadian-math-league-2023-secret-key
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchSubmissions}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Form Submissions</h1>
          <p className="text-gray-500 mb-4">Total submissions: {submissions.length}</p>
          
          {submissions.length === 0 ? (
            <p className="text-gray-500">No submissions found</p>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">School: {submission.schoolName}</h3>
                      <p>Province: {submission.province}</p>
                      <p>Teacher: {submission.teacherName}</p>
                      <p>Email: {submission.teacherEmail}</p>
                      <p>Phone: {submission.teacherPhone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Teams:</h4>
                      {submission.teams.map((team, index) => (
                        <div key={index} className="mt-2 pl-4 border-l-2 border-gray-200">
                          <p className="font-medium">Team {team.id}</p>
                          <ul className="list-disc pl-5">
                            {team.members.map((member, i) => (
                              <li key={i}>
                                {member.name} : {member.email}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleCreateTeams(submission.id)}
                      disabled={creatingTeams[submission.id]}
                      className={`px-4 py-2 rounded-md ${
                        creatingTeams[submission.id]
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {creatingTeams[submission.id] ? 'Creating Teams...' : 'Create Teams'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}