'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { getAllProducts } from '@/lib/api'

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [newProducts, setNewProducts] = useState<any[]>([])

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        const sorted = Array.isArray(data)
          ? [...data].sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          : []
        setNewProducts(sorted.slice(0, 8))
      })
      .catch(() => setNewProducts([]))
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (newProducts.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
              Just In
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">New Arrivals</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="h-10 w-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-10 w-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newProducts.map((product) => (
            <div key={product._id} className="min-w-[280px] sm:min-w-[300px] snap-start">
              <ProductCard
                id={product._id}
                {...product}
                image={product.image?.[0] || ''}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}