import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import { shopifyAdminFetch, getProductVariant } from '@/lib/shopify'

// Shopify ko phone number E.164 format me chahiye (+923001234567)
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
    const body = await req.json()

    const {
      // Guest fields
      guestName,
      guestEmail,
      guestPhone,
      // Legacy logged-in user
      userId,
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    } = body

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ success: false, message: 'No order items provided' }, { status: 400 })
    }

    // Guest ya logged-in — naam aur email dono se kaam chalao
    const customerName = guestName || 'Guest Customer'
    const customerEmail = guestEmail || 'guest@naqsheh.com'
    const customerPhone = guestPhone || shippingAddress?.phone || ''

    const [firstName, ...rest] = customerName.trim().split(' ')
    const lastName = rest.join(' ') || firstName

    const normalizedPhone = normalizePhone(customerPhone)

    // Shopify se variant + stock check
    const lineItems = []
    for (const item of orderItems) {
      const variant = await getProductVariant(item.product)
      if (!variant) {
        return NextResponse.json(
          { success: false, message: `Product not found: ${item.product}` },
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

    // Shopify mein order create karo
    const shopifyResult = await shopifyAdminFetch<any>(
      `
      mutation CreateOrder($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
        orderCreate(order: $order, options: $options) {
          order { id name }
          userErrors { field message }
        }
      }
      `,
      {
        order: {
          lineItems,
          email: customerEmail,
          phone: normalizedPhone,
          financialStatus: 'PENDING',
          tags: [paymentMethod || 'COD', 'guest-checkout'],
          note: `Naqsheh website — ${guestName ? 'Guest' : 'User'} order | Payment: ${paymentMethod || 'COD'} | Nearby: ${shippingAddress?.nearbyPlace || 'N/A'}`,
          shippingAddress: {
            firstName,
            lastName,
            address1: shippingAddress.address,
            address2: shippingAddress.nearbyPlace || '',
            city: shippingAddress.city,
            zip: shippingAddress.postalCode,
            country: shippingAddress.country || 'Pakistan',
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

    // Local DB mein bhi save karo
    const orderData: any = {
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
      shopifyOrderId: shopifyOrder.id,
      shopifyOrderName: shopifyOrder.name,
    }

    // Guest ya logged-in user
    if (userId) {
      orderData.user = userId
    } else {
      orderData.guestName = customerName
      orderData.guestEmail = customerEmail
      orderData.guestPhone = customerPhone
    }

    const order = await Order.create(orderData)

    return NextResponse.json(
      { success: true, message: 'Order placed successfully', order },
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
