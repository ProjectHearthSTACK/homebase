import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { getLesson, getModule } from '../content'
import { lessonCards, LessonCard } from '../lessonContent'

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

function buildPlaceholderCards(lessonTitle: string, moduleTitle: string): LessonCard[] {
  return [
    {
      id: 'hook',
      type: 'hook',
      title: lessonTitle,
      body: `This page is part of "${moduleTitle}." Full content coming soon.`,
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
      body: 'Think about where this concept shows up in your life right now.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Page Complete',
      body: 'You finished this page. Every one you complete adds up — keep going.',
    },
  ]
}

export default function ModuleLesson() {
  const navigate  = useNavigate()
  const ref       = usePageTransition('left')
  const { moduleId, lessonNumber } = useParams()

  const [cards,    setCards]    = useState<LessonCard[]>([])
  const [index,    setIndex]    = useState(0)
  const [animKey,  setAnimKey]  = useState(0)
  const [dir,      setDir]      = useState<'right' | 'left'>('right')
  const [finished, setFinished] = useState(false)

  const lessonNum  = Number(lessonNumber) || 1
  const lessonData = moduleId ? getLesson(moduleId, lessonNum) : undefined
  const moduleData = moduleId ? getModule(moduleId) : undefined

  const lessonTitle  = lessonData?.lesson.title  || `Page ${lessonNum}`
  const moduleTitle  = lessonData?.module.title  || moduleData?.title || 'Module'
  const pillarTitle  = lessonData?.pillar.title  || ''
  const totalLessons = moduleData?.lessons.length || 1

  useEffect(() => {
    if (!moduleId) return

    // Build the lesson ID and look up real content
    // moduleId format from content.ts is e.g. '1-1', '1-2'
    // lesson ID format in lessonContent.ts is e.g. 'p1-m1-l1'
    const [pillarId, moduleNum] = moduleId.split('-')
    const lessonId = `p${pillarId}-m${moduleNum}-l${lessonNum}`
    const realCards = lessonCards[lessonId]

    setCards(realCards ?? buildPlaceholderCards(lessonTitle, moduleTitle))
    setIndex(0)
    setFinished(false)
  }, [moduleId, lessonNumber, lessonTitle, moduleTitle])

  const card   = cards[index]
  const isLast = index === cards.length - 1

  const go = (next: number, direction: 'right' | 'left') => {
    setDir(direction)
    setAnimKey(k => k + 1)
    setIndex(next)
  }

  const handleFinish = () => {
    setFinished(true)
    const nextLesson = lessonNum + 1
    if (nextLesson <= totalLessons) {
      setTimeout(() => navigate(`/lesson/${moduleId}/${nextLesson}`), 400)
    } else {
      setTimeout(() => navigate('/modules'), 400)
    }
  }

  if (!card) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12,
      background: 'var(--cream)', padding: '0 28px', textAlign: 'center',
    }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate)' }}>
        Page not found.
      </p>
      <button className="btn-primary" onClick={() => navigate('/modules')}>
        Back to Modules
      </button>
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
                background: isDark
                  ? i <= index ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)'
                  : i <= index ? 'var(--terracotta)' : 'var(--cream-dark)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Card counter */}
        <span style={{
          fontSize: '0.75rem', fontWeight: 600,
          color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--slate-muted)',
          flexShrink: 0,
        }}>
          {index + 1}/{cards.length}
        </span>
      </div>

      {/* Breadcrumb */}
      {pillarTitle && (
        <p style={{
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', marginBottom: 6,
          color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--slate-muted)',
        }}>
          {pillarTitle} · {moduleTitle}
        </p>
      )}

      {/* Page label */}
      <p style={{
        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 20,
        color: isDark
          ? 'rgba(255,255,255,0.55)'
          : card.type === 'apply' ? 'var(--terracotta)'
          : card.type === 'win'   ? '#2E7D52'
          : 'var(--slate-muted)',
      }}>
        {typeLabel[card.type]}
      </p>

      {/* Card content */}
      <div
        key={animKey}
        style={{
          flex: 1,
          animation: `${dir === 'right' ? 'slideInRight' : 'slideInLeft'} 0.22s ease`,
        }}
      >
        <h2 style={{
          fontSize: '1.55rem', fontWeight: 700, lineHeight: 1.25,
          marginBottom: 20, color: textColor,
        }}>
          {card.title}
        </h2>

        <p style={{
          fontSize: '1rem', lineHeight: 1.7,
          color: isDark ? 'rgba(255,255,255,0.78)' : 'var(--slate-muted)',
          flex: 1,
          whiteSpace: 'pre-line',
        }}>
          {card.body}
        </p>
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
      `}</style>
    </div>
  )
}
