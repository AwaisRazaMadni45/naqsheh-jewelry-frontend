import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 })
    }

    const contact = await Contact.create({ name, email, subject, message })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully', contact },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find().sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: contacts.length, contacts })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}