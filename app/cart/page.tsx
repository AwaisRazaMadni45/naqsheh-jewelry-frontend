'use client'

import Link from 'next/link'
import { useCart } from '@/components/cart-context'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useAuth } from '@/components/auth-context'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()
const { user } = useAuth()
const router = useRouter()
 const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-PK')}`
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
        <Link href="/shop" className="text-gold hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-4xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-8">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b border-border pb-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded">
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-2">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-lg font-semibold">Total: {formatPrice(totalPrice)}</span>
        <button
  onClick={() => router.push(user ? '/checkout' : '/login?redirect=/checkout')}
  className="h-12 px-8 bg-gold text-white font-medium rounded-md hover:bg-gold-light transition-colors"
>
  Proceed to Checkout
</button>
      </div>
    </div>
  )
}