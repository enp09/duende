import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendAdvocacyEmail, sendThresholdAlert } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const { suggestionId, recipientEmail, sendAlertToUser } = await request.json();

    if (!suggestionId || !recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'Suggestion ID and recipient email required' },
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

    if (!suggestion.draftMessage) {
      return NextResponse.json(
        { success: false, error: 'No draft message found. Generate a message first.' },
        { status: 400 }
      );
    }

    // Extract names from emails
    const userName = suggestion.user.email.split('@')[0];
    const recipientName = recipientEmail.split('@')[0];

    // Send advocacy email to recipient
    const advocacyResult = await sendAdvocacyEmail({
      to: recipientEmail,
      recipientName,
      userName,
      message: suggestion.draftMessage,
      subject: `${userName} - calendar update`,
    });

    if (!advocacyResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send advocacy email',
          details: advocacyResult.error,
        },
        { status: 500 }
      );
    }

    // Optionally send threshold alert to user
    if (sendAlertToUser && suggestion.reasoning) {
      await sendThresholdAlert({
        to: suggestion.user.email,
        userName,
        alertMessage: suggestion.reasoning,
        violationType: suggestion.type,
      });
    }

    // Update suggestion status
    await prisma.suggestion.update({
      where: { id: suggestionId },
      data: {
        status: 'sent',
        sentAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      messageId: advocacyResult.messageId,
      message: 'Advocacy message sent successfully',
    });

  } catch (error: any) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send message',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
