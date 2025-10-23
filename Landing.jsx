import React, { useEffect, useMemo, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import StatCard from '../components/StatCard'
import { useSales } from '../context/SalesContext'

export default function Landing(){
  const { sales } = useSales()
  const [mode, setMode] = useState('monthly') // monthly or weekly

  // metrics
  const totalCom = useMemo(()=> sales.reduce((a,b)=>a + Number(b.commission),0), [sales])
  const totalCount = sales.length
  const stsCount = sales.filter(s => s.sts).length

  // chart data
  function monthlyData(){
    const months = new Array(12).fill(0)
    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    for(const s of sales){
      const d = new Date(s.date)
      const m = isNaN(d) ? (new Date()).getMonth() : d.getMonth()
      months[m] += Number(s.commission)
    }
    return months.map((v, i) => ({ name: labels[i], value: Math.round(v*100)/100 }))
  }

  function weeklyData(){
    // Mon..Sun
    const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const arr = new Array(7).fill(0)
    for(const s of sales){
      const d = new Date(s.date)
      let idx = isNaN(d) ? (new Date()).getDay() : d.getDay() // 0 Sun..6 Sat
      idx = (idx + 6) % 7 // convert to Mon=0..Sun=6
      arr[idx] += Number(s.commission)
    }
    return arr.map((v,i) => ({ name: labels[i], value: Math.round(v*100)/100 }))
  }

  const chartData = mode === 'monthly' ? monthlyData() : weeklyData()

  // avoid heavy rerenders: only re-render on sales or mode
  useEffect(()=>{}, [sales, mode])

  return (
    <div className="landing">
      <div className="grid-two">
        <div>
          <div style={{display:'flex',gap:12, marginBottom:12}}>
            <StatCard title="Sales" value={totalCount} subtitle="Cantidad de ventas cerradas" />
            <StatCard title="Commissions (USD)" value={`$${totalCom.toFixed(2)}`} subtitle="Total comisiones acumuladas" />
            <StatCard title="Raw Sales" value={sales.length} subtitle="Registros totales" />
            <StatCard title="STS" value={stsCount} subtitle="Save the Sales" />
          </div>

          <div className="chart-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <div><strong>Commissions</strong><div className="muted small">Commissions by {mode}</div></div>
              <select value={mode} onChange={e => setMode(e.target.value)} className="input">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div style={{height: 260}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v) => `$${v}`} />
                  <Bar dataKey="value" fill="#666" radius={[6,6,6,6]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <aside>
          <div className="stat-card">
            <div className="stat-title">Welcome In Agent</div>
            <div style={{fontWeight:800, marginTop:6}}>Veronica Sale Mag</div>
            <div className="muted small" style={{marginTop:8}}>Aquí está tu resumen rápido</div>
          </div>

          <div className="stat-card" style={{marginTop:12}}>
            <div className="stat-title">Agent Schedule</div>
            <div className="muted small">Mon-Fri 9:00 - 18:00</div>
          </div>

          <div className="black-card" style={{marginTop:12}}>
            <div className="small muted">Commissions earned</div>
            <div style={{fontWeight:800, fontSize:22}}>${totalCom.toFixed(2)}</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
