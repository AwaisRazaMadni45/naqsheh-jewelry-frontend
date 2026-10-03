import { NextRequest, NextResponse } from 'next/server'
import { shopifyAdminFetch, mapShopifyProduct, PRODUCT_FIELDS } from '@/lib/shopify'

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