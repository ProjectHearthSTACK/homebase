import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'

const situations = [
  { id: 'first-job', emoji: '💼', label: 'Starting my first job' },
  { id: 'paycheck',  emoji: '😮‍💨', label: 'Living paycheck to paycheck' },
  { id: 'debt',      emoji: '📉', label: 'Dealing with debt' },
  { id: 'saving',    emoji: '🎯', label: 'Trying to start saving' },
  { id: 'lost',      emoji: '🧭', label: 'Just lost and need a plan' },
]

export default function SituationCheck() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div ref={ref} className="screen" style={{ justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏠</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>HomeBase</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--terracotta)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Quick Check</p>
        <h1 style={{ fontSize: '2rem', marginBottom: 12, lineHeight: 1.2 }}>What's going on right now?</h1>
        <p style={{ color: 'var(--slate-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>Pick the one that fits best.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {situations.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '15px 18px', borderRadius: 'var(--radius-md)',
              border: selected === s.id ? '2px solid var(--terracotta)' : '2px solid var(--cream-dark)',
              background: selected === s.id ? '#FFF5F2' : 'var(--white)',
              fontSize: '0.95rem', fontWeight: 500, color: 'var(--slate)',
              textAlign: 'left',
              transition: 'all 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: selected === s.id ? 'scale(1.01)' : 'scale(1)',
              boxShadow: selected === s.id ? '0 4px 16px rgba(193,105,79,0.15)' : 'none',
            }}
          >
            <span style={{
              fontSize: '1.3rem',
              transition: 'transform 0.2s',
              transform: selected === s.id ? 'scale(1.15)' : 'scale(1)',
              display: 'inline-block',
            }}>{s.emoji}</span>
            <span style={{ flex: 1 }}>{s.label}</span>
            {selected === s.id && <span style={{ color: 'var(--terracotta)' }}>✓</span>}
          </button>
        ))}
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: 24, opacity: selected ? 1 : 0.4, transition: 'opacity 0.2s' }}
        disabled={!selected}
        onClick={() => {
          if (selected) localStorage.setItem('hb_situation', selected)
          navigate('/dashboard')
        }}
        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Continue →
      </button>
    </div>
  )
}
