import type { Metadata } from 'next'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Sign Up | TORI Trades',
}

export default function SignUpPage() {
  return (
    <div className="bg-bg-panel border border-border rounded-2xl p-8 w-full max-w-md shadow-card animate-fade-in">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-heading font-bold tracking-wider text-teal">
          TORI <span className="text-text-primary">TRADES</span>
        </h1>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-heading font-semibold text-text-primary text-center mb-6">
        Create your account
      </h2>

      {/* Form */}
      <form className="space-y-4">
        <Input
          label="Full name"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
        />

        <Button variant="primary" size="lg" className="w-full mt-2" type="submit">
          Create account
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-text-muted font-body">
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="text-teal hover:text-teal-muted transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
