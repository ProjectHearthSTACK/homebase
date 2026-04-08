import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../../hooks/usePageTransition'

const notifKeys = [
  { key: 'hb_notif_streak',    label: 'Daily streak reminder',  desc: 'A nudge to keep your streak alive' },
  { key: 'hb_notif_modules',   label: 'New module alerts',      desc: 'Know when new lessons drop' },
  { key: 'hb_notif_recap',     label: 'Weekly progress recap',  desc: 'A summary of what you learned' },
  { key: 'hb_notif_community', label: 'Community updates',      desc: 'Activity from your community feed' },
  { key: 'hb_notif_email',     label: 'Email notifications',    desc: 'Get updates in your inbox too' },
]

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 44, height: 26, borderRadius: 13,
        background: on ? 'var(--terracotta)' : 'var(--cream-dark)',
        border: 'none', cursor: 'pointer',
        position: 'relative', flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3, left: on ? 21 : 3,
        width: 20, height: 20,
        borderRadius: '50%',
        background: 'white',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.2s cubic-bezier(0.22,1,0.36,1)',
      }} />
    </button>
  )
}

export default function NotificationSettings() {
  const navigate = useNavigate()
  const ref = usePageTransition('left')

  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notifKeys.map(n => [n.key, localStorage.getItem(n.key) !== 'false']))
  )

  const toggle = (key: string) => {
    setToggles(prev => {
      const next = { ...prev, [key]: !prev[key] }
      localStorage.setItem(key, String(next[key]))
      return next
    })
  }

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 48 }}>
      <div style={{ background: 'var(--slate)', padding: '48px 24px 28px', color: 'var(--cream)' }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'transparent', color: 'rgba(240,236,228,0.6)', fontSize: '0.9rem', marginBottom: 20, padding: 0 }}>← Back</button>
        <h1 style={{ fontSize: '1.6rem' }}>Notifications</h1>
        <p style={{ fontSize: '0.85rem', color: '#a0a0b0', marginTop: 6 }}>Control what HomeBase sends you</p>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)', overflow: 'hidden' }}>
          {notifKeys.map((n, i) => (
            <div key={n.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: i < notifKeys.length - 1 ? '1px solid var(--cream-dark)' : 'none', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--slate)', marginBottom: 2 }}>{n.label}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>{n.desc}</p>
              </div>
              <Toggle on={toggles[n.key]} onToggle={() => toggle(n.key)} />
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
          Push notifications require browser permission. Changes save automatically.
        </p>
      </div>
    </div>
  )
}