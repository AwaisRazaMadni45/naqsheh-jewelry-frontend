import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { verifyAdmin } from '@/lib/verifyAdmin'
import { shopifyAdminFetch } from '@/lib/shopify'
import Order from '@/models/Order'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdmin(req)
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 })
    }

    await connectDB()

    // MongoDB counts
    const totalOrders = await Order.countDocuments()
    const totalUsers = await User.countDocuments()

    const revenueResult = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ])
    const totalRevenue = revenueResult[0]?.totalRevenue || 0

    // Shopify se live product count
    let totalProducts = 0
    try {
      const data = await shopifyAdminFetch<any>(`
        query { productsCount { count } }
      `)
      totalProducts = data?.productsCount?.count ?? 0
    } catch {
      // Shopify unreachable hone par 0 return karo
      totalProducts = 0
    }

    return NextResponse.json({
      success: true,
      stats: { totalOrders, totalProducts, totalUsers, totalRevenue },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
