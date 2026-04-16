'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')

  // Don't show footer on dashboard pages
  if (isDashboard) {
    return null
  }

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">VerseFlow</h3>
            <p className="text-sm text-muted-foreground">
              Professional presentation software for churches.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#download" className="text-muted-foreground hover:text-foreground">
                  Download
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <a href="mailto:support@verseflow.app" className="text-muted-foreground hover:text-foreground">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 VerseFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
