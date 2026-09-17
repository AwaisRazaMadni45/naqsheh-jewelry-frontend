import { NextResponse } from 'next/server'
import { shopifyAdminFetch } from '@/lib/shopify'

function mapShopifyProduct(node: any) {
  const variant = node.variants?.edges?.[0]?.node
  const images = node.images?.edges?.map((e: any) => e.node.url) || []
  const tags: string[] = node.tags || []

  return {
    _id: node.legacyResourceId,
    id: node.legacyResourceId,
    name: node.title,
    description: node.description || '',
    price: variant ? Number(variant.price) : 0,
    category: node.productType || 'Uncategorized',
    image: images,
    stock: node.totalInventory ?? 0,
    discount: 0,
    rating: 0,
    soldCount: 0,
    material: '',
    sizes: [],
    isNew: tags.includes('new'),
    isBestseller: tags.includes('bestseller'),
    reviewsCount: 0,
  }
}

const PRODUCT_FIELDS = `
  id
  legacyResourceId
  title
  description
  productType
  tags
  totalInventory
  images(first: 10) {
    edges { node { url } }
  }
  variants(first: 1) {
    edges { node { price inventoryQuantity } }
  }
`

export async function GET() {
  try {
    const data = await shopifyAdminFetch(`
      query {
        products(first: 8, query: "tag:bestseller") {
          edges { node { ${PRODUCT_FIELDS} } }
        }
      }
    `)

    const products = data.products.edges.map((e: any) => mapShopifyProduct(e.node))

    return NextResponse.json({ success: true, count: products.length, products })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}