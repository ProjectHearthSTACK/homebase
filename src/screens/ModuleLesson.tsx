import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { getLesson, getModule } from '../content'

interface Card {
  id: string
  type: 'hook' | 'learn' | 'apply' | 'win'
  title: string
  body: string
}

function buildPlaceholderCards(lessonTitle: string, moduleTitle: string): Card[] {
  return [
    {
      id: 'hook',
      type: 'hook',
      title: lessonTitle,
      body: `This lesson is part of "${moduleTitle}." Tap through to see what\'s covered — full content coming soon.`,
    },
    {
      id: 'learn',
      type: 'learn',
      title: 'What You\'ll Learn',
      body: `"${lessonTitle}" walks you through one focused concept so you can understand it, apply it, and move on with confidence. No jargon. No fluff.`,
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Put It Into Practice',
      body: 'The best way to learn this is to apply it to your own situation. Think about where this concept shows up in your life right now.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Page Complete',
      body: 'You finished this page. Every one you complete adds up — keep going.',
    },
  ]
}

const typeBg: Record<string, string> = {
  hook:  '#2D3142',
  learn: '#FFFFFF',
  apply: '#FFF5F2',
  win:   '#F0FFF4',
}

const typeLabel: Record<string, string> = {
  hook:  'Intro',
  learn: 'Learn',
  apply: 'Apply',
  win:   'Complete',
}

export default function ModuleLesson() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const { moduleId, lessonNumber } = useParams()

  const [cards,    setCards]    = useState<Card[]>([])
  const [index,    setIndex]    = useState(0)
  const [animKey,  setAnimKey]  = useState(0)
  const [dir,      setDir]      = useState<'right' | 'left'>('right')
  const [finished, setFinished] = useState(false)

  // Derived info from content.ts
  const lessonNum = Number(lessonNumber) || 1
  const lessonData = moduleId ? getLesson(moduleId, lessonNum) : undefined
  const moduleData = moduleId ? getModule(moduleId) : undefined

  const lessonTitle  = lessonData?.lesson.title  || `Page ${lessonNum}`
  const moduleTitle  = lessonData?.module.title  || moduleData?.title || 'Module'
  const pillarTitle  = lessonData?.pillar.title  || ''
  const totalLessons = moduleData?.lessons.length || 1

  useEffect(() => {
    // In the future: fetch real cards from Supabase here
    // For now: use placeholder cards built from content.ts titles
    if (lessonTitle) {
      setCards(buildPlaceholderCards(lessonTitle, moduleTitle))
    }
    setIndex(0)
    setFinished(false)
  }, [moduleId, lessonNumber])

  const card   = cards[index]
  const isLast = index === cards.length - 1

  const go = (next: number, direction: 'right' | 'left') => {
    setDir(direction)
    setAnimKey(k => k + 1)
    setIndex(next)
  }

  const handleFinish = () => {
    setFinished(true)
    // Navigate to next lesson or back to modules if last
    const nextLesson = lessonNum + 1
    if (nextLesson <= totalLessons) {
      setTimeout(() => navigate(`/lesson/${moduleId}/${nextLesson}`), 400)
    } else {
      setTimeout(() => navigate('/modules'), 400)
    }
  }

  if (!card) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'var(--cream)', padding: '0 28px', textAlign: 'center' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate)' }}>Lesson not found.</p>
      <button className="btn-primary" onClick={() => navigate('/modules')}>Back to Modules</button>
    </div>
  )

  const isDark    = card.type === 'hook'
  const textColor = isDark ? 'var(--cream)' : 'var(--slate)'

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        background: typeBg[card.type],
        display: 'flex', flexDirection: 'column',
        padding: '52px 28px 40px',
        maxWidth: 430, margin: '0 auto',
        transition: 'background 0.35s ease',
        opacity: finished ? 0 : 1,
      }}
    >
      {/* Top bar — back + progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <button
          onClick={() => navigate('/modules')}
          style={{
            background: isDark ? 'rgba(255,255,255,0.1)' : 'var(--cream-dark)',
            borderRadius: '50%', width: 34, height: 34,
            color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--slate-muted)',
            fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >←</button>

        {/* Progress dots */}
        <div style={{ flex: 1, display: 'flex', gap: 5 }}>
          {cards.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1, height: 3, borderRadius: 2,
                background: isDark ? 'rgba(255,255,255,0.15)' : 'var(--cream-dark)',
                overflow: 'hidden',
              }}
            >
              <div style={{
                height: '100%',
                width: i <= index ? '100%' : '0%',
                background: 'var(--terracotta)',
                borderRadius: 2,
                transition: i <= index ? 'width 0.4s ease' : 'none',
                transitionDelay: i === index ? '0.1s' : '0s',
              }} />
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '0.72rem', color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--slate-muted)',
          fontWeight: 600, flexShrink: 0,
        }}>
          {lessonNum}/{totalLessons}
        </p>
      </div>

      {/* Card content */}
      <div
        key={animKey}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          animation: `${dir === 'right' ? 'slideInRight' : 'slideInLeft'} 0.25s ease both`,
        }}
      >
        {card.type === 'win' ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
            <div style={{ fontSize: '3.5rem', lineHeight: 1, animation: 'popIn 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>🎉</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', lineHeight: 1.2, color: 'var(--slate)' }}>
              {card.title}
            </h1>
            <div style={{
              background: '#E8F8EE', border: '1.5px solid #a8e6c0',
              borderRadius: 'var(--radius-md)', padding: '10px 18px',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: '1rem' }}>🏅</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a6b4a' }}>
                {lessonTitle} — done
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--slate-muted)', maxWidth: 300 }}>
              {card.body}
            </p>
          </div>
        ) : (
          <>
            {/* Breadcrumb */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 4 }}>
                {typeLabel[card.type]}
              </p>
              {isDark && pillarTitle && (
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
                  {pillarTitle} · {moduleTitle}
                </p>
              )}
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.85rem', lineHeight: 1.2,
              marginBottom: 20, color: textColor,
            }}>
              {card.title}
            </h1>

            <p style={{
              fontSize: '1.05rem', lineHeight: 1.8,
              color: isDark ? '#c0b8b0' : 'var(--slate-muted)',
              flex: 1,
            }}>
              {card.body}
            </p>
          </>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
        {index > 0 && (
          <button
            onClick={() => go(index - 1, 'left')}
            style={{
              padding: '14px 20px', borderRadius: 'var(--radius-xl)',
              border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'var(--cream-dark)'}`,
              background: 'transparent', fontSize: '0.9rem',
              color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--slate-muted)',
              transition: 'all 0.15s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >← Back</button>
        )}
        <button
          className="btn-primary"
          style={{ flex: 1 }}
          onClick={() => isLast ? handleFinish() : go(index + 1, 'right')}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isLast
            ? lessonNum < totalLessons ? 'Next Page →' : 'Finish Module →'
            : 'Next →'
          }
        </button>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(24px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-24px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}
