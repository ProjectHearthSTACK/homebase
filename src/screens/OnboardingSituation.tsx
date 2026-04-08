import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { supabase } from '../lib/supabase'

const situations = [
  { id: 'first-job', emoji: '💼', label: 'Starting my first job' },
  { id: 'paycheck', emoji: '😮‍💨', label: 'Living paycheck to paycheck' },
  { id: 'debt',     emoji: '📉', label: 'Dealing with debt' },
  { id: 'saving',   emoji: '🎯', label: 'Trying to start saving' },
  { id: 'lost',     emoji: '🧭', label: 'Just lost and need a plan' },
]

export default function OnboardingSituation() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const [selected, setSelected] = useState<string | null>(null)
  const name = localStorage.getItem('hb_name') || 'there'

  const handleContinue = async () => {
    if (!selected) return
    localStorage.setItem('hb_situation', selected)

    // Update profile row with situation
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ situation: selected }).eq('id', user.id)
    }

    navigate('/onboarding/goal')
  }

  return (
    <div ref={ref} className="screen" style={{ justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏠</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>HomeBase</span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 2 ? 'var(--terracotta)' : 'var(--cream-dark)', transition: 'background 0.3s' }} />
          ))}
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--terracotta)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Step 2 of 3</p>
        <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>Hey {name} — what's going on?</h1>
        <p style={{ color: 'var(--slate-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>Pick the one that fits best.</p>
      </div>

      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {situations.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '15px 18px',
              borderRadius: 'var(--radius-md)',
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
            {s.label}
            {selected === s.id && (
              <span style={{ marginLeft: 'auto', color: 'var(--terracotta)', animation: 'checkPop 0.3s cubic-bezier(0.22,1,0.36,1) both' }}>✓</span>
            )}
          </button>
        ))}
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: 24, opacity: selected ? 1 : 0.4, transition: 'opacity 0.2s' }}
        disabled={!selected}
        onClick={handleContinue}
        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      >Continue →</button>
    </div>
  )
}