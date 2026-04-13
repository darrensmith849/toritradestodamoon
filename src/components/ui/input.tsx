import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm text-text-secondary font-body mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-bg-subtle border border-border rounded-xl px-4 h-11 text-text-primary font-body text-sm',
            'placeholder:text-text-muted',
            'focus:border-teal-ring focus:ring-1 focus:ring-teal-ring outline-none',
            'transition-colors duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-danger focus:border-danger focus:ring-danger/30',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-danger font-body">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
