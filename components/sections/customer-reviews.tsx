'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Instagram, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { STORE } from '@/config/store'

// ─── Placeholder reviews ──────────────────────────────────────────────────────
// Replace these with real /public/reviews/ screenshots.
// Each item can be either a screenshot image path OR a text review.
const REVIEWS = [
  {
    type: 'text' as const,
    name: 'Ayesha K.',
    location: 'Lahore',
    rating: 5,
    text: 'Bohot khubsoorat jewelry hai! Maine earrings order ki thi, bilkul waise aayi jaise website par thi. COD ka option tha to koi risk nahi tha. Highly recommended! ❤️',
    product: 'Gold Drop Earrings',
  },
  {
    type: 'text' as const,
    name: 'Sara M.',
    location: 'Karachi',
    rating: 5,
    text: 'Mera pehla order tha lekin experience amazing raha. Delivery time par aayi aur packaging bhi beautiful thi. Gift mila wo bhi bohot pyara tha!',
    product: 'Silver Chain Necklace',
  },
  {
    type: 'text' as const,
    name: 'Fatima R.',
    location: 'Islamabad',
    rating: 5,
    text: 'I ordered a ring for my sister\'s birthday — she absolutely loved it! Quality is so good for the price. Will definitely order again.',
    product: 'Statement Ring',
  },
  {
    type: 'text' as const,
    name: 'Zainab A.',
    location: 'Rawalpindi',
    rating: 5,
    text: 'Naqsheh ki jewelry wear kar k confidence level hi alag ho jata hai 😍 Bracelet itna delicate aur pretty hai. Puri office ne poocha kahan se liya!',
    product: 'Gold Bracelet',
  },
  {
    type: 'text' as const,
    name: 'Hina B.',
    location: 'Faisalabad',
    rating: 5,
    text: 'Affordable prices mein itni premium quality? Believe nahi hoga jab tak khud order nahi karo. Jhumke bilkul perfect hain Eid ke liye 🌙',
    product: 'Jhumka Earrings',
  },
  {
    type: 'image' as const,
    src: '/images/instagram/earring21.png',
    alt: 'Customer review screenshot from Instagram',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < count ? 'text-gold fill-gold' : 'text-border'}`}
        />
      ))}
    </div>
  )
}

export function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8"
        >
          <div>
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground mb-2 block">
              Happy Customers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real reviews from real customers across Pakistan
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden sm:flex gap-2 flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Scrollable review cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex-shrink-0 w-[78vw] sm:w-72 lg:w-80 snap-start"
            >
              {review.type === 'image' ? (
                /* ── Screenshot card ── */
                <div className="h-64 sm:h-72 rounded-xl overflow-hidden border border-border bg-muted/30">
                  <img
                    src={review.src}
                    alt={review.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                /* ── Text review card ── */
                <div className="h-64 sm:h-72 flex flex-col justify-between p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors duration-300">
                  <div>
                    <StarRating count={review.rating} />
                    <p className="text-sm text-foreground/80 leading-relaxed mt-3 line-clamp-5">
                      "{review.text}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{review.name}</p>
                      <p className="text-[10px] text-muted-foreground">{review.location}</p>
                    </div>
                    <span className="text-[10px] text-gold bg-gold/10 px-2 py-0.5 rounded-full font-medium">
                      {review.product}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <a
            href={STORE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-6 border border-border rounded-full text-sm font-medium text-foreground hover:border-gold hover:text-gold transition-colors duration-300"
          >
            <Instagram className="h-4 w-4" />
            See More Reviews on Instagram
          </a>
          <p className="text-xs text-muted-foreground mt-2">{STORE.instagramHandle}</p>
        </motion.div>
      </div>
    </section>
  )
}
