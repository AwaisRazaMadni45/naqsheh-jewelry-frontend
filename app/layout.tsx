import { CartProvider } from '@/components/cart-context'
import { WishlistProvider } from '@/components/wishlist-context'
import { AuthProvider } from '@/components/auth-context'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://lunajewelry.com'),
  title: 'NAQSHEH Jewelry | Timeless Luxury',
  description: 'Timeless jewelry crafted for modern women. Discover our collection of rings, necklaces, earrings, and bracelets.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=630&fit=crop' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
 <AuthProvider>
  <CartProvider>
    <WishlistProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <Toaster />
    </WishlistProvider>
  </CartProvider>
</AuthProvider>
</ThemeProvider>
      </body>
    </html>
  )
}
