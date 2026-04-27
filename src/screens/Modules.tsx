import { pillars } from '../content'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Pillars instead of categories
const pillars = ['All', 'Money Basics', 'Taxes & Benefits', 'Building Wealth']

const modules = [
  {
    id: '1', emoji: '💵', title: 'Your First Paycheck Decoded',
    desc: 'Understand gross vs. net, taxes, and every line on your stub.',
    duration: '8 min', unlocked: true, pillar: 'Money Basics',
  },
  {
    id: '2', emoji: '🧾', title: 'Taxes Without the Panic',
    desc: 'W-2s, 1099s, refunds, and what April 15 actually means.',
    duration: '10 min', unlocked: false, pillar: 'Taxes & Benefits',
  },
  {
    id: '3', emoji: '📊', title: 'Building Your First Budget',
    desc: 'The 50/30/20 rule and a system that actually sticks.',
    duration: '9 min', unlocked: false, pillar: 'Money Basics',
  },
  {
    id: '4', emoji: '🏦', title: 'Emergency Funds 101',
    desc: 'Why $1,000 changes everything and how to get there.',
    duration: '7 min', unlocked: false, pillar: 'Money Basics',
  },
  {
    id: '5', emoji: '📉', title: 'Getting Out of Debt',
    desc: 'Avalanche vs. snowball — and which one wins for you.',
    duration: '11 min', unlocked: false, pillar: 'Money Basics',
  },
  {
    id: '6', emoji: '📈', title: 'Credit Scores Explained',
    desc: 'What moves your score and how to build it from zero.',
    duration: '8 min', unlocked: false, pillar: 'Building Wealth',
  },
  {
    id: '7', emoji: '🏥', title: 'Health Insurance Basics',
    desc: 'Premiums, deductibles, copays — decoded once and for all.',
    duration: '9 min', unlocked: false, pillar: 'Taxes & Benefits',
  },
  {
    id: '8', emoji: '🏠', title: 'Renting vs. Buying',
    desc: 'The real math behind one of the biggest decisions you will make.',
    duration: '12 min', unlocked: false, pillar: 'Building Wealth',
  },
  {
    id: '9', emoji: '📦', title: 'Investing for Beginners',
    desc: '401k, IRA, index funds — where to start and why it matters now.',
    duration: '10 min', unlocked: false, pillar: 'Building Wealth',
  },
]

// Badge data per module — tied to pillar
// Each badge: { id, emoji, label, type: 'lesson' | 'module' | 'pillar' | 'misc', earned }
const moduleBadges: Record<string, { id: string; emoji: string; label: string; type: string; earned: boolean }[]> = {
  '1': [
    { id: 'b1', emoji: '📖', label: 'First Lesson', type: 'lesson', earned: true },
    { id: 'b2', emoji: '💡', label: 'Pay Stub Pro', type: 'lesson', earned: true },
    { id: 'b3', emoji: '💵', label: 'Paycheck Decoded', type: 'module', earned: false },
    { id: 'b4', emoji: '🌱', label: 'Money Basics Starter', type: 'pillar', earned: false },
    { id: 'b5', emoji: '🔥', label: '3-Day Streak', type: 'misc', earned: true },
    { id: 'b6', emoji: '⚡', label: 'Fast Learner', type: 'misc', earned: false },
  ],
  '2': [
    { id: 'b1', emoji: '🧾', label: 'Tax Curious', type: 'lesson', earned: false },
    { id: 'b2', emoji: '📋', label: 'W-2 Warrior', type: 'lesson', earned: false },
    { id: 'b3', emoji: '🧠', label: 'Tax Decoded', type: 'module', earned: false },
    { id: 'b4', emoji: '🏛️', label: 'Benefits Explorer', type: 'pillar', earned: false },
  ],
}

type ModuleDetailProps = {
  module: typeof modules[0]
  onClose: () => void
  onStart: () => void
}

