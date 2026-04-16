'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')

  // On dashboard, show minimal header with navigation back
  if (isDashboard) {
    return (
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="text-xl font-bold">
            VerseFlow
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/media-library">Media</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
          </nav>
        </div>
      </header>
    )
  }

  // On homepage, show full navigation
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-8">
        <Link href="/" className="text-2xl font-bold">
          VerseFlow
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm hover:text-primary transition">
            Features
          </Link>
          <Link href="#pricing" className="text-sm hover:text-primary transition">
            Pricing
          </Link>
          <Link href="#download" className="text-sm hover:text-primary transition">
            Download
          </Link>
          <Link href="#contact" className="text-sm hover:text-primary transition">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
