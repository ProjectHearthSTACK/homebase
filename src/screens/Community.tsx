export default function Community() {
  return (
    <div style={{ height: '100vh', overflowY: 'auto', background: 'var(--cream)', paddingBottom: 100 }}>

      {/* HEADER — sticky */}
      <div style={{
        background: 'var(--slate)',
        padding: '52px 24px 32px',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--terracotta-light)', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>
          HOMEBASE
        </p>
        <h1 style={{ fontSize: '1.7rem', color: 'var(--cream)', fontFamily: 'var(--font-display)' }}>
          Community
        </h1>
      </div>

      {/* COMING SOON CARD */}
      <div style={{ margin: '32px 24px 0' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--cream-dark)',
          boxShadow: 'var(--shadow-sm)',
          padding: '32px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ fontSize: '2.8rem', lineHeight: 1, marginBottom: 4 }}>🏘️</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--slate)',
            lineHeight: 1.3,
          }}>
            Community is coming soon
          </h2>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--slate-muted)',
            lineHeight: 1.7,
            maxWidth: 300,
          }}>
            A place to connect, share what you're learning, and find people who get it. We're building it now.
          </p>
        </div>
      </div>

      {/* MISSION CTA */}
      <div style={{ margin: '16px 24px 0' }}>
        <div style={{
          background: 'var(--slate)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <p style={{
            fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--terracotta-light)',
          }}>
            Project Hearth Foundation
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            color: 'var(--cream)',
            lineHeight: 1.5,
          }}>
            Want to learn more about our community and mission?
          </p>
          <p style={{ fontSize: '0.84rem', color: '#a0a0b0', lineHeight: 1.65 }}>
            Check out our website while you wait — learn what we're building, why we built it, and how you can be part of it.
          </p>
          <button
            onClick={() => window.open('https://projecthearth.org', '_blank')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            style={{
              marginTop: 4, padding: '13px',
              background: 'var(--terracotta)', color: 'white',
              fontWeight: 700, fontSize: '0.9rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 16px rgba(193,105,79,0.3)',
              transition: 'transform 0.15s',
            }}
          >
            Visit projecthearth.org →
          </button>
        </div>
      </div>

    </div>
  )
}
