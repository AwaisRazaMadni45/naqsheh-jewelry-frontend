// app/api/shopify-test/route.ts
//
// Sirf testing ke liye — connection verify karne ke baad ye file delete kar dena.

import { NextResponse } from 'next/server'
import { shopifyAdminFetch } from '@/lib/shopify'

export async function GET() {
  try {
    const data = await shopifyAdminFetch(`
      query {
        shop {
          name
          myshopifyDomain
        }
      }
    `)

    return NextResponse.json({ success: true, shop: data.shop })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}