'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { STORE } from '@/config/store'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[580px] max-h-[900px] flex items-center overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src={STORE.heroImage}
          alt="NAQSHEH elegant jewelry collection"
          className="w-full h-full object-cover object-center"
          // swap with next/image if you want optimized loading
        />
        {/* Dark gradient so text is always readable on any image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="max-w-xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/70 mb-4">
              <span className="h-px w-6 bg-gold/60 inline-block" />
              Est. {STORE.established} &mdash; {STORE.country}
              <span className="h-px w-6 bg-gold/60 inline-block" />
            </span>
          </motion.div>

          {/* Heading — "Crafted" removed */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-4"
          >
            Timeless Jewelry
            <br />
            <span className="text-gold">for Modern</span>
            <br />
            Women
          </motion.h1>

          {/* Tagline — from config */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base text-white/75 mb-7 max-w-sm leading-relaxed"
          >
            {STORE.tagline}
          </motion.p>

          {/* Offer pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-7"
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
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* Primary CTA */}
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-gold text-white text-sm font-semibold rounded-md hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/30"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary — small text link */}
            <Link
              href="/shop?new=true"
              className="text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
            >
              Explore New Arrivals
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Animated scroll arrow (no "SCROLL" text) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="block w-px h-6 bg-white/30" />
          <ChevronDown className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
