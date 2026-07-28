'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

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
            Client Stories
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">What Our Clients Say</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="h-10 w-10 text-gold/30 mx-auto mb-8" />
                <p className="font-serif text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                  {testimonials[current].text}
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{testimonials[current].name}</p>
                    <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prev}
                className="h-10 w-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-gold' : 'w-2 bg-border hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="h-10 w-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
