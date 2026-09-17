import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import { shopifyAdminFetch, getProductVariant } from '@/lib/shopify'

// Shopify ko phone number E.164 format me chahiye (jaise +923001234567).
// Customer jaise bhi likhe (0300..., 92300..., +92300...), isse sahi format mil jata hai.
function normalizePhone(raw?: string): string | undefined {
  if (!raw) return undefined
  const digits = raw.replace(/[^\d+]/g, '')
  if (digits.startsWith('+')) return digits
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`
  if (digits.startsWith('92')) return `+${digits}`
  return `+92${digits}`
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { userId, orderItems, shippingAddress, totalPrice, paymentMethod } = await req.json()

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ success: false, message: 'No order items provided' }, { status: 400 })
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }

    // Har item ka Shopify variant + stock nikalo, aur stock check karo
    const lineItems = []
    for (const item of orderItems) {
      const variant = await getProductVariant(item.product)

      if (!variant) {
        return NextResponse.json(
          { success: false, message: `Product not found in Shopify: ${item.product}` },
          { status: 404 }
        )
      }
      if (variant.stock < item.quantity) {
        return NextResponse.json(
          { success: false, message: `Insufficient stock for: ${variant.productTitle}` },
          { status: 400 }
        )
      }

      lineItems.push({ variantId: variant.variantId, quantity: item.quantity })
    }

    // Naam ko first/last me split karo (Shopify address ko dono chahiye)
    const [firstName, ...rest] = (user.name || 'Customer').split(' ')
    const lastName = rest.join(' ') || firstName

    const normalizedPhone = normalizePhone(shippingAddress?.phone)

    // Shopify me asal order create karo — "DECREMENT_IGNORING_POLICY" se
    // Shopify khud stock kum kar dega, hamein manually karne ki zaroorat nahi
    const shopifyResult = await shopifyAdminFetch<any>(
      `
      mutation CreateOrder($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
        orderCreate(order: $order, options: $options) {
          order {
            id
            name
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
      {
        order: {
          lineItems,
          email: user.email,
          phone: normalizedPhone,
          financialStatus: 'PENDING',
          tags: [paymentMethod || 'COD'],
          note: `Naqsheh website order — payment: ${paymentMethod || 'COD'}`,
          shippingAddress: {
            firstName,
            lastName,
            address1: shippingAddress.address,
            city: shippingAddress.city,
            zip: shippingAddress.postalCode,
            country: shippingAddress.country,
            phone: normalizedPhone,
          },
        },
        options: {
          inventoryBehaviour: 'DECREMENT_IGNORING_POLICY',
        },
      }
    )

    const errors = shopifyResult.orderCreate?.userErrors
    if (errors && errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.map((e: any) => e.message).join(', ') },
        { status: 400 }
      )
    }

    const shopifyOrder = shopifyResult.orderCreate.order

    // Apna halka local record bhi save karo (order history / admin panel ke liye)
    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
      shopifyOrderId: shopifyOrder.id,
      shopifyOrderName: shopifyOrder.name,
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
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: orders.length, orders })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}