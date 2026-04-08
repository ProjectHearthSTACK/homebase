import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'

const modules = [
  { id: '1', title: 'Your First Paycheck Decoded', emoji: '💵', duration: '8 min', unlocked: true },
  { id: '2', title: 'Taxes Without the Panic', emoji: '🧾', duration: '10 min', unlocked: false },
  { id: '3', title: 'Building Your First Budget', emoji: '📊', duration: '9 min', unlocked: false },
  { id: '4', title: 'Credit Scores Explained', emoji: '📈', duration: '7 min', unlocked: false },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const ref = usePageTransition('fade')
  const name = localStorage.getItem('hb_name')
  const greeting = name ? 'Hey ' + name + ' 👋' : "Let's keep going 🔥"

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 80 }}>
      <div style={{ background: 'var(--slate)', padding: '48px 28px 32px', color: 'var(--cream)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} className="screen-enter">
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--terracotta-light)', marginBottom: 6, letterSpacing: '0.05em' }}>GOOD MORNING</p>
            <h1 style={{ fontSize: '1.8rem' }}>{greeting}</h1>
          </div>
          <button
            onClick={() => navigate('/profile')}
            style={{ background: 'var(--terracotta)', borderRadius: '50%', width: 42, height: 42, color: 'white', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s' }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {name ? name[0].toUpperCase() : 'Me'}
          </button>
        </div>

        <div className="streak" style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.3rem' }}>🔥</span>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>3-day streak</p>
            <p style={{ fontSize: '0.78rem', color: '#a0a0b0' }}>Keep it going — you're building a habit</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 28px 0' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--slate)' }}>Your modules</h2>
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {modules.map(m => (
            <div
              key={m.id}
              onClick={() => m.unlocked && navigate('/lesson/' + m.id)}
              style={{
                background: 'var(--white)', borderRadius: 'var(--radius-md)',
                padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: 'var(--shadow-sm)', opacity: m.unlocked ? 1 : 0.5,
                cursor: m.unlocked ? 'pointer' : 'default',
                border: '1.5px solid var(--cream-dark)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseDown={e => { if (m.unlocked) { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' } }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: m.unlocked ? '#FFF0EC' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{m.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: 3 }}>{m.title}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>{m.duration} · {m.unlocked ? 'Ready' : '🔒 Locked'}</p>
              </div>
              {m.unlocked && <span style={{ color: 'var(--terracotta)', fontSize: '1.1rem' }}>→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}