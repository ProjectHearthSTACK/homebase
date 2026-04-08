const resources = [
  {
    category: 'Tools',
    items: [
      { emoji: '🧮', title: 'Paycheck Calculator', desc: 'See exactly where your money goes before it hits your account.', tag: 'Interactive' },
      { emoji: '📋', title: 'Budget Builder', desc: 'Plug in your income and expenses — get a real plan.', tag: 'Interactive' },
      { emoji: '📅', title: 'Debt Payoff Tracker', desc: 'See your payoff date with avalanche or snowball method.', tag: 'Interactive' },
    ]
  },
  {
    category: 'Guides',
    items: [
      { emoji: '📄', title: 'How to Read a Pay Stub', desc: 'A line-by-line breakdown you can actually use.', tag: 'PDF' },
      { emoji: '🗂️', title: 'Documents You Should Keep', desc: 'The 10 financial documents every adult needs to have.', tag: 'Checklist' },
      { emoji: '💬', title: 'Glossary of Money Terms', desc: '40+ terms explained in plain language.', tag: 'Reference' },
    ]
  },
  {
    category: 'Get Help',
    items: [
      { emoji: '🏛️', title: 'Free Financial Counseling', desc: 'NFCC-certified counselors — free or low cost.', tag: 'External' },
      { emoji: '🍎', title: 'Benefits.gov', desc: 'Find government benefits you may qualify for.', tag: 'External' },
      { emoji: '🆘', title: '211 Helpline', desc: 'Local food, housing, and financial assistance.', tag: 'External' },
    ]
  },
]

const tagColors: Record<string, { bg: string; color: string }> = {
  'Interactive': { bg: '#FFF0EC', color: 'var(--terracotta)' },
  'PDF':         { bg: '#EEF2FF', color: '#4338ca' },
  'Checklist':   { bg: '#F0FFF4', color: '#16a34a' },
  'Reference':   { bg: '#FFFBEB', color: '#b45309' },
  'External':    { bg: '#F0F9FF', color: '#0369a1' },
}

export default function Resources() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: 'var(--slate)', padding: '48px 24px 24px', color: 'var(--cream)' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>Resources</h1>
        <p style={{ fontSize: '0.88rem', color: '#a0a0b0' }}>Tools, guides, and real help — free forever</p>
      </div>

      {/* Equity note */}
      <div style={{ margin: '16px 24px 0', padding: '12px 16px', background: '#FFF5F2', border: '1.5px solid #f5c4b3', borderRadius: 'var(--radius-md)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🤝</span>
        <p style={{ fontSize: '0.8rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--slate)', fontWeight: 600 }}>Survival content is free forever.</strong> No paywall on the things you actually need to get by.
        </p>
      </div>

      {/* Sections */}
      {resources.map(section => (
        <div key={section.category} style={{ padding: '24px 24px 0' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 12 }}>
            {section.category}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.items.map(item => {
              const tc = tagColors[item.tag] ?? { bg: '#f0f0f0', color: '#666' }
              return (
                <div key={item.title} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', border: '1.5px solid var(--cream-dark)', cursor: 'pointer' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--slate)' }}>{item.title}</p>
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: tc.bg, color: tc.color, flexShrink: 0 }}>{item.tag}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}