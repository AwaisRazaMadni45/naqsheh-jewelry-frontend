'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { useAuth } from '@/components/auth-context'
import { motion } from 'framer-motion'
import { ShoppingBag, MapPin, Phone, Mail, User, Home, Building2, Hash, ChevronDown, CheckCircle2 } from 'lucide-react'

const API_URL = '/api'

const pakistanCities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
  'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana',
  'Sheikhupura', 'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan',
  'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Mardan', 'Kasur',
  'Okara', 'Mingora', 'Nawabshah', 'Mirpur Khas', 'Abbottabad',
  'Muzaffarabad', 'Other',
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  // Guest / user fields
  const [receiverName, setReceiverName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [nearbyPlace, setNearbyPlace] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const SHIPPING_CHARGE = 250
  const grandTotal = totalPrice + SHIPPING_CHARGE
  const formatPrice = (p: number) => `Rs ${p.toLocaleString('en-PK')}`

  // Agar logged-in user hai to fields pre-fill karo
  useEffect(() => {
    if (user) {
      setReceiverName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  // Facebook Pixel
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'InitiateCheckout', {
        value: totalPrice,
        currency: 'PKR',
      })
    }
  }, [])

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!receiverName.trim()) { setError('Please enter receiver name'); return }
    if (!phone.trim()) { setError('Please enter phone number'); return }
    if (!address.trim()) { setError('Please enter address'); return }
    if (!city) { setError('Please select your city'); return }

    setLoading(true)
    try {
      const orderPayload: any = {
        orderItems: items.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          address,
          nearbyPlace,
          city,
          postalCode,
          country: 'Pakistan',
          phone,
        },
        totalPrice: grandTotal,
        paymentMethod,
      }

      // Logged-in user hai to userId bhi bhejo, warna guest fields
      if (user) {
        orderPayload.userId = user.id
      } else {
        orderPayload.guestName = receiverName
        orderPayload.guestEmail = email
        orderPayload.guestPhone = phone
      }

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      const data = await res.json()
      if (data.success) {
        clearCart()
        router.push(`/order-confirmation/${data.order._id}`)
      } else {
        setError(data.message || 'Could not place order. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <p className="text-muted-foreground text-lg">Your cart is empty</p>
        <button
          onClick={() => router.push('/shop')}
          className="mt-2 px-6 py-3 bg-gold text-white rounded-md text-sm font-medium hover:bg-gold-light transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-16">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Checkout</h1>
          <p className="text-muted-foreground text-sm mt-1">No account needed — fill in your details below</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT: Form ── */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-3 space-y-6">

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Section: Receiver Info */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <h2 className="font-medium text-base flex items-center gap-2">
                <User className="h-4 w-4 text-gold" />
                Receiver Information
              </h2>

              {/* Receiver Name */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Receiver Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="Full name of the person receiving the order"
                  className="w-full h-12 px-4 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-background transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full h-12 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-background transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Email <span className="text-muted-foreground font-normal normal-case">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full h-12 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-background transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Delivery Address */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <h2 className="font-medium text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                Delivery Address
              </h2>

              {/* Full Address */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House No, Street No, Block, Area..."
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-background transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Nearby Place / Landmark */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Nearby Place / Landmark
                  <span className="text-muted-foreground font-normal normal-case ml-1">(helps us find you faster)</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={nearbyPlace}
                    onChange={(e) => setNearbyPlace(e.target.value)}
                    placeholder="e.g. Near Al-Fatah, Opposite Askari Bank, Behind Imambargah"
                    className="w-full h-12 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-background transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-background appearance-none transition-colors"
                    >
                      <option value="">Select City</option>
                      {pakistanCities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Postal Code
                    <span className="text-muted-foreground font-normal normal-case ml-1">(optional)</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 54000"
                      className="w-full h-12 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-background transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Payment */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-medium text-base mb-4">Payment Method</h2>
              <label className="flex items-center gap-3 p-4 border-2 border-gold bg-gold/5 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="accent-gold h-4 w-4"
                />
                <div>
                  <p className="text-sm font-medium">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Pay when your order arrives at your door</p>
                </div>
              </label>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gold text-white font-semibold text-base rounded-xl hover:bg-gold-light transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Placing Order...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Place Order — {formatPrice(grandTotal)}
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              By placing your order you agree to our{' '}
              <a href="/terms-of-service" className="underline hover:text-foreground">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>
            </p>
          </form>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
              <h2 className="font-medium text-base mb-4 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-gold" />
                Order Summary
                <span className="ml-auto text-xs text-muted-foreground">{items.length} item{items.length > 1 ? 's' : ''}</span>
              </h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border border-border"
                      />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(item.price)} each</p>
                    </div>
                    <p className="text-sm font-semibold flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium">{formatPrice(SHIPPING_CHARGE)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t border-border space-y-2">
                {[
                  '✓  Cash on Delivery available',
                  '✓  Shipping: Rs 250 (all Pakistan)',
                  '✓  7-day easy returns',
                  '✓  Genuine & certified products',
                ].map((badge) => (
                  <p key={badge} className="text-xs text-muted-foreground">{badge}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
