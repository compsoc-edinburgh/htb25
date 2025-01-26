"use client"

import { memo } from "react"
import { Card, CardContent } from "~/components/ui/card"
import { useState, useEffect } from "react"

const TIME_UNITS = {
  DAYS: 86400,
  HOURS: 3600,
  MINUTES: 60,
  SECONDS: 1,
} as const

const TARGET_DATE = new Date("2025-03-01T00:00:00")

interface TimeUnit {
  value: number
  label: string
}

const formatTime = (time: number): string => time.toString().padStart(2, "0")

const calculateTimeUnits = (timeLeft: number): TimeUnit[] => [
  { value: Math.floor(timeLeft / TIME_UNITS.DAYS), label: "days" },
  { value: Math.floor((timeLeft % TIME_UNITS.DAYS) / TIME_UNITS.HOURS), label: "hrs" },
  { value: Math.floor((timeLeft % TIME_UNITS.HOURS) / TIME_UNITS.MINUTES), label: "mins" },
  { value: Math.floor(timeLeft % TIME_UNITS.MINUTES), label: "secs" },
]

const useCountdown = () => {
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

  return timeLeft
}

const TimeUnitDisplay = memo(({ value, label }: TimeUnit) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-5xl font-tektur font-bold" aria-label={`${value} ${label}`}>
      {formatTime(value)}
    </span>
    <p className="text-lg md:text-xl font-tektur">{label}</p>
  </div>
))

TimeUnitDisplay.displayName = "TimeUnitDisplay"

export function CountdownTimer() {
  const timeLeft = useCountdown()
  const timeUnits = calculateTimeUnits(timeLeft)

  return (
        <div className="grid grid-cols-4 gap-10" role="timer" aria-live="polite">
          {timeUnits.map(({ value, label }) => (
            <TimeUnitDisplay key={label} value={value} label={label} />
          ))}
        </div>
  )
}
