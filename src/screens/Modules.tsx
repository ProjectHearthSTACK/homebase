import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const modules = [
  {
    id: '1', emoji: '💵', title: 'Your First Paycheck Decoded',
    desc: 'Understand gross vs. net, taxes, and every line on your stub.',
    duration: '8 min', unlocked: true, category: 'Income',
  },
  {
    id: '2', emoji: '🧾', title: 'Taxes Without the Panic',
    desc: 'W-2s, 1099s, refunds, and what April 15 actually means.',
    duration: '10 min', unlocked: false, category: 'Taxes',
  },
  {
    id: '3', emoji: '📊', title: 'Building Your First Budget',
    desc: 'The 50/30/20 rule and a system that actually sticks.',
    duration: '9 min', unlocked: false, category: 'Budgeting',
  },
  {
    id: '4', emoji: '🏦', title: 'Emergency Funds 101',
    desc: 'Why $1,000 changes everything and how to get there.',
    duration: '7 min', unlocked: false, category: 'Saving',
  },
  {
    id: '5', emoji: '📉', title: 'Getting Out of Debt',
    desc: 'Avalanche vs. snowball — and which one wins for you.',
    duration: '11 min', unlocked: false, category: 'Debt',
  },
  {
    id: '6', emoji: '📈', title: 'Credit Scores Explained',
    desc: 'What moves your score and how to build it from zero.',
    duration: '8 min', unlocked: false, category: 'Credit',
  },
  {
    id: '7', emoji: '🏥', title: 'Health Insurance Basics',
    desc: 'Premiums, deductibles, copays — decoded once and for all.',
    duration: '9 min', unlocked: false, category: 'Benefits',
  },
  {
    id: '8', emoji: '🏠', title: 'Renting vs. Buying',
    desc: 'The real math behind one of the biggest decisions you will make.',
    duration: '12 min', unlocked: false, category: 'Housing',
  },
  {
    id: '9', emoji: '📦', title: 'Investing for Beginners',
    desc: '401k, IRA, index funds — where to start and why it matters now.',
    duration: '10 min', unlocked: false, category: 'Investing',
  },
]

const categories = ['All', ...Array.from(new Set(modules.map(m => m.category)))]

export default function Modules() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? modules : modules.filter(m => m.category === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 90 }}>
      <div style={{ background: 'var(--slate)', padding: '48px 24px 24px', color: 'var(--cream)' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>Learn</h1>
        <p style={{ fontSize: '0.88rem', color: '#a0a0b0' }}>9 modules · start anywhere</p>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 24px', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '7px 14px',
              borderRadius: 20,
              border: filter === cat ? '1.5px solid var(--terracotta)' : '1.5px solid var(--cream-dark)',
              background: filter === cat ? 'var(--terracotta)' : 'var(--white)',
              color: filter === cat ? 'var(--white)' : 'var(--slate-muted)',
              fontSize: '0.8rem', fontWeight: 500,
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'all 0.15s',
            }}
          >{cat}</button>
        ))}
      </div>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((m, i) => (
          <div
            key={m.id}
            onClick={() => m.unlocked && navigate('/lesson/' + m.id)}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex', gap: 14,
              border: '1.5px solid var(--cream-dark)',
              boxShadow: 'var(--shadow-sm)',
              opacity: m.unlocked ? 1 : 0.6,
              cursor: m.unlocked ? 'pointer' : 'default',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 10, right: 14, fontSize: '0.7rem', color: 'var(--slate-muted)', fontWeight: 600 }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{
              width: 52, height: 52, borderRadius: 12, flexShrink: 0,
              background: m.unlocked ? '#FFF0EC' : '#f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>{m.emoji}</div>
            <div style={{ flex: 1, paddingRight: 20 }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.category}</span>
              </div>
              <p style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--slate)', marginBottom: 4, lineHeight: 1.3 }}>{m.title}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', lineHeight: 1.5, marginBottom: 6 }}>{m.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>{m.duration}</span>
                {m.unlocked
                  ? <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--terracotta)', background: '#FFF0EC', padding: '2px 8px', borderRadius: 20 }}>Start</span>
                  : <span style={{ fontSize: '0.72rem', color: 'var(--slate-muted)' }}>Locked</span>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}