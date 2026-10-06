'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { STORE } from '@/config/store'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export function FeaturedCollectionBanners() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.offsetWidth * 0.8
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const onScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanLeft(scrollLeft > 4)
    setCanRight(scrollLeft + clientWidth < scrollWidth - 4)
  }

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-muted/30">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex items-end justify-between mb-6 sm:mb-8"
        >
          <div>
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground mb-2 block">
              Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground">
              Shop the Look
            </h2>
          </div>
          {/* Desktop arrows */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Scrollable banner row */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {STORE.collectionBanners.map((banner, i) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex-shrink-0 w-[75vw] sm:w-[44vw] lg:w-[calc(25%-12px)] snap-start"
            >
              <Link
                href={banner.href}
                className="group relative block h-56 sm:h-64 lg:h-72 rounded-xl overflow-hidden"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="font-serif text-lg sm:text-xl text-white mb-1 leading-tight">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-white/70 mb-3">{banner.subtitle}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold group-hover:gap-2.5 transition-all duration-200">
                    Shop Now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
