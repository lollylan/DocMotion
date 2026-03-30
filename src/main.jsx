import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Service Worker registrieren (nur in Production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/DocMotion/sw.js', { scope: '/DocMotion/' })
      .then((reg) => console.log('SW registriert:', reg.scope))
      .catch((err) => console.error('SW Fehler:', err))
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
