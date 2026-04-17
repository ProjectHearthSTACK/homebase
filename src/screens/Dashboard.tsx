import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { usePageTransition } from '../hooks/usePageTransition'
import { supabase } from '../lib/supabase'

const modules = [
  { id: '1', title: 'Your First Paycheck Decoded', emoji: '💵', duration: '8 min',  unlocked: true,  completed: false, pro: false },
  { id: '2', title: 'Taxes Without the Panic',     emoji: '🧾', duration: '10 min', unlocked: true,  completed: false, pro: false },
  { id: '3', title: 'Building Your First Budget',  emoji: '📊', duration: '9 min',  unlocked: false, completed: false, pro: false },
  { id: '4', title: 'Credit Scores Explained',     emoji: '📈', duration: '7 min',  unlocked: false, completed: false, pro: true  },
]

const moduleLessons: Record<string, { id: string; title: string; completed: boolean; pro: boolean }[]> = {
  '1': [
    { id: 'l1', title: 'What Happened to My Money?', completed: true,  pro: false },
    { id: 'l2', title: 'Taxes & Withholding',         completed: true,  pro: false },
    { id: 'l3', title: 'Net Pay & Take-Home',         completed: false, pro: false },
    { id: 'l4', title: 'Reading Every Line',          completed: false, pro: true  },
  ],
  '2': [
    { id: 'l1', title: 'W-2 vs 1099',                completed: false, pro: false },
    { id: 'l2', title: 'Filing Your First Return',    completed: false, pro: true  },
  ],
}

