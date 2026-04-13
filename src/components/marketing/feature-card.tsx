'use client'

import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  visual?: ReactNode
  reversed?: boolean
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  visual,
  reversed = false,
  className,
}: FeatureCardProps) {
  return (
    <ScrollReveal direction={reversed ? 'right' : 'left'}>
      <div
        className={cn(
          'group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
          'bg-bg-panel/60 border border-border rounded-2xl p-6 sm:p-8 lg:p-10',
          'card-lift hover:border-border-accent',
          className
        )}
      >
        {/* Text content */}
        <div
          className={cn(
            'flex flex-col gap-4',
            reversed && 'lg:order-2'
          )}
        >
          {/* Icon with pulse ring */}
          <div className="pulse-ring inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-dim text-teal">
            <Icon className="w-5 h-5" />
          </div>

          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-text-primary">
            {title}
          </h3>

          <p className="text-text-secondary font-body leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>

        {/* Visual content */}
        {visual && (
          <div
            className={cn(
              'relative overflow-hidden rounded-xl',
              reversed && 'lg:order-1'
            )}
          >
            {/* Scan line overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent animate-scan-line"
              />
            </div>

            {visual}
          </div>
        )}

        {/* No visual: span full width for text */}
        {!visual && <div className={cn('hidden lg:block', reversed && 'lg:order-1')} />}
      </div>
    </ScrollReveal>
  )
}
