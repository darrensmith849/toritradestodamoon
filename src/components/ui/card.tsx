import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'elevated' | 'interactive'

interface CardProps {
  variant?: CardVariant
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const variantStyles: Record<CardVariant, string> = {
  default: 'p-6',
  elevated: 'p-6 shadow-card',
  interactive:
    'p-6 hover:border-border-accent transition-colors cursor-pointer',
}

export function Card({
  variant = 'default',
  className,
  children,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-panel border border-border rounded-2xl',
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
