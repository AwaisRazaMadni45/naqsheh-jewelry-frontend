'use client'
import { useCart } from '@/components/cart-context'
import { useWishlist } from '@/components/wishlist-context'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Star, Eye } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  reviews: number
  // single string (legacy) ya array dono accept karta hai
  image: string | string[]
  category: string
  isNew?: boolean
  isBestseller?: boolean
}

export function ProductCard({ id, name, price, rating, reviews, image, category, isNew, isBestseller }: ProductCardProps) {
  // image ko hamesha array bana lo
  const images: string[] = Array.isArray(image)
    ? image.filter(Boolean)
    : image
    ? [image]
    : []
  const hasMultiple = images.length > 1

  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(id)

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist({ id, name, price, image: images[0] || '', category })
  }

  const [isHovered, setIsHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const imgContainerRef = useRef<HTMLDivElement>(null)

  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({ id, name, price, image: images[0] || '' })
  }

  const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-PK')}`

  // Hover shuru hone par auto-scroll start karo (1.2s per image)
  const startAutoScroll = useCallback(() => {
    if (!hasMultiple) return
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 1200)
  }, [hasMultiple, images.length])

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    startAutoScroll()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    stopAutoScroll()
    setActiveIndex(0)
  }

  // Cursor position se bhi image change karo (left/right zones)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMultiple || !imgContainerRef.current) return
    // Auto-scroll band karo jab cursor move ho — cursor control le leta hai
    stopAutoScroll()
    const rect = imgContainerRef.current.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const zoneWidth = rect.width / images.length
    const newIndex = Math.min(Math.floor(relX / zoneWidth), images.length - 1)
    setActiveIndex(newIndex)
  }

  // Hover khatam hone ke baad auto-scroll phir shuru karo (agar abhi bhi hovered ho)
  const handleMouseMoveEnd = useCallback(() => {
    if (isHovered && hasMultiple && !intervalRef.current) {
      startAutoScroll()
    }
  }, [isHovered, hasMultiple, startAutoScroll])

  useEffect(() => {
    return () => stopAutoScroll()
  }, [stopAutoScroll])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div
        ref={imgContainerRef}
        className="relative overflow-hidden rounded-lg bg-muted/30 mb-4 aspect-square cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Link href={`/product/${id}`}>
          {images.length > 0 ? (
            images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${name} ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === activeIndex ? 'opacity-100' : 'opacity-0'
                } ${i === 0 && !isHovered ? 'group-hover:scale-105' : ''} transition-transform duration-700`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-muted/50 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No image</span>
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {isNew && (
            <span className="px-2 py-1 bg-gold text-white text-[10px] font-bold uppercase tracking-wider rounded">
              New
            </span>
          )}
          {isBestseller && (
            <span className="px-2 py-1 bg-charcoal text-white text-[10px] font-bold uppercase tracking-wider rounded">
              Bestseller
            </span>
          )}
        </div>

        {/* Image indicator dots — sirf tab dikhao jab multiple images hon */}
        {hasMultiple && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-4 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 left-3 right-3 flex gap-2 z-10"
        >
          <button
            onClick={handleAddToCart}
            className="flex-1 h-10 bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-md flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`h-10 w-10 rounded-md flex items-center justify-center transition-colors ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-foreground hover:bg-white'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <Link href={`/product/${id}`} className="block">
        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1">{category}</p>
        <h3 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors duration-300 mb-2">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-gold fill-gold" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        <p className="text-sm font-semibold text-foreground mt-2">{formatPrice(price)}</p>
      </Link>
    </motion.div>
  )
}
