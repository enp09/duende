import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCalendarClient, refreshAccessToken } from '@/lib/google';

export async function POST(request: NextRequest) {
  try {
    const { userId, protectionBlocks } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    if (!protectionBlocks || !Array.isArray(protectionBlocks)) {
      return NextResponse.json(
        { success: false, error: 'Protection blocks required' },
        { status: 400 }
      );
    }

    // Get user with calendar tokens
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        timezone: true,
        googleAccessToken: true,
        googleRefreshToken: true,
        googleTokenExpiry: true,
        calendarWriteAccess: true,
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

    // Calculate week boundaries
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const weekStart = new Date(now);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    // Find and delete existing duende-created events for this week
    const existingEvents = await calendar.events.list({
      calendarId: 'primary',
      timeMin: weekStart.toISOString(),
      timeMax: weekEnd.toISOString(),
      privateExtendedProperty: ['createdBy=duende'],
      maxResults: 100,
    });

    const deletePromises = (existingEvents.data.items || []).map(event =>
      calendar.events.delete({
        calendarId: 'primary',
        eventId: event.id!,
      }).catch(err => {
        console.error(`Failed to delete event ${event.id}:`, err);
      })
    );

    await Promise.all(deletePromises);
    console.log(`Deleted ${deletePromises.length} existing duende events`);

    // Create new protection events
    const dayMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const createdEvents = [];

    for (const block of protectionBlocks) {
      try {
        // Calculate the date for this block
        const targetDayOfWeek = dayMap[block.day];
        const daysFromMonday = targetDayOfWeek - 1; // weekStart is Monday
        const blockDate = new Date(weekStart);
        blockDate.setDate(blockDate.getDate() + daysFromMonday);

        // Parse start and end times
        const [startHour, startMin] = block.startTime.split(':').map(Number);
        const [endHour, endMin] = block.endTime.split(':').map(Number);

        const startDateTime = new Date(blockDate);
        startDateTime.setHours(startHour, startMin, 0, 0);

        const endDateTime = new Date(blockDate);
        endDateTime.setHours(endHour, endMin, 0, 0);

        // Determine color based on protection type
        const colorId = getColorId(block.setting);

        // Create event in Google Calendar
        const event = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: {
            summary: `🛡️ ${block.title}`,
            description: `Protected by Duende\n\nThis time is blocked to protect your ${block.setting || 'wellbeing'}.\n\nDuende will advocate for this time if someone tries to book over it.`,
            start: {
              dateTime: startDateTime.toISOString(),
              timeZone: user.timezone || 'America/New_York',
            },
            end: {
              dateTime: endDateTime.toISOString(),
              timeZone: user.timezone || 'America/New_York',
            },
            colorId,
            extendedProperties: {
              private: {
                createdBy: 'duende',
                protectionType: block.setting || 'general',
                duendeBlockId: block.id,
              },
            },
            reminders: {
              useDefault: false,
              overrides: [],
            },
          },
        });

        createdEvents.push({
          googleEventId: event.data.id,
          title: block.title,
          day: block.day,
        });

        // Save to database
        await prisma.calendarEvent.upsert({
          where: { googleEventId: event.data.id! },
          update: {
            title: block.title,
            startTime: startDateTime,
            endTime: endDateTime,
            blockedByDuende: true,
            isProtected: true,
          },
          create: {
            userId,
            googleEventId: event.data.id!,
            calendarId: 'primary',
            title: block.title,
            startTime: startDateTime,
            endTime: endDateTime,
            isAllDay: false,
            blockedByDuende: true,
            isProtected: true,
          },
        });

        console.log(`Created protection: ${block.title} on ${block.day}`);
      } catch (error: any) {
        console.error(`Failed to create event for ${block.title}:`, error);
        // Continue with other blocks even if one fails
      }
    }

    // Mark user as having calendar write access
    if (!user.calendarWriteAccess) {
      await prisma.user.update({
        where: { id: userId },
        data: { calendarWriteAccess: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${createdEvents.length} protection blocks to your calendar`,
      createdEvents,
      count: createdEvents.length,
    });

  } catch (error: any) {
    console.error('Error syncing to calendar:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to sync protections to calendar',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

// Map protection types to Google Calendar color IDs
function getColorId(setting?: string): string {
  const colorMap: { [key: string]: string } = {
    movement: '6',      // Orange
    nutrition: '10',    // Green
    relationships: '4', // Pink
    stress: '9',        // Blue
    transcendence: '5', // Yellow/Amber
  };

  return colorMap[setting || ''] || '11'; // Default to gray
}
