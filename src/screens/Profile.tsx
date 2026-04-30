import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

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

const situationEncouragement: Record<string, string> = {
  'first-job': "Starting your first job is a huge deal. You're building the foundation everything else stands on. Keep going — you've got this.",
  'paycheck':  "Living paycheck to paycheck is stressful, but it's also temporary. Every lesson you complete is one step closer to breathing room.",
  'debt':      "Debt feels heavy, but people climb out of it every single day. You're already doing the right thing by showing up and learning.",
  'saving':    "Deciding to start saving is one of the most powerful moves you can make. Future you is going to be genuinely grateful.",
  'lost':      "Feeling lost is actually the most honest place to start. You're here, you're learning — and that already puts you ahead of where you were.",
}

const goalEncouragement: Record<string, string> = {
  'paycheck': "Understanding your paycheck is step one to everything. Once you know where your money goes, you can actually decide where it goes next.",
  'budget':   "A budget isn't a restriction — it's a plan. You're building one of the most important habits you'll ever have.",
  'debt':     "Getting out of debt takes time, but every dollar you put toward it is a dollar buying back your freedom.",
  'save':     "An emergency fund is the difference between a bad week and a financial crisis. You're building your safety net.",
}

function getStreakMessage(streak: number): string {
  if (streak >= 30) return "30 days. One month. You've done something most people only talk about."
  if (streak >= 14) return "Two weeks strong. You're not dabbling anymore — you're committed."
  if (streak >= 7)  return "One full week. You've proven you can show up. Now keep showing up."
  if (streak >= 5)  return "Five days. This is becoming a habit. Habits change everything."
  if (streak >= 3)  return "Three-day streak! You're building something real. Don't stop now."
  if (streak >= 2)  return "Two days in. Most people never make it this far. You did."
  return "Day one. The hardest streak to start is the first one. You started."
}

type PopupType = 'streak' | 'lessons' | 'skills' | 'situation' | 'goal' | null

type ProfileData = {
  id: string
  email: string
  name: string
  situation: string | null
  goal: string | null
  streak: number
  modules_completed: number
  created_at: string
}

function ProfileSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 100 }}>
      {/* Header skeleton */}
      <div style={{ background: 'var(--slate)', padding: '48px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'skeletonPulse 1.5s ease-in-out infinite', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 22, width: 140, borderRadius: 6, background: 'rgba(255,255,255,0.1)', marginBottom: 10, animation: 'skeletonPulse 1.5s ease-in-out infinite' }} />
            <div style={{ height: 14, width: 110, borderRadius: 10, background: 'rgba(255,255,255,0.07)', animation: 'skeletonPulse 1.5s ease-in-out infinite 0.15s' }} />
          </div>
        </div>
      </div>
      {/* Stats skeleton */}
      <div style={{ display: 'flex', gap: 10, padding: '20px 24px 0' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ flex: 1, height: 70, borderRadius: 'var(--radius-md)', background: 'var(--white)', border: '1.5px solid var(--cream-dark)', animation: `skeletonPulse 1.5s ease-in-out infinite ${i * 0.1}s` }} />
        ))}
      </div>
      {/* Content skeleton */}
      <div style={{ padding: '20px 24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ height: 92, borderRadius: 'var(--radius-md)', background: 'var(--white)', border: '1.5px solid var(--cream-dark)', animation: 'skeletonPulse 1.5s ease-in-out infinite 0.25s' }} />
        <div style={{ height: 152, borderRadius: 'var(--radius-md)', background: 'var(--white)', border: '1.5px solid var(--cream-dark)', animation: 'skeletonPulse 1.5s ease-in-out infinite 0.35s' }} />
        <div style={{ height: 56, borderRadius: 'var(--radius-md)', background: 'var(--white)', border: '1.5px solid var(--cream-dark)', animation: 'skeletonPulse 1.5s ease-in-out infinite 0.45s' }} />
      </div>
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
      `}</style>
    </div>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const ref = usePageTransition('fade')
  const [popup, setPopup]     = useState<PopupType>(null)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  const avatarColor = localStorage.getItem('hb_avatar_color') || 'var(--terracotta)'
  const photo       = localStorage.getItem('hb_photo') || null
  const isPro       = localStorage.getItem('hb_pro') === 'true'

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/welcome'); return }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) console.error('Error fetching profile:', error)
      else setProfile(data)
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    localStorage.clear()
    navigate('/welcome')
  }

  const settings = [
    { label: 'Edit profile',          emoji: '✏️', path: '/settings/profile' },
    { label: 'Notification settings', emoji: '🔔', path: '/settings/notifications' },
    { label: 'About HomeBase',        emoji: 'ℹ️', path: '/settings/about' },
  ]

  const Popup = ({ children }: { children: React.ReactNode }) => (
    <>
      <div onClick={() => setPopup(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, animation: 'fadeIn 0.2s ease' }} />
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'var(--white)', borderRadius: '20px 20px 0 0', padding: '28px 24px 48px', zIndex: 201, animation: 'slideUp 0.25s ease', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ width: 36, height: 4, background: 'var(--cream-dark)', borderRadius: 4, margin: '0 auto 24px' }} />
        {children}
      </div>
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateX(-50%) translateY(40px); opacity: 0 } to { transform: translateX(-50%) translateY(0); opacity: 1 } }
      `}</style>
    </>
  )

  if (loading) return <ProfileSkeleton />
  if (!profile) return null

  const name      = profile.name || 'You'
  const situation = profile.situation
  const goal      = profile.goal
  const streak    = profile.streak || 0
  const modules   = profile.modules_completed || 0
  const initial   = name[0].toUpperCase()

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 100 }}>

      {/* Header — sticky */}
      <div style={{
        background: 'var(--slate)',
        padding: '48px 24px 32px',
        color: 'var(--cream)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate('/settings/profile')}
            onMouseDown={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseUp={e => (e.currentTarget.style.opacity = '1')}
            style={{ width: 68, height: 68, borderRadius: '50%', background: photo ? 'transparent' : avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, flexShrink: 0, transition: 'opacity 0.15s', border: '3px solid rgba(255,255,255,0.2)', overflow: 'hidden', position: 'relative' }}
          >
            {photo ? <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.35)', fontSize: '0.5rem', color: 'white', textAlign: 'center', padding: '3px 0', letterSpacing: '0.03em' }}>EDIT</div>
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: 6 }}>{name}</h1>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: isPro ? '#FFD700' : '#a0a0b0', background: isPro ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.07)', padding: '3px 10px', borderRadius: 20, border: isPro ? '1px solid rgba(255,215,0,0.3)' : '1px solid rgba(255,255,255,0.1)' }}>
              {isPro ? '⚡ HomeBase Unlimited Member' : 'HomeBase Member'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, padding: '20px 24px 0' }}>
        {[
          { label: 'Streak',  value: `${streak} day${streak !== 1 ? 's' : ''}`, type: 'streak'  as PopupType },
          { label: 'Modules', value: `${modules} Done`,                          type: 'lessons' as PopupType },
          { label: 'Skills',  value: `${modules} Earned`,                        type: 'skills'  as PopupType },
        ].map(s => (
          <button
            key={s.label}
            onClick={() => setPopup(s.type)}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            style={{ flex: 1, background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '14px 10px', textAlign: 'center', border: '1.5px solid var(--cream-dark)', cursor: 'pointer', transition: 'transform 0.15s' }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate)', marginBottom: 2 }}>{s.value}</p>
            <p style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
          </button>
        ))}
      </div>

      <div style={{ padding: '20px 24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Situation + Goal */}
        {(situation || goal) && (
          <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', overflow: 'hidden' }}>
            {situation && (
              <button
                onClick={() => setPopup('situation')}
                onMouseDown={e => (e.currentTarget.style.background = 'var(--cream)')}
                onMouseUp={e => (e.currentTarget.style.background = 'transparent')}
                style={{ width: '100%', padding: '14px 18px', borderBottom: goal ? '1px solid var(--cream-dark)' : 'none', textAlign: 'left', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.15s' }}
              >
                <div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Situation</p>
                  <p style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--slate)' }}>{situationLabels[situation] ?? situation}</p>
                </div>
                <span style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>→</span>
              </button>
            )}
            {goal && (
              <button
                onClick={() => setPopup('goal')}
                onMouseDown={e => (e.currentTarget.style.background = 'var(--cream)')}
                onMouseUp={e => (e.currentTarget.style.background = 'transparent')}
                style={{ width: '100%', padding: '14px 18px', textAlign: 'left', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.15s' }}
              >
                <div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>#1 Goal</p>
                  <p style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--slate)' }}>{goalLabels[goal] ?? goal}</p>
                </div>
                <span style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>→</span>
              </button>
            )}
          </div>
        )}

        {/* Settings */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', overflow: 'hidden' }}>
          {settings.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              onMouseDown={e => (e.currentTarget.style.background = 'var(--cream)')}
              onMouseUp={e => (e.currentTarget.style.background = 'transparent')}
              style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '15px 18px', background: 'transparent', fontSize: '0.92rem', color: 'var(--slate)', borderBottom: i < settings.length - 1 ? '1px solid var(--cream-dark)' : 'none', textAlign: 'left', transition: 'background 0.15s' }}
            >
              <span style={{ fontSize: '1rem' }}>{item.emoji}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              <span style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>→</span>
            </button>
          ))}
        </div>

        {/* Upgrade banner */}
        {!isPro && (
          <div style={{ background: 'var(--slate)', borderRadius: 'var(--radius-md)', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white', marginBottom: 2 }}>⚡ Go Unlimited</p>
              <p style={{ fontSize: '0.75rem', color: '#a0a0b0' }}>Unlock every module for $7.99/mo</p>
            </div>
            <button
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              style={{ background: 'var(--terracotta)', color: 'white', fontSize: '0.78rem', fontWeight: 700, padding: '8px 14px', borderRadius: 20, transition: 'transform 0.15s' }}
            >
              Upgrade
            </button>
          </div>
        )}

        <button
          onClick={handleSignOut}
          onMouseDown={e => (e.currentTarget.style.opacity = '0.6')}
          onMouseUp={e => (e.currentTarget.style.opacity = '1')}
          style={{ background: 'transparent', color: '#c0392b', fontSize: '0.9rem', padding: '14px', textAlign: 'center', width: '100%', textDecoration: 'underline', textUnderlineOffset: 3, transition: 'opacity 0.15s' }}
        >
          Sign out
        </button>
      </div>

      {/* POPUPS */}
      {popup === 'streak' && (
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔥</div>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', color: 'var(--slate)', marginBottom: 8 }}>{streak}-Day Streak</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--slate-muted)', lineHeight: 1.7, maxWidth: 300, margin: '0 auto 24px' }}>{getStreakMessage(streak)}</p>
            <button
              onClick={() => setPopup(null)}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              style={{ background: 'var(--terracotta)', color: 'white', fontWeight: 700, padding: '13px 32px', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', transition: 'transform 0.15s' }}
            >
              Keep Going 🔥
            </button>
          </div>
        </Popup>
      )}

      {popup === 'lessons' && (
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📚</div>
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--slate)', marginBottom: 8 }}>Modules Completed</h2>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--terracotta)', marginBottom: 8 }}>{modules}</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>
              {modules === 0 ? "No modules completed yet. Start with Module 1 — your first paycheck decoded." : `You've completed ${modules} module${modules !== 1 ? 's' : ''}. Keep going — every one counts.`}
            </p>
          </div>
        </Popup>
      )}

      {popup === 'skills' && (
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏅</div>
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--slate)', marginBottom: 8 }}>Earned Skills</h2>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--terracotta)', marginBottom: 8 }}>{modules}</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>
              {modules === 0 ? "Complete your first module to earn a skill badge." : `You've earned ${modules} skill${modules !== 1 ? 's' : ''}. Real knowledge, built by you.`}
            </p>
          </div>
        </Popup>
      )}

      {popup === 'situation' && situation && (
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 8 }}>Your Situation</p>
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--slate)', marginBottom: 16 }}>{situationLabels[situation] ?? situation}</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--slate-muted)', lineHeight: 1.8, maxWidth: 320, margin: '0 auto 24px' }}>{situationEncouragement[situation] ?? "You're in the right place. Keep going."}</p>
            <button
              onClick={() => navigate('/settings/profile')}
              onMouseDown={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseUp={e => (e.currentTarget.style.opacity = '1')}
              style={{ background: 'transparent', color: 'var(--terracotta)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'underline', textUnderlineOffset: 3, transition: 'opacity 0.15s' }}
            >
              Update my situation
            </button>
          </div>
        </Popup>
      )}

      {popup === 'goal' && goal && (
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 8 }}>Your #1 Goal</p>
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--slate)', marginBottom: 16 }}>{goalLabels[goal] ?? goal}</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--slate-muted)', lineHeight: 1.8, maxWidth: 320, margin: '0 auto 24px' }}>{goalEncouragement[goal] ?? "Every step you take gets you closer. Keep going."}</p>
            <button
              onClick={() => navigate('/settings/profile')}
              onMouseDown={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseUp={e => (e.currentTarget.style.opacity = '1')}
              style={{ background: 'transparent', color: 'var(--terracotta)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'underline', textUnderlineOffset: 3, transition: 'opacity 0.15s' }}
            >
              Update my goal
            </button>
          </div>
        </Popup>
      )}
    </div>
  )
}
