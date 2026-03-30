import { useEffect } from 'react'
import useStore from './store/useStore'
import Dashboard from './components/Dashboard'
import StatsView from './components/StatsView'
import SettingsView from './components/SettingsView'
import Timer from './components/Timer'
import CompletionOverlay from './components/CompletionOverlay'
import Navigation from './components/Navigation'

export default function App() {
  const { view, phase, initExercise, checkStreak } = useStore()

  useEffect(() => {
    // Beim Start: Streak prüfen und erste Übung laden
    checkStreak()
    initExercise()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-[#0f1117] min-h-screen">
      {/* Zentrierter Container, mobile-first */}
      <div className="max-w-[480px] mx-auto min-h-screen relative overflow-x-hidden">
        {/* Haupt-Views */}
        {view === 'dashboard' && <Dashboard />}
        {view === 'stats' && <StatsView />}
        {view === 'settings' && <SettingsView />}

        {/* Overlays (Timer & Completion überlagern alles) */}
        {phase === 'timer' && <Timer />}
        {phase === 'completion' && <CompletionOverlay />}

        {/* Navigation (wird in Timer/Completion ausgeblendet) */}
        <Navigation />
      </div>
    </div>
  )
}
