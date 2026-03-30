import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { pickRandomExercise } from '../data/exercises'
import { getTodayString, getYesterdayString } from '../utils/dateHelpers'
import { exportDataAsFile } from '../utils/storage'

const useStore = create(
  persist(
    (set, get) => ({
      // ─── UI-State (nicht persistiert) ────────────────────────────────────────
      view: 'dashboard',
      phase: 'idle', // 'idle' | 'timer' | 'completion'
      currentExercise: null,
      lastCompletedExercise: null,
      selectedCategory: 'alle',

      // ─── Persistierte Daten ───────────────────────────────────────────────────
      settings: {
        dailyGoal: 30,
        reminderInterval: null,
        disabledExercises: [],
        customExercises: [],
      },
      stats: {
        totalPoints: 0,
        totalMoves: 0,
        longestStreak: 0,
        currentStreak: 0,
        lastActiveDate: null,
      },
      days: {},

      // ─── Navigation ──────────────────────────────────────────────────────────
      setView: (view) => set({ view }),

      // ─── Übungs-Auswahl ───────────────────────────────────────────────────────
      setCategory: (category) => {
        const { settings, currentExercise } = get()
        set({ selectedCategory: category })
        const next = pickRandomExercise(
          category,
          settings.disabledExercises,
          settings.customExercises,
          currentExercise?.id
        )
        set({ currentExercise: next })
      },

      refreshExercise: (excludeId = null) => {
        const { selectedCategory, settings } = get()
        const next = pickRandomExercise(
          selectedCategory,
          settings.disabledExercises,
          settings.customExercises,
          excludeId
        )
        set({ currentExercise: next })
      },

      initExercise: () => {
        const { currentExercise, selectedCategory, settings } = get()
        if (!currentExercise) {
          const next = pickRandomExercise(
            selectedCategory,
            settings.disabledExercises,
            settings.customExercises
          )
          set({ currentExercise: next })
        }
      },

      // ─── Timer-Flow ──────────────────────────────────────────────────────────
      startExercise: () => set({ phase: 'timer' }),

      skipExercise: () => {
        const { currentExercise } = get()
        get().refreshExercise(currentExercise?.id)
        set({ phase: 'idle' })
      },

      cancelTimer: () => set({ phase: 'idle' }),

      // ─── Abschluss-Flow ──────────────────────────────────────────────────────
      completeExercise: () => {
        const { currentExercise, stats, days } = get()
        if (!currentExercise) return

        const today = getTodayString()
        const yesterday = getYesterdayString()
        const todayData = days[today] || { points: 0, moves: 0, seconds: 0, history: [] }

        const newHistory = [
          ...todayData.history,
          {
            exerciseId: currentExercise.id,
            name: currentExercise.name,
            icon: currentExercise.icon,
            points: currentExercise.points,
            completedAt: new Date().toISOString(),
          },
        ]

        const newTodayData = {
          points: todayData.points + currentExercise.points,
          moves: todayData.moves + 1,
          seconds: todayData.seconds + currentExercise.duration,
          history: newHistory,
        }

        // Streak-Berechnung
        let newCurrentStreak = stats.currentStreak
        let newLongestStreak = stats.longestStreak

        if (todayData.moves === 0) {
          // Erste Übung des Tages
          if (stats.lastActiveDate === yesterday) {
            newCurrentStreak = stats.currentStreak + 1
          } else if (stats.lastActiveDate === today) {
            // Streak nicht verändern – schon heute gezählt
          } else {
            newCurrentStreak = 1
          }
          newLongestStreak = Math.max(newLongestStreak, newCurrentStreak)
        }

        set({
          days: { ...days, [today]: newTodayData },
          stats: {
            ...stats,
            totalPoints: stats.totalPoints + currentExercise.points,
            totalMoves: stats.totalMoves + 1,
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastActiveDate: today,
          },
          lastCompletedExercise: currentExercise,
          phase: 'completion',
        })
      },

      dismissCompletion: () => {
        get().refreshExercise(get().lastCompletedExercise?.id)
        set({ phase: 'idle' })
      },

      // ─── Streak-Check beim App-Start ─────────────────────────────────────────
      checkStreak: () => {
        const { stats } = get()
        if (!stats.lastActiveDate) return
        const yesterday = getYesterdayString()
        // Wenn letzter aktiver Tag vor gestern lag, Streak auf 0 setzen
        if (stats.lastActiveDate < yesterday) {
          set((state) => ({
            stats: { ...state.stats, currentStreak: 0 },
          }))
        }
      },

      // ─── Einstellungen ───────────────────────────────────────────────────────
      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),

      toggleExercise: (id) => {
        const { settings } = get()
        const disabled = settings.disabledExercises.includes(id)
          ? settings.disabledExercises.filter((x) => x !== id)
          : [...settings.disabledExercises, id]
        set((state) => ({
          settings: { ...state.settings, disabledExercises: disabled },
        }))
      },

      addCustomExercise: (exercise) =>
        set((state) => ({
          settings: {
            ...state.settings,
            customExercises: [...state.settings.customExercises, exercise],
          },
        })),

      removeCustomExercise: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            customExercises: state.settings.customExercises.filter((e) => e.id !== id),
          },
        })),

      // ─── Daten-Export / Import / Reset ───────────────────────────────────────
      exportData: () => {
        const { settings, stats, days } = get()
        exportDataAsFile({ settings, stats, days })
      },

      importData: (parsedData) => {
        set({
          settings: parsedData.settings || get().settings,
          stats: parsedData.stats || get().stats,
          days: parsedData.days || {},
        })
      },

      resetData: () =>
        set({
          stats: {
            totalPoints: 0,
            totalMoves: 0,
            longestStreak: 0,
            currentStreak: 0,
            lastActiveDate: null,
          },
          days: {},
          phase: 'idle',
          currentExercise: null,
        }),
    }),
    {
      name: 'docmotion-storage',
      // Nur diese Felder persistieren
      partialize: (state) => ({
        settings: state.settings,
        stats: state.stats,
        days: state.days,
      }),
    }
  )
)

export default useStore
