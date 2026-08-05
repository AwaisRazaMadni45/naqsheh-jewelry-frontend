import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')

    let filter: any = {}
    if (category) filter.category = category
    if (search) filter.name = { $regex: search, $options: 'i' }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const pageNumber = Number(page) || 1
    const pageSize = Number(limit) || 10
    const skip = (pageNumber - 1) * pageSize

    const totalProducts = await Product.countDocuments(filter)
    const totalPages = Math.ceil(totalProducts / pageSize)
    const products = await Product.find(filter).skip(skip).limit(pageSize)

    return NextResponse.json({
      success: true,
      currentPage: pageNumber,
      totalPages,
      totalProducts,
      count: products.length,
      products,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}