const highlights = [
  { id: 'b1', emoji: '📖', label: 'First Lesson',    earned: true  },
  { id: 'b2', emoji: '💡', label: 'Pay Stub Pro',     earned: true  },
  { id: 'b3', emoji: '💵', label: 'Paycheck Decoded', earned: false },
  { id: 'c1', emoji: '🎓', label: 'Money Basics',     earned: false },
  { id: 'm1', emoji: '🔥', label: '7-Day Streak',     earned: false },
  { id: 'm2', emoji: '⚡', label: 'Fast Learner',     earned: false },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function Dashboard() {
  const navigate  = useNavigate()
  const ref       = usePageTransition('fade')
  const scrollRef = useRef<HTMLDivElement>(null)

  const [expandedId,   setExpandedId]   = useState<string | null>(null)
  const [headerOpaque, setHeaderOpaque] = useState(true)
  const [name,         setName]         = useState(localStorage.getItem('hb_name') || '')
  const [streak,       setStreak]       = useState(0)
  const [pillarPct,    setPillarPct]    = useState(38)

  const avatarColor = localStorage.getItem('hb_avatar_color') || 'var(--terracotta)'
  const photo       = localStorage.getItem('hb_photo') || null
  const isPro       = localStorage.getItem('hb_pro') === 'true'
  const initial     = name ? name[0].toUpperCase() : 'Me'

  useEffect(() => {
    const fetch = async () => {
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
    fetch()
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setHeaderOpaque(el.scrollTop < 10)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={scrollRef} style={{ height: '100vh', overflowY: 'auto', background: 'var(--cream)', paddingBottom: 100, position: 'relative' }}>

      {/* STICKY HEADER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: headerOpaque ? 'var(--slate)' : 'transparent', transition: 'background 0.3s ease', padding: '48px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 20 }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: headerOpaque ? 'var(--terracotta-light)' : 'var(--terracotta)', letterSpacing: '0.06em', marginBottom: 4, transition: 'color 0.3s' }}>
              {getGreeting().toUpperCase()}
            </p>
            <h1 style={{ fontSize: '1.6rem', color: headerOpaque ? 'var(--cream)' : 'var(--slate)', transition: 'color 0.3s' }}>
              {name ? `${getGreeting()}, ${name} 👋` : `${getGreeting()} 👋`}
            </h1>
          </div>
          <button
            onClick={() => navigate('/profile')}
            style={{ width: 44, height: 44, borderRadius: '50%', background: photo ? 'transparent' : avatarColor, border: '2.5px solid rgba(255,255,255,0.25)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, flexShrink: 0, transition: 'transform 0.15s' }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {photo ? <img src={photo} alt="PFP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
          </button>
        </div>
      </div>

      {/* HERO — circle + continue button + streak */}
      <div style={{ background: 'var(--slate)', padding: '0 24px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <div style={{ position: 'absolute', top: 12, left: 12, width: 136, height: 136, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {photo
              ? <img src={photo} alt="PFP" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginBottom: 4 }} />
              : <div style={{ width: 50, height: 50, borderRadius: '50%', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4 }}>{initial}</div>
            }
            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{pillarPct}%</p>
            <p style={{ fontSize: '0.6rem', color: '#a0a0b0', letterSpacing: '0.05em' }}>PILLAR 1</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/lesson/1')}
          style={{ background: 'var(--terracotta)', color: 'white', fontWeight: 700, fontSize: '0.95rem', padding: '13px 32px', borderRadius: 'var(--radius-md)', transition: 'transform 0.15s', boxShadow: '0 4px 16px rgba(193,105,79,0.35)' }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Continue Learning →
        </button>

        <div style={{ marginTop: 16, padding: '8px 16px', background: 'rgba(255,255,255,0.07)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1rem' }}>🔥</span>
          <p style={{ fontSize: '0.82rem', color: 'var(--cream)', fontWeight: 600 }}>{streak}-day streak</p>
          <p style={{ fontSize: '0.75rem', color: '#a0a0b0' }}>· keep it going</p>
        </div>
      </div>

      {/* HIGHLIGHTS SCROLL */}
      <div style={{ padding: '24px 0 0' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', padding: '0 24px', marginBottom: 14 }}>Your Highlights</p>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 24px 4px', scrollbarWidth: 'none' }}>
          {highlights.map(h => (
            <div key={h.id} style={{ flexShrink: 0, width: 74, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: h.earned ? 1 : 0.35, filter: h.earned ? 'none' : 'grayscale(1)' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: h.earned ? '#FFF0EC' : '#f0f0f0', border: h.earned ? '2px solid var(--terracotta)' : '2px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                {h.emoji}
              </div>
              <p style={{ fontSize: '0.62rem', fontWeight: 600, color: h.earned ? 'var(--slate)' : 'var(--slate-muted)', textAlign: 'center', lineHeight: 1.3 }}>{h.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* YOUR MODULES */}
      <div style={{ padding: '24px 24px 0' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate)', marginBottom: 14 }}>Your Modules</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {modules.map(m => {
            const isExpanded = expandedId === m.id
            const lessons    = moduleLessons[m.id] || []
            return (
              <div key={m.id} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1.5px solid var(--cream-dark)' }}>
                <div
                  onClick={() => { if (!m.unlocked) return; setExpandedId(isExpanded ? null : m.id) }}
                  style={{ background: 'var(--white)', padding: '16px', display: 'flex', alignItems: 'center', gap: 14, opacity: m.unlocked ? 1 : 0.5, cursor: m.unlocked ? 'pointer' : 'default', transition: 'background 0.15s' }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: m.unlocked ? '#FFF0EC' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                    {m.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.title}</p>
                      {m.pro && !isPro && <span style={{ fontSize: '0.6rem', fontWeight: 700, background: '#FFD700', color: '#7a6000', padding: '2px 6px', borderRadius: 10 }}>PRO</span>}
                    </div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--slate-muted)' }}>{m.duration} · {m.unlocked ? 'In Progress' : '🔒 Locked'}</p>
                  </div>
                  {m.unlocked && <span style={{ color: 'var(--terracotta)', fontSize: '1.1rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>›</span>}
                </div>

                {isExpanded && lessons.length > 0 && (
                  <div style={{ background: '#fdf9f7', borderTop: '1px solid var(--cream-dark)' }}>
                    {lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        onClick={() => { if (lesson.pro && !isPro) return; navigate('/lesson/' + m.id) }}
                        style={{ padding: '12px 16px 12px 24px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: idx < lessons.length - 1 ? '1px solid var(--cream-dark)' : 'none', cursor: lesson.pro && !isPro ? 'default' : 'pointer', opacity: lesson.pro && !isPro ? 0.5 : 1 }}
                      >
                        <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{lesson.completed ? '✅' : '❌'}</span>
                        <p style={{ flex: 1, fontSize: '0.84rem', color: lesson.completed ? 'var(--slate-muted)' : 'var(--slate)', fontWeight: lesson.completed ? 400 : 500, textDecoration: lesson.completed ? 'line-through' : 'none' }}>
                          {lesson.title}
                        </p>
                        {lesson.pro
                          ? <span style={{ fontSize: '0.6rem', fontWeight: 700, background: '#FFD700', color: '#7a6000', padding: '2px 6px', borderRadius: 10, flexShrink: 0 }}>PRO</span>
                          : <span style={{ fontSize: '0.6rem', fontWeight: 700, background: '#e8f5e9', color: '#2e7d32', padding: '2px 6px', borderRadius: 10, flexShrink: 0 }}>FREE</span>
                        }
                        {!(lesson.pro && !isPro) && <span style={{ color: 'var(--terracotta)', fontSize: '0.85rem' }}>›</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* UNLIMITED UPSELL */}
      {!isPro && (
        <div style={{ margin: '24px 24px 0', background: 'var(--slate)', borderRadius: 'var(--radius-md)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: 3 }}>⚡ Learn More With Unlimited</p>
            <p style={{ fontSize: '0.75rem', color: '#a0a0b0', lineHeight: 1.5 }}>Unlock every module, lesson, and badge for $7.99/mo</p>
          </div>
          <button style={{ background: 'var(--terracotta)', color: 'white', fontSize: '0.78rem', fontWeight: 700, padding: '9px 14px', borderRadius: 20, flexShrink: 0, marginLeft: 12 }}>Upgrade</button>
        </div>
      )}

      {/* EMERGENCY RESOURCES */}
      <div style={{ margin: '24px 24px 0', padding: '16px', background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', boxShadow: 'var(--shadow-sm)' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 8 }}>🆘 Emergency Resources</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>Free local help for food, housing, and financial assistance — updated for your state.</p>
        <button onClick={() => navigate('/resources')} style={{ marginTop: 10, fontSize: '0.8rem', fontWeight: 600, color: 'var(--terracotta)', background: 'none', padding: 0 }}>View resources →</button>
      </div>

    </div>
  )
}
