'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { categories } from '@/lib/data'

export function FeaturedCategories() {
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            Explore
          </span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative block aspect-square md:aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                  <h3 className="font-serif text-base md:text-xl text-white">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}