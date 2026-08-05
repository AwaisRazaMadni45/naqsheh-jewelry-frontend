import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectDB()
    const orders = await Order.find({ user: params.userId }).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: orders.length, orders })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}