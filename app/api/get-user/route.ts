// ✅ app/api/get-user/route.ts (App Router compliant)
import { getCompleteUser } from '@/lib/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getCompleteUser(req)
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(user)
}
    