export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center bg-gradient-to-br from-bg-base via-bg-surface to-bg-base">
      {children}
    </div>
  )
}
