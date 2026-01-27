import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCalendarClient, refreshAccessToken } from '@/lib/google';

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

    // Get user with calendar tokens
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        googleAccessToken: true,
        googleRefreshToken: true,
        googleTokenExpiry: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.googleAccessToken || !user.googleRefreshToken) {
      return NextResponse.json(
        { success: false, error: 'Calendar not connected' },
        { status: 401 }
      );
    }

    // Check if token needs refresh
    let accessToken = user.googleAccessToken;
    let tokenExpiry = user.googleTokenExpiry?.getTime() || 0;

    if (tokenExpiry < Date.now()) {
      console.log('Access token expired, refreshing...');
      const credentials = await refreshAccessToken(user.googleRefreshToken);

      accessToken = credentials.access_token || user.googleAccessToken;
      tokenExpiry = credentials.expiry_date || Date.now() + 3600000;

      // Update tokens in database
      await prisma.user.update({
        where: { id: userId },
        data: {
          googleAccessToken: accessToken,
          googleTokenExpiry: new Date(tokenExpiry),
        },
      });
    }

    // Get calendar client
    const calendar = await getCalendarClient(
      accessToken,
      user.googleRefreshToken,
      tokenExpiry
    );

    // Fetch events for the next 30 days
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: thirtyDaysFromNow.toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];

    // Transform events to a simpler format
    const calendarEvents = events.map((event: any) => {
      const startTime = event.start?.dateTime || event.start?.date;
      const endTime = event.end?.dateTime || event.end?.date;

      return {
        id: event.id,
        title: event.summary || '(No title)',
        startTime,
        endTime,
        isAllDay: !event.start?.dateTime,
        attendees: event.attendees?.map((a: any) => ({
          email: a.email,
          name: a.displayName,
          responseStatus: a.responseStatus,
        })) || [],
        organizerEmail: event.organizer?.email,
        meetingLink: event.hangoutLink || event.location,
        description: event.description,
      };
    });

    // Optionally cache events in database (for future threshold detection)
    // We'll skip this for now to keep it simple

    return NextResponse.json({
      success: true,
      events: calendarEvents,
      count: calendarEvents.length,
    });

  } catch (error: any) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch calendar events',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
