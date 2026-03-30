import ProgressRing from './ProgressRing'
import StreakBadge from './StreakBadge'
import CategoryFilter from './CategoryFilter'
import ChallengeCard from './ChallengeCard'
import TodayHistory from './TodayHistory'
import { useStats } from '../hooks/useStats'
import { formatDuration } from '../utils/dateHelpers'

export default function Dashboard() {
  const {
    todayPoints,
    todayMoves,
    todaySeconds,
    todayHistory,
    dailyGoal,
    dailyProgress,
    goalReached,
    currentStreak,
  } = useStats()

  return (
    <div className="flex flex-col pb-24 min-h-screen">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-white leading-tight">DocMotion</h1>
            <p className="text-white/40 text-xs mt-0.5">Dein täglicher Fitness-Push 💚</p>
          </div>
          <StreakBadge streak={currentStreak} />
        </div>
      </div>

      {/* Fortschrittsring + Tages-Stats */}
      <div className="flex items-center justify-between px-5 py-4">
        <ProgressRing
          progress={dailyProgress}
          points={todayPoints}
          goal={dailyGoal}
          goalReached={goalReached}
        />
        <div className="flex flex-col gap-4 flex-1 pl-6">
          <StatItem
            emoji="⚡"
            label="Punkte"
            value={`${todayPoints} / ${dailyGoal}`}
            highlight={goalReached}
          />
          <StatItem
            emoji="🏅"
            label="Moves"
            value={todayMoves}
          />
          <StatItem
            emoji="⏱"
            label="Zeit"
            value={formatDuration(todaySeconds)}
          />
        </div>
      </div>

      {/* Kategorie-Filter */}
      <div className="px-5 mb-4">
        <CategoryFilter />
      </div>

      {/* Challenge-Karte */}
      <div className="px-5 mb-6">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-3 font-medium">
          Aktuelle Challenge
        </p>
        <ChallengeCard />
      </div>

      {/* Heutiger Verlauf */}
      <div className="px-5">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-3 font-medium">
          Heute — {todayMoves} {todayMoves === 1 ? 'Move' : 'Moves'}
        </p>
        <TodayHistory history={todayHistory} />
      </div>
    </div>
  )
}

function StatItem({ emoji, label, value, highlight }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-bg-card-2 flex items-center justify-center text-base flex-shrink-0">
        {emoji}
      </div>
      <div>
        <p className="text-white/40 text-[10px] uppercase tracking-wide leading-none mb-0.5">
          {label}
        </p>
        <p className={`font-bold text-base tabular-nums leading-none ${highlight ? 'text-accent-green' : 'text-white'}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
