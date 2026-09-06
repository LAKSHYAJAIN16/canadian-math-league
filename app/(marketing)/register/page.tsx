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

const inputClasses =
  'block w-full px-4 py-2.5 rounded-xl bg-ledger-deep/60 text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-stamp-600/40';
const labelClasses = 'block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2';

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
    <div className="min-h-screen bg-ledger py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl shadow-soft bg-ledger"
        >
          <div className="px-6 py-8 md:px-10">
            <div className="text-center mb-8">
              <h1 className="font-sans text-3xl text-ink-900">School Registration</h1>
              <p className="mt-2 text-ink-700">
                Register your school to participate in the Canadian Math League competitions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* School Information */}
              <div className="rounded-2xl shadow-soft bg-ledger">
                <div className="px-6 py-3 border-b border-ledger-line">
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700">
                    School Information
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="schoolName" className={labelClasses}>
                      School Name <span className="text-stamp-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="province" className={labelClasses}>
                      Province/Territory <span className="text-stamp-600">*</span>
                    </label>
                    <select
                      id="province"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleChange}
                      className={inputClasses}
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
              <div className="rounded-2xl shadow-soft bg-ledger">
                <div className="px-6 py-3 border-b border-ledger-line">
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700">
                    Teacher Contact
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="teacherName" className={labelClasses}>
                      Teacher Name <span className="text-stamp-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="teacherName"
                      name="teacherName"
                      required
                      value={formData.teacherName}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="teacherEmail" className={labelClasses}>
                      Email <span className="text-stamp-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="teacherEmail"
                      name="teacherEmail"
                      required
                      value={formData.teacherEmail}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="john@school.edu"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="teacherPhone" className={labelClasses}>
                      Phone Number <span className="text-stamp-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="teacherPhone"
                      name="teacherPhone"
                      required
                      value={formData.teacherPhone}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
              </div>

              {/* Team Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-2">
                    Team Information
                  </h2>
                  <p className="text-sm text-ink-700 mb-4">
                    Register up to 3 teams with 5 students each
                  </p>

                  <div className="flex items-center space-x-4 mb-6">
                    <label htmlFor="numberOfTeams" className="block font-mono text-xs font-semibold uppercase tracking-wide text-ink-700">
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
                          className={`btn-press rounded-full px-4 py-2 font-mono text-sm font-semibold ${
                            formData.numberOfTeams === num
                              ? 'shadow-stamp-glow bg-stamp-600 text-ledger'
                              : 'shadow-soft hover:shadow-soft-lg bg-ledger text-ink-900 hover:bg-ledger-deep'
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
                    <div key={team.id} className="rounded-2xl shadow-soft bg-ledger">
                      <div className="px-6 py-3 border-b border-ledger-line">
                        <h3 className="font-sans text-lg text-ink-900">
                          Team {teamIndex + 1}
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {team.members.map((member, memberIndex) => (
                            <div key={memberIndex} className="space-y-2">
                              <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700">
                                Student {memberIndex + 1} <span className="text-stamp-600">*</span>
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
                                    className={inputClasses}
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
                                    className={inputClasses}
                                  />
                                </div>
                              </div>
                              {memberIndex < 4 && (
                                <div className="h-px bg-ledger-line my-4"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {submitStatus && !submitStatus.success && (
                <div className="rounded-xl bg-stamp-100 p-3">
                  <p className="font-mono text-sm text-stamp-700">{submitStatus.message}</p>
                </div>
              )}

              <div className="pt-4 border-t border-ledger-line">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-press w-full flex justify-center items-center py-3.5 px-4 rounded-full shadow-stamp-glow font-mono text-sm font-semibold uppercase tracking-wide text-ledger bg-stamp-600 hover:bg-stamp-700 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
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
