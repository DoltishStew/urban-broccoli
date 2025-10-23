import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ onNavigate }) {
  const items = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/sales', label: 'Sales', icon: '🧾' },
    { to: '/qa', label: 'QA', icon: '📊' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className="sidebar">
      <div className="side-top">AH</div>
      <nav className="side-nav">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) => isActive ? 'side-item active' : 'side-item'}
            onClick={() => onNavigate(i.to)}
          >
            <span className="ico">{i.icon}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
