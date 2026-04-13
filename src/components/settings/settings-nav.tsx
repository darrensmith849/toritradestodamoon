'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SETTINGS_NAV } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  User,
  Link as LinkIcon,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  User: <User className="w-4 h-4" />,
  Link: <LinkIcon className="w-4 h-4" />,
  Bell: <Bell className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  CreditCard: <CreditCard className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
}

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="w-full space-y-1">
      {SETTINGS_NAV.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium font-body transition-colors duration-150',
              isActive
                ? 'bg-teal-dim text-teal'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            )}
          >
            {item.icon && iconMap[item.icon] ? iconMap[item.icon] : null}
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
