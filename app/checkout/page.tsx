'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { useAuth } from '@/components/auth-context'

const API_URL = '/api'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('Pakistan')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-PK')}`

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!user) {
      router.push('/login?redirect=/checkout')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          orderItems: items.map((item) => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: { address, city, postalCode, country },
          totalPrice,
          paymentMethod,
        }),
      })
      const data = await res.json()
      if (data.success) {
        clearCart()
        router.push(`/order-confirmation/${data.order._id}`)
      } else {
        setError(data.message || 'Could not place order')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-4xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <h2 className="font-medium text-lg mb-2">Shipping Address</h2>

          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>}

          <div>
            <label className="text-sm font-medium mb-1 block">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full h-12 px-4 border border-border rounded-md focus:outline-none focus:border-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full h-12 px-4 border border-border rounded-md focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Postal Code</label>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full h-12 px-4 border border-border rounded-md focus:outline-none focus:border-gold"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Country</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full h-12 px-4 border border-border rounded-md focus:outline-none focus:border-gold"
            />
          </div>

          <div>
  <label className="text-sm font-medium mb-2 block">Payment Method</label>
  <div className="space-y-2">
    {['COD'].map((method) => (
      <label key={method} className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === method}
          onChange={() => setPaymentMethod(method)}
          className="accent-gold h-4 w-4"
        />
        <span className="text-sm">{method === 'COD' ? 'Cash on Delivery' : method}</span>
      </label>
    ))}
  </div>
  {/* Baaki payment methods filhal comment out hain, jab JazzCash/EasyPaisa/Card ready ho jayen tab yahan wapis add kar dena:
  {['COD', 'JazzCash', 'EasyPaisa', 'Card'].map((method) => (...))}
  */}
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gold text-white font-medium rounded-md hover:bg-gold-light transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <div>
          <h2 className="font-medium text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
