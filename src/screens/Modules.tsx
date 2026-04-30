import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pillars } from '../content'

const PILLAR_COLORS: Record<string, string> = {
  '1': '#C1694F',
  '2': '#4A7C6F',
  '3': '#6B5EA8',
  '4': '#C1694F',
}

const PILLAR_BG: Record<string, string> = {
  '1': '#FFF0EC',
  '2': '#EDF5F3',
  '3': '#F0EDF8',
  '4': '#FFF0EC',
}

export default function Modules() {
  const navigate = useNavigate()
  const [activePillar, setActivePillar] = useState('1')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const pillar = pillars.find(p => p.id === activePillar)!
  const accentColor = PILLAR_COLORS[activePillar]
  const accentBg    = PILLAR_BG[activePillar]

  return (
    <div style={{ height: '100vh', overflowY: 'auto', background: 'var(--cream)', paddingBottom: 100 }}>

      {/* HEADER — sticky */}
      <div style={{
        background: 'var(--slate)',
        padding: '52px 24px 0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--terracotta-light)', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>
          HOMEBASE
        </p>
        <h1 style={{ fontSize: '1.7rem', color: 'var(--cream)', fontFamily: 'var(--font-display)', marginBottom: 20 }}>
          Learn
        </h1>

        {/* PILLAR TABS */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 0 }}>
          {pillars.map(p => {
            const isActive = p.id === activePillar
            return (
              <button
                key={p.id}
                onClick={() => { setActivePillar(p.id); setExpandedId(null) }}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                style={{
                  flexShrink: 0,
                  padding: '8px 14px',
                  borderRadius: '20px 20px 0 0',
                  background: isActive ? 'var(--cream)' : 'rgba(255,255,255,0.08)',
                  color: isActive ? PILLAR_COLORS[p.id] : 'rgba(255,255,255,0.55)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.emoji} {p.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* PILLAR SUMMARY */}
      <div style={{ background: accentBg, padding: '16px 24px', borderBottom: `2px solid ${accentColor}22` }}>
        <p style={{ fontSize: '0.8rem', color: accentColor, lineHeight: 1.6 }}>
          {pillar.description}
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--slate-muted)', marginTop: 6, fontWeight: 600 }}>
          {pillar.modules.length} modules · {pillar.modules.reduce((a, m) => a + m.lessons.length, 0)} pages
        </p>
      </div>

      {/* MODULE LIST */}
      <div style={{ padding: '16px 16px 0' }}>
        {pillar.modules.map((mod, idx) => {
          const isExpanded = expandedId === mod.id
          const completedCount = mod.lessons.filter(l => l.completed).length
          const pct = Math.round((completedCount / mod.lessons.length) * 100)

          return (
            <div
              key={mod.id}
              style={{
                marginBottom: 10,
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1.5px solid var(--cream-dark)',
                boxShadow: 'var(--shadow-sm)',
                background: 'var(--white)',
              }}
            >
              {/* MODULE ROW */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : mod.id)}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.985)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
              >
                {/* Emoji + number badge */}
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: accentBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.35rem', flexShrink: 0,
                  position: 'relative',
                }}>
                  {mod.emoji}
                  <span style={{
                    position: 'absolute', bottom: -4, right: -4,
                    fontSize: '0.55rem', fontWeight: 700,
                    background: accentColor, color: 'white',
                    borderRadius: 8, padding: '1px 5px',
                    lineHeight: 1.6,
                  }}>{idx + 1}</span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: 600, fontSize: '0.88rem',
                    color: 'var(--slate)', lineHeight: 1.35,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {mod.title}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--slate-muted)', marginTop: 2 }}>
                    {mod.lessons.length} pages
                    {completedCount > 0 && ` · ${completedCount} done`}
                  </p>
                  {completedCount > 0 && (
                    <div style={{ marginTop: 6, height: 3, background: '#eee', borderRadius: 2 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: accentColor, borderRadius: 2, transition: 'width 0.4s ease' }} />
                    </div>
                  )}
                </div>

                <span style={{
                  color: accentColor, fontSize: '1.1rem',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  display: 'inline-block', flexShrink: 0,
                }}>›</span>
              </div>

              {/* LESSON LIST */}
              {isExpanded && (
                <div style={{ background: '#fdfaf8', borderTop: '1px solid var(--cream-dark)' }}>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--cream-dark)' }}>
                    <p style={{ fontSize: '0.72rem', color: 'var(--slate-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
                      {mod.description}
                    </p>
                  </div>
                  {mod.lessons.map((lesson, lIdx) => (
                    <div
                      key={lesson.id}
                      onClick={() => navigate(`/lesson/${mod.id}/${lIdx + 1}`)}
                      onMouseDown={e => (e.currentTarget.style.background = 'var(--cream)')}
                      onMouseUp={e => (e.currentTarget.style.background = 'transparent')}
                      style={{
                        padding: '11px 16px 11px 20px',
                        display: 'flex', alignItems: 'center', gap: 10,
                        borderBottom: lIdx < mod.lessons.length - 1 ? '1px solid var(--cream-dark)' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                        {lesson.completed
                          ? <>
                              <circle cx="9" cy="9" r="8.5" fill={accentColor} stroke={accentColor}/>
                              <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </>
                          : <circle cx="9" cy="9" r="8.5" stroke="#D4C5B8" fill="none"/>
                        }
                      </svg>

                      <p style={{
                        flex: 1,
                        fontSize: '0.83rem',
                        color: lesson.completed ? 'var(--slate-muted)' : 'var(--slate)',
                        fontWeight: lesson.completed ? 400 : 500,
                        textDecoration: lesson.completed ? 'line-through' : 'none',
                        lineHeight: 1.4,
                      }}>
                        {lesson.title}
                      </p>

                      <span style={{ fontSize: '0.7rem', color: '#aaa', flexShrink: 0 }}>
                        {lIdx + 1}/{mod.lessons.length}
                      </span>

                      <span style={{ color: accentColor, fontSize: '0.85rem', flexShrink: 0 }}>›</span>
                    </div>
                  ))}

                  {/* Start / Continue button */}
                  <div style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => {
                        const firstIncomplete = mod.lessons.findIndex(l => !l.completed)
                        const target = firstIncomplete === -1 ? 0 : firstIncomplete
                        navigate(`/lesson/${mod.id}/${target + 1}`)
                      }}
                      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
                      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                      style={{
                        width: '100%',
                        padding: '11px',
                        background: accentColor,
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        transition: 'transform 0.15s',
                      }}
                    >
                      {completedCount === 0
                        ? 'Start Module →'
                        : completedCount === mod.lessons.length
                          ? 'Review Module →'
                          : `Continue — Page ${mod.lessons.findIndex(l => !l.completed) + 1} →`
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
  )
}
