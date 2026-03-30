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

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten (http://localhost:3000/docmotion/)
npm run dev

# Production-Build
npm run build

# Build lokal vorschauen
npm run preview
```

---

## Deployment (GitHub Pages)

### Vorbereitung

1. In `package.json` den `homepage`-Wert anpassen:
   ```json
   "homepage": "https://DEIN_GITHUB_USERNAME.github.io/docmotion"
   ```

2. GitHub-Repo `docmotion` erstellen und Remote setzen:
   ```bash
   git init
   git remote add origin https://github.com/DEIN_USERNAME/docmotion.git
   ```

3. PWA-Icons hinzufügen (optional aber empfohlen):
   - `public/icon-192.png` (192×192px)
   - `public/icon-512.png` (512×512px)

### Deployen

```bash
npm run deploy
```

Das Script baut die App und pusht den `dist`-Ordner auf den `gh-pages`-Branch.

---

## Projektstruktur

```
docmotion/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── public/
│   ├── manifest.json      # PWA-Manifest
│   ├── sw.js              # Service Worker
│   └── favicon.svg
├── src/
│   ├── main.jsx           # Einstiegspunkt + SW-Registrierung
│   ├── App.jsx            # Haupt-Layout + View-Routing
│   ├── index.css          # Globale Stile + Animationen
│   ├── data/
│   │   └── exercises.js   # 27 Übungen + Hilfsfunktionen
│   ├── store/
│   │   └── useStore.js    # Zustand (State + Actions + localStorage)
│   ├── hooks/
│   │   ├── useTimer.js    # Countdown-Timer
│   │   └── useStats.js    # Computed Stats
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── ProgressRing.jsx
│   │   ├── ChallengeCard.jsx
│   │   ├── Timer.jsx
│   │   ├── CompletionOverlay.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── TodayHistory.jsx
│   │   ├── StatsView.jsx
│   │   ├── SettingsView.jsx
│   │   ├── StreakBadge.jsx
│   │   └── Navigation.jsx
│   └── utils/
│       ├── storage.js     # Export/Import-Helfer
│       └── dateHelpers.js # Datum-Utilities
└── .claude/
    └── launch.json        # Preview-Konfiguration
```

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

## Design

- **Hintergrund:** `#0f1117` (sattes Schwarz)
- **Akzent:** `#4ade80` → `#a3e635` (Grün-Lime-Gradient)
- **Schriften:** DM Serif Display (Headlines) + Outfit (Fließtext)
- **Mobile-First:** Max-Width 480px, Touch-optimiert

---

*Bewegt durch den Alltag 💚*
