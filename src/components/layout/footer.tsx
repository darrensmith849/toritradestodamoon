import Link from 'next/link'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'How It Works', href: '/how-it-works' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  Connect: [
    { label: 'Twitter', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-text-secondary font-heading mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-secondary transition-colors duration-150 font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-body">
            &copy; 2025 TORI Trades. All rights reserved.
          </p>
          <Link href="/" className="flex items-center gap-0.5 shrink-0">
            <span className="font-heading text-sm font-bold text-text-primary">TORI</span>
            <span className="font-heading text-sm font-light text-teal">TRADES</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
