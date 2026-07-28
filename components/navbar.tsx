'use client'
import { useCart } from '@/components/cart-context'
import { useWishlist } from '@/components/wishlist-context'
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-context'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, User, Menu, X, Sun, Moon, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const shopCategories = [
  { name: 'Rings', href: '/shop?category=Rings', description: 'Elegant bands & statement rings' },
  { name: 'Necklaces', href: '/shop?category=Necklaces', description: 'Pendants, chains & chokers' },
  { name: 'Earrings', href: '/shop?category=Earrings', description: 'Studs, drops & hoops' },
  { name: 'Watches', href: '/shop?category=Watches', description: 'Elegant timepieces' },
  { name: 'Hand Harness', href: '/shop?category=Hand Harness', description: 'Statement hand jewelry' },
  { name: 'Bracelets', href: '/shop?category=Bracelets', description: 'Bangles, cuffs & chains' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
 const { totalItems: wishlistCount } = useWishlist()
  const { totalItems } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMegaMenuOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const isHome = pathname === '/'
  const isTransparent = isHome && !isScrolled

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 -ml-2 rounded-md transition-colors ${
                isTransparent ? 'text-white' : 'text-foreground'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    onMouseEnter={() => link.name === 'Shop' && setIsMegaMenuOpen(true)}
                    className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                      isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-foreground'
                    } ${pathname === link.href ? 'text-gold' : ''}`}
                  >
                    {link.name}
                  </Link>
                  {link.name === 'Shop' && (
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                  )}
                </div>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:mx-auto">
              <h1 className={`font-serif text-2xl lg:text-3xl tracking-wider transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-foreground'
              }`}>
                NAQSHEH
              </h1>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <Search className="h-5 w-5" />
              </button>
             <Link
  href="/wishlist"
  className={`hidden sm:flex p-2 rounded-full transition-colors relative ${
    isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/70 hover:text-foreground'
  }`}
>
  <Heart className="h-5 w-5" />
  {wishlistCount > 0 && (
    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
      {wishlistCount}
    </span>
  )}
</Link>
             <Link
  href="/cart"
  className={`hidden sm:flex p-2 rounded-full transition-colors relative ${
    isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/70 hover:text-foreground'
  }`}
>
  <ShoppingBag className="h-5 w-5" />
  {totalItems > 0 && (
    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
      {totalItems}
    </span>
  )}
</Link>
            <div className="relative hidden sm:block">
  {user ? (
    <>
      <button
        onClick={() => setIsAccountOpen(!isAccountOpen)}
        className={`p-2 rounded-full transition-colors ${
          isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        <User className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {isAccountOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsAccountOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-56 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-border">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="py-2">
                <Link
                  href="/orders"
                  onClick={() => setIsAccountOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted transition-colors"
                >
                  My Orders
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsAccountOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    setIsAccountOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-muted transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  ) : (
    <Link
      href="/login"
      className={`p-2 rounded-full transition-colors flex ${
        isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/70 hover:text-foreground'
      }`}
    >
      <User className="h-5 w-5" />
    </Link>
  )}
</div>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2 rounded-full transition-colors ${
                    isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="absolute left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
            >
              <div className="mx-auto max-w-[1440px] px-8 py-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
                      Collections
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {shopCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          className="group p-4 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium group-hover:text-gold transition-colors">
                              {cat.name}
                            </span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop"
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div>
                        <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Featured</p>
                        <p className="text-white font-serif text-lg">Celestial Collection</p>
                        <p className="text-white/70 text-sm mt-1">Discover our most coveted pieces</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex items-start justify-center pt-32"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-foreground/70 hover:text-foreground"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="w-full max-w-2xl px-6">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for rings, necklaces, earrings..."
                  className="w-full h-14 pl-12 pr-4 text-lg bg-transparent border-b-2 border-border focus:border-gold outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
              </form>
              <p className="text-xs text-muted-foreground mt-4 text-center">Press Enter to search or ESC to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h1 className="font-serif text-2xl tracking-wider">NAQSHEH</h1>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-auto p-6">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block py-4 text-lg font-medium text-foreground/80 hover:text-foreground border-b border-border/50"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
                    Collections
                  </h3>
                  <div className="space-y-1">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="flex items-center justify-between py-3 text-sm text-foreground/70 hover:text-foreground"
                      >
                        {cat.name}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
              <div className="p-4 border-t border-border flex gap-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Heart className="h-4 w-4" /> Wishlist
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <ShoppingBag className="h-4 w-4" /> Cart
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}