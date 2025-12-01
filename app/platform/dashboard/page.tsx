'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/config';

interface TeamMember {
  name: string;
  email: string;
}

interface Team {
  id: string;
  members: TeamMember[];
}

interface TeamData {
  schoolName: string;
  teacherName: string;
  teacherEmail: string;
  teams: Team[];
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isContestStarted: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // December 15, 2025 11:00 AM Eastern Time (ET)
      // Note: This will use the user's local timezone
      const contestDate = new Date('December 15, 2025 11:00:00 EST').getTime();
      const now = new Date().getTime();
      const distance = contestDate - now;
      
      if (distance < 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isContestStarted: true
        };
      }
      
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isContestStarted: false
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial call
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Time to Group Stage</h2>
      <div className="text-left">
        {timeLeft.isContestStarted ? (
          <div className="text-2xl font-bold text-green-600">
            Group Stage is Live!
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{timeLeft.days}</div>
              <div className="text-xs text-gray-500">days</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{timeLeft.hours}</div>
              <div className="text-xs text-gray-500">hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-500">minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-500">seconds</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editingMembers, setEditingMembers] = useState<TeamMember[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

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

  const startEditing = (team: Team) => {
    setEditingTeamId(team.id);
    setEditingMembers(JSON.parse(JSON.stringify(team.members)));
  };

  const cancelEditing = () => {
    setEditingTeamId(null);
    setEditingMembers([]);
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...editingMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setEditingMembers(updatedMembers);
  };

  const saveTeamChanges = async (teamId: string) => {
    if (!teamData) return;
    
    try {
      setIsSaving(true);
      setError('');

      const auth = localStorage.getItem('teacherAuth');
      if (!auth) {
        router.push('/platform/login');
        return;
      }

      const { teamId: userTeamId } = JSON.parse(auth);
      const teamRef = doc(db, 'teams', userTeamId);
      
      const updatedTeams = teamData.teams.map(t => 
        t.id === teamId ? { ...t, members: [...editingMembers] } : t
      );
      
      await updateDoc(teamRef, {
        teams: updatedTeams,
        updatedAt: serverTimestamp()
      });

      // Update local state
      setTeamData({
        ...teamData,
        teams: updatedTeams
      });

      setEditingTeamId(null);
      setEditingMembers([]);
    } catch (err) {
      console.error('Error updating team:', err);
      setError('Failed to update team. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Welcome back, {teamData.schoolName}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* School Info Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">School Information</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">School:</span> {teamData.schoolName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {teamData.teacherEmail}
            </p>
          </div>
        </div>

        {/* Teams Summary Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Teams Summary</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Teams:</span> {teamData.teams?.length || 0}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Students:</span>{' '}
              {teamData.teams?.reduce((acc, team) => acc + (team.members?.length || 0), 0) || 0}
            </p>
          </div>
        </div>

        {/* Countdown Timer Card */}
        <CountdownTimer />
      </div>

      {/* Teams List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Teams</h2>
        {teamData.teams?.map((team, teamIndex) => (
          <div key={team.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Team {teamIndex + 1}</h3>
              {editingTeamId === team.id ? (
                <div className="space-x-2">
                  <button
                    onClick={() => cancelEditing()}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveTeamChanges(team.id)}
                    disabled={isSaving}
                    className="px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEditing(team)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <span className="material-icons text-sm mr-1">edit</span>
                  Edit Team
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              {(editingTeamId === team.id ? editingMembers : team.members).map((member, memberIndex) => (
                <div key={memberIndex} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Member {memberIndex + 1} Name
                      </label>
                      {editingTeamId === team.id ? (
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(memberIndex, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          placeholder="Enter name"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{member.name || 'New Member'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Email
                      </label>
                      {editingTeamId === team.id ? (
                        <input
                          type="email"
                          value={member.email || ''}
                          onChange={(e) => handleMemberChange(memberIndex, 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          placeholder="Enter email"
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{member.email || 'No email provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}