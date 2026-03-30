import { useState, useRef } from 'react'
import useStore from '../store/useStore'
import { exercises, getAllExercises } from '../data/exercises'
import { importDataFromFile } from '../utils/storage'

const CATEGORY_LABELS = { kraft: '💪 Kraft', dehnen: '🧘 Dehnen', cardio: '🏃 Cardio' }
const CATEGORY_LIST = ['kraft', 'dehnen', 'cardio']

export default function SettingsView() {
  const { settings, stats, updateSettings, toggleExercise, addCustomExercise, removeCustomExercise, exportData, importData, resetData } = useStore()

  const [newExercise, setNewExercise] = useState({
    name: '', description: '', category: 'kraft', duration: 30, points: 5, difficulty: 1,
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [importError, setImportError] = useState('')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const fileInputRef = useRef()

  const allExercises = getAllExercises(settings.customExercises)

  const handleAddExercise = () => {
    if (!newExercise.name.trim()) return
    const id = `custom-${Date.now()}`
    addCustomExercise({
      ...newExercise,
      id,
      icon: '⭐',
      instructions: [],
      duration: Number(newExercise.duration),
      points: Number(newExercise.points),
      difficulty: Number(newExercise.difficulty),
    })
    setNewExercise({ name: '', description: '', category: 'kraft', duration: 30, points: 5, difficulty: 1 })
    setShowAddForm(false)
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImportError('')
    try {
      const data = await importDataFromFile(file)
      importData(data)
    } catch (err) {
      setImportError(err.message)
    }
    e.target.value = ''
  }

  const handleReset = () => {
    resetData()
    setShowResetConfirm(false)
  }

  return (
    <div className="flex flex-col pb-24 min-h-screen px-5">
      {/* Header */}
      <div className="pt-12 pb-6">
        <h1 className="font-display text-2xl text-white">Einstellungen</h1>
        <p className="text-white/40 text-xs mt-0.5">Passe die App an deine Bedürfnisse an</p>
      </div>

      {/* Tagesziel */}
      <Section title="🎯 Tagesziel">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70 text-sm">Punkte pro Tag</span>
          <span className="text-accent-green font-bold tabular-nums">{settings.dailyGoal}</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={settings.dailyGoal}
          onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}
          className="w-full accent-green-400"
          aria-label="Tagesziel in Punkten"
        />
        <div className="flex justify-between mt-1">
          <span className="text-white/25 text-xs">10</span>
          <span className="text-white/25 text-xs">100</span>
        </div>
      </Section>

      {/* Übungen aktivieren/deaktivieren */}
      <Section title="⚡ Übungen">
        <p className="text-white/40 text-xs mb-3">Deaktivierte Übungen erscheinen nicht mehr als Challenge.</p>
        {CATEGORY_LIST.map((cat) => (
          <div key={cat} className="mb-4">
            <p className="text-white/60 text-xs font-semibold mb-2">{CATEGORY_LABELS[cat]}</p>
            <div className="flex flex-col gap-2">
              {allExercises.filter((e) => e.category === cat).map((ex) => {
                const disabled = settings.disabledExercises.includes(ex.id)
                const isCustom = !!ex.id.startsWith('custom-')
                return (
                  <div key={ex.id} className="flex items-center justify-between bg-bg-card-2 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span className="text-xl">{ex.icon}</span>
                      <span className={`text-sm truncate ${disabled ? 'text-white/30 line-through' : 'text-white/80'}`}>
                        {ex.name}
                      </span>
                      {isCustom && <span className="text-[10px] text-accent-blue bg-blue-400/10 px-1.5 rounded">Eigene</span>}
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {isCustom && (
                        <button
                          onClick={() => removeCustomExercise(ex.id)}
                          className="text-accent-red/60 hover:text-accent-red text-xs px-1.5 py-0.5 rounded"
                          aria-label={`${ex.name} löschen`}
                        >
                          ✕
                        </button>
                      )}
                      <Toggle
                        checked={!disabled}
                        onChange={() => toggleExercise(ex.id)}
                        label={ex.name}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </Section>

      {/* Eigene Übung hinzufügen */}
      <Section title="➕ Eigene Übung">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 rounded-xl border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all text-sm btn-tap"
          >
            + Neue Übung hinzufügen
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name der Übung *"
              value={newExercise.name}
              onChange={(e) => setNewExercise((p) => ({ ...p, name: e.target.value }))}
              className="bg-bg-card-2 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 outline-none border border-white/10 focus:border-accent-green/50 transition-colors"
            />
            <textarea
              placeholder="Kurze Beschreibung"
              value={newExercise.description}
              onChange={(e) => setNewExercise((p) => ({ ...p, description: e.target.value }))}
              rows={2}
              className="bg-bg-card-2 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 outline-none border border-white/10 focus:border-accent-green/50 transition-colors resize-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-xs mb-1 block">Kategorie</label>
                <select
                  value={newExercise.category}
                  onChange={(e) => setNewExercise((p) => ({ ...p, category: e.target.value }))}
                  className="w-full bg-bg-card-2 rounded-xl px-3 py-2.5 text-white text-sm border border-white/10 focus:border-accent-green/50 outline-none"
                >
                  {CATEGORY_LIST.map((c) => (
                    <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1 block">Schwierigkeit</label>
                <select
                  value={newExercise.difficulty}
                  onChange={(e) => setNewExercise((p) => ({ ...p, difficulty: e.target.value }))}
                  className="w-full bg-bg-card-2 rounded-xl px-3 py-2.5 text-white text-sm border border-white/10 focus:border-accent-green/50 outline-none"
                >
                  <option value={1}>1 – Leicht</option>
                  <option value={2}>2 – Mittel</option>
                  <option value={3}>3 – Schwer</option>
                </select>
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1 block">Dauer (Sek.)</label>
                <input
                  type="number"
                  min={15}
                  max={120}
                  value={newExercise.duration}
                  onChange={(e) => setNewExercise((p) => ({ ...p, duration: e.target.value }))}
                  className="w-full bg-bg-card-2 rounded-xl px-3 py-2.5 text-white text-sm border border-white/10 focus:border-accent-green/50 outline-none"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1 block">Punkte (3–10)</label>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={newExercise.points}
                  onChange={(e) => setNewExercise((p) => ({ ...p, points: e.target.value }))}
                  className="w-full bg-bg-card-2 rounded-xl px-3 py-2.5 text-white text-sm border border-white/10 focus:border-accent-green/50 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddExercise}
                disabled={!newExercise.name.trim()}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-accent-green to-accent-lime text-black font-bold text-sm btn-tap disabled:opacity-40"
              >
                Speichern
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 rounded-xl bg-bg-card-2 text-white/60 text-sm btn-tap"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* Daten */}
      <Section title="💾 Daten">
        <div className="flex flex-col gap-2">
          <button
            onClick={exportData}
            className="w-full py-3 rounded-xl bg-accent-blue/10 text-accent-blue font-medium text-sm btn-tap hover:bg-accent-blue/20 transition-colors"
          >
            📥 Daten exportieren (JSON)
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-xl bg-white/5 text-white/70 font-medium text-sm btn-tap hover:bg-white/10 transition-colors"
          >
            📤 Daten importieren (JSON)
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          {importError && <p className="text-accent-red text-xs text-center">{importError}</p>}
        </div>
      </Section>

      {/* Gefährliche Zone */}
      <Section title="⚠️ Zurücksetzen">
        <p className="text-white/40 text-xs mb-3">
          Alle Fortschritte, Statistiken und den Streak unwiderruflich löschen.
        </p>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 rounded-xl bg-red-500/10 text-accent-red font-medium text-sm btn-tap hover:bg-red-500/20 transition-colors"
          >
            Daten zurücksetzen
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-accent-red text-sm text-center font-medium">Wirklich alle Daten löschen?</p>
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex-1 py-3 rounded-xl bg-accent-red text-white font-bold text-sm btn-tap">
                Ja, löschen
              </button>
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-3 rounded-xl bg-bg-card-2 text-white/60 text-sm btn-tap">
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* App-Info */}
      <div className="text-center py-6 text-white/20 text-xs">
        <p>DocMotion v1.0</p>
        <p className="mt-1">Bewegt durch den Alltag 💚</p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-bg-card rounded-2xl p-4 mb-4">
      <p className="text-white font-semibold text-sm mb-3">{title}</p>
      {children}
    </div>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative w-10 h-6 rounded-full transition-colors btn-tap flex-shrink-0 ${
        checked ? 'bg-accent-green' : 'bg-white/15'
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
