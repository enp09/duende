import { NextRequest, NextResponse } from 'next/server';
import { analyzeUserCalendar } from '@/lib/threshold-detector';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    // Run threshold detection
    const violations = await analyzeUserCalendar(userId);

    if (violations.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No violations detected - your calendar looks good!',
        violations: [],
        count: 0,
      });
    }

    // Create suggestions in database for each violation
    const createdSuggestions = await Promise.all(
      violations.map(async (violation) => {
        // Check if a similar suggestion already exists (avoid duplicates)
        const existingSuggestion = await prisma.suggestion.findFirst({
          where: {
            userId,
            type: violation.type,
            status: 'pending',
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
            },
          },
        });

        if (existingSuggestion) {
          return existingSuggestion;
        }

        // Create new suggestion
        return await prisma.suggestion.create({
          data: {
            userId,
            type: violation.type,
            defaultSetting: violation.defaultSetting,
            title: violation.title,
            description: violation.description,
            reasoning: violation.suggestedAction || '',
            status: 'pending',
            expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // Expires in 48 hours
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: `Found ${violations.length} threshold ${violations.length === 1 ? 'violation' : 'violations'}`,
      violations,
      suggestions: createdSuggestions,
      count: violations.length,
    });

  } catch (error: any) {
    console.error('Error analyzing calendar:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to analyze calendar',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
