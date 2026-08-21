import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import Product from '@/models/Product'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { userId, orderItems, shippingAddress, totalPrice, paymentMethod } = await req.json()

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ success: false, message: 'No order items provided' }, { status: 400 })
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product)
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product not found: ${item.product}` },
          { status: 404 }
        )
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, message: `Insufficient stock for: ${product.name}` },
          { status: 400 }
        )
      }
    }

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, soldCount: item.quantity },
      })
    }

    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    })

    return NextResponse.json(
      { success: true, message: 'Order created successfully', order },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'name image')
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: orders.length, orders })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}