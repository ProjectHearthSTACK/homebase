import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'

export default function Welcome() {
  const navigate = useNavigate()
  const ref = usePageTransition('up')
  const isOnboarded = localStorage.getItem('hb_onboarded') === 'true'

  return (
    <div ref={ref} className="screen" style={{
      background: 'linear-gradient(160deg, var(--slate) 0%, var(--slate-light) 100%)',
      color: 'var(--cream)',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="pop-in">
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🏠</div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600 }}>HomeBase</span>
      </div>

      <div className="stagger">
        <p style={{ fontSize: '0.85rem', color: 'var(--terracotta-light)', marginBottom: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Real skills. Real life. No fluff.
        </p>
        <h1 style={{ fontSize: '2.6rem', lineHeight: 1.15, marginBottom: 20 }}>
          You don't have to figure it out alone.
        </h1>
        <p style={{ fontSize: '1rem', color: '#c0bbb4', lineHeight: 1.65 }}>
          Learn money, benefits, housing, and more — one honest lesson at a time.
        </p>
      </div>

      <div className="stagger">
        <button
          className="btn-primary"
          onClick={() => navigate(isOnboarded ? '/dashboard' : '/onboarding/auth')}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isOnboarded ? 'Back to HomeBase' : "Get started — it's free"}
        </button>
        {!isOnboarded && (
          <button
            className="btn-ghost"
            style={{ color: '#a0a0b0', marginTop: 12 }}
            onClick={() => navigate('/onboarding/auth')}
          >
            I already have an account
          </button>
        )}
      </div>
    </div>
  )
}