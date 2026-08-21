'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product-detail'
import { getProductById, getProductsByCategory } from '@/lib/api'
export default function ProductPage() {
  const params = useParams()
  const id = params.id as string

  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [notFoundFlag, setNotFoundFlag] = useState(false)

  useEffect(() => {
    getProductById(id)
  .then(async (data) => {
    if (!data) {
      setNotFoundFlag(true)
      setLoading(false)
      return
    }
    setProduct(data)

    const related = await getProductsByCategory(data.category, 6)
    const filtered = (Array.isArray(related) ? related : [])
      .filter((p: any) => p._id !== data._id)
      .slice(0, 4)
    setRelatedProducts(filtered)
    setLoading(false)
  })
  .catch(() => {
    setNotFoundFlag(true)
    setLoading(false)
  })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (notFoundFlag || !product) {
    notFound()
  }

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}