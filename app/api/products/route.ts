import { NextRequest, NextResponse } from 'next/server'
import { shopifyAdminFetch } from '@/lib/shopify'

// Shopify se aaye hue product node ko wahi shape me convert karta hai
// jo frontend already expect karta hai
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
    // Shopify admin me product ko "new" ya "bestseller" tag laga do,
    // ye flags automatically yahan se set ho jayengi
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')

    const data = await shopifyAdminFetch(`
      query {
        products(first: 250) {
          edges { node { ${PRODUCT_FIELDS} } }
        }
      }
    `)

    let products = data.products.edges.map((e: any) => mapShopifyProduct(e.node))

    if (category) {
      products = products.filter(
        (p: any) => p.category.toLowerCase() === category.toLowerCase()
      )
    }
    if (search) {
      const s = search.toLowerCase()
      products = products.filter((p: any) => p.name.toLowerCase().includes(s))
    }
    if (minPrice) products = products.filter((p: any) => p.price >= Number(minPrice))
    if (maxPrice) products = products.filter((p: any) => p.price <= Number(maxPrice))

    const totalProducts = products.length
    const pageNumber = Number(page) || 1
    const pageSize = Number(limit) || 10
    const totalPages = Math.ceil(totalProducts / pageSize)
    const skip = (pageNumber - 1) * pageSize
    const paginated = products.slice(skip, skip + pageSize)

    return NextResponse.json({
      success: true,
      currentPage: pageNumber,
      totalPages,
      totalProducts,
      count: paginated.length,
      products: paginated,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}