# DocMotion ⚡

> Gamifizierter Mikro-Fitness-Trainer für den Berufsalltag — besonders für Arztpraxen

**DocMotion** präsentiert kurze Übungen (15–60 Sekunden), die ohne Geräte und auf kleinstem Raum durchführbar sind. Sammle Punkte, baue Streaks auf und bleib auch im stressigsten Alltag aktiv.

---

## Features

- **27 Übungen** in 3 Kategorien: Kraft, Dehnen, Cardio
- **Tagesziel-Ring** (SVG-Fortschrittsanzeige, konfigurierbar)
- **Streak-System** mit Feuer-Animation 🔥
- **Timer** mit Pause/Weiter und visuellen Last-5-Seconds-Puls
- **Gamification** mit Punkten, Completion-Screen und Motivationsnachrichten
- **Statistik-Seite**: Wochendiagramm + Kalender-Heatmap
- **Einstellungen**: Tagesziel, Übungen de/aktivieren, eigene Übungen hinzufügen
- **Export/Import**: JSON-Backup deiner Daten
- **PWA**: Offline-fähig, als App zum Homescreen hinzufügbar
- **Kein Backend**: Alles in `localStorage`

---

## Tech-Stack

| Technologie | Version |
|---|---|
| React | ^18.3 |
| Vite | ^5.4 |
| Tailwind CSS | ^3.4 |
| Zustand | ^4.5 |
| lucide-react | ^0.400 |

---


## Datenmodell

Alle Daten werden in `localStorage` unter dem Key `docmotion-storage` gespeichert:

```json
{
  "settings": {
    "dailyGoal": 30,
    "disabledExercises": [],
    "customExercises": []
  },
  "stats": {
    "totalPoints": 0,
    "totalMoves": 0,
    "longestStreak": 0,
    "currentStreak": 0,
    "lastActiveDate": null
  },
  "days": {
    "2026-03-30": {
      "points": 18,
      "moves": 3,
      "seconds": 90,
      "history": [...]
    }
  }
}
```

---

*Bewegt durch den Alltag 💚*
