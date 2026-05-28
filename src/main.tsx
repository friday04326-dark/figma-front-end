import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './app/components/Dashboard'
import './index.css' // Keep your global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
)
