'use client'
import { useCart } from '@/components/cart-context'
import { useWishlist } from '@/components/wishlist-context'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Star, Eye } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
  isNew?: boolean
  isBestseller?: boolean
}

export function ProductCard({ id, name, price, rating, reviews, image, category, isNew, isBestseller }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
const isWishlisted = isInWishlist(id)

const handleToggleWishlist = (e: React.MouseEvent) => {
  e.preventDefault()
  toggleWishlist({ id, name, price, image, category })
}
  const [isHovered, setIsHovered] = useState(false)
const { addToCart } = useCart()

const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault()
  addToCart({ id, name, price, image })
}
 const formatPrice = (price: number) => {
  return `Rs ${price.toLocaleString('en-PK')}`
}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div
        className="relative overflow-hidden rounded-lg bg-muted/30 mb-4 aspect-square"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
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

        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 left-3 right-3 flex gap-2"
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
