import React from 'react'
import { useSales } from '../context/SalesContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { dark, setDark, sales, exportCSV } = useSales()
  const navigate = useNavigate()

  function handleExport() {
    const csv = exportCSV()
    if (!csv) {
      alert('No hay ventas para exportar.')
      return
    }
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales_export_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <header className="app-header">
      <div>
        <div className="title">Welcome in Agent Dashboard</div>
        <div className="sub">Veronica Sale Mag</div>
      </div>
      <div className="header-actions">
        <button className="btn" onClick={() => navigate('/')}>Landing</button>
        <button className="btn" onClick={() => navigate('/sales')}>Sales Tracker</button>
        <button className="btn" onClick={() => navigate('/qa')}>QA</button>
        <button className="btn" onClick={handleExport}>Export</button>
        <button
          className="btn primary"
          onClick={() => setDark(!dark)}
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}
