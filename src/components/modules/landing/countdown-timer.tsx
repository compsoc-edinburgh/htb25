"use client"

import { useEffect, useState } from "react"

const TIME_UNITS = {
  DAYS: 86400,
  HOURS: 3600,
  MINUTES: 60,
  SECONDS: 1
} as const

interface TimeUnit {
  value: number
  label: string
}

export function CountdownTimer() {
  const TARGET_DATE = new Date('2025-03-01T09:00:00')

  const calculateTimeLeft = (): number => {
    const diff = TARGET_DATE.getTime() - Date.now()
    return Math.max(0, Math.floor(diff / 1000))
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    if (timeLeft === 0) return

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (time: number): string => time.toString().padStart(2, "0")

  const calculateTimeUnits = (): TimeUnit[] => [
    { value: Math.floor(timeLeft / TIME_UNITS.DAYS), label: "days" },
    { value: Math.floor((timeLeft % TIME_UNITS.DAYS) / TIME_UNITS.HOURS), label: "hrs" },
    { value: Math.floor((timeLeft % TIME_UNITS.HOURS) / TIME_UNITS.MINUTES), label: "mins" },
    { value: Math.floor(timeLeft % TIME_UNITS.MINUTES), label: "secs" }
  ]

  return (
    <div className="grid grid-cols-4 gap-12">
      {calculateTimeUnits().map(({ value, label }) => (
        <div key={label} className="flex flex-col">
          <span className="text-4xl md:text-5xl font-tektur font-bold tabular-nums">
            {formatTime(value)}
          </span>
          <p className="text-lg md:text-xl font-tektur text-right">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}
