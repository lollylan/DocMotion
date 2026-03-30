/** Gibt das heutige Datum als YYYY-MM-DD zurück */
export const getTodayString = () => new Date().toISOString().split('T')[0]

/** Gibt das gestrige Datum als YYYY-MM-DD zurück */
export const getYesterdayString = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

/** Gibt die letzten N Tage als YYYY-MM-DD Array zurück (neuester zuletzt) */
export const getLastNDays = (n) => {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

/** Gibt alle Tage des aktuellen Monats zurück */
export const getCurrentMonthDays = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay() // 0=So, 1=Mo, ...

  const days = []
  // Leere Platzhalter für Ausrichtung (Montag als erster Tag)
  const offset = (firstDayOfWeek + 6) % 7
  for (let i = 0; i < offset; i++) days.push(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    days.push(date.toISOString().split('T')[0])
  }
  return days
}

/** Formatiert Sekunden als "1m 30s" */
export const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

/** Formatiert Uhrzeit aus ISO-String als "HH:MM" */
export const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Kurzbezeichnung für Wochentag auf Deutsch */
export const getDayLabel = (dateString) => {
  const d = new Date(dateString + 'T12:00:00')
  return d.toLocaleDateString('de-DE', { weekday: 'short' })
}

/** Gibt den Monatsnamen auf Deutsch zurück */
export const getCurrentMonthName = () => {
  return new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}
