import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    // Get pending suggestions for user
    const suggestions = await prisma.suggestion.findMany({
      where: {
        userId,
        status: 'pending',
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      suggestions,
      count: suggestions.length,
    });

  } catch (error: any) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch suggestions',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { suggestionId, status, feedbackNote } = await request.json();

    if (!suggestionId || !status) {
      return NextResponse.json(
        { success: false, error: 'Suggestion ID and status required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
      feedbackNote,
    };

    if (status === 'accepted') {
      updateData.acceptedAt = new Date();
    } else if (status === 'dismissed') {
      updateData.dismissedAt = new Date();
    }

    const suggestion = await prisma.suggestion.update({
      where: { id: suggestionId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      suggestion,
    });

  } catch (error: any) {
    console.error('Error updating suggestion:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update suggestion',
      },
      { status: 500 }
    );
  }
}
