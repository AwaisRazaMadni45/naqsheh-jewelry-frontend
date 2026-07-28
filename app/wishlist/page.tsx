'use client'

import Link from 'next/link'
import { useWishlist } from '@/components/wishlist-context'
import { useCart } from '@/components/cart-context'
import { Heart, ShoppingBag, X } from 'lucide-react'

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-PK')}`
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <Heart className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground mb-4">Your wishlist is empty</p>
        <Link href="/shop" className="text-gold hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-4xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-8">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative border border-border rounded-lg p-4">
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
            <Link href={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-md mb-3" />
              <p className="text-[10px] uppercase text-muted-foreground mb-1">{item.category}</p>
              <h3 className="font-medium text-sm mb-2">{item.name}</h3>
              <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
            </Link>
            <button
              onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
              className="w-full mt-3 h-9 bg-gold text-white text-xs font-medium rounded-md flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}