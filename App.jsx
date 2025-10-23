import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Landing from './pages/Landing'
import SalesTracker from './pages/SalesTracker'
import QA from './pages/QA'
import { useSales } from './context/SalesContext'

export default function App() {
  const navigate = useNavigate()
  const { dark } = useSales()

  return (
    <div className={`app-root ${dark ? 'theme-dark' : 'theme-light'}`}>
      <div className="layout">
        <Sidebar onNavigate={path => navigate(path)} />
        <div className="main-area">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/sales" element={<SalesTracker />} />
              <Route path="/qa" element={<QA />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}
