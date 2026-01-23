import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId, intentions } = await request.json();

    if (!userId || !intentions || !Array.isArray(intentions)) {
      return NextResponse.json(
        { success: false, error: 'invalid request data' },
        { status: 400 }
      );
    }

    // Calculate week start date (Monday of current week)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const weekStartDate = new Date(now.setDate(diff));
    weekStartDate.setHours(0, 0, 0, 0);

    // Create intentions in database
    const createdIntentions = await Promise.all(
      intentions.map((intention: any) =>
        prisma.intention.create({
          data: {
            userId,
            defaultSetting: intention.defaultSetting,
            description: intention.description,
            weekStartDate,
            status: 'pending',
            targetDay: intention.targetDay,
            requiresWeather: intention.requiresWeather || false,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      count: createdIntentions.length,
      message: 'intentions saved successfully',
    });
  } catch (error) {
    console.error('Error saving intentions:', error);
    return NextResponse.json(
      { success: false, error: 'failed to save intentions' },
      { status: 500 }
    );
  }
}
