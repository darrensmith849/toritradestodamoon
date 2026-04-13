'use client'

import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 pointer-events-none overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {/* Static dot grid — subtle, premium, no animation */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(45, 235, 120, 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 50% 50% at 50% 40%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 50% 50% at 50% 40%, black 20%, transparent 75%)',
        }}
      />

      {/* Subtle center glow — gives depth to the hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 35% at 50% 40%, rgba(45, 235, 120, 0.04) 0%, transparent 100%)',
        }}
      />

      {/* Single horizontal accent line */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '65%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 10%, rgba(45, 235, 120, 0.06) 50%, transparent 90%)',
        }}
      />
    </div>
  )
}
