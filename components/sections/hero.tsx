'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { STORE } from '@/config/store'

// Layout heights:
// Announcement bar  = 36px  (h-9,  sticky top-0)
// Navbar mobile     = 64px  (h-16, fixed top-9)
// Total fixed UI    = 100px
// We use pt-[100px] so content starts right after navbar — same gap as image 2 (red circle)

export function HeroSection() {
  return (
    <section
      className="relative flex flex-col justify-start overflow-hidden"
      // Height = viewport minus announcement bar so NO black gap at bottom (green circle fix)
      // auto height, not min-h-screen, so section ends right after content
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 bg-[#1a1008]">
        <img
          src="/images/naqsheh-logo.jpeg"
          alt="NAQSHEH jewelry collection"
          className="w-full h-full object-contain object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/50" />
      </div>

      {/* ── Content ──
          pt-[100px]  = announcement (36) + navbar (64) — same visual gap as image 2 red circle
          pb-12       = breathing room at bottom before scroll arrow
      ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full pt-[100px] pb-12">
        <div className="max-w-xl">

          {/* EST. badge — directly under navbar, same as image 2 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/70 mb-3">
              <span className="h-px w-6 bg-gold/60 inline-block" />
              Est. {STORE.established} &mdash; {STORE.country}
              <span className="h-px w-6 bg-gold/60 inline-block" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-3"
          >
            Timeless Jewelry
            <br />
            <span className="text-gold">for Modern</span>
            <br />
            Women
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm sm:text-base text-white/75 mb-4 max-w-sm leading-relaxed"
          >
            {STORE.tagline}
          </motion.p>

          {/* Offer pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {['COD Available', 'Delivery Rs. 250', 'Free Gift on Rs. 1,000+'].map((pill) => (
              <span
                key={pill}
                className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/25 text-white/80 bg-white/10 backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 h-12 px-7 bg-gold text-white text-sm font-semibold rounded-md hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/30"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/shop?new=true"
              className="text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
            >
              Explore New Arrivals
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll arrow — tight to content, no extra space */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex justify-center pb-4"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="block w-px h-4 bg-white/30" />
          <ChevronDown className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
