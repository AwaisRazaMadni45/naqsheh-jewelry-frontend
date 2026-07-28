'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    fetch(`${API_URL}/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order))
      .catch(() => setOrder(null))
  }, [params.id])

  return (
    <div className="min-h-screen pt-32 text-center px-4 pb-16">
      <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-4" />
      <h1 className="font-serif text-3xl mb-2">Order Placed Successfully!</h1>
      <p className="text-muted-foreground mb-2">Thank you for shopping with Naqsheh.</p>
      {order && (
        <p className="text-sm text-muted-foreground mb-8">
          Order ID: <span className="font-medium text-foreground">{order._id}</span>
        </p>
      )}
      <Link href="/shop" className="text-gold hover:underline">
        Continue Shopping
      </Link>
    </div>
  )
}