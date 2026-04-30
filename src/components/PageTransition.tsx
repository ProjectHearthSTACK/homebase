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
  'slide-up': {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0,      opacity: 1 },
    exit:    { y: '100%', opacity: 0 },
  },
  'slide-right': {
    initial: { x: '6%',  opacity: 0 },
    animate: { x: 0,     opacity: 1 },
    exit:    { x: '6%',  opacity: 0 },
  },
  'fade-scale': {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1    },
    exit:    { opacity: 0, scale: 0.97 },
  },
  'slide-forward': {
    initial: { x: 48,  opacity: 0 },
    animate: { x: 0,   opacity: 1 },
    exit:    { x: -48, opacity: 0 },
  },
}

const transitions: Record<TransitionType, object> = {
  'slide-up':      { type: 'spring', stiffness: 280, damping: 30 },
  'slide-right':   { type: 'spring', stiffness: 340, damping: 34 },
  'fade-scale':    { duration: 0.22, ease: 'easeOut' },
  'slide-forward': { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
}

interface Props {
  children: ReactNode
}

export default function PageTransition({ children }: Props) {
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
