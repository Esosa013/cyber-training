// ✅ app/api/get-users/route.ts (App Router compliant)
import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/user'

export async function GET(req: NextRequest) {
  try {
    // Get all users by calling the function from lib/user.ts
    const users = await getAllUsers()

    // Return the list of users as a JSON response
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 })
  }
}
