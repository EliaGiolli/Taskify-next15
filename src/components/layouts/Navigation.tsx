'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinkVariants } from '@/helpers/navLinkVariants'

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/tickets', label: 'Tickets' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav
      className="flex gap-6"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="flex gap-6 list-none">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || 
            (link.href !== '/' && pathname.startsWith(link.href))
          
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={navLinkVariants({ active: isActive })}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
