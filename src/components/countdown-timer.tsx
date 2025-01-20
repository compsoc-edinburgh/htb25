"use client"

import { useEffect, useState } from "react"

export function CountdownTimer() {
  const TARGET_DATE = new Date('2025-03-01T00:00:00')
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = TARGET_DATE.getTime() - Date.now()
    return Math.max(0, Math.floor(diff / 1000))
  })

  useEffect(() => {
    if (timeLeft === 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (time: number) => time.toString().padStart(2, "0")
  const timeUnits = [
    { value: Math.floor(timeLeft / 86400), label: "days" },
    { value: Math.floor((timeLeft % 86400) / 3600), label: "hrs" },
    { value: Math.floor((timeLeft % 3600) / 60), label: "mins" },
  ]

  return (
    <div className="grid grid-cols-3 gap-12">
      {timeUnits.map(({ value, label }) => (
        <div key={label}>
          <span className="text-5xl font-tektur font-bold">{formatTime(value)}</span>
          <p className="text-xl font-tektur text-left">{label}</p>
        </div>
      ))}
    </div>
  )
}
