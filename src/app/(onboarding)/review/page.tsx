import { Button } from '@/components/ui/button'

const reviewItems = [
  { label: 'Mode', value: 'Simulate' },
  { label: 'Plan', value: 'Pro ($99/mo)' },
  { label: 'Exchange', value: 'Binance (Connected)' },
  { label: 'Max Allocation', value: '8%' },
  { label: 'Max Leverage', value: '3x' },
  { label: 'Max Positions', value: '3' },
  { label: 'Max Exposure', value: '30%' },
]

export default function ReviewPage() {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Review your setup
        </h2>
        <p className="text-text-secondary font-body">
          Confirm everything looks right before we finish.
        </p>
      </div>

      <div className="bg-bg-panel border border-border rounded-xl divide-y divide-border mb-10">
        {reviewItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-6 py-4"
          >
            <span className="text-sm text-text-secondary font-body">
              {item.label}
            </span>
            <span className="text-sm font-medium text-text-primary font-body">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" href="/risk-config">
          Back
        </Button>
        <Button variant="primary" href="/complete">
          Confirm &amp; continue
        </Button>
      </div>
    </div>
  )
}
