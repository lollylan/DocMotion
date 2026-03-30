import { formatTime } from '../utils/dateHelpers'

const DIFFICULTY_COLORS = {
  1: 'text-accent-green',
  2: 'text-accent-orange',
  3: 'text-accent-red',
}

/**
 * Chronologische Liste der heute erledigten Übungen
 * @param {{ history: Array }} props
 */
export default function TodayHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <span className="text-4xl mb-3">🌅</span>
        <p className="text-white/40 text-sm">
          Noch keine Übungen heute.
        </p>
        <p className="text-white/25 text-xs mt-1">Starte deine erste Challenge!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {[...history].reverse().map((entry, i) => (
        <div
          key={`${entry.exerciseId}-${entry.completedAt}`}
          className="flex items-center gap-3 bg-bg-card-2 rounded-xl px-4 py-3 animate-slide-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <span className="text-2xl select-none" role="img" aria-label={entry.name}>
            {entry.icon}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-white truncate">{entry.name}</p>
            <p className="text-white/40 text-xs">{formatTime(entry.completedAt)}</p>
          </div>
          <div className="flex items-center gap-1 bg-accent-green/10 px-2.5 py-1 rounded-full">
            <span className="text-accent-green font-bold text-sm">+{entry.points}</span>
            <span className="text-accent-green/60 text-xs">Pkt</span>
          </div>
        </div>
      ))}
    </div>
  )
}
