import { useState } from 'react'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
]

const nationwideResources = [
  {
    category: 'Tools',
    items: [
      { emoji: '🧮', title: 'Paycheck Calculator',  desc: 'See exactly where your money goes before it hits your account.', tag: 'Interactive' },
      { emoji: '📋', title: 'Budget Builder',        desc: 'Plug in your income and expenses — get a real plan.',            tag: 'Interactive' },
      { emoji: '📅', title: 'Debt Payoff Tracker',  desc: 'See your payoff date with avalanche or snowball method.',        tag: 'Interactive' },
    ],
  },
  {
    category: 'Guides',
    items: [
      { emoji: '📄', title: 'How to Read a Pay Stub',    desc: 'A line-by-line breakdown you can actually use.',        tag: 'PDF'       },
      { emoji: '🗂️', title: 'Documents You Should Keep', desc: 'The 10 financial documents every adult needs to have.', tag: 'Checklist' },
      { emoji: '💬', title: 'Glossary of Money Terms',   desc: '40+ terms explained in plain language.',                tag: 'Reference' },
    ],
  },
  {
    category: 'Get Help',
    items: [
      { emoji: '🏛️', title: 'Free Financial Counseling', desc: 'NFCC-certified counselors — free or low cost.',   tag: 'External' },
      { emoji: '🍎', title: 'Benefits.gov',              desc: 'Find government benefits you may qualify for.',   tag: 'External' },
      { emoji: '🆘', title: '211 Helpline',              desc: 'Local food, housing, and financial assistance.',  tag: 'External' },
    ],
  },
]

const stateResources: Record<string, { category: string; items: { emoji: string; title: string; desc: string; tag: string }[] }[]> = {
  'Minnesota': [
    {
      category: 'Minnesota Resources',
      items: [
        { emoji: '🏠', title: 'MN Housing Finance Agency', desc: 'Rental assistance and homebuyer programs for Minnesotans.', tag: 'External' },
        { emoji: '🍽️', title: 'Second Harvest Heartland',  desc: 'Food shelf and meal program finder across MN.',            tag: 'External' },
        { emoji: '💊', title: 'MNsure',                    desc: 'Minnesota health insurance marketplace and enrollment help.', tag: 'External' },
      ],
    },
  ],
}

const tagColors: Record<string, { bg: string; color: string }> = {
  'Interactive': { bg: '#FFF0EC', color: 'var(--terracotta)' },
  'PDF':         { bg: '#EEF2FF', color: '#4338ca' },
  'Checklist':   { bg: '#F0FFF4', color: '#16a34a' },
  'Reference':   { bg: '#FFFBEB', color: '#b45309' },
  'External':    { bg: '#F0F9FF', color: '#0369a1' },
}

function ResourceCard({ item }: { item: { emoji: string; title: string; desc: string; tag: string } }) {
  const tc = tagColors[item.tag] ?? { bg: '#f0f0f0', color: '#666' }
  return (
    <div
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      style={{
        background: 'var(--white)', borderRadius: 'var(--radius-md)',
        padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
        border: '1.5px solid var(--cream-dark)', cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)', transition: 'transform 0.15s',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: tc.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem', flexShrink: 0,
      }}>
        {item.emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--slate)' }}>{item.title}</p>
          <span style={{
            fontSize: '0.65rem', fontWeight: 600, padding: '2px 7px',
            borderRadius: 20, background: tc.bg, color: tc.color, flexShrink: 0,
          }}>{item.tag}</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', lineHeight: 1.5 }}>{item.desc}</p>
      </div>
    </div>
  )
}

export default function Resources() {
  const [selectedState, setSelectedState] = useState('')
  const [dropdownOpen,  setDropdownOpen]  = useState(false)

  const stateSpecific     = selectedState ? (stateResources[selectedState] || []) : []
  const hasStateResources = stateSpecific.length > 0

  return (
    <div style={{ height: '100vh', overflowY: 'auto', background: 'var(--cream)', paddingBottom: 100 }}>

      {/* HEADER — sticky */}
      <div style={{
        background: 'var(--slate)',
        padding: '52px 24px 24px',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--terracotta-light)', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>
          HOMEBASE
        </p>
        <h1 style={{ fontSize: '1.7rem', color: 'var(--cream)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>
          Resources
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#a0a0b0' }}>Tools, guides, and real help — free forever</p>
      </div>

      {/* Equity note */}
      <div style={{
        margin: '16px 24px 0', padding: '12px 16px',
        background: '#FFF5F2', border: '1.5px solid #f5c4b3',
        borderRadius: 'var(--radius-md)', display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🤝</span>
        <p style={{ fontSize: '0.8rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--slate)', fontWeight: 600 }}>Survival content is free forever.</strong>{' '}
          No paywall on the things you actually need to get by.
        </p>
      </div>

      {/* State Selector */}
      <div style={{ margin: '16px 24px 0' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 8 }}>
          📍 Find local resources
        </p>
        <button
          onClick={() => setDropdownOpen(o => !o)}
          onMouseDown={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseUp={e => (e.currentTarget.style.opacity = '1')}
          style={{
            width: '100%', padding: '12px 16px',
            background: 'var(--white)', border: '1.5px solid var(--cream-dark)',
            borderRadius: dropdownOpen ? '12px 12px 0 0' : 'var(--radius-md)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: '0.9rem',
            color: selectedState ? 'var(--slate)' : 'var(--slate-muted)',
            fontWeight: selectedState ? 600 : 400,
            transition: 'opacity 0.15s',
          }}
        >
          {selectedState || 'Select your state'}
          <span style={{
            fontSize: '0.8rem',
            transition: 'transform 0.2s',
            transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>▾</span>
        </button>

        {dropdownOpen && (
          <div style={{
            background: 'var(--white)',
            border: '1.5px solid var(--cream-dark)', borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            maxHeight: 220, overflowY: 'auto',
          }}>
            {US_STATES.map(state => (
              <button
                key={state}
                onClick={() => { setSelectedState(state); setDropdownOpen(false) }}
                style={{
                  width: '100%', padding: '11px 16px', textAlign: 'left',
                  background: selectedState === state ? '#FFF0EC' : 'transparent',
                  color: selectedState === state ? 'var(--terracotta)' : 'var(--slate)',
                  fontWeight: selectedState === state ? 600 : 400,
                  fontSize: '0.88rem',
                  borderBottom: '1px solid var(--cream-dark)',
                }}
              >{state}</button>
            ))}
          </div>
        )}

        {selectedState && (
          <div style={{ marginTop: 16 }}>
            {hasStateResources ? (
              stateSpecific.map(section => (
                <div key={section.category} style={{ marginBottom: 16 }}>
                  <h2 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 10 }}>
                    {section.category}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {section.items.map(item => <ResourceCard key={item.title} item={item} />)}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '14px 16px', background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--cream-dark)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>
                  We're still building out {selectedState}-specific resources. Nationwide resources below are available everywhere.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nationwide sections */}
      {nationwideResources.map(section => (
        <div key={section.category} style={{ padding: '20px 24px 0' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 12 }}>
            {section.category}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.items.map(item => <ResourceCard key={item.title} item={item} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
