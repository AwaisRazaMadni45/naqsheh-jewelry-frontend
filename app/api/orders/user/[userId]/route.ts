import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import { getProductsByIds } from '@/lib/shopify'

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectDB()
    const orders = await Order.find({ user: params.userId }).sort({ createdAt: -1 })

    // Sab orders ke andar jitne bhi product IDs hain, unko ek saath Shopify se
    // fetch karo (naam + image), taake "My Orders" me dikha sakein
    const allProductIds = orders.flatMap((o) => o.orderItems.map((i: any) => i.product))
    const productInfo = await getProductsByIds(allProductIds)

    const enrichedOrders = orders.map((order) => {
      const obj = order.toObject()
      obj.orderItems = obj.orderItems.map((item: any) => ({
        ...item,
        name: productInfo[item.product]?.name || 'Product',
        image: productInfo[item.product]?.image || null,
      }))
      return obj
    })

    return NextResponse.json({ success: true, count: enrichedOrders.length, orders: enrichedOrders })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}