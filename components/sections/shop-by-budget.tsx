'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { STORE } from '@/config/store'
import { ArrowRight } from 'lucide-react'

// Gradient pairs for each tile (dark/gold palette)
const tileStyles = [
  'from-zinc-900 to-zinc-800 border-zinc-700',
  'from-stone-900 to-stone-800 border-stone-700',
  'from-neutral-900 to-neutral-800 border-neutral-700',
  'from-yellow-900/60 to-yellow-800/40 border-yellow-700/50',
]

export function ShopByBudget() {
  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-6 sm:mb-8"
        >
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground mb-2 block">
            Shop Smarter
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground">
              Shop by Budget
            </h2>
            <p className="text-sm text-muted-foreground">
              Jewelry starting from{' '}
              <span className="text-gold font-semibold">
                Rs. {STORE.startingPrice.toLocaleString('en-PK')}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Tiles — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STORE.budgetTiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link
                href={tile.href}
                className={`group relative flex flex-col justify-between h-28 sm:h-32 lg:h-36 p-4 sm:p-5 rounded-xl border bg-gradient-to-br ${tileStyles[i]} hover:border-gold/60 transition-all duration-300 overflow-hidden`}
              >
                {/* Glow on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gold/5 rounded-xl" />

                <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  {i === 3 ? 'Premium' : 'Budget'}
                </span>

                <div>
                  <p className="font-serif text-base sm:text-lg lg:text-xl text-white leading-tight mb-1">
                    {tile.label}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold text-xs font-medium group-hover:gap-2 transition-all duration-200">
                    Shop now <ArrowRight className="h-3 w-3" />
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
