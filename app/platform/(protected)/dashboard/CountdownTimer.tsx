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
    <div className="bg-paper p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-graphite-900 mb-4">Time to Group Stage</h2>
      {timeLeft.started ? (
        <div className="text-2xl font-bold text-blueprint-700">Group Stage is Live!</div>
      ) : (
        <div className="grid grid-cols-4 gap-2 text-center">
          {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
            <div key={unit}>
              <div className="text-2xl font-bold text-redpen-600">{timeLeft[unit]}</div>
              <div className="text-xs text-graphite-600">{unit}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
