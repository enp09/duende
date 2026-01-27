import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, getUserIdFromSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    const session = await requireAuth();
    const sessionUserId = getUserIdFromSession(session);

    const { id } = await params;

    // Ensure user can only access their own data
    if (sessionUserId !== id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: You can only access your own data' },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        settings: true,
        relationships: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'user not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        city: user.city,
        timezone: user.timezone,
        onboardingCompleted: user.onboardingCompleted,
        googleAccessToken: user.googleAccessToken,
        settings: user.settings,
        relationships: user.relationships,
      },
    });
  } catch (error: any) {
    console.error('Error fetching user:', error);

    // Handle authentication errors
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Please sign in' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'failed to fetch user data' },
      { status: 500 }
    );
  }
}
