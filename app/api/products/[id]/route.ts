import { NextRequest, NextResponse } from 'next/server'
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const gid = `gid://shopify/Product/${params.id}`

    const data = await shopifyAdminFetch(
      `
      query GetProduct($id: ID!) {
        product(id: $id) { ${PRODUCT_FIELDS} }
      }
    `,
      { id: gid }
    )

    if (!data.product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: mapShopifyProduct(data.product),
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}