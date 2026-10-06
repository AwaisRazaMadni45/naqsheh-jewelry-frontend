import { CartProvider } from '@/components/cart-context'
import { WishlistProvider } from '@/components/wishlist-context'
import { AuthProvider } from '@/components/auth-context'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { AnnouncementBar } from '@/components/announcement-bar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://naqsheh.pk'),
  title: 'NAQSHEH | Elegant Jewelry in Pakistan. Starting from Rs. 250. COD Available.',
  description:
    'Shop elegant jewelry at NAQSHEH Pakistan. Rings, necklaces, earrings, bracelets & more. Starting from Rs. 250. Cash on delivery. Free delivery on Rs. 2,000+.',
  openGraph: {
    title: 'NAQSHEH | Elegant Jewelry in Pakistan',
    description: 'Rings, necklaces, earrings, bracelets & more. Starting from Rs. 250. COD available all over Pakistan.',
    images: [{ url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=630&fit=crop' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1794659118639210');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1794659118639210&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {/* Announcement bar — above everything */}
                <AnnouncementBar />
                <Navbar />
                <main className="pb-12 sm:pb-0">{children}</main>
                <Footer />
                <WhatsAppFloat />
                <MobileBottomNav />
                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}