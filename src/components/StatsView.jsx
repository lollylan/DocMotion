import { useStats } from '../hooks/useStats'
import useStore from '../store/useStore'
import { getCurrentMonthDays, getCurrentMonthName, formatDuration } from '../utils/dateHelpers'

export default function StatsView() {
  const { weekData, maxWeekPoints, totalPoints, totalMoves, currentStreak, longestStreak, favoriteExercise } = useStats()
  const { days } = useStore()

  const monthDays = getCurrentMonthDays()
  const monthName = getCurrentMonthName()

  // Max-Punkte für Heatmap-Skalierung
  const heatmapMax = Math.max(...Object.values(days).map((d) => d.points || 0), 1)

  const getHeatColor = (dateStr) => {
    if (!dateStr) return 'transparent'
    const pts = days[dateStr]?.points || 0
    if (pts === 0) return '#1e2433'
    const intensity = Math.min(pts / Math.max(heatmapMax, 30), 1)
    if (intensity < 0.33) return '#166534'
    if (intensity < 0.66) return '#16a34a'
    return '#4ade80'
  }

  return (
    <div className="flex flex-col pb-24 min-h-screen px-5">
      {/* Header */}
      <div className="pt-12 pb-6">
        <h1 className="font-display text-2xl text-white">Statistiken</h1>
        <p className="text-white/40 text-xs mt-0.5">Dein Fortschritt auf einen Blick</p>
      </div>

      {/* Gesamt-Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard emoji="⭐" label="Gesamtpunkte" value={totalPoints} />
        <StatCard emoji="🏅" label="Gesamte Moves" value={totalMoves} />
        <StatCard emoji="🔥" label="Akt. Streak" value={`${currentStreak}d`} accent />
        <StatCard emoji="🏆" label="Längster Streak" value={`${longestStreak}d`} />
      </div>

      {/* Lieblingsübung */}
      {favoriteExercise && (
        <div className="bg-bg-card rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-3xl">{favoriteExercise.icon}</span>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide">Lieblingsübung</p>
            <p className="text-white font-semibold">{favoriteExercise.name}</p>
            <p className="text-accent-green text-xs">{favoriteExercise.count}× abgeschlossen</p>
          </div>
        </div>
      )}

      {/* Wochendiagramm */}
      <div className="bg-bg-card rounded-2xl p-4 mb-6">
        <p className="text-white/60 text-sm font-semibold mb-4">Letzte 7 Tage</p>
        <div className="flex items-end gap-2 h-28">
          {weekData.map((day) => {
            const heightPct = maxWeekPoints > 0 ? (day.points / maxWeekPoints) * 100 : 0
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-white/50 text-[10px] tabular-nums">{day.points > 0 ? day.points : ''}</span>
                <div className="w-full rounded-t-lg overflow-hidden" style={{ height: '80px' }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-700 ${
                      day.isToday
                        ? 'bg-gradient-to-t from-accent-green to-accent-lime'
                        : 'bg-bg-card-2'
                    }`}
                    style={{
                      height: `${Math.max(heightPct, day.points > 0 ? 8 : 0)}%`,
                      marginTop: 'auto',
                    }}
                  />
                  {day.points === 0 && (
                    <div className="w-full h-full flex items-end justify-center pb-0">
                      <div className="w-full h-1 bg-bg-card-2 rounded-t" />
                    </div>
                  )}
                </div>
                <span className={`text-[10px] ${day.isToday ? 'text-accent-green font-bold' : 'text-white/30'}`}>
                  {day.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Kalender-Heatmap */}
      <div className="bg-bg-card rounded-2xl p-4 mb-6">
        <p className="text-white/60 text-sm font-semibold mb-4 capitalize">{monthName}</p>
        {/* Wochentag-Labels */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d) => (
            <div key={d} className="text-center text-[9px] text-white/25">{d}</div>
          ))}
        </div>
        {/* Heatmap-Zellen */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((dateStr, i) => (
            <div
              key={i}
              title={dateStr ? `${dateStr}: ${days[dateStr]?.points || 0} Pkt.` : ''}
              className="aspect-square rounded-sm"
              style={{ backgroundColor: getHeatColor(dateStr) }}
            />
          ))}
        </div>
        {/* Legende */}
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] text-white/30">Weniger</span>
          {['#1e2433', '#166534', '#16a34a', '#4ade80'].map((c) => (
            <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[10px] text-white/30">Mehr</span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ emoji, label, value, accent }) {
  return (
    <div className="bg-bg-card rounded-2xl p-4">
      <span className="text-2xl block mb-2">{emoji}</span>
      <p className="text-white/40 text-xs uppercase tracking-wide mb-1">{label}</p>
      <p className={`font-display text-2xl font-bold ${accent ? 'text-accent-green' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
