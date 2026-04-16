import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-7xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
