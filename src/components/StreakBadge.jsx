/**
 * Streak-Anzeige mit Feuer-Emoji und Animations-Effekt
 * @param {{ streak: number }} props
 */
export default function StreakBadge({ streak }) {
  const isActive = streak > 0
  const isHot = streak >= 3

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
        isActive
          ? 'bg-orange-500/15 border border-orange-500/30'
          : 'bg-white/5 border border-white/10'
      }`}
    >
      <span
        className={`text-xl select-none ${isHot && isActive ? 'animate-wiggle' : ''}`}
        role="img"
        aria-label="Streak"
      >
        🔥
      </span>
      <div className="flex flex-col leading-none">
        <span
          className={`font-bold text-sm tabular-nums ${
            isActive ? 'text-orange-400' : 'text-white/40'
          }`}
        >
          {streak}
        </span>
        <span className="text-[10px] text-white/40">
          {streak === 1 ? 'Tag' : 'Tage'}
        </span>
      </div>
    </div>
  )
}
