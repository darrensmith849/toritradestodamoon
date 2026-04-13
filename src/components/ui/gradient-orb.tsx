import { cn } from '@/lib/utils'

interface GradientOrbProps {
  color?: 'teal' | 'blue' | 'purple'
  size?: number
  className?: string
  animate?: boolean
}

const colorMap: Record<string, string> = {
  teal: 'rgba(245, 185, 60, 0.10)',
  blue: 'rgba(30, 64, 175, 0.15)',
  purple: 'rgba(124, 58, 237, 0.1)',
}

export function GradientOrb({
  color = 'teal',
  size = 400,
  className,
  animate = true,
}: GradientOrbProps) {
  return (
    <div
      className={cn(
        'absolute rounded-full pointer-events-none',
        animate && (color === 'teal' ? 'animate-float' : 'animate-float-slow'),
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        filter: 'blur(80px)',
      }}
      aria-hidden="true"
    />
  )
}
