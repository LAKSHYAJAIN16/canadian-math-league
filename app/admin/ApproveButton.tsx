'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ApproveButton({ registrationId }: { registrationId: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleApprove = async () => {
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch(`/api/admin/registrations/${registrationId}/approve`, {
        method: 'POST',
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error ?? 'Failed to approve registration')
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve registration')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleApprove}
        disabled={isSubmitting}
        className={`btn-press px-4 py-2 rounded-full text-sm font-semibold text-white ${
          isSubmitting ? 'bg-graphite-400 cursor-not-allowed' : 'bg-redpen-600 hover:bg-redpen-700 shadow-red-glow'
        }`}
      >
        {isSubmitting ? 'Approving...' : 'Approve & Create Teams'}
      </button>
      {error && <p className="text-xs text-redpen-600">{error}</p>}
    </div>
  )
}
