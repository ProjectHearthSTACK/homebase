import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { supabase } from '../lib/supabase'

interface Card {
  id: string
  card_order: number
  type: 'hook' | 'learn' | 'apply' | 'win'
  title: string
  body: string
}

const typeBg: Record<string, string> = {
  hook:  '#2D3142',
  learn: '#FFFFFF',
  apply: '#FFF5F2',
  win:   '#F0FFF4',
}

export default function ModuleLesson() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const { moduleId, lessonNumber } = useParams()

  const [cards, setCards] = useState<Card[]>([])
  const [lessonTitle, setLessonTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<'right' | 'left'>('right')
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('lesson_cards')
        .select('*')
        .eq('module_id', moduleId)
        .eq('lesson_number', Number(lessonNumber))
        .order('card_order', { ascending: true })

      if (error) {
        console.error('Error fetching cards:', error)
      } else if (data && data.length > 0) {
        setCards(data)
        setLessonTitle(data[0].lesson_title)
      }
      setLoading(false)
    }

    if (moduleId && lessonNumber) fetchCards()
  }, [moduleId, lessonNumber])

  const card = cards[index]
  const isLast = index === cards.length - 1

  const go = (next: number, direction: 'right' | 'left') => {
    setDir(direction)
    setAnimKey(k => k + 1)
    setIndex(next)
  }

  const handleFinish = () => {
    const nextLesson = Number(lessonNumber) + 1
    // Navigate to next lesson — adjust this route once you build the lesson list screen
    navigate(`/lesson/${moduleId}/${nextLesson}`)
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#FDFAF7',
    }}>
      <p style={{ color: 'var(--slate-muted)', fontSize: '0.95rem' }}>Loading lesson...</p>
    </div>
  )

  if (!card) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12,
      background: '#FDFAF7', padding: '0 28px', textAlign: 'center',
    }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate)' }}>Lesson not found.</p>
      <button className="btn-primary" onClick={() => navigate('/modules')}>Back to Modules</button>
    </div>
  )

  return (
    <div ref={ref} style={{
      minHeight: '100vh',
      background: typeBg[card.type],
      display: 'flex', flexDirection: 'column',
      padding: '48px 28px 36px',
      maxWidth: 430, margin: '0 auto',
      color: card.type === 'hook' ? 'var(--cream)' : 'var(--slate)',
      transition: 'background 0.4s ease',
    }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 40 }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: card.type === 'hook' ? 'rgba(255,255,255,0.15)' : 'var(--cream-dark)',
            overflow: 'hidden',
          }}>
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

      {/* Card content */}
      <div
        key={animKey}
        className={dir === 'right' ? 'card-enter-right' : 'card-enter-left'}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {card.type === 'win' ? (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', gap: 16,
          }}>
            <div className="pop-in" style={{ fontSize: '4rem', lineHeight: 1 }}>🎉</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem', lineHeight: 1.2, color: 'var(--slate)',
            }}>{card.title}</h1>
            <div style={{
              background: '#E8F8EE', border: '1.5px solid #a8e6c0',
              borderRadius: 'var(--radius-md)', padding: '12px 20px',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: '1.1rem' }}>🏅</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1a6b4a' }}>
                {lessonTitle} complete
              </span>
            </div>
            <p style={{
              fontSize: '1rem', lineHeight: 1.75,
              color: 'var(--slate-muted)', maxWidth: 300,
            }}>{card.body}</p>
          </div>
        ) : (
          <>
            <p style={{
              fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 16,
              color: 'var(--terracotta)',
            }}>
              {card.type === 'hook' ? lessonTitle : card.type}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.9rem', lineHeight: 1.2, marginBottom: 20,
            }}>{card.title}</h1>
            <p style={{
              fontSize: '1.05rem', lineHeight: 1.75,
              color: card.type === 'hook' ? '#c8c0b4' : 'var(--slate-muted)',
            }}>{card.body}</p>
          </>
        )}
      </div>

      {/* Nav buttons */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        {index > 0 && (
          <button
            onClick={() => go(index - 1, 'left')}
            style={{
              padding: '14px 20px', borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--cream-dark)',
              background: 'transparent', fontSize: '0.9rem',
              color: card.type === 'hook' ? 'rgba(255,255,255,0.5)' : 'var(--slate-muted)',
              transition: 'all 0.15s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >← Back</button>
        )}
        <button
          className="btn-primary"
          onClick={() => isLast ? handleFinish() : go(index + 1, 'right')}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isLast ? 'Next Lesson →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
