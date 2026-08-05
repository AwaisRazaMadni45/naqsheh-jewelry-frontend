import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { verifyAdmin } from '@/lib/verifyAdmin'
import Order from '@/models/Order'
import Product from '@/models/Product'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdmin(req)
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 })
    }

    await connectDB()

    const totalOrders = await Order.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalUsers = await User.countDocuments()

    const revenueResult = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ])
    const totalRevenue = revenueResult[0]?.totalRevenue || 0

    return NextResponse.json({
      success: true,
      stats: { totalOrders, totalProducts, totalUsers, totalRevenue },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}