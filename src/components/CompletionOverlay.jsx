import { useEffect, useState } from 'react'
import useStore from '../store/useStore'

const MOTIVATIONS = [
  'Großartig! Du bist unaufhaltsam! 💪',
  'Bewegt! Dein Körper dankt dir! 🌟',
  'Das war stark! Weiter so! 🔥',
  'Ausgezeichnet! Du machst das fantastisch! ⚡',
  'Power! So sieht Erfolg aus! 🏆',
  'Perfekt! Jede Bewegung zählt! ✨',
  'Klasse! Du wirst jeden Tag besser! 🎯',
  'Wow! Das war richtig gut! 🚀',
  'Stark! Dein Körper wird es morgen spüren – positiv! 💚',
]

export default function CompletionOverlay() {
  const { lastCompletedExercise, dismissCompletion } = useStore()
  const [message] = useState(() => MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)])
  const [showPoints, setShowPoints] = useState(false)

  useEffect(() => {
    // Punkte-Animation mit leichter Verzögerung
    const t = setTimeout(() => setShowPoints(true), 300)
    return () => clearTimeout(t)
  }, [])

  const points = lastCompletedExercise?.points || 0

  return (
    <div className="fixed inset-0 z-50 bg-[#0f1117]/95 backdrop-blur-sm flex flex-col items-center justify-center px-6 max-w-[480px] mx-auto left-1/2 -translate-x-1/2">
      {/* Check-Icon */}
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center mb-6 animate-scale-in"
        style={{
          background: 'linear-gradient(135deg, #4ade80, #a3e635)',
          boxShadow: '0 0 60px rgba(74, 222, 128, 0.4)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-14 h-14"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Übungsinfo */}
      <div className="text-center mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <span className="text-5xl mb-3 block">{lastCompletedExercise?.icon}</span>
        <h2 className="font-display text-3xl text-white mb-1">{lastCompletedExercise?.name}</h2>
        <p className="text-white/50 text-sm">abgeschlossen!</p>
      </div>

      {/* Punkte-Anzeige */}
      <div
        className={`transition-all duration-500 ${showPoints ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div
          className="flex items-center gap-2 px-6 py-3 rounded-2xl mb-6"
          style={{ background: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74, 222, 128, 0.3)' }}
        >
          <span className="font-display text-4xl font-bold text-accent-green">+{points}</span>
          <span className="text-accent-green/70 font-medium">Punkte</span>
        </div>
      </div>

      {/* Motivations-Nachricht */}
      <p
        className="text-white/70 text-center text-sm px-4 mb-8 animate-slide-up"
        style={{ animationDelay: '200ms' }}
      >
        {message}
      </p>

      {/* Weiter-Button */}
      <button
        onClick={dismissCompletion}
        className="w-full max-w-xs py-4 rounded-2xl font-bold text-black bg-gradient-to-r from-accent-green to-accent-lime shadow-lg shadow-green-500/20 hover:opacity-90 transition-opacity btn-tap text-sm animate-slide-up"
        style={{ animationDelay: '300ms' }}
      >
        Weiter 🚀
      </button>
    </div>
  )
}
