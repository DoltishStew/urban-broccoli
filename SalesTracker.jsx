import React, { useEffect, useState } from 'react'
import { useSales } from '../context/SalesContext'

const BRANDS = ['AirDoctor','AquaTru','Prosvent','IdealProstate+','BetterBladder','Walkfit','RotoRazer','Superthotics','MiracleBlade']

const TIERS = [
  {name:'Tier 1', min:1, max:399, comm:1.65},
  {name:'Tier 2', min:400, max:599, comm:3.30},
  {name:'Tier 3', min:600, max:899, comm:5.00},
  {name:'Tier 4', min:900, max:Infinity, comm:8.30},
]

export default function SalesTracker(){
  const { sales, addSale, removeSale } = useSales()
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedRange, setSelectedRange] = useState(null)
  const [price, setPrice] = useState('')
  const [sts, setSts] = useState(false)

  useEffect(()=> {
    // you may set defaults
  }, [])

  function calcCommission(p){
    if(sts) return 1.65
    const pr = Number(p)
    for(const t of TIERS) if(pr >= t.min && pr <= t.max) return t.comm
    return TIERS[TIERS.length-1].comm
  }

  function handleAdd(){
    if(!selectedBrand){ alert('Selecciona una brand'); return }
    const p = Number(price)
    if(!p || p <= 0){ alert('Ingresa un precio válido'); return }
    const com = calcCommission(p)
    addSale({ brand: selectedBrand, price: p, commission: com, sts, date: new Date().toLocaleString() })
    // reset price only
    setPrice('')
    setSts(false)
  }

  function handleRemove(id){
    if(!confirm('Eliminar venta?')) return
    removeSale(id)
  }

  return (
    <div className="sales-page">
      <div className="two-col">
        <div className="left-col">
          <div className="stat-card">
            <div className="stat-title">Add Sale</div>

            <div style={{marginTop:10}}>
              <div className="muted small">Brand</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8, marginTop:8}}>
                {BRANDS.map(b => (
                  <button
                    key={b}
                    className={`selector-btn ${selectedBrand === b ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div style={{marginTop:10}}>
              <div className="muted small">Price (USD)</div>
              <input className="input" value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="e.g. 499" />
            </div>

            <div style={{marginTop:8}}>
              <label><input type="checkbox" checked={sts} onChange={e => setSts(e.target.checked)} /> <span className="muted small"> Save the Sale (STS) fixed commission</span></label>
            </div>

            <div style={{marginTop:12, display:'flex', gap:8}}>
              <button className="btn primary" onClick={handleAdd}>Add sale</button>
            </div>

          </div>
        </div>

        <div className="right-col">
          <div className="stat-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div className="stat-title">Sales Register</div>
              <div className="muted small">Fecha • Brand • Comisión (USD)</div>
            </div>
            <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
              {sales.length === 0 && <div className="muted small">No sales yet.</div>}
              {sales.map(s => (
                <div key={s.id} className="sale-list-row">
                  <div style={{display:'flex',gap:12,alignItems:'center'}}>
                    <div style={{fontWeight:700}}>{s.brand}</div>
                    <div className="muted small">{s.date}</div>
                  </div>
                  <div style={{textAlign:'right', minWidth:140}}>
                    <div style={{fontWeight:800}}>${Number(s.commission).toFixed(2)}</div>
                    <button className="btn" style={{marginTop:6}} onClick={() => handleRemove(s.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
