import { useEffect, useState } from 'react'

interface CountdownTarget {
  label: string
  targetDate: Date
  daysLeft: number
  hoursLeft: number
  minutesLeft: number
  secondsLeft: number
}

export function Countdown() {
  const [countdown, setCountdown] = useState<CountdownTarget | null>(null)

  useEffect(() => {
    // Default countdown target (end of this year)
    const defaultTarget = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)

    const calculateCountdown = () => {
      const now = new Date()
      const target = defaultTarget
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown(null)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setCountdown({
        label: 'End of Year',
        targetDate: target,
        daysLeft: days,
        hoursLeft: hours,
        minutesLeft: minutes,
        secondsLeft: seconds,
      })
    }

    calculateCountdown()
    const timer = setInterval(calculateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!countdown) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md">
        <p className="text-white/60 text-center">Countdown completed!</p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md">
      <div className="mb-6">
        <h3 className="text-white/80 text-center font-medium mb-4">{countdown.label}</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: countdown.daysLeft, label: 'Days' },
            { value: countdown.hoursLeft, label: 'Hours' },
            { value: countdown.minutesLeft, label: 'Mins' },
            { value: countdown.secondsLeft, label: 'Secs' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="bg-white/10 rounded-lg p-2 mb-2">
                <p className="text-white font-mono font-bold text-lg">
                  {String(item.value).padStart(2, '0')}
                </p>
              </div>
              <p className="text-white/50 text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
