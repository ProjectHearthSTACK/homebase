import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../../hooks/usePageTransition'
import { supabase } from '../../lib/supabase'

const situations = [
  { id: 'first-job', label: 'Starting my first job' },
  { id: 'paycheck',  label: 'Living paycheck to paycheck' },
  { id: 'debt',      label: 'Dealing with debt' },
  { id: 'saving',    label: 'Trying to start saving' },
  { id: 'lost',      label: 'Just lost and need a plan' },
]

const goals = [
  { id: 'paycheck', label: 'Understand my paycheck' },
  { id: 'budget',   label: 'Build my first budget' },
  { id: 'debt',     label: 'Get out of debt' },
  { id: 'save',     label: 'Start an emergency fund' },
]

const avatarColors = ['#C1694F', '#2D3142', '#3D7A5E', '#6B5EA8', '#C4892A', '#2A7FAF', '#B5525C', '#4A7C6F']

export default function EditProfile() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name,        setName]        = useState('')
  const [username,    setUsername]    = useState(localStorage.getItem('hb_username') || '')
  const [phone,       setPhone]       = useState(localStorage.getItem('hb_phone') || '')
  const [email,       setEmail]       = useState('')
  const [situation,   setSituation]   = useState('')
  const [goal,        setGoal]        = useState('')
  const [avatarColor, setAvatarColor] = useState(localStorage.getItem('hb_avatar_color') || '#C1694F')
  const [photo,       setPhoto]       = useState<string | null>(localStorage.getItem('hb_photo') || null)
  const [usePhoto,    setUsePhoto]    = useState(!!localStorage.getItem('hb_photo'))
  const [saved,       setSaved]       = useState(false)
  const [saving,      setSaving]      = useState(false)
  const [userId,      setUserId]      = useState<string | null>(null)

  // Load profile from Supabase on mount
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
if (!session) { navigate('/welcome'); return }
setUserId(session.user.id)

      const { data } = await supabase
        .from('profiles')
        .select('name, situation, goal')
        .eq('id', user.id)
        .single()

      if (data) {
        setName(data.name || '')
        setSituation(data.situation || '')
        setGoal(data.goal || '')
      }
    }
    load()
  }, [])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setPhoto(result)
      setUsePhoto(true)
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    setUsePhoto(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSave = async () => {
    if (!userId) return
    setSaving(true)

    // Save name, situation, goal to Supabase
    const { error } = await supabase
      .from('profiles')
      .update({
        name:      name.trim() || undefined,
        situation: situation   || undefined,
        goal:      goal        || undefined,
      })
      .eq('id', userId)

    if (error) {
      console.error('Error saving profile:', error)
      setSaving(false)
      return
    }

    // Save non-DB fields to localStorage
    if (username.trim()) localStorage.setItem('hb_username', username.trim())
    if (phone.trim())    localStorage.setItem('hb_phone', phone.trim())
    localStorage.setItem('hb_avatar_color', avatarColor)
    if (usePhoto && photo) {
      localStorage.setItem('hb_photo', photo)
    } else {
      localStorage.removeItem('hb_photo')
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => navigate('/profile'), 800)
  }

  const initial = name.trim() ? name.trim()[0].toUpperCase() : '?'

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--cream-dark)',
    fontSize: '0.95rem', fontFamily: 'var(--font-body)',
    color: 'var(--slate)', background: 'var(--cream)',
    outline: 'none', transition: 'border-color 0.2s',
  }

  const sectionStyle: React.CSSProperties = {
    background: 'var(--white)', borderRadius: 'var(--radius-md)',
    padding: '20px', border: '1.5px solid var(--cream-dark)',
  }

  const SectionLabel = ({ text }: { text: string }) => (
    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--slate-muted)', marginBottom: 14 }}>{text}</p>
  )

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ background: 'var(--slate)', padding: '48px 24px 28px', color: 'var(--cream)' }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'transparent', color: 'rgba(240,236,228,0.6)', fontSize: '0.9rem', marginBottom: 20, padding: 0 }}>← Back</button>
        <h1 style={{ fontSize: '1.6rem' }}>Edit Profile</h1>
      </div>

      <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Photo / Avatar */}
        <div style={sectionStyle}>
          <SectionLabel text="Profile Photo" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: usePhoto && photo ? 'transparent' : avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, flexShrink: 0, overflow: 'hidden', border: '3px solid var(--cream-dark)', transition: 'background 0.2s' }}>
              {usePhoto && photo ? <img src={photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate)', fontWeight: 600, marginBottom: 4 }}>{usePhoto ? 'Using your photo' : 'Using your initials'}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', lineHeight: 1.5 }}>Upload a photo or use your initial with a color.</p>
            </div>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          <div style={{ display: 'flex', gap: 10, marginBottom: !usePhoto ? 16 : 12 }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ flex: 1, padding: '11px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--terracotta)', background: usePhoto ? '#FFF0EC' : 'transparent', color: 'var(--terracotta)', fontSize: '0.85rem', fontWeight: 600 }}
            >
              📷 {usePhoto ? 'Change Photo' : 'Upload Photo'}
            </button>
            {usePhoto && (
              <button onClick={handleRemovePhoto} style={{ padding: '11px 16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--cream-dark)', background: 'transparent', color: 'var(--slate-muted)', fontSize: '0.85rem' }}>
                Remove
              </button>
            )}
          </div>

          {!usePhoto && (
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', marginBottom: 10 }}>Pick an initial color</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {avatarColors.map(c => (
                  <button key={c} onClick={() => setAvatarColor(c)} style={{ width: 34, height: 34, borderRadius: '50%', background: c, border: avatarColor === c ? '3px solid var(--slate)' : '3px solid transparent', boxShadow: avatarColor === c ? '0 0 0 2px white, 0 0 0 4px var(--slate)' : 'none', transition: 'all 0.15s', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account Info */}
        <div style={sectionStyle}>
          <SectionLabel text="Account Info" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate-muted)', marginBottom: 6 }}>First Name</p>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your first name" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--terracotta)'}
                onBlur={e => e.target.style.borderColor = 'var(--cream-dark)'}
              />
            </div>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate-muted)', marginBottom: 6 }}>Username</p>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="@username" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--terracotta)'}
                onBlur={e => e.target.style.borderColor = 'var(--cream-dark)'}
              />
            </div>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate-muted)', marginBottom: 6 }}>Phone Number</p>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--terracotta)'}
                onBlur={e => e.target.style.borderColor = 'var(--cream-dark)'}
              />
            </div>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate-muted)', marginBottom: 6 }}>Email Address</p>
              <input type="email" value={email} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--slate-muted)', marginTop: 5 }}>Email is managed through your account and can't be changed here.</p>
            </div>
          </div>
        </div>

        {/* Situation */}
        <div style={sectionStyle}>
          <SectionLabel text="Your Situation" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)} style={{ padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: situation === s.id ? '2px solid var(--terracotta)' : '2px solid var(--cream-dark)', background: situation === s.id ? '#FFF5F2' : 'var(--cream)', fontSize: '0.88rem', color: 'var(--slate)', textAlign: 'left', fontWeight: situation === s.id ? 600 : 400, transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {s.label}
                {situation === s.id && <span style={{ color: 'var(--terracotta)' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div style={sectionStyle}>
          <SectionLabel text="Your #1 Goal" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {goals.map(g => (
              <button key={g.id} onClick={() => setGoal(g.id)} style={{ padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: goal === g.id ? '2px solid var(--terracotta)' : '2px solid var(--cream-dark)', background: goal === g.id ? '#FFF5F2' : 'var(--cream)', fontSize: '0.88rem', color: 'var(--slate)', textAlign: 'left', fontWeight: goal === g.id ? 600 : 400, transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {g.label}
                {goal === g.id && <span style={{ color: 'var(--terracotta)' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ width: '100%', padding: '15px', background: saved ? '#3D7A5E' : 'var(--terracotta)', color: 'white', fontWeight: 700, fontSize: '1rem', borderRadius: 'var(--radius-md)', transition: 'all 0.2s', opacity: saving ? 0.7 : 1 }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>

      </div>
    </div>
  )
}
