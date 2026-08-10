'use client'
import { useState } from 'react'
import { subscribeToNewsletter } from '@/lib/api'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'Rings', href: '/shop?category=Rings' },
    { name: 'Necklaces', href: '/shop?category=Necklaces' },
    { name: 'Earrings', href: '/shop?category=Earrings' },
    { name: 'Bracelets', href: '/shop?category=Bracelets' },
    { name: 'Watches', href: '/shop?category=Watches' },
    { name: 'Hand Harness', href: '/shop?category=Hand Harness' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about' },
    { name: 'Craftsmanship', href: '/about' },
    // { name: 'Careers', href: '#' },
    // { name: 'Press', href: '#' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/contact' },
    // { name: 'Shipping', href: '#' },
    // { name: 'Returns', href: '#' },
    // { name: 'Size Guide', href: '#' },
  ],
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const result = await subscribeToNewsletter(email)
    if (result.success) {
      setStatus('success')
      setMessage('Thank you for subscribing!')
      setEmail('')
    } else {
      setStatus('error')
      setMessage(result.message || 'Something went wrong')
    }
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3">Join the Inner Circle</h3>
            <p className="text-sm text-white/60 mb-8">
              Subscribe to receive exclusive offers, early access to new collections, and insider stories from our atelier.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
  <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email address"
    className="flex-1 h-12 px-4 bg-white/10 border border-white/20 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
  />
  <button
    type="submit"
    disabled={status === 'loading'}
    className="h-12 px-6 bg-gold text-white text-sm font-medium rounded-md hover:bg-gold-light transition-colors whitespace-nowrap disabled:opacity-50"
  >
    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
  </button>
</form>
{message && (
  <p className={`text-xs mt-3 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
    {message}
  </p>
)}

          </div>
        </div>

        {/* Links */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-serif text-xl text-white mb-6">NAQSHEH</h4>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Timeless jewelry crafted for modern women. Each piece is designed with passion and precision in our atelier.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/naqshehofficials/" className="text-white/50 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61591472600822" className="text-white/50 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@naqsheh3?_r=1&_t=ZS-98l3jQplP1u" target="_blank" rel="noopener noreferrer" className="...">
    <TikTokIcon className="h-5 w-5" />
  </a>
              {/* <a href="#" className="text-white/50 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a> */}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-6">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-4 w-4" />
                <span>+92 315 7726839</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4" />
                <span>awaisrazamadni67@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4" />
                <span>Plot No 5 Rawalpindi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} NAQSHEH. All rights reserved.
          </p>
           <div className="flex gap-6 text-xs text-white/40">
  <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
  <Link href="/terms-of-service" className="hover:text-white/60 transition-colors">Terms of Service</Link>
  <Link href="/cookie-policy" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
</div>
        </div>
      </div>
    </footer>
  )
}
