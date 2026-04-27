import { useNavigate, useLocation } from 'react-router-dom'

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#C1694F' : '#6B7080'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
)

const LearnIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#C1694F' : '#6B7080'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>
)

const CommunityIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#C1694F' : '#6B7080'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
)

const ResourcesIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#C1694F' : '#6B7080'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#C1694F' : '#6B7080'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const tabs = [
  { path: '/dashboard', label: 'Home',      Icon: HomeIcon      },
  { path: '/modules',   label: 'Learn',     Icon: LearnIcon     },
  { path: '/community', label: 'Community', Icon: CommunityIcon },
  { path: '/resources', label: 'Resources', Icon: ResourcesIcon },
  { path: '/profile',   label: 'Profile',   Icon: ProfileIcon   },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = (path: string) => pathname === path

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%',
      transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'var(--white)',
      borderTop: '1px solid var(--cream-dark)',
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100,
      boxShadow: '0 -4px 20px rgba(45,49,66,0.06)',
    }}>
      {tabs.map(({ path, label, Icon }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '10px 0 8px', background: 'transparent', gap: 3,
          }}
        >
          <Icon active={isActive(path)} />
          <span style={{
            fontSize: '0.6rem',
            fontWeight: isActive(path) ? 600 : 400,
            color: isActive(path) ? 'var(--terracotta)' : 'var(--slate-muted)',
            letterSpacing: '0.02em',
            transition: 'color 0.15s',
          }}>
            {label}
          </span>
        </button>
      ))}
    </nav>
  )
}
