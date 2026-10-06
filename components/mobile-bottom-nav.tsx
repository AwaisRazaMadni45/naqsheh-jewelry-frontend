'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Grid2X2, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { useRouter } from 'next/navigation'

const navItems = [
  { label: 'Home',       href: '/',           icon: Home },
  { label: 'Search',     href: null,          icon: Search },   // triggers search
  { label: 'Categories', href: '/shop',       icon: Grid2X2 },
  { label: 'Account',    href: '/login',      icon: User },
  { label: 'Cart',       href: '/cart',       icon: ShoppingBag, showBadge: true },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const router = useRouter()

  return (
    // Only visible on mobile (hidden sm:hidden)
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.href ? pathname === item.href : false

          if (!item.href) {
            // Search — open search via query param
            return (
              <button
                key={item.label}
                onClick={() => router.push('/shop')}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                  isActive ? 'text-gold' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px] font-medium">{item.label}</span>
              </button>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? 'text-gold' : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={item.label}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
              )}

              <div className="relative">
                <Icon className="h-5 w-5" />
                {/* Cart badge */}
                {item.showBadge && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
