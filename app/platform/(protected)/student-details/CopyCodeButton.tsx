'use client'

import { useState } from 'react'
import { FiCopy } from 'react-icons/fi'

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="relative text-gray-500 hover:text-indigo-600 transition-colors"
      aria-label="Copy join code"
    >
      <FiCopy className="w-5 h-5" />
      {copied && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Copied!
        </span>
      )}
    </button>
  )
}
