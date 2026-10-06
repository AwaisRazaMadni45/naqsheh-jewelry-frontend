'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { STORE } from '@/config/store'

// Announcement bar height = 36px (h-9)
// Navbar height mobile = 64px (h-16)
// Total offset = 100px → pt-[100px]
// Hero should NOT be full screen — make it compact so trust strip is visible without scrolling

export function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden"
      // Mobile: slightly less than full viewport so trust strip peeks below
      // Desktop: comfortable height
      style={{ minHeight: 'calc(100svh - 36px - 20px)', maxHeight: 720 }}
    >
      {/* ── Background image — naqsheh logo, contain so it's not stretched ── */}
      <div className="absolute inset-0 bg-[#1a1008]">
        {/* Mobile: logo centered, not stretched */}
        <img
          src="/images/naqsheh-logo.jpeg"
          alt="NAQSHEH jewelry collection"
          className="w-full h-full object-contain object-center opacity-80"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      {/* ── Content — pushed down below navbar + announcement bar ── */}
      {/* pt accounts for: announcement bar (36px) + navbar (64px) = 100px */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full pt-[100px] pb-8">
        <div className="max-w-xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/70 mb-3">
              <span className="h-px w-6 bg-gold/60 inline-block" />
              Est. {STORE.established} &mdash; {STORE.country}
              <span className="h-px w-6 bg-gold/60 inline-block" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base text-white/75 mb-5 max-w-sm leading-relaxed"
          >
            {STORE.tagline}
          </motion.p>

          {/* Offer pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
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

      {/* Scroll arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="block w-px h-5 bg-white/30" />
          <ChevronDown className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
