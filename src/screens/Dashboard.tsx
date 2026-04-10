import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { usePageTransition } from '../hooks/usePageTransition'

const modules = [
  { id: '1', title: 'Your First Paycheck Decoded', emoji: '💵', duration: '8 min', unlocked: true, completed: false },
  { id: '2', title: 'Taxes Without the Panic', emoji: '🧾', duration: '10 min', unlocked: true, completed: false },
  { id: '3', title: 'Building Your First Budget', emoji: '📊', duration: '9 min', unlocked: false, completed: false },
  { id: '4', title: 'Credit Scores Explained', emoji: '📈', duration: '7 min', unlocked: false, completed: false },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function Dashboard() {
  const navigate = useNavigate()
  const ref = usePageTransition('fade')
  const name = localStorage.getItem('hb_name')
  const greeting = name ? `${getGreeting()}, ${name} 👋` : `${getGreeting()} 👋`
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Mock lesson data per module — replace with real data later
  const moduleLessons: Record<string, { id: string; title: string; completed: boolean }[]> = {
    '1': [
      { id: 'l1', title: 'What is Gross Pay?', completed: true },
      { id: 'l2', title: 'Taxes & Withholding', completed: true },
      { id: 'l3', title: 'Net Pay & Take-Home', completed: false },
    ],
    '2': [
      { id: 'l1', title: 'W-2 vs 1099', completed: false },
      { id: 'l2', title: 'Filing Your First Return', completed: false },
    ],
  }

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: 'var(--slate)', padding: '48px 28px 32px', color: 'var(--cream)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} className="screen-enter">
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--terracotta-light)', marginBottom: 6, letterSpacing: '0.05em' }}>
              {getGreeting().toUpperCase()}
            </p>
            <h1 style={{ fontSize: '1.8rem' }}>{greeting}</h1>
          </div>
          <button
            onClick={() => navigate('/profile')}
            style={{
              background: 'var(--terracotta)', borderRadius: '50%',
              width: 42, height: 42, color: 'white', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.15s',
            }}
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

      {/* Your Modules */}
      <div style={{ padding: '28px 28px 0' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--slate)' }}>Your modules</h2>
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {modules.map(m => {
            const isExpanded = expandedId === m.id
            const lessons = moduleLessons[m.id] || []

            return (
              <div key={m.id} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1.5px solid var(--cream-dark)' }}>
                {/* Module Row */}
                <div
                  onClick={() => {
                    if (!m.unlocked) return
                    setExpandedId(isExpanded ? null : m.id)
                  }}
                  style={{
                    background: 'var(--white)',
                    padding: '18px 16px',
                    display: 'flex', alignItems: 'center', gap: 14,
                    opacity: m.unlocked ? 1 : 0.5,
                    cursor: m.unlocked ? 'pointer' : 'default',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: m.unlocked ? '#FFF0EC' : '#f0f0f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', flexShrink: 0,
                  }}>{m.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: 3 }}>{m.title}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>
                      {m.duration} · {m.unlocked ? 'In Progress' : '🔒 Locked'}
                    </p>
                  </div>
                  {m.unlocked && (
                    <span style={{
                      color: 'var(--terracotta)', fontSize: '1rem',
                      transition: 'transform 0.2s',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      display: 'inline-block',
                    }}>›</span>
                  )}
                </div>

                {/* Dropdown Lessons */}
                {isExpanded && lessons.length > 0 && (
                  <div style={{ background: '#fdf9f7', borderTop: '1px solid var(--cream-dark)' }}>
                    {lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        onClick={() => navigate('/lesson/' + m.id)}
                        style={{
                          padding: '13px 16px 13px 28px',
                          display: 'flex', alignItems: 'center', gap: 12,
                          borderBottom: idx < lessons.length - 1 ? '1px solid var(--cream-dark)' : 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{ fontSize: '0.85rem' }}>{lesson.completed ? '✅' : '⭕'}</span>
                        <p style={{
                          fontSize: '0.85rem',
                          color: lesson.completed ? 'var(--slate-muted)' : 'var(--slate)',
                          fontWeight: lesson.completed ? 400 : 500,
                          textDecoration: lesson.completed ? 'line-through' : 'none',
                        }}>{lesson.title}</p>
                        <span style={{ marginLeft: 'auto', color: 'var(--terracotta)', fontSize: '0.9rem' }}>›</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Emergency Resources */}
      <div style={{ margin: '28px 28px 0', padding: '16px', background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', boxShadow: 'var(--shadow-sm)' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 10 }}>🆘 Emergency Resources</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>
          Free local help for food, housing, and financial assistance — updated for your state.
        </p>
        <button
          onClick={() => navigate('/resources')}
          style={{ marginTop: 10, fontSize: '0.8rem', fontWeight: 600, color: 'var(--terracotta)', background: 'none', padding: 0 }}
        >
          View resources →
        </button>
      </div>
    </div>
  )
}
