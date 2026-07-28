import { ProductDetail } from '@/components/product-detail'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getProduct(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.product
}

async function getRelated(category: string, excludeId: string) {
  const res = await fetch(`${API_URL}/products?category=${encodeURIComponent(category)}&limit=8`, { cache: 'no-store' })
  const data = await res.json()
  return (data.products || []).filter((p: any) => p._id !== excludeId).slice(0, 4)
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) notFound()

  const relatedProducts = await getRelated(product.category, product._id)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}