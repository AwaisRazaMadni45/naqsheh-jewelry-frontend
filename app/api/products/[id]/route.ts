import { NextRequest, NextResponse } from 'next/server'
import { shopifyAdminFetch, mapShopifyProduct, PRODUCT_FIELDS } from '@/lib/shopify'

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