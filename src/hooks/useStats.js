import useStore from '../store/useStore'
import { getTodayString, getLastNDays, getDayLabel } from '../utils/dateHelpers'

/**
 * Computed Stats für den aktuellen Tag und historische Daten
 */
export function useStats() {
  const { stats, days, settings } = useStore()
  const today = getTodayString()
  const todayData = days[today] || { points: 0, moves: 0, seconds: 0, history: [] }

  const dailyProgress = settings.dailyGoal > 0
    ? Math.min(todayData.points / settings.dailyGoal, 1)
    : 0
  const dailyProgressPct = Math.round(dailyProgress * 100)
  const goalReached = todayData.points >= settings.dailyGoal

  // Daten der letzten 7 Tage für das Balkendiagramm
  const weekData = getLastNDays(7).map((date) => ({
    date,
    label: getDayLabel(date),
    points: days[date]?.points || 0,
    isToday: date === today,
  }))

  const maxWeekPoints = Math.max(...weekData.map((d) => d.points), settings.dailyGoal, 1)

  // Lieblingsübung (die am häufigsten abgeschlossene)
  const exerciseCounts = {}
  Object.values(days).forEach((day) => {
    day.history?.forEach((entry) => {
      exerciseCounts[entry.exerciseId] = (exerciseCounts[entry.exerciseId] || {
        name: entry.name,
        icon: entry.icon,
        count: 0,
      })
      exerciseCounts[entry.exerciseId].count++
    })
  })
  const favoriteExercise = Object.values(exerciseCounts).sort((a, b) => b.count - a.count)[0] || null

  // Kategorie-Verteilung (gesamt)
  const categoryTotals = { kraft: 0, dehnen: 0, cardio: 0 }
  Object.values(days).forEach((day) => {
    // Wir nutzen exercises.js für die Kategorie-Info nicht direkt hier,
    // daher tracken wir es über die History separat – das ist eine Vereinfachung
  })

  return {
    todayPoints: todayData.points,
    todayMoves: todayData.moves,
    todaySeconds: todayData.seconds,
    todayHistory: todayData.history,
    dailyGoal: settings.dailyGoal,
    dailyProgress,
    dailyProgressPct,
    goalReached,
    currentStreak: stats.currentStreak,
    longestStreak: stats.longestStreak,
    totalPoints: stats.totalPoints,
    totalMoves: stats.totalMoves,
    weekData,
    maxWeekPoints,
    favoriteExercise,
  }
}
