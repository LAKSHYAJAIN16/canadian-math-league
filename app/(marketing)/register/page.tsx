'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PROVINCES } from '@/lib/content/provinces';

interface FormStatus {
  success: boolean;
  message: string;
}

interface TeamMember {
  name: string;
  email: string;
}

interface Team {
  id: number;
  members: TeamMember[];
}

interface FormData {
  schoolName: string;
  province: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  numberOfTeams: number;
  teams: Team[];
}

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<FormStatus | null>(null);
  const [formData, setFormData] = useState<FormData>({
    // School Information
    schoolName: '',
    province: '',
    
    // Teacher Contact
    teacherName: '',
    teacherEmail: '',
    teacherPhone: '',
    
    // Team Information
    numberOfTeams: 1,
    teams: [
      {
        id: 1,
        members: Array.from({ length: 5 }, () => ({ name: '', email: '' }))
      }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle team member changes
    if (name.startsWith('team-')) {
      const [_, teamIndex, memberIndex, field] = name.split('-');
      const updatedTeams: Team[] = [...formData.teams];
      updatedTeams[parseInt(teamIndex)].members[parseInt(memberIndex)][field as 'name' | 'email'] = value;
      
      setFormData(prev => ({
        ...prev,
        teams: updatedTeams
      }));
      return;
    }
    
    // Handle number of teams change
    if (name === 'numberOfTeams') {
      const numTeams = parseInt(value) || 1;
      const currentTeamCount = formData.teams.length;
      
      let updatedTeams: Team[] = [...formData.teams];
      
      // Add or remove teams based on the new count
      if (numTeams > currentTeamCount) {
        for (let i = currentTeamCount; i < numTeams; i++) {
          updatedTeams.push({
            id: i + 1,
            members: Array.from({ length: 5 }, () => ({ name: '', email: '' }))
          });
        }
      } else if (numTeams < currentTeamCount) {
        updatedTeams = updatedTeams.slice(0, numTeams);
      }
      
      setFormData(prev => ({
        ...prev,
        numberOfTeams: numTeams,
        teams: updatedTeams
      }));
      return;
    }
    
    // Handle other fields
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.schoolName || !formData.province || !formData.teacherName || 
        !formData.teacherEmail || !formData.teacherPhone) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Validate at least one team has members
    const hasValidTeams = formData.teams.some(team => 
      team.members.some(member => member.name && member.email)
    );

    if (!hasValidTeams) {
      setSubmitStatus({
        success: false,
        message: 'Please add at least one team member.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submissionData = {
        schoolName: formData.schoolName,
        province: formData.province,
        teacherName: formData.teacherName,
        teacherEmail: formData.teacherEmail,
        teacherPhone: formData.teacherPhone,
        teams: formData.teams.map((team, index) => ({
          index: index + 1,
          members: team.members,
        })),
      };

      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error ?? 'Failed to submit registration');
      }

      router.push('/register/success');

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred while submitting the form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-paper shadow-lg rounded-lg overflow-hidden"
        >
          <div className="px-6 py-8 md:px-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-graphite-900">School Registration</h1>
              <p className="mt-2 text-graphite-600">
                Register your school to participate in the Canadian Math League competitions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* School Information */}
              <div className="bg-paper rounded-lg border border-paper-line overflow-hidden">
                <div className="bg-paper px-6 py-3 border-b">
                  <h2 className="text-xl font-semibold text-graphite-700">
                    School Information
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="schoolName" className="block text-sm font-medium text-graphite-700 mb-1">
                      School Name <span className="text-redpen-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-graphite-300 shadow-sm focus:border-redpen-500 focus:ring-blueprint-600 p-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-graphite-700 mb-1">
                      Province/Territory <span className="text-redpen-600">*</span>
                    </label>
                    <select
                      id="province"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleChange}
                      className="block w-full rounded-md border-graphite-300 shadow-sm focus:border-redpen-500 focus:ring-blueprint-600 p-2 border bg-paper"
                    >
                      <option value="">Select a province/territory</option>
                      {PROVINCES.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Teacher Contact */}
              <div className="bg-paper rounded-lg border border-paper-line overflow-hidden">
                <div className="bg-paper px-6 py-3 border-b">
                  <h2 className="text-xl font-semibold text-graphite-700">
                    Teacher Contact
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="teacherName" className="block text-sm font-medium text-graphite-700">
                      Teacher Name <span className="text-redpen-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="teacherName"
                      name="teacherName"
                      required
                      value={formData.teacherName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-graphite-300 shadow-sm focus:border-redpen-500 focus:ring-blueprint-600 p-2 border"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="teacherEmail" className="block text-sm font-medium text-graphite-700">
                      Email <span className="text-redpen-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="teacherEmail"
                      name="teacherEmail"
                      required
                      value={formData.teacherEmail}
                      onChange={handleChange}
                      className="block w-full rounded-md border-graphite-300 shadow-sm focus:border-redpen-500 focus:ring-blueprint-600 p-2 border"
                      placeholder="john@school.edu"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="teacherPhone" className="block text-sm font-medium text-graphite-700">
                      Phone Number <span className="text-redpen-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="teacherPhone"
                      name="teacherPhone"
                      required
                      value={formData.teacherPhone}
                      onChange={handleChange}
                      className="block w-full rounded-md border-graphite-300 shadow-sm focus:border-redpen-500 focus:ring-blueprint-600 p-2 border"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
              </div>

              {/* Team Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-graphite-700 mb-2">
                    Team Information
                  </h2>
                  <p className="text-sm text-graphite-600 mb-4">
                    Register up to 3 teams with 5 students each
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <label htmlFor="numberOfTeams" className="block text-sm font-medium text-graphite-700">
                      Number of Teams:
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            const numTeams = num;
                            const updatedTeams: Team[] = [];
                            
                            for (let i = 0; i < numTeams; i++) {
                              updatedTeams.push({
                                id: i + 1,
                                members: Array.from({ length: 5 }, () => ({ name: '', email: '' }))
                              });
                            }
                            
                            setFormData(prev => ({
                              ...prev,
                              numberOfTeams: numTeams,
                              teams: updatedTeams
                            }));
                          }}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            formData.numberOfTeams === num 
                              ? 'bg-redpen-600 text-white' 
                              : 'bg-paper-ink text-graphite-700 hover:bg-gray-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {formData.teams.map((team, teamIndex) => (
                    <div key={team.id} className="bg-paper border border-paper-line rounded-lg overflow-hidden">
                      <div className="bg-paper px-6 py-3 border-b">
                        <h3 className="text-lg font-medium text-graphite-900">
                          Team {teamIndex + 1}
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {team.members.map((member, memberIndex) => (
                            <div key={memberIndex} className="space-y-2">
                              <h4 className="text-sm font-medium text-graphite-700">
                                Student {memberIndex + 1} <span className="text-redpen-600">*</span>
                              </h4>
                              <div className="space-y-2">
                                <div>
                                  <input
                                    type="text"
                                    name={`team-${teamIndex}-${memberIndex}-name`}
                                    placeholder="Full name"
                                    required
                                    value={member.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-graphite-300 shadow-sm focus:border-redpen-500 focus:ring-blueprint-600 p-2 border"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="email"
                                    name={`team-${teamIndex}-${memberIndex}-email`}
                                    placeholder="Email address"
                                    required
                                    value={member.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-graphite-300 shadow-sm focus:border-redpen-500 focus:ring-blueprint-600 p-2 border"
                                  />
                                </div>
                              </div>
                              {memberIndex < 4 && (
                                <div className="h-px bg-paper-ink my-4"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-paper-line">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSubmitting 
                      ? 'bg-red-400 cursor-not-allowed' 
                      : 'bg-redpen-600 hover:bg-redpen-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueprint-600'
                  } transition-colors duration-200`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
