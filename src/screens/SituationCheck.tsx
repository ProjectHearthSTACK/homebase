import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const situations = [
  { id: 'first-job', emoji: '💼', label: 'Starting my first job' },
  { id: 'broke', emoji: '😮‍💨', label: 'Living paycheck to paycheck' },
  { id: 'debt', emoji: '📉', label: 'Dealing with debt' },
  { id: 'saving', emoji: '🎯', label: 'Trying to start saving' },
  { id: 'lost', emoji: '🧭', label: 'Just lost and need a plan' },
]

export default function SituationCheck() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="screen" style={{ justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--terracotta)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Step 1 of 2</p>
        <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>What's going on right now?</h1>
        <p style={{ color: 'var(--slate-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>Pick the one that fits best.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {situations.map(s => (
          <button key={s.id} onClick={() => setSelected(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 'var(--radius-md)', border: selected === s.id ? '2px solid var(--terracotta)' : '2px solid var(--cream-dark)', background: selected === s.id ? '#FFF5F2' : 'var(--white)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--slate)', textAlign: 'left' }}>
            <span style={{ fontSize: '1.4rem' }}>{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>
      <button className="btn-primary" style={{ opacity: selected ? 1 : 0.45 }} disabled={!selected} onClick={() => navigate('/dashboard')}>Continue →</button>
    </div>
  )
}