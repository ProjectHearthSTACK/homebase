import { pillars } from '../content'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import PageTransition from '../components/PageTransition'

// ─── Progress helpers ──────────────────────────────────────────────────────────
const PROGRESS_KEY = 'hb_completed_lessons'

function getCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch { return new Set() }
}

// ─── Data from content.ts ──────────────────────────────────────────────────────
const pillar1     = pillars.find(p => p.id === '1')!
const dashModules = pillar1.modules.slice(0, 4)

// ─── Static highlights ─────────────────────────────────────────────────────────
const highlights = [
  { id: 'b1', emoji: '📖', label: 'First Lesson',    earned: true  },
  { id: 'b2', emoji: '💡', label: 'Pay Stub Pro',     earned: true  },
  { id: 'b3', emoji: '💵', label: 'Paycheck Decoded', earned: false },
  { id: 'c1', emoji: '🎓', label: 'Money Basics',     earned: false },
  { id: 'm1', emoji: '🔥', label: '7-Day Streak',     earned: false },
  { id: 'm2', emoji: '⚡', label: 'Fast Learner',     earned: false },
]

// ─── Lesson dot ────────────────────────────────────────────────────────────────
const LessonDot = ({ done }: { done: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    {done
      ? <>
          <circle cx="9" cy="9" r="8.5" fill="#2E7D52" stroke="#2E7D52" />
          <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      : <circle cx="9" cy="9" r="8.5" stroke="#D4C5B8" fill="none" />
    }
  </svg>
)

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

function moduleStatus(moduleId: string, totalLessons: number, completed: Set<string>): string {
  const [pillarId, moduleNum] = moduleId.split('-')
  let done = 0
  for (let i = 1; i <= totalLessons; i++) {
    if (completed.has(`p${pillarId}-m${moduleNum}-l${i}`)) done++
  }
  if (done === 0)            return 'Not Started'
  if (done === totalLessons) return 'Complete ✓'
  return `In Progress · ${done}/${totalLessons}`
}

function overallProgress(completed: Set<string>): number {
  const total = pillar1.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  if (total === 0) return 0
  return Math.round((completed.size / total) * 100)
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate  = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [name,       setName]       = useState(localStorage.getItem('hb_name') || '')
  const [streak,     setStreak]     = useState(0)
  const [completed,  setCompleted]  = useState<Set<string>>(getCompleted)

  const avatarColor = localStorage.getItem('hb_avatar_color') || 'var(--terracotta)'
  const photo       = localStorage.getItem('hb_photo') || null
  const initial     = name ? name[0].toUpperCase() : '?'
  const pillarPct   = overallProgress(completed)

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('name, streak')
        .eq('id', user.id)
        .single()
      if (data) {
        setName(data.name || '')
        setStreak(data.streak || 0)
      }
    }
    fetchProfile()
  }, [])

  // Re-read progress on focus
  useEffect(() => {
    const sync = () => setCompleted(getCompleted())
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [])

  // First incomplete lesson
  const getResumeRoute = () => {
    for (const m of dashModules) {
      const [pillarId, moduleNum] = m.id.split('-')
      for (let i = 1; i <= m.lessons.length; i++) {
        if (!completed.has(`p${pillarId}-m${moduleNum}-l${i}`)) {
          return `/lesson/${m.id}/${i}`
        }
      }
    }
    return `/lesson/${dashModules[0].id}/1`
  }

  return (
    <PageTransition>
      <div
        ref={scrollRef}
        style={{
          height: '100vh', overflowY: 'auto',
          background: 'var(--cream)',
          paddingBottom: 100,
        }}
      >

        {/* ── STICKY HEADER ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'var(--slate)',
          padding: '48px 24px 0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 20 }}>
            <div>
              <p style={{
                fontSize: '0.75rem', letterSpacing: '0.06em',
                marginBottom: 4, color: 'var(--terracotta-light)',
              }}>
                {getGreeting().toUpperCase()}
              </p>
              <h1 style={{ fontSize: '1.6rem', color: 'var(--cream)' }}>
                {name ? `${name} 👋` : 'Hey there 👋'}
              </h1>
            </div>
            <button
              onClick={() => navigate('/profile')}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: photo ? 'transparent' : avatarColor,
                border: '2.5px solid rgba(255,255,255,0.25)',
                overflow: 'hidden', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', color: 'white',
                fontFamily: 'var(--font-display)', fontWeight: 600,
                flexShrink: 0, transition: 'transform 0.15s',
              }}
            >
              {photo
                ? <img src={photo} alt="PFP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : initial
              }
            </button>
          </div>
        </div>

        {/* ── HERO ── */}
        <div style={{
          background: 'var(--slate)',
          padding: '0 24px 36px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          {/* Progress circle */}
          <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 20 }}>
            <svg width="160" height="160" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle cx="80" cy="80" r="70" fill="none" stroke="var(--terracotta)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - pillarPct / 100)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div style={{
              position: 'absolute', top: 12, left: 12,
              width: 136, height: 136, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              {photo
                ? <img src={photo} alt="PFP" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginBottom: 4 }} />
                : <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: avatarColor, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', color: 'white',
                    fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4,
                  }}>{initial}</div>
              }
              <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{pillarPct}%</p>
              <p style={{ fontSize: '0.6rem', color: '#a0a0b0', letterSpacing: '0.05em' }}>PILLAR 1</p>
            </div>
          </div>

          <button
            onClick={() => navigate(getResumeRoute())}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            style={{
              background: 'var(--terracotta)', color: 'white',
              fontWeight: 700, fontSize: '0.95rem',
              padding: '13px 32px', borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 16px rgba(193,105,79,0.35)',
              transition: 'transform 0.15s',
            }}
          >
            Continue Learning →
          </button>

          <div style={{
            marginTop: 16, padding: '8px 16px',
            background: 'rgba(255,255,255,0.07)', borderRadius: 20,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: '1rem' }}>🔥</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--cream)', fontWeight: 600 }}>{streak}-day streak</p>
            <p style={{ fontSize: '0.75rem', color: '#a0a0b0' }}>· keep it going</p>
          </div>
        </div>

        {/* ── HIGHLIGHTS ── */}
        <div style={{ padding: '24px 0 0' }}>
          <p style={{
            fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--slate-muted)', padding: '0 24px', marginBottom: 14,
          }}>Your Highlights</p>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 24px 4px', scrollbarWidth: 'none' }}>
            {highlights.map(h => (
              <div key={h.id} style={{
                flexShrink: 0, width: 74,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                opacity: h.earned ? 1 : 0.35,
                filter: h.earned ? 'none' : 'grayscale(1)',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: h.earned ? '#FFF0EC' : '#f0f0f0',
                  border: h.earned ? '2px solid var(--terracotta)' : '2px solid #ddd',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem',
                }}>
                  {h.emoji}
                </div>
                <p style={{
                  fontSize: '0.62rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.3,
                  color: h.earned ? 'var(--slate)' : 'var(--slate-muted)',
                }}>{h.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── YOUR MODULES ── */}
        <div style={{ padding: '24px 24px 0' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate)', marginBottom: 14 }}>Your Modules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dashModules.map(m => {
              const isExpanded = expandedId === m.id
              const [pillarId, moduleNum] = m.id.split('-')
              const status     = moduleStatus(m.id, m.lessons.length, completed)
              const isComplete = status.startsWith('Complete')

              return (
                <div key={m.id} style={{
                  borderRadius: 'var(--radius-md)', overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)', border: '1.5px solid var(--cream-dark)',
                }}>
                  {/* Module row */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : m.id)}
                    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.985)')}
                    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                    style={{
                      background: 'var(--white)', padding: '16px',
                      display: 'flex', alignItems: 'center', gap: 14,
                      cursor: 'pointer', transition: 'transform 0.15s',
                    }}
                  >
                    <div style={{
                      width: 46, height: 46, borderRadius: 12,
                      background: isComplete ? '#e8f5e9' : '#FFF0EC',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.4rem', flexShrink: 0,
                    }}>
                      {isComplete ? '✅' : m.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 3 }}>{m.title}</p>
                      <p style={{ fontSize: '0.76rem', color: isComplete ? '#2E7D52' : 'var(--slate-muted)' }}>
                        {status}
                      </p>
                    </div>
                    <span style={{
                      color: 'var(--terracotta)', fontSize: '1.1rem',
                      transition: 'transform 0.2s',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      display: 'inline-block',
                    }}>›</span>
                  </div>

                  {/* Lesson list */}
                  {isExpanded && (
                    <div style={{ background: '#fdf9f7', borderTop: '1px solid var(--cream-dark)' }}>
                      {m.lessons.map((lesson, idx) => {
                        const lessonId = `p${pillarId}-m${moduleNum}-l${idx + 1}`
                        const isDone   = completed.has(lessonId)
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => navigate(`/lesson/${m.id}/${idx + 1}`)}
                            onMouseDown={e => (e.currentTarget.style.background = 'var(--cream)')}
                            onMouseUp={e => (e.currentTarget.style.background = 'transparent')}
                            style={{
                              padding: '12px 16px 12px 20px',
                              display: 'flex', alignItems: 'center', gap: 10,
                              borderBottom: idx < m.lessons.length - 1 ? '1px solid var(--cream-dark)' : 'none',
                              cursor: 'pointer', transition: 'background 0.15s',
                            }}
                          >
                            <LessonDot done={isDone} />
                            <p style={{
                              flex: 1, fontSize: '0.84rem',
                              color: isDone ? 'var(--slate-muted)' : 'var(--slate)',
                              fontWeight: isDone ? 400 : 500,
                              lineHeight: 1.4,
                            }}>
                              {lesson.title}
                            </p>
                            <span style={{ color: 'var(--terracotta)', fontSize: '0.85rem' }}>›</span>
                          </div>
                        )
                      })}

                      {/* Start / Continue button */}
                      <div style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => {
                            const [pId, mNum] = m.id.split('-')
                            for (let i = 1; i <= m.lessons.length; i++) {
                              if (!completed.has(`p${pId}-m${mNum}-l${i}`)) {
                                navigate(`/lesson/${m.id}/${i}`)
                                return
                              }
                            }
                            navigate(`/lesson/${m.id}/1`)
                          }}
                          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                          style={{
                            width: '100%', padding: '11px',
                            background: 'var(--terracotta)', color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 700, fontSize: '0.85rem',
                            transition: 'transform 0.15s',
                          }}
                        >
                          {status === 'Not Started'
                            ? 'Start Module →'
                            : isComplete
                              ? 'Review Module →'
                              : 'Continue →'
                          }
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── UNLIMITED UPSELL ── */}
        <div style={{
          margin: '24px 24px 0', background: 'var(--slate)',
          borderRadius: 'var(--radius-md)', padding: '18px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: 3 }}>⚡ Go Unlimited</p>
            <p style={{ fontSize: '0.75rem', color: '#a0a0b0', lineHeight: 1.5 }}>Unlock quizzes, certifications, badges, and degrees for $7.99/mo</p>
          </div>
          <button
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            style={{
              background: 'var(--terracotta)', color: 'white',
              fontSize: '0.78rem', fontWeight: 700,
              padding: '9px 14px', borderRadius: 20,
              flexShrink: 0, marginLeft: 12, transition: 'transform 0.15s',
            }}
          >
            Upgrade
          </button>
        </div>

        {/* ── EMERGENCY RESOURCES ── */}
        <div style={{
          margin: '24px 24px 0', padding: '16px',
          background: 'var(--white)', borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--cream-dark)', boxShadow: 'var(--shadow-sm)',
        }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 8 }}>🆘 Emergency Resources</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>Free local help for food, housing, and financial assistance — updated for your state.</p>
          <button
            onClick={() => navigate('/resources')}
            onMouseDown={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseUp={e => (e.currentTarget.style.opacity = '1')}
            style={{ marginTop: 10, fontSize: '0.8rem', fontWeight: 600, color: 'var(--terracotta)', background: 'none', padding: 0, transition: 'opacity 0.15s' }}
          >
            View resources →
          </button>
        </div>

      </div>
    </PageTransition>
  )
}
