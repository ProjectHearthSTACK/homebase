import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { supabase } from '../lib/supabase'

export default function OnboardingName() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const [name, setName] = useState('')

  const handleContinue = async () => {
    if (!name.trim()) return
    localStorage.setItem('hb_name', name.trim())

    // Update profile row with name
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ name: name.trim() }).eq('id', user.id)
    }

    navigate('/onboarding/situation')
  }

  return (
    <div ref={ref} className="screen" style={{ justifyContent: 'space-between' }}>
      <div className="stagger">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏠</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>HomeBase</span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i === 1 ? 'var(--terracotta)' : 'var(--cream-dark)', transition: 'background 0.3s' }} />
          ))}
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--terracotta)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Step 1 of 3</p>
        <h1 style={{ fontSize: '2rem', marginBottom: 12, lineHeight: 1.2 }}>First, what should we call you?</h1>
        <p style={{ color: 'var(--slate-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 32 }}>No pressure — you can change this anytime.</p>

        <input
          type="text"
          placeholder="Your first name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleContinue()}
          autoFocus
          style={{
            width: '100%', padding: '16px 18px',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--cream-dark)',
            fontSize: '1.05rem', fontFamily: 'var(--font-body)',
            color: 'var(--slate)', background: 'var(--white)',
            outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--terracotta)'
            e.target.style.boxShadow = '0 0 0 3px rgba(193,105,79,0.12)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--cream-dark)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <div className="stagger">
        <button
          className="btn-primary"
          disabled={!name.trim()}
          onClick={handleContinue}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >Continue →</button>
        <button className="btn-ghost" style={{ marginTop: 12 }} onClick={() => navigate('/dashboard')}>Skip for now</button>
      </div>
    </div>
  )
}