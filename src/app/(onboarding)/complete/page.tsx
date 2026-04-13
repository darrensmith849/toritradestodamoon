import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CompletePage() {
  return (
    <div className="text-center animate-fade-in py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-dim mb-6">
        <CheckCircle className="w-10 h-10 text-teal" />
      </div>

      <h2 className="text-3xl font-heading font-bold text-text-primary mb-3">
        You&apos;re all set!
      </h2>
      <p className="text-text-secondary font-body mb-10">
        Your trading operating system is ready.
      </p>

      <Button variant="primary" size="lg" href="/dashboard">
        Go to dashboard
      </Button>
    </div>
  )
}
