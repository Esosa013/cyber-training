import { updateUser } from '@/lib/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, points, completedScenarios, badge } = body;

    if (!userId || completedScenarios === undefined || points === undefined) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          debug: { userId, points, completedScenarios },
        },
        { status: 400 }
      );
    }

    const updatedUser = await updateUser(userId, points, completedScenarios, badge);

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('❌ Error updating user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
