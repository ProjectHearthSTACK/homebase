import { useEffect, useState } from 'react'

type Step = {
  target: string
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    target: 'streak',
    title: '🔥 Your Streak',
    body: 'Every day you complete a lesson keeps your streak alive. Miss a day and it resets — so keep showing up.',
  },
  {
    target: 'continue',
    title: '▶ Continue Learning',
    body: 'This picks up exactly where you left off. No searching, no scrolling — just keep going.',
  },
  {
    target: 'nav-learn',
    title: '📖 Learn',
    body: 'Every pillar and module lives here. Browse all 102 modules and start anything.',
  },
  {
    target: 'nav-profile',
    title: '👤 Profile',
    body: 'Track your progress, badges, and streak — and update your situation anytime.',
  },
]

type Rect = { x: number; y: number; width: number; height: number }

export default function CoachMarks({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)

  const current = STEPS[step]

  useEffect(() => {
    const el = document.querySelector(`[data-coach="${current.target}"]`)
    if (!el) return
    const r = el.getBoundingClientRect()
    setRect({ x: r.x, y: r.y, width: r.width, height: r.height })
    el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [step])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      localStorage.setItem('hb_tutorial_done', 'true')
      onDone()
    }
  }

  if (!rect) return null

  const pad = 10
  const rx  = rect.x - pad
  const ry  = rect.y - pad
  const rw  = rect.width + pad * 2
  const rh  = rect.height + pad * 2
  const br  = 12

  const tooltipAbove = ry > window.innerHeight / 2
  const tooltipTop   = tooltipAbove ? ry - 180 : ry + rh + 16

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      {/* SVG overlay with spotlight cutout */}
      <svg
        width="100%" height="100%"
        style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
        onClick={handleNext}
      >
        <defs>
          <mask id="coach-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect x={rx} y={ry} width={rw} height={rh} rx={br} fill="black" />
          </mask>
        </defs>
        {/* Dark overlay with hole */}
        <rect width="100%" height="100%" fill="rgba(20,24,36,0.82)" mask="url(#coach-mask)" />
        {/* Terracotta spotlight ring */}
        <rect
          x={rx} y={ry} width={rw} height={rh} rx={br}
          fill="none" stroke="#C1694F" strokeWidth="2.5" opacity="0.9"
        />
      </svg>

      {/* Tooltip card */}
      <div style={{
        position: 'absolute',
        left: 24, right: 24,
        top: tooltipTop,
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        padding: '20px 20px 18px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        zIndex: 1001,
        animation: 'coachIn 0.22s ease both',
      }}>
        <h3 style={{
          fontSize: '1rem', fontWeight: 700,
          color: 'var(--slate)', marginBottom: 6,
        }}>
          {current.title}
        </h3>
        <p style={{
          fontSize: '0.87rem', color: 'var(--slate-muted)',
          lineHeight: 1.65, marginBottom: 18,
        }}>
          {current.body}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 18 : 6,
                height: 6, borderRadius: 3,
                background: i === step ? 'var(--terracotta)' : 'var(--cream-dark)',
                transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
              }} />
            ))}
          </div>

          <button
            onClick={e => { e.stopPropagation(); handleNext() }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            style={{
              background: 'var(--terracotta)', color: 'white',
              fontWeight: 700, fontSize: '0.88rem',
              padding: '9px 22px', borderRadius: 'var(--radius-md)',
              transition: 'transform 0.15s',
            }}
          >
            {step < STEPS.length - 1 ? 'Next →' : 'Done ✓'}
          </button>
        </div>

        {/* Skip */}
        <button
          onClick={e => {
            e.stopPropagation()
            localStorage.setItem('hb_tutorial_done', 'true')
            onDone()
          }}
          style={{
            marginTop: 14, width: '100%', textAlign: 'center',
            fontSize: '0.78rem', color: 'var(--slate-muted)',
            background: 'none', padding: 0,
          }}
        >
          Skip tutorial
        </button>
      </div>

      <style>{`
        @keyframes coachIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
