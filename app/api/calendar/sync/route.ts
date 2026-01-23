import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCalendarClient, refreshAccessToken } from '@/lib/google';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'user id required' },
        { status: 400 }
      );
    }

    // Get user with calendar tokens
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        googleAccessToken: true,
        googleRefreshToken: true,
        googleTokenExpiry: true,
      },
    });

    if (!user?.googleAccessToken || !user?.googleRefreshToken) {
      return NextResponse.json(
        { success: false, error: 'calendar not connected' },
        { status: 400 }
      );
    }

    // Check if token needs refresh
    let accessToken = user.googleAccessToken;
    const expiryDate = user.googleTokenExpiry ? new Date(user.googleTokenExpiry).getTime() : 0;
    const now = Date.now();

    if (expiryDate < now) {
      // Token expired, refresh it
      const newTokens = await refreshAccessToken(user.googleRefreshToken);
      accessToken = newTokens.access_token || accessToken;

      // Update user with new tokens
      await prisma.user.update({
        where: { id: userId },
        data: {
          googleAccessToken: newTokens.access_token,
          googleTokenExpiry: newTokens.expiry_date ? new Date(newTokens.expiry_date) : undefined,
        },
      });
    }

    // Get calendar client
    const calendar = await getCalendarClient(
      accessToken,
      user.googleRefreshToken,
      expiryDate
    );

    // Fetch events for the next 7 days
    const timeMin = new Date();
    const timeMax = new Date();
    timeMax.setDate(timeMax.getDate() + 7);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 100,
    });

    const events = response.data.items || [];

    // Store events in database
    const savedEvents = [];
    for (const event of events) {
      if (!event.id || !event.start || !event.end) continue;

      const startTime = event.start.dateTime || event.start.date;
      const endTime = event.end.dateTime || event.end.date;

      if (!startTime || !endTime) continue;

      // Upsert event (update if exists, create if not)
      const savedEvent = await prisma.calendarEvent.upsert({
        where: { googleEventId: event.id },
        update: {
          title: event.summary || 'Untitled Event',
          description: event.description,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          isAllDay: !event.start.dateTime,
          attendees: event.attendees
            ? JSON.parse(JSON.stringify(event.attendees))
            : null,
          organizerEmail: event.organizer?.email,
          isRecurring: !!event.recurringEventId,
          meetingLink: event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri,
          location: event.location,
        },
        create: {
          userId,
          googleEventId: event.id,
          calendarId: 'primary',
          title: event.summary || 'Untitled Event',
          description: event.description,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          isAllDay: !event.start.dateTime,
          attendees: event.attendees
            ? JSON.parse(JSON.stringify(event.attendees))
            : null,
          organizerEmail: event.organizer?.email,
          isRecurring: !!event.recurringEventId,
          meetingLink: event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri,
          location: event.location,
        },
      });

      savedEvents.push(savedEvent);
    }

    return NextResponse.json({
      success: true,
      eventCount: savedEvents.length,
      message: `synced ${savedEvents.length} events`,
    });
  } catch (error) {
    console.error('Error syncing calendar:', error);
    return NextResponse.json(
      { success: false, error: 'failed to sync calendar' },
      { status: 500 }
    );
  }
}
