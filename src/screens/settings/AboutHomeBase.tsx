import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../../hooks/usePageTransition'

const APP_VERSION = '0.1.0'

export default function AboutHomeBase() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 48 }}>
      <div style={{ background: 'var(--slate)', padding: '48px 24px 32px', color: 'var(--cream)' }}>
        <button
          onClick={() => navigate('/profile')}
          onMouseDown={e => (e.currentTarget.style.opacity = '0.6')}
          onMouseUp={e => (e.currentTarget.style.opacity = '1')}
          style={{ background: 'transparent', color: 'rgba(240,236,228,0.6)', fontSize: '0.9rem', marginBottom: 20, padding: 0, transition: 'opacity 0.15s' }}
        >← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏠</div>
          <div>
            <h1 style={{ fontSize: '1.6rem' }}>HomeBase</h1>
            <p style={{ fontSize: '0.8rem', color: '#a0a0b0', marginTop: 2 }}>Version {APP_VERSION}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Mission */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1.5px solid var(--cream-dark)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--slate-muted)', marginBottom: 10 }}>Our Mission</p>
          <p style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'var(--slate)', lineHeight: 1.6, marginBottom: 10 }}>
            "Project Hearth helps people through life's hardest battles with resources, community, and support to move forward."
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-muted)', lineHeight: 1.65 }}>
            HomeBase is our flagship product — built so that no one has to figure out money, benefits, housing, or adulting alone. Survival content is free forever.
          </p>
        </div>

        {/* Links */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', overflow: 'hidden' }}>
          {[
            { label: 'Send feedback',    emoji: '💬', action: () => window.open('mailto:hello@projecthearth.org?subject=HomeBase Feedback') },
            { label: 'Privacy policy',   emoji: '🔒', action: () => window.open('https://projecthearth.org/privacy') },
            { label: 'Terms of service', emoji: '📄', action: () => window.open('https://projecthearth.org/terms') },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              onClick={item.action}
              onMouseDown={e => (e.currentTarget.style.background = 'var(--cream)')}
              onMouseUp={e => (e.currentTarget.style.background = 'transparent')}
              style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '15px 18px', background: 'transparent', fontSize: '0.92rem', color: 'var(--slate)', borderBottom: i < arr.length - 1 ? '1px solid var(--cream-dark)' : 'none', textAlign: 'left', transition: 'background 0.15s' }}
            >
              <span style={{ fontSize: '1rem' }}>{item.emoji}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              <span style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>→</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', lineHeight: 1.7 }}>
            Made with care by Project Hearth
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', marginTop: 2 }}>
            © {new Date().getFullYear()} Project Hearth. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
