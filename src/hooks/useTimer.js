import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Countdown-Timer Hook
 * @param {number} duration - Gesamtdauer in Sekunden
 * @returns {{ timeLeft, isRunning, isPaused, progress, start, pause, resume, stop }}
 */
export function useTimer(duration) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const onCompleteRef = useRef(null)

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const start = useCallback(
    (onComplete) => {
      onCompleteRef.current = onComplete
      setTimeLeft(duration)
      setIsRunning(true)
      setIsPaused(false)
    },
    [duration]
  )

  const pause = useCallback(() => {
    setIsRunning(false)
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const stop = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer()
            setIsRunning(false)
            // Asynchron aufrufen, um State-Updates nicht zu blockieren
            setTimeout(() => onCompleteRef.current?.(), 0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearTimer()
    }

    return clearTimer
  }, [isRunning])

  // Fortschritt: 0 = Anfang, 1 = Ende
  const progress = duration > 0 ? 1 - timeLeft / duration : 0
  const isLastSeconds = timeLeft <= 5 && timeLeft > 0 && isRunning

  return { timeLeft, isRunning, isPaused, progress, isLastSeconds, start, pause, resume, stop }
}
