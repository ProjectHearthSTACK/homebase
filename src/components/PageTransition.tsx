// src/components/PageTransition.tsx
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

type TransitionType = 'slide-up' | 'slide-right' | 'fade-scale' | 'slide-forward'

function getTransitionType(pathname: string): TransitionType {
  if (pathname.startsWith('/lesson'))   return 'slide-up'
  if (pathname.startsWith('/settings')) return 'slide-right'
  if (['/dashboard', '/modules', '/resources', '/profile', '/community']
    .some(r => pathname.startsWith(r))) return 'fade-scale'
  return 'slide-forward'
}

const variants: Record<TransitionType, { initial: object; animate: object; exit: object }> = {
  // Lessons rise up from the bottom — full immersion
  'slide-up': {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0,      opacity: 1 },
    exit:    { y: '100%', opacity: 0 },
  },
  // Settings slide in from the right — feels like iOS
  'slide-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0,      opacity: 1 },
    exit:    { x: '100%', opacity: 0 },
  },
  // Nav tabs fade + scale — clean and smooth
  'fade-scale': {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1    },
    exit:    { opacity: 0, scale: 0.94 },
  },
  // Onboarding marches forward
  'slide-forward': {
    initial: { x: '60%',  opacity: 0 },
    animate: { x: 0,      opacity: 1 },
    exit:    { x: '-60%', opacity: 0 },
  },
}

const transitions: Record<TransitionType, object> = {
  'slide-up':      { type: 'spring', stiffness: 260, damping: 28 },
  'slide-right':   { type: 'spring', stiffness: 300, damping: 30 },
  'fade-scale':    { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  'slide-forward': { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const type = getTransitionType(pathname)
  const v    = variants[type]

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={transitions[type]}
    >
      {children}
    </motion.div>
  )
}
