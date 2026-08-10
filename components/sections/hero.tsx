'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop: normal cover background */}
        <div className="hidden md:block w-full h-full">
          <img
            src="/images/naqsheh-logo.jpeg"
            alt="Naqsheh"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile: logo stretched full-width as a banner strip, fixed height */}
        <div className="md:hidden w-full h-full flex flex-col">
          <div className="w-full h-56 bg-[#f5ede0]">
            <img
              src="/images/naqsheh-logo.jpeg"
              alt="Naqsheh"
              className="w-full h-full object-fill"
            />
          </div>
          <div className="flex-1 bg-[#f5ede0]" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 md:from-black/60 md:via-black/30 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-white/70 mb-6">
              Est. 2026 &mdash; Pakistan
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
          >
            Timeless Jewelry
            <br />
            <span className="text-gold">Crafted for</span>
            <br />
            Modern Women
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-white/70 mb-10 max-w-lg leading-relaxed"
          >
            Handcrafted fine jewelry, designed for the discerning woman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 h-14 px-8 bg-gold text-white text-sm font-medium rounded-md hover:bg-gold-light transition-all duration-300"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/shop?new=true"
              className="inline-flex items-center h-14 px-8 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 transition-all duration-300"
            >
              Explore New Arrivals
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest uppercase text-white/50">Scroll</span>
          <ChevronDown className="h-5 w-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}