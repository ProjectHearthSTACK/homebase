import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'

const situationLabels: Record<string, string> = {
  'first-job': 'Starting my first job',
  'paycheck':  'Living paycheck to paycheck',
  'debt':      'Dealing with debt',
  'saving':    'Trying to start saving',
  'lost':      'Just lost and need a plan',
}

const goalLabels: Record<string, string> = {
  'paycheck': 'Understand my paycheck',
  'budget':   'Build my first budget',
  'debt':     'Get out of debt',
  'save':     'Start an emergency fund',
}

export default function Profile() {
  const navigate = useNavigate()
  const ref = usePageTransition('fade')

  const name        = localStorage.getItem('hb_name') || 'You'
  const situation   = localStorage.getItem('hb_situation') || null
  const goal        = localStorage.getItem('hb_goal') || null
  const avatarColor = localStorage.getItem('hb_avatar_color') || 'var(--terracotta)'
  const initial     = name[0].toUpperCase()

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/welcome')
  }

  const settings = [
    { label: 'Edit profile',           emoji: '✏️',  path: '/settings/profile' },
    { label: 'Notification settings',  emoji: '🔔',  path: '/settings/notifications' },
    { label: 'About HomeBase',         emoji: 'ℹ️',  path: '/settings/about' },
  ]

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: 'var(--slate)', padding: '48px 24px 32px', color: 'var(--cream)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, flexShrink: 0, transition: 'background 0.3s' }}>
            {initial}
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>{name}</h1>
            <p style={{ fontSize: '0.85rem', color: '#a0a0b0' }}>HomeBase member</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, padding: '20px 24px 0' }}>
        {[
          { label: 'Streak',  value: '3 days' },
          { label: 'Lessons', value: '1 done' },
          { label: 'Skills',  value: '1 earned' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '14px 10px', textAlign: 'center', border: '1.5px solid var(--cream-dark)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate)', marginBottom: 2 }}>{s.value}</p>
            <p style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px 24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Situation + goal */}
        {(situation || goal) && (
          <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', overflow: 'hidden' }}>
            {situation && (
              <div style={{ padding: '14px 18px', borderBottom: goal ? '1px solid var(--cream-dark)' : 'none' }}>
                <p style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Situation</p>
                <p style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--slate)' }}>{situationLabels[situation] ?? situation}</p>
              </div>
            )}
            {goal && (
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>#1 Goal</p>
                <p style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--slate)' }}>{goalLabels[goal] ?? goal}</p>
              </div>
            )}
          </div>
        )}

        {/* Settings buttons */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', overflow: 'hidden' }}>
          {settings.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '15px 18px', background: 'transparent', fontSize: '0.92rem', color: 'var(--slate)', borderBottom: i < settings.length - 1 ? '1px solid var(--cream-dark)' : 'none', textAlign: 'left', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.99)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <span style={{ fontSize: '1rem' }}>{item.emoji}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              <span style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>→</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleSignOut}
          style={{ background: 'transparent', color: '#c0392b', fontSize: '0.9rem', padding: '14px', textAlign: 'center', width: '100%', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}