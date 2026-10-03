import { NextResponse } from 'next/server'
import { shopifyAdminFetch, mapShopifyProduct, PRODUCT_FIELDS } from '@/lib/shopify'

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