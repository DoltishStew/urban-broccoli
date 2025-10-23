import React, { useEffect } from 'react'
import { useSales } from '../context/SalesContext'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export default function QA(){
  const { sales } = useSales()

  // Create simple dummy QA data (independent of sales) to avoid resetting when sales change.
  const qaData = [
    { name: 'Week 1', score: 88 },
    { name: 'Week 2', score: 90 },
    { name: 'Week 3', score: 92 },
    { name: 'Week 4', score: 91 },
  ]

  useEffect(()=> {
    // intentionally do not reinitialize QA data on sales change; QA page uses its own data source.
  }, [])

  return (
    <div className="qa-page">
      <div className="stat-card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:800}}>QA Progress</div>
            <div className="muted small">Quality score over time</div>
          </div>
        </div>

        <div style={{width:'100%', height:220, marginTop:12}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={qaData}>
              <XAxis dataKey="name" />
              <YAxis domain={[70,100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#666" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
