'use client'

import { useEffect, useState } from 'react'

function getTimeLeft(targetMs: number) {
  const distance = targetMs - Date.now()
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true }
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    started: false,
  }
}

export function CountdownTimer({ targetMs }: { targetMs: number }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetMs))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetMs)), 1000)
    return () => clearInterval(timer)
  }, [targetMs])

  return (
    <div className="border-2 border-ink-900 bg-ledger p-6">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-700 mb-4">Time to group stage</h2>
      {timeLeft.started ? (
        <div className="font-sans text-2xl text-stamp-600">Group Stage is live!</div>
      ) : (
        <div className="grid grid-cols-4 gap-2 text-center">
          {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
            <div key={unit}>
              <div className="scoreboard-digit font-sans text-2xl text-stamp-600">{timeLeft[unit]}</div>
              <div className="font-mono text-[0.625rem] uppercase tracking-wide text-ink-500">{unit}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
