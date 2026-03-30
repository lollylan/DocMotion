# Gemini — Projekt-Konstitution (DocMotion)

> Dieses Dokument ist Gesetz. Alle Architekturentscheidungen, Datenschemata und Verhaltensregeln werden hier definiert.
> Änderungen erfordern: 1) Eintrag im Wartungsprotokoll 2) Aktualisierung aller betroffenen SOPs

---

## Projekt-Überblick

**Name:** DocMotion
**Typ:** Gamifizierter Mikro-Fitness-Trainer als PWA
**Zielgruppe:** Berufstätige im medizinischen Bereich (Arztpraxis)
**Tech-Stack:** React + Vite + Tailwind CSS + Zustand + localStorage
**Deployment:** GitHub Pages (`/docmotion/`)

---

## Datenschema

### Exercise (Übung)
```json
{
  "id": "string (kebab-case, eindeutig)",
  "name": "string (deutsch)",
  "description": "string (1-2 Sätze, motivierend, Alltagsbezug)",
  "icon": "string (Emoji)",
  "category": "kraft | dehnen | cardio",
  "duration": "number (15-60 Sekunden)",
  "points": "number (3-10)",
  "difficulty": "number (1-3)",
  "instructions": "string[] (Schritt-für-Schritt)"
}
```

### Settings
```json
{
  "dailyGoal": 30,
  "reminderInterval": null,
  "disabledExercises": ["string[]"],
  "customExercises": ["Exercise[]"]
}
```

### DayData
```json
{
  "points": "number",
  "moves": "number",
  "seconds": "number",
  "history": [
    {
      "exerciseId": "string",
      "name": "string",
      "icon": "string",
      "points": "number",
      "completedAt": "ISO-string"
    }
  ]
}
```

### GlobalStats
```json
{
  "totalPoints": "number",
  "totalMoves": "number",
  "longestStreak": "number",
  "currentStreak": "number",
  "lastActiveDate": "YYYY-MM-DD | null"
}
```

### AppState (localStorage Key: `docmotion-storage`)
```json
{
  "settings": "Settings",
  "stats": "GlobalStats",
  "days": {
    "YYYY-MM-DD": "DayData"
  }
}
```

### UI-State (nicht persistiert)
```json
{
  "view": "dashboard | stats | settings",
  "phase": "idle | timer | completion",
  "currentExercise": "Exercise | null",
  "lastCompletedExercise": "Exercise | null",
  "selectedCategory": "alle | kraft | dehnen | cardio"
}
```

---

## Verhaltensregeln

1. **Kein Backend:** Alle Daten leben ausschließlich in localStorage.
2. **Mobile-First:** Max-Width 480px zentriert, Touch-optimiert.
3. **Deutsch:** Alle UI-Texte auf Deutsch.
4. **Streak-Logik:**
   - Tag gilt als aktiv bei ≥ 1 abgeschlossener Übung.
   - Streak +1 beim ersten Move eines neuen Tages (wenn gestern aktiv war).
   - Streak = 1, wenn letzter aktiver Tag vor gestern lag.
   - `longestStreak` wird nur erhöht, nie verringert.
5. **Übungsauswahl:** Zufällig aus gefilterter Kategorie, ausgenommen deaktivierte Übungen.
6. **Punkte-System:** 3–10 Punkte pro Übung, abhängig von Dauer und Intensität.

---

## Architektur-Invarianten

- `tools/` bleibt leer (kein Backend-Skript nötig, reine Frontend-App)
- `.env` nicht benötigt (keine API-Keys)
- Zustand mit `persist` Middleware für localStorage-Sync
- Vite `base: '/docmotion/'` für GitHub Pages
- Service Worker cached nur App-Shell (Cache-First)

---

## Wartungsprotokoll

| Datum | Änderung | Grund |
|-------|----------|-------|
| 2026-03-30 | Initiale Erstellung | Projektstart |
| 2026-03-30 | Datenschema definiert | Blueprint-Phase abgeschlossen |
