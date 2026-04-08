import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../../hooks/usePageTransition'

const situations = [
  { id: 'first-job', label: 'Starting my first job' },
  { id: 'paycheck',  label: 'Living paycheck to paycheck' },
  { id: 'debt',      label: 'Dealing with debt' },
  { id: 'saving',    label: 'Trying to start saving' },
  { id: 'lost',      label: 'Just lost and need a plan' },
]

const goals = [
  { id: 'paycheck', label: 'Understand my paycheck' },
  { id: 'budget',   label: 'Build my first budget' },
  { id: 'debt',     label: 'Get out of debt' },
  { id: 'save',     label: 'Start an emergency fund' },
]

const avatarColors = ['#C1694F','#2D3142','#3D7A5E','#6B5EA8','#C4892A','#2A7FAF']

export default function EditProfile() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')

  const [name, setName] = useState(localStorage.getItem('hb_name') || '')
  const [situation, setSituation] = useState(localStorage.getItem('hb_situation') || '')
  const [goal, setGoal] = useState(localStorage.getItem('hb_goal') || '')
  const [avatarColor, setAvatarColor] = useState(localStorage.getItem('hb_avatar_color') || '#C1694F')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (name.trim()) localStorage.setItem('hb_name', name.trim())
    if (situation)   localStorage.setItem('hb_situation', situation)
    if (goal)        localStorage.setItem('hb_goal', goal)
    localStorage.setItem('hb_avatar_color', avatarColor)
    setSaved(true)
    setTimeout(() => navigate('/profile'), 800)
  }

  const initial = name.trim() ? name.trim()[0].toUpperCase() : '?'

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 48 }}>
      {/* Header */}
      <div style={{ background: 'var(--slate)', padding: '48px 24px 28px', color: 'var(--cream)' }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'transparent', color: 'rgba(240,236,228,0.6)', fontSize: '0.9rem', marginBottom: 20, padding: 0 }}>← Back</button>
        <h1 style={{ fontSize: '1.6rem' }}>Edit Profile</h1>
      </div>

      <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Avatar picker */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1.5px solid var(--cream-dark)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--slate-muted)', marginBottom: 14 }}>Profile Photo</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, flexShrink: 0, transition: 'background 0.2s' }}>
              {initial}
            </div>
            <div>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', marginBottom: 10 }}>Pick a color</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {avatarColors.map(c => (
                  <button key={c} onClick={() => setAvatarColor(c)} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: avatarColor === c ? '3px solid var(--slate)' : '3px solid transparent', transition: 'border 0.15s', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1.5px solid var(--cream-dark)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--slate-muted)', marginBottom: 10 }}>Name</p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your first name"
            style={{ width: '100%', padding: '13px 16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--cream-dark)', fontSize: '1rem', fontFamily: 'var(--font-body)', color: 'var(--slate)', background: 'var(--cream)', outline: 'none', transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = 'var(--terracotta)'}
            onBlur={e => e.target.style.borderColor = 'var(--cream-dark)'}
          />
        </div>

        {/* Situation */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1.5px solid var(--cream-dark)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--slate-muted)', marginBottom: 12 }}>Your Situation</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)} style={{ padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: situation === s.id ? '2px solid var(--terracotta)' : '2px solid var(--cream-dark)', background: situation === s.id ? '#FFF5F2' : 'var(--cream)', fontSize: '0.88rem', color: 'var(--slate)', textAlign: 'left', fontWeight: situation === s.id ? 600 : 400, transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {s.label}
                {situation === s.id && <span style={{ color: 'var(--terracotta)', fontSize: '0.85rem' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1.5px solid var(--cream-dark)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--slate-muted)', marginBottom: 12 }}>Your #1 Goal</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {goals.map(g => (
              <button key={g.id} onClick={() => setGoal(g.id)} style={{ padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: goal === g.id ? '2px solid var(--terracotta)' : '2px solid var(--cream-dark)', background: goal === g.id ? '#FFF5F2' : 'var(--cream)', fontSize: '0.88rem', color: 'var(--slate)', textAlign: 'left', fontWeight: goal === g.id ? 600 : 400, transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {g.label}
                {goal === g.id && <span style={{ color: 'var(--terracotta)', fontSize: '0.85rem' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={handleSave}
          style={{ transition: 'all 0.2s' }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}