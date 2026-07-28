'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { instagramImages } from '@/lib/data'

export function InstagramGallery() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            Follow @LunaJewelry
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">Instagram</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join our community and share your Naqsheh moments
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {instagramImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/naqshehofficials/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={image}
                alt={`Instagram ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
