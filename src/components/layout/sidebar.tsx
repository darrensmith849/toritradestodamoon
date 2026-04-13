'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Bot,
  TrendingUp,
  History,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_NAV } from '@/lib/constants'

const iconMap: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  Bot,
  TrendingUp,
  History,
  Settings,
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-bg-surface border-r border-border">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/dashboard" className="block">
          <h1 className="text-lg font-heading font-bold tracking-wider text-teal">
            TORI <span className="text-text-primary">TRADES</span>
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {APP_NAV.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-body transition-colors duration-150',
                isActive
                  ? 'bg-teal-dim text-teal'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-teal-dim flex items-center justify-center">
            <span className="text-xs font-bold text-teal font-heading">DT</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary font-body truncate">
              Demo Trader
            </p>
            <p className="text-xs text-text-muted font-body">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
