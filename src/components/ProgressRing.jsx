/**
 * SVG-Fortschrittsring für das Tagesziel
 * @param {{ progress: number, points: number, goal: number, goalReached: boolean }} props
 */
export default function ProgressRing({ progress, points, goal, goalReached }) {
  const size = 200
  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.min(progress, 1))

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Hintergrundring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e2433"
          strokeWidth={strokeWidth}
        />
        {/* Fortschrittsring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inhalt in der Mitte */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {goalReached ? (
          <>
            <span className="text-4xl mb-1">🏆</span>
            <span className="text-accent-green font-bold text-sm tracking-wide">Ziel erreicht!</span>
          </>
        ) : (
          <>
            <span
              className="font-display text-5xl font-bold leading-none"
              style={{ color: '#4ade80' }}
            >
              {points}
            </span>
            <span className="text-white/40 text-sm mt-1">
              / {goal} Pkt.
            </span>
          </>
        )}
      </div>

      {/* Glow-Effekt bei Ziel-Erreichen */}
      {goalReached && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: '0 0 40px rgba(74, 222, 128, 0.25)',
          }}
        />
      )}
    </div>
  )
}
