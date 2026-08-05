import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export function verifyAdmin(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
    if (!decoded.isAdmin) return null
    return decoded
  } catch {
    return null
  }
}