import { useEffect, useRef } from 'react'

type Direction = 'up' | 'left' | 'right' | 'fade'

const classMap: Record<Direction, string> = {
  up:    'screen-enter',
  left:  'screen-enter-left',
  right: 'screen-enter-right',
  fade:  'screen-fade',
}

export function usePageTransition(direction: Direction = 'up') {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cls = classMap[direction]
    el.classList.add(cls)
    const clean = () => el.classList.remove(cls)
    el.addEventListener('animationend', clean, { once: true })
    return () => el.removeEventListener('animationend', clean)
  }, [direction])

  return ref
}