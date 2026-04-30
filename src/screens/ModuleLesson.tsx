// src/screens/ModuleLesson.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getLesson, getModule } from '../content'
import { lessonCards, LessonCard } from '../lessonContent'
import { lessonProse } from '../lessonProse'
import PageTransition from '../components/PageTransition'

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

const cardVariants = {
  enter: (d: number) => ({
    x: d > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (d: number) => ({
    x: d > 0 ? -32 : 32,
    opacity: 0,
    transition: { duration: 0.16, ease: 'easeIn' },
  }),
}

export default function ModuleLesson() {
  const navigate = useNavigate()
  const { moduleId, lessonNumber } = useParams()

  const [cards,     setCards]     = useState<LessonCard[]>([])
  const [index,     setIndex]     = useState(0)
  const [dir,       setDir]       = useState<1 | -1>(1)
  const [finished,  setFinished]  = useState(false)
  const [showProse, setShowProse] = useState(false)

  const lessonNum  = Number(lessonNumber) || 1
  const lessonData = moduleId ? getLesson(moduleId, lessonNum) : undefined
  const moduleData = moduleId ? getModule(moduleId) : undefined

  const lessonTitle  = lessonData?.lesson.title  || `Page ${lessonNum}`
  const moduleTitle  = lessonData?.module.title  || moduleData?.title || 'Module'
  const pillarTitle  = lessonData?.pillar.title  || ''
  const totalLessons = moduleData?.lessons.length || 1

  useEffect(() => {
    if (!moduleId) return
    const [pillarId, moduleNum] = moduleId.split('-')
    const lessonId  = `p${pillarId}-m${moduleNum}-l${lessonNum}`
    const realCards = lessonCards[lessonId]
    setCards(realCards ?? buildPlaceholderCards(lessonTitle, moduleTitle))
    setIndex(0)
    setFinished(false)
    setShowProse(false)
  }, [moduleId, lessonNumber, lessonTitle, moduleTitle])

  const proseKey  = moduleId
    ? `p${moduleId.split('-')[0]}-m${moduleId.split('-')[1]}-l${lessonNum}`
    : ''
  const proseText = lessonProse[proseKey]

  const card   = cards[index]
  const isLast = index === cards.length - 1
  const isDark = card?.type === 'hook'

  const handleFinish = () => {
    setFinished(true)
    const next = lessonNum + 1
    setTimeout(() => {
      if (next <= totalLessons) navigate(`/lesson/${moduleId}/${next}`)
      else navigate('/modules')
    }, 350)
  }

  const go = (next: number, direction: 1 | -1) => {
    setDir(direction)
    setIndex(next)
  }

  if (!card) return (
    <PageTransition>
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
    </PageTransition>
  )

  return (
    <PageTransition>
      <div
        style={{
          minHeight: '100vh',
          background: typeBg[card.type],
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 28px 40px',
          maxWidth: 430,
          margin: '0 auto',
          transition: 'background 0.3s ease',
          opacity: finished ? 0 : 1,
          transition2: 'opacity 0.3s ease',
        }}
      >
        {/* Top bar */}
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

          <div style={{ flex: 1, display: 'flex', gap: 5 }}>
            {cards.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: isDark
                    ? i <= index ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)'
                    : i <= index ? 'var(--terracotta)' : 'var(--cream-dark)',
                  transition: 'background 0.25s ease',
                }}
              />
            ))}
          </div>

          <span style={{
            fontSize: '0.75rem', fontWeight: 600, flexShrink: 0,
            color: isDark ? 'rgba(255,255,255,0.45)' : 'var(--slate-muted)',
          }}>
            {index + 1}/{cards.length}
          </span>
        </div>

        {/* Breadcrumb */}
        {pillarTitle && (
          <p style={{
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: 6,
            color: isDark ? 'rgba(255,255,255,0.38)' : 'var(--slate-muted)',
          }}>
            {pillarTitle} · {moduleTitle}
          </p>
        )}

        {/* Card type label */}
        <p style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 20,
          color: isDark
            ? 'rgba(255,255,255,0.5)'
            : card.type === 'apply' ? 'var(--terracotta)'
            : card.type === 'win'   ? '#2E7D52'
            : 'var(--slate-muted)',
        }}>
          {typeLabel[card.type]}
        </p>

        {/* Card content — animated */}
        <div style={{ flex: 1, position: 'relative', minHeight: 240 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ position: 'absolute', inset: 0 }}
            >
              <h2 style={{
                fontSize: '1.55rem', fontWeight: 700, lineHeight: 1.25,
                marginBottom: 20,
                color: isDark ? 'var(--cream)' : 'var(--slate)',
              }}>
                {card.title}
              </h2>
              <p style={{
                fontSize: '1rem', lineHeight: 1.72,
                whiteSpace: 'pre-line',
                color: isDark ? 'rgba(255,255,255,0.76)' : 'var(--slate-muted)',
              }}>
                {card.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Read in depth — only shown when prose exists */}
        {proseText && (
          <button
            onClick={() => setShowProse(true)}
            style={{
              marginTop: 24,
              background: 'transparent',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--slate-muted)',
              textDecoration: 'underline',
              textDecorationColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(44,52,64,0.2)',
              textUnderlineOffset: 3,
              letterSpacing: '0.01em',
              alignSelf: 'flex-start',
              paddingBottom: 4,
            }}
          >
            Read in depth ↗
          </button>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          {index > 0 && (
            <button
              onClick={() => go(index - 1, -1)}
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
            onClick={() => isLast ? handleFinish() : go(index + 1, 1)}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {isLast
              ? lessonNum < totalLessons ? 'Next Page →' : 'Finish Module →'
              : 'Next →'
            }
          </button>
        </div>
      </div>

      {/* ── Prose bottom sheet ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showProse && proseText && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowProse(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(44, 52, 64, 0.55)',
                zIndex: 200,
              }}
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: 430,
                height: '88vh',
                background: 'var(--cream)',
                borderRadius: '20px 20px 0 0',
                zIndex: 201,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Sheet header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 24px 16px',
                borderBottom: '1px solid var(--cream-dark)',
                flexShrink: 0,
              }}>
                <div>
                  <p style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.09em',
                    textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 2,
                  }}>
                    Read in depth
                  </p>
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 700, color: 'var(--slate)', lineHeight: 1.3,
                  }}>
                    {lessonTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setShowProse(false)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'var(--cream-dark)',
                    color: 'var(--slate-muted)', fontSize: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >✕</button>
              </div>

              {/* Scrollable prose */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 60px' }}>
                {proseText.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '0.97rem',
                      lineHeight: 1.78,
                      color: 'var(--slate)',
                      marginBottom: 20,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
