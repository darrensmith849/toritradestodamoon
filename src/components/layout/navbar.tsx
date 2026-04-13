'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { MARKETING_NAV } from '@/lib/constants'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-bg-surface/80 backdrop-blur-xl border-b border-border">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 shrink-0">
          <span className="font-heading text-lg font-bold text-text-primary">TORI</span>
          <span className="font-heading text-lg font-light text-teal">TRADES</span>
        </Link>

        {/* Center nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 font-body"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions — hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 font-body"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center h-9 px-5 text-sm font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-150"
          >
            Start free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-surface border-b border-border animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {MARKETING_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 font-body py-2"
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 font-body py-2"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-full h-10 px-5 text-sm font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-150"
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
