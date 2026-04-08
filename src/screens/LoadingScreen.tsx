import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoadingScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const isOnboarded = localStorage.getItem('hb_onboarded') === 'true'
    const timer = setTimeout(() => {
      navigate(isOnboarded ? '/dashboard' : '/welcome', { replace: true })
    }, 2200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--slate) 0%, var(--slate-light) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
    }}>
      {/* Pulse rings */}
      <div style={{ position: 'relative', width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          width: 96, height: 96,
          borderRadius: '50%',
          background: 'rgba(193,105,79,0.15)',
          animation: 'loadPulse 2s ease-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: 72, height: 72,
          borderRadius: '50%',
          background: 'rgba(193,105,79,0.2)',
          animation: 'loadPulse 2s ease-out infinite 0.3s',
        }} />
        {/* Logo */}
        <div style={{
          width: 56, height: 56,
          borderRadius: 16,
          background: 'var(--terracotta)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          position: 'relative',
          zIndex: 1,
          animation: 'loadFadeIn 0.5s ease both',
          boxShadow: '0 8px 24px rgba(193,105,79,0.35)',
        }}>
          🏠
        </div>
      </div>

      {/* Wordmark */}
      <div style={{ textAlign: 'center', animation: 'loadFadeIn 0.5s ease 0.2s both' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 600,
          color: 'var(--cream)',
          letterSpacing: '0.01em',
          marginBottom: 6,
        }}>HomeBase</p>
        <p style={{
          fontSize: '0.78rem',
          color: 'rgba(240,236,228,0.45)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>Real skills. Real life. No fluff.</p>
      </div>

      {/* Subtle dots */}
      <div style={{ display: 'flex', gap: 6, animation: 'loadFadeIn 0.5s ease 0.6s both' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 5, height: 5,
            borderRadius: '50%',
            background: 'var(--terracotta)',
            opacity: 0.7,
            animation: 'dotBounce 1.2s ease-in-out infinite',
            animationDelay: i * 0.18 + 's',
          }} />
        ))}
      </div>

      <style>{`
        @keyframes loadPulse {
          0%   { transform: scale(0.8); opacity: 0.8; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes loadFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}