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
      {/* Animated grid SVG */}
      <div
        className="absolute inset-0 animate-grid-move"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      >
        <svg
          className="w-full"
          style={{ height: '200%' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(89, 218, 221, 0.04)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
          {/* Horizontal accent lines at intervals */}
          <line
            x1="0"
            y1="180"
            x2="100%"
            y2="180"
            stroke="rgba(89, 218, 221, 0.06)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="360"
            x2="100%"
            y2="360"
            stroke="rgba(89, 218, 221, 0.05)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="540"
            x2="100%"
            y2="540"
            stroke="rgba(89, 218, 221, 0.04)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Radial fade overlay for edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, rgb(8, 19, 39) 100%)',
        }}
      />
    </div>
  )
}
