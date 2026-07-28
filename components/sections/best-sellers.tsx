'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { getBestSellers } from '@/lib/api'

export function BestSellers() {
  const [bestsellers, setBestsellers] = useState<any[]>([])

  useEffect(() => {
    getBestSellers()
      .then((data) => setBestsellers(Array.isArray(data) ? data : []))
      .catch(() => setBestsellers([]))
  }, [])

  if (bestsellers.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            Most Loved
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">Best Sellers</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our most coveted pieces, loved by women around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestsellers.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              {...product}
              image={product.image?.[0] || ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}