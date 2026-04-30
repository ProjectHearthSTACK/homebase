import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../hooks/usePageTransition'
import { supabase } from '../lib/supabase'

type Mode = 'signup' | 'login'

const AUTH_ERRORS: Record<string, string> = {
  'Invalid login credentials':          'Incorrect email or password. Try again.',
  'Email not confirmed':                 'Please confirm your email before logging in.',
  'User already registered':             'An account with this email already exists. Try logging in.',
  'Password should be at least 6 characters': 'Password must be at least 6 characters.',
  'Unable to validate email address':    'Please enter a valid email address.',
  'signup_disabled':                     'Sign ups are currently disabled. Try again later.',
}

function friendlyError(raw: string): string {
  for (const [key, msg] of Object.entries(AUTH_ERRORS)) {
    if (raw.toLowerCase().includes(key.toLowerCase())) return msg
  }
  return 'Something went wrong. Please try again.'
}

export default function OnboardingAuth() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const [mode, setMode]           = useState<Mode>('signup')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  const handleContinue = async () => {
    if (!email.trim() || !password.trim()) return
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(friendlyError(error.message)); setLoading(false); return }

      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          modules_completed: 0,
          streak: 0,
        })
      }

      localStorage.setItem('hb_email', email.trim())
      navigate('/onboarding/name')
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(friendlyError(error.message)); setLoading(false); return }

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profile) {
          if (profile.name)      localStorage.setItem('hb_name', profile.name)
          if (profile.situation) localStorage.setItem('hb_situation', profile.situation)
          if (profile.goal)      localStorage.setItem('hb_goal', profile.goal)
        }
      }

      localStorage.setItem('hb_email', email.trim())
      localStorage.setItem('hb_onboarded', 'true')
      navigate('/dashboard')
    }
  }

  const inputStyle = {
    width: '100%', padding: '16px 18px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--cream-dark)',
    fontSize: '1.05rem', fontFamily: 'var(--font-body)',
    color: 'var(--slate)', background: 'var(--white)',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box' as const,
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'var(--terracotta)'
    e.target.style.boxShadow = '0 0 0 3px rgba(193,105,79,0.12)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = error ? '#c0392b' : 'var(--cream-dark)'
    e.target.style.boxShadow = 'none'
  }

  const isLogin = mode === 'login'

  return (
    <div ref={ref} className="screen" style={{ justifyContent: 'space-between' }}>
      <div className="stagger">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏠</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>HomeBase</span>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', background: 'var(--cream-dark)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 32 }}>
          {(['signup', 'login'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 'calc(var(--radius-md) - 2px)',
                border: 'none', fontSize: '0.9rem', fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: 'pointer',
                background: mode === m ? 'var(--white)' : 'transparent',
                color: mode === m ? 'var(--slate)' : 'var(--slate-muted)',
                boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {m === 'signup' ? 'Create account' : 'Log in'}
            </button>
          ))}
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: 12, lineHeight: 1.2 }}>
          {isLogin ? 'Welcome back.' : 'Create your account'}
        </h1>
        <p style={{ color: 'var(--slate-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 32 }}>
          {isLogin ? 'Log in to pick up where you left off.' : 'Your progress will be saved so you never lose your place.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            autoFocus
            style={{
              ...inputStyle,
              borderColor: error ? '#c0392b' : 'var(--cream-dark)',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {/* Password + toggle */}
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder={isLogin ? 'Your password' : 'Create a password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleContinue()}
              style={{
                ...inputStyle,
                paddingRight: 52,
                borderColor: error ? '#c0392b' : 'var(--cream-dark)',
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              style={{
                position: 'absolute', right: 16, top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none',
                color: 'var(--slate-muted)', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600,
                fontFamily: 'var(--font-body)',
                padding: '4px',
              }}
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div style={{
            marginTop: 14, padding: '12px 14px',
            background: '#fdf0ef', borderRadius: 'var(--radius-md)',
            border: '1.5px solid #f0b8b0',
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>⚠️</span>
            <p style={{ color: '#c0392b', fontSize: '0.85rem', lineHeight: 1.5 }}>{error}</p>
          </div>
        )}

        {!isLogin && (
          <p style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', marginTop: 14, lineHeight: 1.5 }}>
            By continuing, you agree to HomeBase's terms. Survival content is always free.
          </p>
        )}
      </div>

      <div className="stagger">
        <button
          className="btn-primary"
          disabled={!email.trim() || !password.trim() || loading}
          onClick={handleContinue}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {loading
            ? (isLogin ? 'Logging in...' : 'Creating your account...')
            : (isLogin ? 'Log in →' : 'Continue →')}
        </button>
        {!isLogin && (
          <button className="btn-ghost" style={{ marginTop: 12 }} onClick={() => navigate('/onboarding/situation')}>
            Skip for now
          </button>
        )}
      </div>
    </div>
  )
}
