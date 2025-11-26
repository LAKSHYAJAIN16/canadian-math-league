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

export default function DashboardPage() {
  const router = useRouter();
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
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

  const handleEditTeam = (team: Team) => {
    setEditingTeam(JSON.parse(JSON.stringify(team)));
  };

  const handleMemberChange = (index: number, name: string) => {
    if (!editingTeam) return;
    const updatedMembers = [...editingTeam.members];
    updatedMembers[index] = { ...updatedMembers[index], name };
    setEditingTeam({ ...editingTeam, members: updatedMembers });
  };

  const saveTeamChanges = async () => {
    if (!editingTeam || !teamData) return;
    
    try {
      setIsSaving(true);
      setError('');

      const auth = localStorage.getItem('teacherAuth');
      if (!auth) {
        router.push('/platform/login');
        return;
      }

      const { teamId } = JSON.parse(auth);
      const teamRef = doc(db, 'teams', teamId);
      
      await updateDoc(teamRef, {
        teams: teamData.teams.map(t => 
          t.id === editingTeam.id ? editingTeam : t
        ),
        updatedAt: serverTimestamp()
      });

      // Update local state
      setTeamData({
        ...teamData,
        teams: teamData.teams.map(t => 
          t.id === editingTeam.id ? editingTeam : t
        )
      });

      setEditingTeam(null);
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
        <p className="mt-1 text-sm text-gray-600">Welcome back, {teamData.teacherName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* School Info Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <span className="material-icons text-blue-600">school</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900">School Information</h2>
          </div>
          <div className="space-y-2 pl-11">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="material-icons text-gray-400 text-base mr-2">apartment</span>
              <span><span className="font-medium">School:</span> {teamData.schoolName}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="material-icons text-gray-400 text-base mr-2">person</span>
              <span><span className="font-medium">Teacher:</span> {teamData.teacherName}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="material-icons text-gray-400 text-base mr-2">email</span>
              <span><span className="font-medium">Email:</span> {teamData.teacherEmail}</span>
            </p>
          </div>
        </div>

        {/* Teams Summary Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <span className="material-icons text-green-600">groups</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Teams Summary</h2>
          </div>
          <div className="space-y-2 pl-11">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="material-icons text-gray-400 text-base mr-2">group_work</span>
              <span><span className="font-medium">Total Teams:</span> {teamData.teams?.length || 0}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="material-icons text-gray-400 text-base mr-2">people</span>
              <span>
                <span className="font-medium">Total Students:</span>{' '}
                {teamData.teams?.reduce((acc, team) => acc + (team.members?.length || 0), 0) || 0}
              </span>
            </p>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <span className="material-icons text-purple-600">bolt</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-3 pl-11">
            <button className="w-full flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
              <span className="material-icons text-base mr-2">emoji_events</span>
              View Competition Details
            </button>
            <button className="w-full flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
              <span className="material-icons text-base mr-2">file_download</span>
              Download Team Roster
            </button>
            <button className="w-full flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
              <span className="material-icons text-base mr-2">edit</span>
              Update Contact Information
            </button>
          </div>
        </div>
      </div>

      {/* Teams List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Teams</h2>
        {teamData.teams?.map((team, teamIndex) => (
          <div key={team.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Team {teamIndex + 1}</h3>
              <button
                onClick={() => handleEditTeam(team)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="material-icons text-sm mr-1">edit</span>
                Edit Team
              </button>
            </div>
            
            <div className="space-y-3">
              {team.members.map((member, memberIndex) => (
                <div key={memberIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name || 'New Member'}</p>
                    <p className="text-xs text-gray-500">{member.email || 'No email provided'}</p>
                  </div>
                  <span className="text-xs text-gray-400">Member {memberIndex + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Team Modal */}
      {editingTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Team Members</h3>
                <button
                  onClick={() => setEditingTeam(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {editingTeam.members.map((member, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-10">
                      <label htmlFor={`member-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Member {index + 1} Name
                      </label>
                      <input
                        type="text"
                        id={`member-${index}`}
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter member name"
                      />
                    </div>
                    <div className="col-span-2 flex items-end h-full">
                      <div className="text-sm text-gray-500 mb-1">
                        {member.email || 'No email'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                
                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingTeam(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveTeamChanges}
                    disabled={isSaving}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <span className="material-icons animate-spin mr-2">refresh</span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}