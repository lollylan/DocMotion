import { useState, useEffect } from 'react'
import useStore from '../store/useStore'

const DIFFICULTY_LABELS = { 1: 'Leicht', 2: 'Mittel', 3: 'Schwer' }
const DIFFICULTY_COLORS = {
  1: 'text-accent-green bg-accent-green/10',
  2: 'text-accent-orange bg-orange-500/10',
  3: 'text-accent-red bg-red-500/10',
}
const CATEGORY_COLORS = {
  kraft: 'text-blue-400 bg-blue-400/10',
  dehnen: 'text-purple-400 bg-purple-400/10',
  cardio: 'text-orange-400 bg-orange-400/10',
}
const CATEGORY_LABELS = { kraft: 'Kraft', dehnen: 'Dehnen', cardio: 'Cardio' }

function DifficultyDots({ level }) {
  return (
    <div className="flex gap-1" aria-label={`Schwierigkeit: ${DIFFICULTY_LABELS[level]}`}>
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          className={`w-2 h-2 rounded-full transition-colors ${
            dot <= level ? 'bg-accent-orange' : 'bg-white/15'
          }`}
        />
      ))}
    </div>
  )
}

export default function ChallengeCard() {
  const { currentExercise, startExercise, skipExercise } = useStore()
  const [key, setKey] = useState(0)
  const [showInstructions, setShowInstructions] = useState(false)

  // Animation bei Übungswechsel
  useEffect(() => {
    setKey((k) => k + 1)
    setShowInstructions(false)
  }, [currentExercise?.id])

  if (!currentExercise) {
    return (
      <div className="bg-bg-card rounded-2xl p-6 text-center">
        <p className="text-white/40 text-sm">Keine Übungen verfügbar.</p>
        <p className="text-white/25 text-xs mt-1">Aktiviere Übungen in den Einstellungen.</p>
      </div>
    )
  }

  return (
    <div
      key={key}
      className="bg-bg-card rounded-2xl overflow-hidden animate-fade-in"
      style={{ animation: 'fadeIn 0.35s ease-out, bounceSoft 0.35s ease-out' }}
    >
      {/* Kategorie-Banner */}
      <div className="h-1 bg-gradient-to-r from-[#4ade80] to-[#a3e635]" />

      <div className="p-5">
        {/* Header: Icon + Kategorie */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl select-none" role="img" aria-label={currentExercise.name}>
            {currentExercise.icon}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[currentExercise.category]}`}>
              {CATEGORY_LABELS[currentExercise.category]}
            </span>
            <DifficultyDots level={currentExercise.difficulty} />
          </div>
        </div>

        {/* Name + Beschreibung */}
        <h2 className="font-display text-2xl text-white mb-2">{currentExercise.name}</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">{currentExercise.description}</p>

        {/* Metadaten */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 bg-bg-card-2 px-3 py-1.5 rounded-full">
            <span className="text-white/40 text-sm">⏱</span>
            <span className="text-white font-medium text-sm">{currentExercise.duration}s</span>
          </div>
          <div className="flex items-center gap-1.5 bg-accent-green/10 px-3 py-1.5 rounded-full">
            <span className="text-accent-green font-bold text-sm">+{currentExercise.points}</span>
            <span className="text-accent-green/60 text-xs">Punkte</span>
          </div>
          <div className={`text-xs font-semibold px-2.5 py-1.5 rounded-full ${DIFFICULTY_COLORS[currentExercise.difficulty]}`}>
            {DIFFICULTY_LABELS[currentExercise.difficulty]}
          </div>
        </div>

        {/* Schritt-für-Schritt Anleitung (ausklappbar) */}
        {currentExercise.instructions && (
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs mb-4 transition-colors"
          >
            <span>{showInstructions ? '▲' : '▼'}</span>
            <span>{showInstructions ? 'Anleitung ausblenden' : 'Anleitung anzeigen'}</span>
          </button>
        )}

        {showInstructions && currentExercise.instructions && (
          <ol className="mb-4 space-y-1.5 animate-slide-up">
            {currentExercise.instructions.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-white/70">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50 font-bold">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={startExercise}
            className="flex-1 py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-accent-green to-accent-lime shadow-lg shadow-green-500/20 hover:opacity-90 transition-opacity btn-tap text-sm"
          >
            Los geht's! 🚀
          </button>
          <button
            onClick={skipExercise}
            aria-label="Übung überspringen"
            className="w-12 h-12 rounded-xl bg-bg-card-2 text-white/50 hover:text-white hover:bg-white/10 transition-all btn-tap flex items-center justify-center text-xl"
          >
            ↩
          </button>
        </div>
      </div>
    </div>
  )
}
