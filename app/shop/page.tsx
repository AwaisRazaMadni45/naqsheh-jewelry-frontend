import { Suspense } from 'react'
import { ShopContent } from '@/components/shop-content'

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-20" />}>
      <ShopContent />
    </Suspense>
  )
}
