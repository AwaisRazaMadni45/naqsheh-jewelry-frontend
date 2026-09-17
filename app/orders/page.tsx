'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-context'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const API_URL = '/api'

export default function OrdersPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/orders/user/${user.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []))
        .finally(() => setLoading(false))
    }
  }, [user])

  const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-PK')}`

  if (isLoading || !user) return null

  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-3xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-8">My Orders</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-muted-foreground">
                  {order.shopifyOrderName || `#${order._id.slice(-8)}`}
                </span>
                <span className="text-xs px-2 py-1 bg-muted rounded-full">
                  {order.status || 'Pending'}
                </span>
              </div>

              <div className="space-y-3 mb-3">
                {order.orderItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-md overflow-hidden bg-muted shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="font-medium">{formatPrice(order.totalPrice)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}