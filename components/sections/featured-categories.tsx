'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { categories } from '@/lib/data'

export function FeaturedCategories() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Shop by Category</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/shop?category=${category.name}`} className="group block relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  {/* <span className="text-[10px] font-bold tracking-widest uppercase text-white/60 mb-2 block">
                    {category.count} Pieces
                  </span> */}
                  <h3 className="font-serif text-xl lg:text-2xl text-white group-hover:text-gold transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-lg transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
