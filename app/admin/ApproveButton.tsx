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
        className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isSubmitting ? 'Approving...' : 'Approve & Create Teams'}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
