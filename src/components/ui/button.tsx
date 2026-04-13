import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-teal text-bg-base font-semibold hover:brightness-110 active:brightness-95 rounded-pill',
  secondary:
    'border border-teal/30 text-teal hover:bg-teal/10 active:bg-teal/15 rounded-xl',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-bg-hover active:bg-bg-subtle rounded-xl',
  danger:
    'bg-danger/10 text-danger hover:bg-danger/20 active:bg-danger/25 rounded-xl',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  children,
  onClick,
  leftIcon,
  rightIcon,
  href,
  type = 'button',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-body transition-all duration-150',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
