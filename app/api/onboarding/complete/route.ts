import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, city, timezone, planningAnswers, calendarBlocks } = data;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
      include: { settings: true },
    });

    if (user) {
      // User exists, just return their ID
      console.log('User already exists:', user.id);
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          city: city || null,
          timezone: timezone || 'America/New_York',
          onboardingCompleted: true,
          onboardedAt: new Date(),
        },
        include: { settings: true },
      });
    }

    // Save planning data if provided
    if (planningAnswers || calendarBlocks) {
      const protectionBlocks = calendarBlocks?.filter((b: any) => b.type === 'proposed') || [];

      await fetch(`${request.nextUrl.origin}/api/planning/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          answers: planningAnswers,
          protectionBlocks,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      userId: user.id,
      message: 'Onboarding completed successfully',
    });
  } catch (error: any) {
    console.error('Error saving onboarding data:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save onboarding data' },
      { status: 500 }
    );
  }
}
