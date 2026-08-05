import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 })
    }

    const existing = await Newsletter.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    await Newsletter.create({ email })

    return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const subscribers = await Newsletter.find().sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: subscribers.length, subscribers })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}