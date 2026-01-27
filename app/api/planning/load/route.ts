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

    // Get user with settings and intentions
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        settings: true,
        intentions: {
          where: {
            weekStartDate: {
              gte: getWeekStartDate(),
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        calendarEvents: {
          where: {
            blockedByDuende: true,
            startTime: {
              gte: getWeekStartDate(),
            },
          },
          orderBy: {
            startTime: 'asc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Transform settings to planning answers format
    const answers = {
      intentions: user.intentions[0]?.description || '',
      movement: user.settings?.movementTypes?.[0] || '',
      nutrition: user.settings?.wantsProtectedLunch ? 'protected lunch' : '',
      relationships: '',
      stress: user.settings?.decompressMethods?.[0] || '',
      transcendence: user.settings?.passionProjects?.[0] || '',
      excludePeople: '',
    };

    // Transform calendar events to blocks format
    const protectionBlocks = user.calendarEvents.map(event => {
      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime);

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = dayNames[startDate.getDay()];

      const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };

      return {
        id: event.googleEventId,
        type: 'proposed',
        title: event.title || 'Protection',
        day: dayName,
        startTime: formatTime(startDate),
        endTime: formatTime(endDate),
        color: getColorForTitle(event.title || ''),
        setting: getSettingForTitle(event.title || ''),
      };
    });

    return NextResponse.json({
      success: true,
      answers,
      protectionBlocks,
      hasExistingData: protectionBlocks.length > 0,
    });
  } catch (error: any) {
    console.error('Error loading planning data:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to load planning data' },
      { status: 500 }
    );
  }
}

function getWeekStartDate(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const weekStartDate = new Date(now.setDate(diff));
  weekStartDate.setHours(0, 0, 0, 0);
  return weekStartDate;
}

function getColorForTitle(title: string): string {
  if (title.includes('Walk') || title.includes('Run') || title.includes('Movement')) return '#fb923c';
  if (title.includes('Lunch')) return '#4ade80';
  if (title.includes('Coffee') || title.includes('Connection')) return '#f472b6';
  if (title.includes('Buffer')) return '#60a5fa';
  if (title.includes('Deep Work') || title.includes('Growth')) return '#fbbf24';
  return '#9ca3af';
}

function getSettingForTitle(title: string): string {
  if (title.includes('Walk') || title.includes('Run') || title.includes('Movement')) return 'movement';
  if (title.includes('Lunch')) return 'nutrition';
  if (title.includes('Coffee') || title.includes('Connection')) return 'relationships';
  if (title.includes('Buffer')) return 'stress';
  if (title.includes('Deep Work') || title.includes('Growth')) return 'transcendence';
  return '';
}
