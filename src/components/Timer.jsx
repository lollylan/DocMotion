import { useEffect } from 'react'
import useStore from '../store/useStore'
import { useTimer } from '../hooks/useTimer'

export default function Timer() {
  const { currentExercise, completeExercise, cancelTimer } = useStore()
  const duration = currentExercise?.duration || 30

  const { timeLeft, isRunning, isPaused, progress, isLastSeconds, start, pause, resume, stop } =
    useTimer(duration)

  // Timer automatisch starten
  useEffect(() => {
    start(completeExercise)
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCancel = () => {
    stop()
    cancelTimer()
  }

  const circumference = 2 * Math.PI * 54
  const strokeOffset = circumference * (1 - progress)

  return (
    <div className="fixed inset-0 z-50 bg-[#0f1117] flex flex-col items-center justify-between px-6 py-12 max-w-[480px] mx-auto left-1/2 -translate-x-1/2">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button
          onClick={handleCancel}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all btn-tap"
          aria-label="Abbrechen"
        >
          ✕
        </button>
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-wider">Aktuell</p>
          <p className="text-white font-semibold text-sm">{currentExercise?.name}</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Übungs-Emoji */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-7xl select-none animate-bounce-soft" role="img" aria-label={currentExercise?.name}>
          {currentExercise?.icon}
        </span>
        <p className="text-white/50 text-sm text-center px-4">{currentExercise?.description}</p>
      </div>

      {/* Timer-Ring */}
      <div className="relative flex items-center justify-center">
        <svg width="160" height="160" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
          {/* Hintergrund */}
          <circle cx="60" cy="60" r="54" fill="none" stroke="#1e2433" strokeWidth="8" />
          {/* Fortschritt */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={isLastSeconds ? '#f87171' : 'url(#timerGrad)'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }}
          />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#a3e635" />
            </linearGradient>
          </defs>
        </svg>

        {/* Countdown-Zahl */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-display text-5xl font-bold tabular-nums transition-colors ${
              isLastSeconds ? 'text-accent-red animate-pulse' : 'text-white'
            }`}
          >
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Fortschrittsbalken */}
      <div className="w-full">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              isLastSeconds
                ? 'bg-accent-red'
                : 'bg-gradient-to-r from-accent-green to-accent-lime'
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-white/30 text-xs">0s</span>
          <span className="text-white/30 text-xs">{duration}s</span>
        </div>
      </div>

      {/* Pause / Weiter */}
      <button
        onClick={isPaused ? resume : pause}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all btn-tap ${
          isPaused
            ? 'bg-gradient-to-r from-accent-green to-accent-lime text-black shadow-lg shadow-green-500/20'
            : 'bg-bg-card-2 text-white/70 hover:bg-white/10'
        }`}
      >
        {isPaused ? '▶  Weiter' : '⏸  Pause'}
      </button>
    </div>
  )
}
