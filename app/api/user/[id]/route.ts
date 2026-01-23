import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'failed to fetch user data' },
      { status: 500 }
    );
  }
}