function ModuleDetail({ module, onClose, onStart }: ModuleDetailProps) {
  const [enrolled, setEnrolled] = useState(false)
  const badges = moduleBadges[module.id] || []

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--cream)', zIndex: 200,
      overflowY: 'auto', paddingBottom: 100,
      animation: 'slideUp 0.25s ease',
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

      {/* Header */}
      <div style={{ background: 'var(--slate)', padding: '48px 24px 28px', color: 'var(--cream)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: 34, height: 34, color: 'white', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >←</button>

        <div style={{ marginTop: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
            {module.emoji}
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--terracotta-light)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{module.pillar}</p>
            <h1 style={{ fontSize: '1.35rem', lineHeight: 1.3 }}>{module.title}</h1>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px 0' }}>

        {/* Progress + Time */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '14px 16px', border: '1.5px solid var(--cream-dark)' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--slate-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Progress</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate)' }}>0%</p>
            <div style={{ marginTop: 8, height: 4, background: 'var(--cream-dark)', borderRadius: 10 }}>
              <div style={{ width: '0%', height: '100%', background: 'var(--terracotta)', borderRadius: 10 }} />
            </div>
          </div>
          <div style={{ flex: 1, background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '14px 16px', border: '1.5px solid var(--cream-dark)' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--slate-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Time Spent</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate)' }}>0 min</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', marginTop: 4 }}>of {module.duration}</p>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.88rem', color: 'var(--slate-muted)', lineHeight: 1.7, marginBottom: 20 }}>{module.desc}</p>

        {/* Enroll / Unenroll */}
        <button
          onClick={() => setEnrolled(e => !e)}
          style={{
            width: '100%', padding: '14px', borderRadius: 'var(--radius-md)',
            background: enrolled ? 'transparent' : 'var(--terracotta)',
            color: enrolled ? 'var(--slate-muted)' : 'white',
            border: enrolled ? '1.5px solid var(--cream-dark)' : 'none',
            fontWeight: 600, fontSize: '0.95rem',
            marginBottom: 28, transition: 'all 0.2s',
          }}
        >
          {enrolled ? 'Unenroll from Module' : 'Enroll in Module'}
        </button>

        {/* Lessons */}
        <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 12 }}>Lessons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {['Introduction', 'Core Concepts', 'Deep Dive', 'Real-World Apply', 'Quiz & Review'].map((lesson, i) => (
            <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid var(--cream-dark)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? 'var(--terracotta)' : 'var(--cream-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: i === 0 ? 'white' : 'var(--slate-muted)', flexShrink: 0 }}>
                {i + 1}
              </div>
              <p style={{ fontSize: '0.87rem', fontWeight: 500, color: 'var(--slate)' }}>{lesson}</p>
              {i === 0 && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontWeight: 600, color: 'var(--terracotta)', background: '#FFF0EC', padding: '2px 8px', borderRadius: 20 }}>Start</span>}
            </div>
          ))}
        </div>

        {/* Badges */}
        <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 12 }}>Badges</h2>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {badges.map(badge => (
            <div
              key={badge.id}
              style={{
                flexShrink: 0, width: 80,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                opacity: badge.earned ? 1 : 0.35,
                filter: badge.earned ? 'none' : 'grayscale(1)',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: badge.earned ? '#FFF0EC' : '#f0f0f0',
                border: badge.earned ? '2px solid var(--terracotta)' : '2px solid #ddd',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
              }}>
                {badge.emoji}
              </div>
              <p style={{ fontSize: '0.65rem', fontWeight: 600, color: badge.earned ? 'var(--slate)' : 'var(--slate-muted)', textAlign: 'center', lineHeight: 1.3 }}>
                {badge.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Modules() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null)

  const filtered = filter === 'All' ? modules : modules.filter(m => m.pillar === filter)

  if (selectedModule) {
    return (
      <ModuleDetail
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onStart={() => navigate('/lesson/' + selectedModule.id)}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: 'var(--slate)', padding: '48px 24px 24px', color: 'var(--cream)' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>Learn</h1>
        <p style={{ fontSize: '0.88rem', color: '#a0a0b0' }}>9 modules · start anywhere</p>
      </div>

      {/* Pillar Filter */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 24px', scrollbarWidth: 'none' }}>
        {pillars.map(p => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            style={{
              padding: '7px 14px', borderRadius: 20,
              border: filter === p ? '1.5px solid var(--terracotta)' : '1.5px solid var(--cream-dark)',
              background: filter === p ? 'var(--terracotta)' : 'var(--white)',
              color: filter === p ? 'var(--white)' : 'var(--slate-muted)',
              fontSize: '0.8rem', fontWeight: 500,
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'all 0.15s',
            }}
          >{p}</button>
        ))}
      </div>

      {/* Module List */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((m, i) => (
          <div
            key={m.id}
            onClick={() => setSelectedModule(m)}
            style={{
              background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '16px',
              display: 'flex', gap: 14,
              border: '1.5px solid var(--cream-dark)', boxShadow: 'var(--shadow-sm)',
              opacity: m.unlocked ? 1 : 0.6,
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 10, right: 14, fontSize: '0.7rem', color: 'var(--slate-muted)', fontWeight: 600 }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0, background: m.unlocked ? '#FFF0EC' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              {m.emoji}
            </div>
            <div style={{ flex: 1, paddingRight: 20 }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.pillar}</span>
              </div>
              <p style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--slate)', marginBottom: 4, lineHeight: 1.3 }}>{m.title}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', lineHeight: 1.5, marginBottom: 6 }}>{m.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>{m.duration}</span>
                {m.unlocked
                  ? <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--terracotta)', background: '#FFF0EC', padding: '2px 8px', borderRadius: 20 }}>Start</span>
                  : <span style={{ fontSize: '0.72rem', color: 'var(--slate-muted)' }}>Locked</span>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
