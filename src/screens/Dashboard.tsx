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

// Neutral circle icons — no red X
const LessonDot = ({ done }: { done: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    {done
      ? <>
          <circle cx="9" cy="9" r="8.5" fill="#C1694F" stroke="#C1694F"/>
          <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </>
      : <circle cx="9" cy="9" r="8.5" stroke="#D4C5B8" fill="none"/>
    }
  </svg>
)

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function Dashboard() {
  const navigate  = useNavigate()
  const transitionRef = usePageTransition('fade')
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

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setHeaderOpaque(el.scrollTop < 10)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Find first incomplete lesson for "Continue" button
  const getResumeRoute = () => {
    for (const m of modules) {
      if (!m.unlocked) continue
      const lessons = moduleLessons[m.id] || []
      const firstIncomplete = lessons.findIndex(l => !l.completed)
      if (firstIncomplete !== -1) return `/lesson/${m.id}/${firstIncomplete + 1}`
    }
    return '/lesson/1/1'
  }

  return (
    // Outer div carries the transition ref for Framer Motion / AnimatePresence
    <div ref={transitionRef}>
      {/* Inner div is the scroll container */}
      <div
        ref={scrollRef}
        style={{
          height: '100vh', overflowY: 'auto',
          background: 'var(--cream)',
          paddingBottom: 100,
          position: 'relative',
        }}
      >

        {/* STICKY HEADER */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: headerOpaque ? 'var(--slate)' : 'transparent',
          transition: 'background 0.3s ease',
          padding: '48px 24px 0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 20 }}>
            <div>
              <p style={{
                fontSize: '0.75rem',
                color: headerOpaque ? 'var(--terracotta-light)' : 'var(--terracotta)',
                letterSpacing: '0.06em', marginBottom: 4, transition: 'color 0.3s',
              }}>
                {getGreeting().toUpperCase()}
              </p>
              <h1 style={{
                fontSize: '1.6rem',
                color: headerOpaque ? 'var(--cream)' : 'var(--slate)',
                transition: 'color 0.3s',
              }}>
                {name ? `${name} 👋` : 'Hey there 👋'}
              </h1>
            </div>
            <button
              onClick={() => navigate('/profile')}
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
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {photo
                ? <img src={photo} alt="PFP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : initial
              }
            </button>
          </div>
        </div>

        {/* HERO — progress circle + continue + streak */}
        <div style={{
          background: 'var(--slate)',
          padding: '0 24px 36px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 20 }}>
            <svg width="160" height="160" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70​​​​​​​​​​​​​​​​
