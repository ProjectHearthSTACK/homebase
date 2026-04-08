import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { supabase } from '../lib/supabase'

const goals = [
  { id: 'paycheck', emoji: '💵', label: 'Understand my paycheck', desc: 'Start with Module 1' },
  { id: 'budget',   emoji: '📊', label: 'Build my first budget',  desc: 'Start with Module 3' },
  { id: 'debt',     emoji: '📉', label: 'Get out of debt',        desc: 'Start with Module 5' },
  { id: 'save',     emoji: '🏦', label: 'Start an emergency fund', desc: 'Start with Module 4' },
]

export default function OnboardingGoal() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const [selected, setSelected] = useState<string | null>(null)
  const [finishing, setFinishing] = useState(false)
  const name = localStorage.getItem('hb_name') || 'there'

  const handleFinish = async () => {
    if (!selected) return
    localStorage.setItem('hb_goal', selected)
    localStorage.setItem('hb_onboarded', 'true')
    setFinishing(true)

    // Update profile row with goal
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ goal: selected }).eq('id', user.id)
    }

    setTimeout(() => navigate('/dashboard'), 600)
  }

  return (
    <div ref={ref} className="screen" style={{ justifyContent: 'space-between', opacity: finishing ? 0 : 1, transition: 'opacity 0.5s ease' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏠</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>HomeBase</span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--terracotta)', transition: 'background 0.3s' }} />
          ))}
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--terracotta)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Step 3 of 3</p>
        <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>Almost there, {name}. What's your #1 goal?</h1>
        <p style={{ color: 'var(--slate-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>We'll build your path around this.</p>
      </div>

      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {goals.map(g => (
          <button
            key={g.id}
            onClick={() => setSelected(g.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '15px 18px', borderRadius: 'var(--radius-md)',
              border: selected === g.id ? '2px solid var(--terracotta)' : '2px solid var(--cream-dark)',
              background: selected === g.id ? '#FFF5F2' : 'var(--white)',
              textAlign: 'left',
              transition: 'all 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: selected === g.id ? 'scale(1.01)' : 'scale(1)',
              boxShadow: selected === g.id ? '0 4px 16px rgba(193,105,79,0.15)' : 'none',
            }}
          >
            <span style={{ fontSize: '1.3rem', transition: 'transform 0.2s', transform: selected === g.id ? 'scale(1.15)' : 'scale(1)', display: 'inline-block', flexShrink: 0 }}>{g.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--slate)', marginBottom: 2 }}>{g.label}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>{g.desc}</p>
            </div>
            {selected === g.id && (
              <span style={{ color: 'var(--terracotta)', animation: 'checkPop 0.3s cubic-bezier(0.22,1,0.36,1) both', flexShrink: 0 }}>✓</span>
            )}
          </button>
        ))}
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: 24, opacity: selected ? 1 : 0.4, transition: 'opacity 0.2s, transform 0.15s' }}
        disabled={!selected || finishing}
        onClick={handleFinish}
        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {finishing ? 'Building your HomeBase...' : 'Take me to HomeBase →'}
      </button>
    </div>
  )
}