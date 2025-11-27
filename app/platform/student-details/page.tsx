'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { FiCopy } from 'react-icons/fi';
import { db } from '@/lib/config';

interface TeamMember {
  name: string;
  email: string;
  id?: string;
}

interface Team {
  id: string;
  members: TeamMember[];
}

interface TeamData {
  schoolName: string;
  teams: Team[];
}

export default function StudentDetailsPage() {
  const router = useRouter();
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const auth = localStorage.getItem('teacherAuth');
        if (!auth) {
          router.push('/platform/login');
          return;
        }

        if (db) {
          const { teamId } = JSON.parse(auth);
          const docRef = doc(db, 'teams', teamId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setTeamData(docSnap.data() as TeamData);
          } else {
            setError('Team data not found');
          }
        }
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return null;
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Details</h1>
        <p className="mt-1 text-sm text-gray-600">View student information for {teamData.schoolName}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamData.teams.flatMap((team) =>
          team.members.map((member, index) => {
            // Remove 'member-' prefix if it exists
            const cleanId = member.id ? member.id.replace(/^member-/, '') : '';
            return (
              <div 
                key={`${team.id}-${member.id || index}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow"
              >
                <div className="relative">
                  <div className="flex items-center justify-between mb-2 p-2 hover:bg-gray-50 rounded">
                    <span className="font-mono text-black text-lg font-extrabold select-all">
                      {cleanId || 'N/A'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(cleanId);
                      }}
                      className="relative text-gray-500 hover:text-indigo-600 transition-colors"
                      aria-label="Copy ID"
                    >
                      <FiCopy className="w-5 h-5" />
                      {copiedId === cleanId && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-gray-700 p-2">
                  {member.name || 'Unnamed Student'}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
