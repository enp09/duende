import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateMessageForViolation } from '@/lib/message-generator';

export async function POST(request: NextRequest) {
  try {
    const { suggestionId, recipientEmail } = await request.json();

    if (!suggestionId) {
      return NextResponse.json(
        { success: false, error: 'Suggestion ID required' },
        { status: 400 }
      );
    }

    // Get suggestion with user data
    const suggestion = await prisma.suggestion.findUnique({
      where: { id: suggestionId },
      include: {
        user: true,
      },
    });

    if (!suggestion) {
      return NextResponse.json(
        { success: false, error: 'Suggestion not found' },
        { status: 404 }
      );
    }

    // Extract user name from email (before @)
    const userName = suggestion.user.email.split('@')[0];

    // Extract recipient name from email if provided
    let recipientName = 'there';
    if (recipientEmail) {
      recipientName = recipientEmail.split('@')[0];
    }

    // Generate messages
    const messages = await generateMessageForViolation(
      userName,
      {
        type: suggestion.type,
        description: suggestion.description || '',
        suggestedAction: suggestion.reasoning || '',
      },
      recipientEmail ? {
        name: recipientName,
        email: recipientEmail,
      } : undefined
    );

    // Update suggestion with generated message
    await prisma.suggestion.update({
      where: { id: suggestionId },
      data: {
        draftMessage: messages.advocacy,
      },
    });

    return NextResponse.json({
      success: true,
      messages: {
        advocacy: messages.advocacy,
        alert: messages.alert,
      },
    });

  } catch (error: any) {
    console.error('Error generating message:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate message',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
