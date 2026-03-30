# Task Plan — DocMotion

## Status: 🟢 Build läuft

---

## Phase 1: Blueprint (Vision & Logik)
- [x] Discovery-Fragen beantwortet (via Projekt-Prompt)
- [x] Datenschema in gemini.md definiert
- [x] Blueprint genehmigt

## Phase 2: Link (Konnektivität)
- [x] Kein Backend / keine APIs nötig (reine localStorage-App)
- [x] GitHub Pages als Deployment-Ziel definiert

## Phase 3: Architect (3-Schichten-Build)

### Konfiguration
- [ ] package.json
- [ ] vite.config.js
- [ ] index.html
- [ ] tailwind.config.js
- [ ] postcss.config.js

### Datenschicht (src/data/, src/utils/)
- [ ] exercises.js (27 Übungen)
- [ ] storage.js (Export/Import-Helfer)
- [ ] dateHelpers.js

### State Management (src/store/, src/hooks/)
- [ ] useStore.js (Zustand + persist)
- [ ] useTimer.js
- [ ] useStats.js

### Komponenten (src/components/)
- [ ] Navigation.jsx
- [ ] ProgressRing.jsx
- [ ] StreakBadge.jsx
- [ ] CategoryFilter.jsx
- [ ] TodayHistory.jsx
- [ ] ChallengeCard.jsx
- [ ] Timer.jsx
- [ ] CompletionOverlay.jsx
- [ ] Dashboard.jsx
- [ ] StatsView.jsx
- [ ] SettingsView.jsx

### App-Einstieg
- [ ] src/main.jsx
- [ ] src/App.jsx
- [ ] src/index.css

### PWA
- [ ] public/manifest.json
- [ ] public/sw.js

## Phase 4: Stylize
- [ ] Design-Review und Feinschliff
- [ ] Animationen testen

## Phase 5: Trigger (Deployment)
- [ ] npm run build erfolgreich
- [ ] GitHub Pages Deployment konfiguriert
- [ ] README.md geschrieben
