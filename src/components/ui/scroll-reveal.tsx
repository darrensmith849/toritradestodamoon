'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

const directionStyles: Record<string, { initial: string; revealed: string }> = {
  up: {
    initial: 'translate-y-[30px]',
    revealed: 'translate-y-0',
  },
  left: {
    initial: '-translate-x-[30px]',
    revealed: 'translate-x-0',
  },
  right: {
    initial: 'translate-x-[30px]',
    revealed: 'translate-x-0',
  },
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const styles = directionStyles[direction]

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-[800ms] ease-out',
        isVisible ? `opacity-100 ${styles.revealed}` : `opacity-0 ${styles.initial}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
