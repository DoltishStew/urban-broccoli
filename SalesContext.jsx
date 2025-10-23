import React, { createContext, useContext, useEffect, useState } from 'react'

const SalesContext = createContext()

export function useSales() {
  return useContext(SalesContext)
}

const STORAGE_KEY = 'agent_hub_sales_v1'
const THEME_KEY = 'agent_hub_theme'

export function SalesProvider({ children }) {
  const [sales, setSales] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [dark, setDark] = useState(() => {
    return localStorage.getItem(THEME_KEY) === 'dark'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales))
  }, [sales])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  function addSale({ brand, price, commission, sts, date }) {
    const record = {
      id: Date.now(),
      brand,
      price: Number(price),
      commission: Number(commission),
      sts: !!sts,
      date: date || new Date().toLocaleString(),
    }
    setSales(prev => [record, ...prev])
  }

  function removeSale(id) {
    setSales(prev => prev.filter(s => s.id !== id))
  }

  function clearAll() {
    setSales([])
  }

  function exportCSV() {
    if (!sales.length) return null
    const header = ['Fecha', 'Brand', 'Price_USD', 'Commission_USD', 'STS']
    const rows = sales.map(s => [s.date, s.brand, s.price, s.commission, s.sts])
    const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    return csv
  }

  return (
    <SalesContext.Provider value={{
      sales,
      addSale,
      removeSale,
      clearAll,
      exportCSV,
      dark,
      setDark
    }}>
      {children}
    </SalesContext.Provider>
  )
}
