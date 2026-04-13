'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Bot,
  TrendingUp,
  History,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_NAV } from '@/lib/constants'
import { usePlanContext } from '@/contexts/plan-context'
import { PlanBadge } from './plan-badge'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Bot,
  TrendingUp,
  History,
  Settings,
}

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const { tier } = usePlanContext()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="absolute inset-y-0 left-0 w-72 bg-bg-surface border-r border-border flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-0.5" onClick={onClose}>
            <span className="font-heading text-lg font-bold text-text-primary">TORI</span>
            <span className="font-heading text-lg font-light text-teal">TRADES</span>
          </Link>
          <button
            type="button"
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {APP_NAV.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors duration-150',
                  isActive
                    ? 'bg-teal-dim text-teal border-l-2 border-teal'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                )}
              >
                {Icon && <Icon className="w-5 h-5 shrink-0" />}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-4 py-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <PlanBadge tier={tier} />
            {(tier === 'tier1' || tier === 'tier2') && (
              <Link
                href="/settings/billing"
                onClick={onClose}
                className="text-xs text-teal hover:text-teal-muted transition-colors duration-150 font-body"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
